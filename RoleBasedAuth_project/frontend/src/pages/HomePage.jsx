import { ArrowRight, AudioLines, Disc3, Headphones, LibraryBig, LockKeyhole, Music2, Sparkles, Waves } from 'lucide-react';
import MusicCard from '../components/MusicCard';
import { coverFor } from '../lib/helpers';

const features = [
  { icon: LibraryBig, title: 'Your music library', text: 'Browse the tracks and albums available in your MusicFy collection.' },
  { icon: AudioLines, title: 'A player that stays with you', text: 'Keep the music close while you explore the rest of the app.' },
  { icon: LockKeyhole, title: 'Built with roles in mind', text: 'A dedicated studio lets authorized admins publish music and albums.' },
];

export default function HomePage({ user, tracks, currentTrack, onNavigate, onPlay }) {
  return (
    <main className="pb-28">
      <section className="relative mx-auto max-w-[1440px] overflow-hidden px-4 pb-16 pt-12 sm:px-7 md:pt-16 xl:px-10">
        <div className="hero-orb pointer-events-none absolute -right-20 top-[-90px] h-[550px] w-[550px] rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-[16%] top-24 h-64 w-64 rounded-full border border-violet-300/[0.09]" />
        <div className="pointer-events-none absolute right-[12%] top-16 h-80 w-80 rounded-full border border-blue-300/[0.06]" />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.03fr_.97fr]">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-400/[0.07] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200"><Sparkles size={13} /> Your sound. Your space.</div>
            <h1 className="text-[clamp(3.4rem,7.2vw,6.7rem)] font-black leading-[.94] tracking-[-.075em] text-white">Find your <span className="gradient-text">frequency.</span></h1>
            <p className="mt-7 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">A little space for every kind of sound. Explore the collection, discover albums, and let the next track find you.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button onClick={() => onNavigate(user ? '/explore' : '/register')} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-black text-[#101018] transition hover:-translate-y-0.5 hover:bg-violet-100">{user ? 'Explore music' : 'Start listening'}<ArrowRight size={16} /></button>
              <button onClick={() => onNavigate('/albums')} className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-xs font-bold text-zinc-300 transition hover:bg-white/[0.08] hover:text-white">Browse albums</button>
            </div>
            <div className="mt-11 flex items-center gap-6 border-t border-white/[0.07] pt-6">
              <div><p className="text-xl font-black text-white">One place</p><p className="mt-1 text-[10px] text-zinc-600">For your music</p></div><div className="h-8 w-px bg-white/10" /><div><p className="text-xl font-black text-white">All moods</p><p className="mt-1 text-[10px] text-zinc-600">One collection</p></div><div className="h-8 w-px bg-white/10" /><div><p className="text-xl font-black text-white">Any moment</p><p className="mt-1 text-[10px] text-zinc-600">Press play</p></div>
            </div>
          </div>

          <div className="relative mx-auto h-[390px] w-full max-w-[550px] sm:h-[470px]">
            <div className="absolute left-[9%] top-[12%] h-[68%] w-[62%] rotate-[-8deg] overflow-hidden rounded-[32px] border border-white/10 bg-[#19152a] shadow-2xl shadow-violet-950/60">
              <img src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1100&q=90" className="h-full w-full object-cover opacity-85" alt="Starry evening" />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-violet-900/10" />
              <div className="absolute bottom-7 left-7"><p className="text-[9px] font-bold uppercase tracking-[.25em] text-violet-200">The late night edit</p><p className="mt-2 text-3xl font-black tracking-tight text-white">After hours.</p><p className="mt-1 text-xs text-white/60">For the in-between moments</p></div>
            </div>
            <div className="absolute right-[2%] top-[6%] h-20 w-20 rounded-[25px] border border-white/10 bg-linear-to-br from-fuchsia-500 to-indigo-600 p-4 shadow-xl shadow-fuchsia-950/40"><Waves className="h-full w-full" /></div>
            <div className="absolute bottom-[7%] right-[4%] w-[55%] rounded-[26px] border border-white/10 bg-[#151520]/90 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-5">
              <div className="flex items-center gap-3"><img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=220&q=80" alt="Concert" className="h-12 w-12 rounded-xl object-cover" /><div className="min-w-0"><p className="truncate text-xs font-bold">A moment in sound</p><p className="mt-1 text-[10px] text-zinc-500">Made for your mood</p></div><span className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-violet-500"><Music2 size={16} /></span></div>
              <div className="mt-4 flex h-8 items-end gap-1">{Array.from({ length: 34 }, (_, i) => <span key={i} className="wave-bar flex-1 rounded-full bg-linear-to-t from-blue-500 to-fuchsia-400" style={{ height: `${18 + ((i * 17 + 23) % 75)}%`, animationDelay: `${i * 35}ms` }} />)}</div>
            </div>
            <div className="absolute bottom-[21%] left-[1%] grid h-[76px] w-[76px] place-items-center rounded-full border border-white/10 bg-[#171521]/90 shadow-xl backdrop-blur"><Disc3 size={38} className="text-violet-300" /></div>
          </div>
        </div>
      </section>

      {user && tracks.length > 0 && <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-7 xl:px-10"><div className="mb-6 flex items-end justify-between"><div><p className="eyebrow">Straight from your library</p><h2 className="section-title">Recently added</h2></div><button onClick={() => onNavigate('/explore')} className="inline-flex items-center gap-2 text-xs font-bold text-violet-300 hover:text-white">View collection <ArrowRight size={15} /></button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">{tracks.slice(0, 6).map((track, index) => <MusicCard key={track._id || track.id} music={track} index={index} onPlay={onPlay} active={(track._id || track.id) === (currentTrack?._id || currentTrack?.id)} />)}</div></section>}

      <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-7 xl:px-10">
        <div className="mb-8 max-w-xl"><p className="eyebrow">A listening space, reimagined</p><h2 className="section-title">Made for the way <span className="gradient-text">you listen.</span></h2><p className="mt-3 text-sm leading-7 text-zinc-500">Everything you need to explore a curated music collection, without the clutter.</p></div>
        <div className="grid gap-3 md:grid-cols-3">{features.map(({ icon: Icon, title, text }, index) => <div key={title} className="feature-card rounded-[24px] border border-white/[0.07] bg-[#11111a] p-6 sm:p-7"><div className="mb-8 grid h-11 w-11 place-items-center rounded-2xl bg-linear-to-br from-violet-500/20 to-blue-500/10 text-violet-300"><Icon size={21} /></div><span className="text-[10px] font-bold tracking-[.2em] text-zinc-700">0{index + 1}</span><h3 className="mt-2 text-lg font-extrabold tracking-tight text-white">{title}</h3><p className="mt-2 max-w-xs text-xs leading-6 text-zinc-500">{text}</p></div>)}</div>
      </section>

      {!user && <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-7 xl:px-10"><div className="relative overflow-hidden rounded-[30px] border border-violet-300/15 bg-linear-to-r from-[#241541] via-[#171631] to-[#101c36] p-8 sm:p-12"><div className="absolute -right-10 -top-28 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[85px]" /><div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center"><div><p className="eyebrow text-violet-200">Your next favorite is waiting</p><h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl">Press play on something new.</h2><p className="mt-3 text-sm text-violet-100/55">Create your free account to access the music library.</p></div><button onClick={() => onNavigate('/register')} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-xs font-black text-[#11111a] transition hover:-translate-y-0.5">Create account <ArrowRight size={16} /></button></div></div></section>}
      <footer className="border-t border-white/[0.06] px-4 py-7 text-center text-[10px] text-zinc-700">© {new Date().getFullYear()} MusicFy. Made for music people.</footer>
    </main>
  );
}
