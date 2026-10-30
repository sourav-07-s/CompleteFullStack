import { Play, Music2 } from "lucide-react";
import { coverFor, idOf } from "../lib/helpers";

export default function MusicCard({
  music,
  index = 0,
  onPlay,
  compact = false,
  active = false,
}) {
  const title = music?.title || "Untitled track";
  const artist =
    music?.admin?.username || music?.admin?.email || "MusicFy creator";
  return (
    <article
      className={`music-card group min-w-0 rounded-2xl border border-white/[0.055] bg-[#11111a] p-3 transition duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-[#171722] ${active ? "border-violet-400/30 bg-violet-500/[0.07]" : ""}`}
    >
      <button
        onClick={() => onPlay?.(music)}
        className="cover-wrap relative block w-full overflow-hidden rounded-xl bg-linear-to-br from-violet-900 to-indigo-950 text-left"
        aria-label={`Play ${title}`}
      >
        <img
          src={coverFor(index)}
          alt=""
          className={`aspect-square w-full object-cover transition duration-700 group-hover:scale-105 ${compact ? "max-h-40" : ""}`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-white/[0.03]" />
        <span className="absolute bottom-3 right-3 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-violet-500 text-white opacity-0 shadow-xl shadow-violet-950/50 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Play size={18} fill="currentColor" />
        </span>
        {active && (
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-violet-200">
            Now playing
          </span>
        )}
      </button>
      <div className="flex items-start justify-between gap-2 px-0.5 pt-3">
        <div className="min-w-0">
          <h3 className="truncate text-[13px] font-bold text-zinc-100">
            {title}
          </h3>
          <p className="mt-1 truncate text-[11px] text-zinc-500">{artist}</p>
        </div>
        <button
          onClick={() => onPlay?.(music)}
          className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-zinc-500 transition hover:bg-white/10 hover:text-white"
          aria-label="Play track"
        >
          <Music2 size={15} />
        </button>
      </div>
    </article>
  );
}
