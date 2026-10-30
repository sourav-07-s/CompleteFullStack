import {
  Headphones,
  Search,
  LogOut,
  Shield,
  Disc3,
  Compass,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { initials } from "../lib/helpers";

const navItems = [
  { label: "Home", route: "/", icon: Home },
  { label: "Explore", route: "/explore", icon: Compass },
  { label: "Albums", route: "/albums", icon: Disc3 },
];

export default function AppHeader({
  user,
  route,
  onNavigate,
  onLogout,
  search,
  setSearch,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = (path) => {
    onNavigate(path);
    setMobileOpen(false);
  };
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#09090f]/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-[78px] max-w-[1440px] items-center gap-5 px-4 sm:px-7 xl:px-10">
        <button
          onClick={() => navigate("/")}
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="MusicFy home"
        >
          <span className="grid h-10 w-10 place-items-center rounded-[14px] bg-linear-to-br from-fuchsia-500 via-violet-600 to-blue-500 shadow-lg shadow-violet-950/60 transition-transform group-hover:rotate-[-8deg]">
            <Headphones size={22} strokeWidth={2.5} />
          </span>
          <span className="text-[21px] font-black tracking-[-1.2px] text-white">
            Music<span className="text-violet-400">Fy</span>
          </span>
        </button>

        <nav className="ml-7 hidden items-center gap-1 lg:flex">
          {navItems.map(({ label, route: path, icon: Icon }) => {
            const active =
              path === "/" ? route === "/" : route.startsWith(path);
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition ${active ? "bg-white/[0.09] text-white" : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-100"}`}
              >
                <Icon size={15} />
                {label}
              </button>
            );
          })}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition ${route.startsWith("/admin") ? "bg-violet-500/15 text-violet-200" : "text-zinc-500 hover:text-white"}`}
            >
              <Shield size={15} />
              Studio
            </button>
          )}
        </nav>

        <div className="ml-auto hidden w-full max-w-[330px] items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.045] px-4 py-2.5 transition focus-within:border-violet-400/50 focus-within:bg-white/[0.07] md:flex">
          <Search size={17} className="shrink-0 text-zinc-500" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onFocus={() => route !== "/explore" && navigate("/explore")}
            placeholder="Search your music..."
            className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-zinc-600"
          />
       
        </div>

        {user ? (
          <div className="ml-auto flex items-center gap-2 md:ml-3">
            <div className="hidden text-right sm:block">
              <p className="max-w-32 truncate text-xs font-semibold text-white">
                {user.username}
              </p>
              <p className="text-[10px] capitalize text-zinc-500">
                {user.role} account
              </p>
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-full border border-violet-300/20 bg-linear-to-br from-violet-500/30 to-blue-500/20 text-xs font-bold text-violet-100">
              {initials(user.username)}
            </div>
            <button
              onClick={onLogout}
              title="Sign out"
              className="ml-1 grid h-9 w-9 place-items-center rounded-full text-zinc-500 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={17} />
            </button>
          </div>
        ) : (
          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <button
              onClick={() => navigate("/login")}
              className="rounded-full px-4 py-2.5 text-xs font-bold text-zinc-300 transition hover:text-white"
            >
              Sign in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-[#11111a] transition hover:-translate-y-0.5 hover:bg-violet-100"
            >
              Get started
            </button>
          </div>
        )}

        <button
          onClick={() => setMobileOpen((value) => !value)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-white/[0.06] text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-t border-white/[0.07] bg-[#0b0b13] px-4 py-3 lg:hidden">
          <div className="mb-2 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 md:hidden">
            <Search size={16} className="text-zinc-500" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your music..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          {navItems.map(({ label, route: path, icon: Icon }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-zinc-300 hover:bg-white/[0.06]"
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-violet-200 hover:bg-violet-500/10"
            >
              <Shield size={17} />
              Admin studio
            </button>
          )}
          {!user && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate("/login")}
                className="rounded-xl border border-white/10 py-3 text-sm"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="rounded-xl bg-violet-600 py-3 text-sm font-bold"
              >
                Create account
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
