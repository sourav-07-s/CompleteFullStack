export const idOf = (item) => item?._id || item?.id || "";
export const formatTime = (seconds = 0) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
};
export const initials = (name = "MusicFy User") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";
export const coverFor = (index = 0) =>
  [
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=720&q=85",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=720&q=85",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=720&q=85",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=720&q=85",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=720&q=85",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=720&q=85",
  ][index % 6];
