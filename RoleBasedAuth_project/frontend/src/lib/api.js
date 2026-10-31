const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload?.message
        ? payload.message.trim()
        : `Request failed (${response.status})`;
    throw new Error(message || `Request failed (${response.status})`);
  }
  return payload;
}

export const api = {
  register: (data) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (identifier, password) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: identifier,
        email: identifier,
        password,
      }),
    }),
  logout: () => request("/api/auth/logout", { method: "POST" }),
  getMusic: () => request("/api/admin"),
  getAlbums: () => request("/api/admin/albums"),
  getAlbum: (id) => request(`/api/admin/albums/${id}`),

  uploadMusic: async (title, file) => {
    // 1. Get a signed upload token from our backend (admin only)
    const auth = await request("/api/admin/imagekit-auth");

    // 2. Upload the file directly to ImageKit
    //    (skips Vercel's 4.5 MB request-size limit)
    const form = new FormData();
    form.append("file", file);
    form.append("fileName", `FILE_${Date.now()}_${file.name}`);
    form.append("folder", "RoleBasedAuth_project/Admin-File");
    form.append("publicKey", auth.publicKey);
    form.append("signature", auth.signature);
    form.append("expire", auth.expire);
    form.append("token", auth.token);

    const uploadResponse = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      { method: "POST", body: form },
    );
    const uploaded = await uploadResponse.json();

    if (!uploadResponse.ok) {
      throw new Error(uploaded?.message || "File upload to ImageKit failed");
    }

    // 3. Save only the title + file URL in our database
    return request("/api/admin/upload", {
      method: "POST",
      body: JSON.stringify({ title, uri: uploaded.url }),
    });
  },

  createAlbum: (title, musics) =>
    request("/api/admin/album", {
      method: "POST",
      body: JSON.stringify({ title, musics }),
    }),
};

export function getErrorMessage(error) {
  if (error instanceof TypeError)
    return "Could not reach the server. Check your internet connection and try again.";
  return error?.message || "Something went wrong. Please try again.";
}