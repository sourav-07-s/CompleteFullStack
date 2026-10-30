const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  });

  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = typeof payload === 'object' && payload?.message
      ? payload.message.trim()
      : `Request failed (${response.status})`;
    throw new Error(message || `Request failed (${response.status})`);
  }
  return payload;
}

export const api = {
  register: (data) => request('/api/auth/register', {
    method: 'POST', body: JSON.stringify({ ...data, role: 'user' }),
  }),
  login: (identifier, password) => request('/api/auth/login', {
    method: 'POST', body: JSON.stringify({ username: identifier, email: identifier, password }),
  }),
  logout: () => request('/api/auth/logout', { method: 'POST' }),
  getMusic: () => request('/api/admin/'),
  getAlbums: () => request('/api/admin/albums'),
  getAlbum: (id) => request(`/api/admin/albums/${id}`),
  uploadMusic: (title, file) => {
    const form = new FormData();
    form.append('title', title);
    form.append('music', file);
    return request('/api/admin/upload', { method: 'POST', body: form });
  },
  createAlbum: (title, musics) => request('/api/admin/album', {
    method: 'POST', body: JSON.stringify({ title, musics }),
  }),
};

export function getErrorMessage(error) {
  if (error instanceof TypeError) return 'Could not reach the backend. Make sure the API server is running on port 3000.';
  return error?.message || 'Something went wrong. Please try again.';
}
