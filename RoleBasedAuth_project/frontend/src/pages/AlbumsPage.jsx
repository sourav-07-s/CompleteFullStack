import { useEffect, useState } from 'react';
import { ArrowLeft, Disc3, Music2, Play } from 'lucide-react';
import { api, getErrorMessage } from '../lib/api';
import { coverFor, idOf } from '../lib/helpers';
import MusicCard from '../components/MusicCard';

export default function AlbumsPage({ user, onNavigate, onPlay }) {
  const [albums, setAlbums] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(Boolean(user));
  const [error, setError] = useState('');
  const [detailLoading, setDetailLoading] = useState(false);

  const loadAlbums = async () => {
    if (!user) return;
    setLoading(true); setError('');
    try { const result = await api.getAlbums(); setAlbums(result.albums || []); }
    catch (err) { setError(getErrorMessage(err)); }
    finally { setLoading(false); }
  };
  useEffect(() => { loadAlbums(); }, [user]);

  const openAlbum = async (album) => {
    setSelected({ ...album, musics: [] }); setDetailLoading(true);
    try { const result = await api.getAlbum(idOf(album)); setSelected(result.album || album); }
    catch (err) { setError(getErrorMessage(err)); }
    finally { setDetailLoading(false); }
  };

  if (!user) return <main className="mx-auto max-w-4xl px-4 py-28 text-center"><Disc3 className="mx-auto text-violet-300" size={34} /><h1 className="mt-5 text-3xl font-black">Albums live inside your library.</h1><p className="mt-3 text-sm text-zinc-500">Sign in to browse published albums.</p><button onClick={() => onNavigate('/login')} className="mt-6 rounded-full bg-violet-600 px-6 py-3 text-xs font-bold">Sign in</button></main>;

  return <main className="mx-auto max-w-[1440px] px-4 pb-32 pt-10 sm:px-7 xl:px-10">
    {selected ? <>
      <button onClick={() => setSelected(null)} className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white"><ArrowLeft size={15} /> All albums</button>
      <div className="grid items-end gap-7 md:grid-cols-[240px_1fr]"><div className="aspect-square overflow-hidden rounded-[28px] border border-white/10 shadow-2xl shadow-violet-950/30"><img src={coverFor(albums.findIndex((a) => idOf(a) === idOf(selected)))} alt="Album artwork" className="h-full w-full object-cover" /></div><div className="pb-2"><p className="eyebrow">Album collection</p><h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-6xl">{selected.title}</h1><p className="mt-4 text-sm text-zinc-500">{selected.musics?.length || 0} tracks · Added by {selected.admin?.username || 'MusicFy admin'}</p><button onClick={() => selected.musics?.[0] && onPlay(selected.musics[0], selected.musics)} disabled={!selected.musics?.length} className="mt-7 inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 text-xs font-extrabold text-white transition hover:bg-violet-400 disabled:opacity-40"><Play size={15} fill="currentColor" /> Play album</button></div></div>
      <div className="mt-12 border-t border-white/[0.07] pt-7"><h2 className="text-lg font-extrabold">Tracks in this album</h2>{detailLoading ? <p className="py-12 text-center text-sm text-zinc-600">Loading album tracks...</p> : selected.musics?.length ? <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{selected.musics.map((track, index) => <MusicCard key={idOf(track)} music={track} index={index} onPlay={(item) => onPlay(item, selected.musics)} />)}</div> : <p className="mt-5 rounded-2xl bg-white/[0.03] p-8 text-center text-sm text-zinc-600">This album doesn't contain any tracks yet.</p>}</div>
    </> : <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">Curated collections</p><h1 className="page-title">The <span className="gradient-text">albums.</span></h1><p className="mt-3 text-sm text-zinc-500">Collections created by MusicFy admins.</p></div><div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs text-zinc-400">{albums.length} albums</div></div>
      {error && <p className="mt-6 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-3 text-xs text-red-300">{error}</p>}
      {loading ? <p className="py-24 text-center text-sm text-zinc-500">Loading albums...</p> : albums.length ? <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{albums.map((album, index) => <button key={idOf(album)} onClick={() => openAlbum(album)} className="group rounded-[22px] border border-white/[0.06] bg-[#11111a] p-3 text-left transition hover:-translate-y-1 hover:border-violet-400/25 hover:bg-[#171722]"><div className="relative aspect-square overflow-hidden rounded-2xl"><img src={coverFor(index)} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" /><span className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-violet-500 text-white opacity-0 shadow-xl transition group-hover:translate-y-0 group-hover:opacity-100"><Play size={16} fill="currentColor" /></span></div><h2 className="mt-3 truncate text-sm font-bold text-white">{album.title}</h2><p className="mt-1 flex items-center gap-1.5 text-[10px] text-zinc-500"><Music2 size={12} /> Open collection</p></button>)}</div> : <div className="mt-10 rounded-3xl border border-dashed border-white/10 py-20 text-center"><Disc3 className="mx-auto text-zinc-700" size={30} /><p className="mt-4 text-sm font-semibold text-zinc-300">No albums yet</p><p className="mt-2 text-xs text-zinc-600">Albums published by admins will appear here.</p></div>}
    </>}
  </main>;
}
