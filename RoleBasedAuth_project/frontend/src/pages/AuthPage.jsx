import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, Headphones, LockKeyhole, Mail, Music2, UserRound } from 'lucide-react';
import { getErrorMessage } from '../lib/api';

export default function AuthPage({ mode, onNavigate, onAuthenticate }) {
  const isRegister = mode === 'register';
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = async (event) => {
    event.preventDefault(); setError(''); setSuccess(''); setLoading(true);
    try {
      await onAuthenticate(form);
      setSuccess(isRegister ? 'Your account is ready. Welcome to MusicFy!' : 'You are signed in. Let the music play.');
    } catch (err) { setError(getErrorMessage(err)); }
    finally { setLoading(false); }
  };

  return (
    <main className="relative mx-auto grid min-h-[calc(100vh-160px)] max-w-[1250px] items-center gap-10 px-4 py-12 md:grid-cols-[1fr_0.85fr] md:px-8 lg:gap-24">
      <div className="auth-glow pointer-events-none absolute left-[-140px] top-1/3 h-[400px] w-[400px] rounded-full bg-violet-700/15 blur-[110px]" />
      <section className="relative hidden md:block">
        <button onClick={() => onNavigate('/')} className="mb-12 inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 transition hover:text-white"><ArrowLeft size={14} /> Back to home</button>
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-400/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200"><Music2 size={13} /> A better way to listen</div>
        <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-[-2.5px] text-white lg:text-6xl">Every track has a <span className="gradient-text">place.</span><br />Every mood has a sound.</h1>
        <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">Find your next repeat, explore hand-picked albums, and keep your favorite sounds close.</p>
        <div className="relative mt-12 h-[250px] max-w-[500px]">
          <div className="absolute left-4 top-6 h-44 w-44 rotate-[-8deg] overflow-hidden rounded-[28px] border border-white/10 shadow-2xl shadow-violet-950/40"><img src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=700&q=85" alt="Night sky" className="h-full w-full object-cover" /></div>
          <div className="absolute left-36 top-0 h-48 w-48 rotate-[7deg] overflow-hidden rounded-[28px] border border-white/10 shadow-2xl shadow-blue-950/40"><img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&q=85" alt="Live music" className="h-full w-full object-cover" /></div>
          <div className="absolute bottom-0 left-60 grid h-16 w-16 rotate-12 place-items-center rounded-2xl border border-white/10 bg-linear-to-br from-fuchsia-500 to-blue-600 text-white shadow-xl"><Headphones size={28} /></div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-[440px] rounded-[30px] border border-white/[0.09] bg-[#11111a]/90 p-6 shadow-[0_25px_100px_rgba(0,0,0,.45)] sm:p-9">
        <div className="mb-8 flex items-center gap-3 md:hidden"><span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-fuchsia-500 to-blue-500"><Headphones size={21} /></span><span className="text-xl font-black">Music<span className="text-violet-400">Fy</span></span></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-violet-300">{isRegister ? 'Start your journey' : 'Welcome back'}</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-white">{isRegister ? 'Create account' : 'Sign in'}</h2>
        <p className="mt-2 text-xs leading-6 text-zinc-500">{isRegister ? 'Join MusicFy and make room for your next favorite.' : 'Your music library is only a sign-in away.'}</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {isRegister && <label className="field-label">Username<div className="field-wrap"><UserRound size={17} /><input autoComplete="username" required minLength={2} value={form.username} onChange={(e) => update('username', e.target.value)} placeholder="Your name" /></div></label>}
          {isRegister && <label className="field-label">Email address<div className="field-wrap"><Mail size={17} /><input type="email" autoComplete="email" required value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" /></div></label>}
          {!isRegister && <label className="field-label">Username or email<div className="field-wrap"><Mail size={17} /><input autoComplete="username" required value={form.username} onChange={(e) => update('username', e.target.value)} placeholder="Enter username or email" /></div></label>}
          <label className="field-label">Password<div className="field-wrap"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete={isRegister ? 'new-password' : 'current-password'} minLength={isRegister ? 6 : undefined} required value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="At least 6 characters" /><button type="button" onClick={() => setShowPassword((value) => !value)} className="text-zinc-600 transition hover:text-white" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
          {error && <p role="alert" className="rounded-xl border border-red-400/15 bg-red-400/[0.07] px-3 py-2.5 text-xs text-red-300">{error}</p>}
          {success && <p role="status" className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.07] px-3 py-2.5 text-xs text-emerald-300">{success}</p>}
          <button disabled={loading} className="group mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-950/40 transition hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-60">{loading ? 'Please wait...' : isRegister ? 'Create your account' : 'Sign in to MusicFy'}{!loading && <ArrowRight size={17} className="transition group-hover:translate-x-1" />}</button>
        </form>
        <p className="mt-7 text-center text-xs text-zinc-500">{isRegister ? 'Already part of the sound?' : 'New to MusicFy?'} <button onClick={() => onNavigate(isRegister ? '/login' : '/register')} className="font-bold text-violet-300 transition hover:text-white">{isRegister ? 'Sign in' : 'Create an account'}</button></p>
        <p className="mt-5 text-center text-[10px] leading-5 text-zinc-700">By continuing, you agree to use MusicFy responsibly.</p>
      </section>
    </main>
  );
}
