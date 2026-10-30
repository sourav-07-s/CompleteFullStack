import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  AudioLines,
  Check,
  ChevronRight,
  CloudUpload,
  Disc3,
  FileAudio,
  LoaderCircle,
  Music2,
  Plus,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { api, getErrorMessage } from "../lib/api";
import { idOf } from "../lib/helpers";

function AdminNav({ route, onNavigate }) {
  const items = [
    { label: "Overview", path: "/admin", icon: Activity },
    { label: "Upload music", path: "/admin/upload", icon: CloudUpload },
    { label: "Create album", path: "/admin/albums", icon: Disc3 },
  ];
  return (
    <aside className="flex gap-2 overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#11111a] p-2 lg:block lg:w-[220px] lg:shrink-0 lg:space-y-1 lg:self-start">
      {items.map(({ label, path, icon: Icon }) => (
        <button
          key={path}
          onClick={() => onNavigate(path)}
          className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-semibold transition lg:w-full ${route === path ? "bg-violet-500/15 text-violet-200" : "text-zinc-500 hover:bg-white/[0.05] hover:text-white"}`}
        >
          <Icon size={17} />
          {label}
          {route === path && (
            <ChevronRight size={14} className="ml-auto hidden lg:block" />
          )}
        </button>
      ))}
    </aside>
  );
}

function UploadPanel({ onDone }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const chooseFile = (next) => {
    if (next) {
      setFile(next);
      setError("");
      setDone("");
    }
  };
  const submit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    setError("");
    setDone("");
    if (!title.trim()) return setError("Enter a track title.");
    if (!file) return setError("Choose an audio file before uploading.");
    if (!file.type.startsWith("audio/"))
      return setError("Please select a valid audio file.");
    setLoading(true);
    try {
      const result = await api.uploadMusic(title.trim(), file);
      setDone(result.message || "Track uploaded successfully.");
      setTitle("");
      setFile(null);
      formElement.reset();
      await onDone?.();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="rounded-[26px] border border-white/[0.07] bg-[#11111a] p-5 sm:p-7">
      <div className="mb-7">
        <p className="eyebrow">Publish to the library</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight">
          Upload a new track
        </h2>
        <p className="mt-2 text-xs leading-6 text-zinc-500">
          Add an audio file and give it a title. The file is stored with your
          configured ImageKit account.
        </p>
      </div>
      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <div>
          <label className="field-label">Audio file</label>
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              chooseFile(e.dataTransfer.files?.[0]);
            }}
            className={`mt-2 flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-5 text-center transition ${dragging ? "border-violet-400 bg-violet-500/10" : "border-white/15 bg-[#0b0b13] hover:border-violet-400/50 hover:bg-violet-500/[0.04]"}`}
          >
            <input
              type="file"
              accept="audio/*"
              className="sr-only"
              onChange={(e) => chooseFile(e.target.files?.[0])}
            />
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-500/10 text-violet-300">
              <CloudUpload size={27} />
            </div>
            <p className="mt-5 text-sm font-bold text-zinc-200">
              {file ? file.name : "Drop your audio file here"}
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              or <span className="font-bold text-violet-300">browse files</span>
            </p>
            {file && (
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] text-zinc-400">
                <FileAudio size={13} />
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </span>
            )}
            {!file && (
              <p className="mt-4 text-[10px] text-zinc-700">
                Audio formats supported by your browser
              </p>
            )}
          </label>
        </div>
        <div className="flex flex-col">
          <label className="field-label">Track details</label>
          <label className="field-label mt-4">
            Track title
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your track a name"
              className="form-input mt-2"
            />
          </label>
          <div className="mt-5 rounded-2xl border border-white/[0.06] bg-[#0b0b13] p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
              <ShieldCheck size={15} className="text-emerald-300" /> Admin
              publishing
            </div>
            <p className="mt-2 text-[11px] leading-5 text-zinc-600">
              Your account is authorized to publish tracks. Uploaded music will
              be available in the authenticated library.
            </p>
          </div>
          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl border border-red-400/15 bg-red-400/[0.07] p-3 text-xs text-red-300"
            >
              {error}
            </p>
          )}
          {done && (
            <p
              role="status"
              className="mt-5 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.07] p-3 text-xs text-emerald-300"
            >
              {done}
            </p>
          )}
          <button
            disabled={loading}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-violet-950/40 transition hover:brightness-110 disabled:opacity-50"
          >
            {loading ? (
              <>
                <LoaderCircle size={16} className="animate-spin" /> Uploading...
              </>
            ) : (
              <>
                <Upload size={16} /> Publish track
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function AlbumPanel({ tracks, onDone }) {
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const toggle = (id) =>
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setDone("");
    if (!title.trim()) return setError("Enter an album title.");
    if (!selected.length)
      return setError("Select at least one track for this album.");
    setLoading(true);
    try {
      const result = await api.createAlbum(title.trim(), selected);
      setDone(result.message || "Album created successfully.");
      setTitle("");
      setSelected([]);
      await onDone?.();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="rounded-[26px] border border-white/[0.07] bg-[#11111a] p-5 sm:p-7">
      <div className="mb-7">
        <p className="eyebrow">Bring tracks together</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight">
          Create an album
        </h2>
        <p className="mt-2 text-xs leading-6 text-zinc-500">
          Choose a title and select the tracks you want to group together.
        </p>
      </div>
      <form onSubmit={submit} className="max-w-3xl">
        <label className="field-label">
          Album title
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Midnight Sessions"
            className="form-input mt-2"
          />
        </label>
        <div className="mb-3 mt-7 flex items-center justify-between">
          <p className="text-xs font-bold text-zinc-300">Choose tracks</p>
          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-[10px] font-bold text-violet-200">
            {selected.length} selected
          </span>
        </div>
        <div className="max-h-[370px] space-y-1 overflow-y-auto rounded-2xl border border-white/[0.07] bg-[#0b0b13] p-2">
          {tracks.length ? (
            tracks.map((track, index) => {
              const id = idOf(track);
              const checked = selected.includes(id);
              return (
                <label
                  key={id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl p-3 transition ${checked ? "bg-violet-500/10" : "hover:bg-white/[0.04]"}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(id)}
                    className="h-4 w-4 accent-violet-500"
                  />
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-linear-to-br from-violet-700 to-blue-800 text-white">
                    <Music2 size={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-zinc-200">
                      {track.title}
                    </span>
                    <span className="mt-1 block truncate text-[10px] text-zinc-600">
                      {track.admin?.username || "MusicFy creator"}
                    </span>
                  </span>
                  {checked && <Check size={16} className="text-violet-300" />}
                </label>
              );
            })
          ) : (
            <p className="py-12 text-center text-xs text-zinc-600">
              Upload tracks before creating an album.
            </p>
          )}
        </div>
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-400/15 bg-red-400/[0.07] p-3 text-xs text-red-300"
          >
            {error}
          </p>
        )}
        {done && (
          <p
            role="status"
            className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.07] p-3 text-xs text-emerald-300"
          >
            {done}
          </p>
        )}
        <button
          disabled={loading || !tracks.length}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-xs font-extrabold text-white transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? (
            <>
              <LoaderCircle size={16} className="animate-spin" /> Creating...
            </>
          ) : (
            <>
              <Plus size={16} /> Create album
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function Overview({ tracks, onNavigate }) {
  const [albums, setAlbums] = useState([]);
  const [albumError, setAlbumError] = useState("");
  useEffect(() => {
    api
      .getAlbums()
      .then((result) => setAlbums(result.albums || []))
      .catch((err) => setAlbumError(getErrorMessage(err)));
  }, []);
  const stats = [
    {
      label: "Published tracks",
      value: tracks.length,
      icon: AudioLines,
      tint: "text-violet-300 bg-violet-500/10",
    },
    {
      label: "Albums",
      value: albums.length,
      icon: Disc3,
      tint: "text-blue-300 bg-blue-500/10",
    },
    {
      label: "Your role",
      value: "Admin",
      icon: ShieldCheck,
      tint: "text-emerald-300 bg-emerald-500/10",
    },
  ];
  return (
    <>
      <div className="relative overflow-hidden rounded-[26px] border border-violet-300/10 bg-linear-to-br from-[#24163d] via-[#17152e] to-[#101728] p-6 sm:p-8">
        <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-violet-500/20 blur-[80px]" />
        <div className="relative">
          <p className="eyebrow text-violet-200">Creator workspace</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Your studio. Your sound.
          </h2>
          <p className="mt-2 max-w-md text-xs leading-6 text-violet-100/55">
            Manage the music available in your MusicFy library. Publish new
            audio and organize it into albums.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate("/admin/upload")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black text-[#11111a]"
            >
              <Upload size={15} /> Upload music
            </button>
            <button
              onClick={() => onNavigate("/admin/albums")}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-xs font-bold text-white"
            >
              <Plus size={15} /> Create album
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, tint }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/[0.07] bg-[#11111a] p-5"
          >
            <div
              className={`grid h-10 w-10 place-items-center rounded-xl ${tint}`}
            >
              <Icon size={19} />
            </div>
            <p className="mt-5 text-2xl font-black text-white">{value}</p>
            <p className="mt-1 text-[10px] font-semibold text-zinc-500">
              {label}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#11111a] p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="eyebrow">Library activity</p>
            <h3 className="mt-1 text-lg font-extrabold">Latest tracks</h3>
          </div>
          <button
            onClick={() => onNavigate("/admin/upload")}
            className="text-[11px] font-bold text-violet-300 hover:text-white"
          >
            Add track <ArrowRight size={13} className="ml-1 inline" />
          </button>
        </div>
        {tracks.length ? (
          <div className="divide-y divide-white/[0.055]">
            {tracks.slice(0, 7).map((track, index) => (
              <div key={idOf(track)} className="flex items-center gap-3 py-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-violet-600/30 to-blue-600/20 text-violet-200">
                  <Music2 size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-zinc-200">
                    {track.title}
                  </p>
                  <p className="mt-1 text-[10px] text-zinc-600">
                    {track.admin?.username ||
                      track.admin?.email ||
                      "Uploaded track"}
                  </p>
                </div>
                <span className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[9px] text-zinc-500">
                  Published
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-10 text-center text-xs text-zinc-600">
            No tracks yet. Upload your first one to get started.
          </p>
        )}
        {albumError && (
          <p className="mt-3 text-[10px] text-amber-300/80">
            Album count is temporarily unavailable: {albumError}
          </p>
        )}
      </div>
    </>
  );
}

export default function AdminPage({
  route,
  user,
  tracks,
  onNavigate,
  onDataChanged,
}) {
  if (user?.role !== "admin")
    return (
      <main className="mx-auto max-w-3xl px-4 py-28 text-center">
        <ShieldCheck size={36} className="mx-auto text-red-300" />
        <h1 className="mt-5 text-2xl font-black">Admin access required</h1>
        <p className="mt-2 text-sm text-zinc-500">
          This studio is available only to accounts with the admin role.
        </p>
        <button
          onClick={() => onNavigate("/")}
          className="mt-6 rounded-full border border-white/10 px-5 py-3 text-xs font-bold"
        >
          Back to MusicFy
        </button>
      </main>
    );
  const active = route.startsWith("/admin/upload")
    ? "upload"
    : route.startsWith("/admin/albums")
      ? "albums"
      : "overview";
  return (
    <main className="mx-auto max-w-[1440px] px-4 pb-32 pt-9 sm:px-7 xl:px-10">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">MusicFy · Admin studio</p>
          <h1 className="page-title">
            Control <span className="gradient-text">room.</span>
          </h1>
          <p className="mt-2 text-xs text-zinc-500">
            Welcome back, {user?.username}. Manage your music collection.
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-2 text-[10px] font-bold text-emerald-200">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Admin
          session active
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <AdminNav route={route} onNavigate={onNavigate} />
        <section className="min-w-0 flex-1">
          {active === "overview" && (
            <Overview tracks={tracks} onNavigate={onNavigate} />
          )}
          {active === "upload" && <UploadPanel onDone={onDataChanged} />}
          {active === "albums" && (
            <AlbumPanel tracks={tracks} onDone={onDataChanged} />
          )}
        </section>
      </div>
    </main>
  );
}
