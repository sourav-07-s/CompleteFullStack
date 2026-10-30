import { useEffect, useRef, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat2, X } from 'lucide-react';
import { formatTime } from '../lib/helpers';

export default function AudioPlayer({ track, queue, onTrackChange, onClose }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.78);
  const [muted, setMuted] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    setCurrent(0);
    setPlaying(false);
    const audio = audioRef.current;
    if (!audio || !track?.uri) return;
    audio.load();
    const attempt = audio.play();
    if (attempt?.then) attempt.then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [track?.uri]);

  useEffect(() => { if (audioRef.current) audioRef.current.volume = muted ? 0 : volume; }, [volume, muted]);

  const step = (direction) => {
    if (!queue?.length || !track) return;
    const index = queue.findIndex((item) => (item._id || item.id) === (track._id || track.id));
    let nextIndex = shuffle ? Math.floor(Math.random() * queue.length) : (index + direction + queue.length) % queue.length;
    if (nextIndex === index && queue.length > 1) nextIndex = (nextIndex + 1) % queue.length;
    onTrackChange(queue[nextIndex]);
  };
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { try { await audio.play(); setPlaying(true); } catch { setPlaying(false); } }
    else { audio.pause(); setPlaying(false); }
  };

  return (
    <>
      <audio ref={audioRef} src={track?.uri || ''} onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)} onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)} onEnded={() => repeat ? audioRef.current?.play() : step(1)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.09] bg-[#0e0e17]/95 shadow-[0_-18px_60px_rgba(0,0,0,.35)] backdrop-blur-2xl">
        <div className="mx-auto flex h-[82px] max-w-[1440px] items-center gap-4 px-4 sm:px-7 xl:px-10">
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:max-w-[290px]">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-violet-600 to-blue-600 text-white"><span className="text-lg">♫</span></div>
            <div className="min-w-0"><p className="truncate text-xs font-bold text-white">{track?.title}</p><p className="mt-1 truncate text-[10px] text-zinc-500">{track?.admin?.username || 'MusicFy library'}</p></div>
            <button onClick={onClose} className="ml-auto hidden text-zinc-600 hover:text-white sm:block" title="Close player"><X size={15} /></button>
          </div>
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="flex items-center gap-4 text-zinc-500">
              <button onClick={() => setShuffle((value) => !value)} className={shuffle ? 'text-violet-300' : 'hover:text-white'} title="Shuffle"><Shuffle size={15} /></button>
              <button onClick={() => step(-1)} className="hover:text-white" title="Previous"><SkipBack size={17} fill="currentColor" /></button>
              <button onClick={togglePlay} className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#101018] transition hover:scale-105 hover:bg-violet-100" title={playing ? 'Pause' : 'Play'}>{playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" className="ml-0.5" />}</button>
              <button onClick={() => step(1)} className="hover:text-white" title="Next"><SkipForward size={17} fill="currentColor" /></button>
              <button onClick={() => setRepeat((value) => !value)} className={repeat ? 'text-violet-300' : 'hover:text-white'} title="Repeat"><Repeat2 size={15} /></button>
            </div>
            <div className="hidden w-full max-w-[500px] items-center gap-2.5 sm:flex"><span className="w-8 text-right text-[9px] tabular-nums text-zinc-600">{formatTime(current)}</span><input aria-label="Playback position" type="range" min="0" max={duration || 100} value={Math.min(current, duration || 100)} onChange={(event) => { const value = Number(event.target.value); setCurrent(value); if (audioRef.current) audioRef.current.currentTime = value; }} className="music-range h-1 w-full cursor-pointer" /><span className="w-8 text-[9px] tabular-nums text-zinc-600">{formatTime(duration)}</span></div>
          </div>
          <div className="hidden w-[150px] items-center justify-end gap-2.5 md:flex"><button onClick={() => setMuted((value) => !value)} className="text-zinc-500 hover:text-white">{muted || volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}</button><input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => { setVolume(Number(event.target.value)); setMuted(false); }} className="music-range h-1 w-24 cursor-pointer" /></div>
        </div>
      </div>
    </>
  );
}
