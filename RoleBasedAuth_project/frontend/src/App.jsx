import { useCallback, useEffect, useState } from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";
import AppHeader from "./components/AppHeader";
import AudioPlayer from "./components/AudioPlayer";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import AlbumsPage from "./pages/AlbumsPage";
import AdminPage from "./pages/AdminPage";
import { api, getErrorMessage } from "./lib/api";

function readRoute() {
  const value = window.location.hash.replace(/^#/, "") || "/";
  return value.startsWith("/") ? value : `/${value}`;
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("musicfy:user") || "null");
    } catch {
      return null;
    }
  });
  const [tracks, setTracks] = useState([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState("");
  const [search, setSearch] = useState("");
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [checkingSession, setCheckingSession] = useState(Boolean(user));

  const navigate = useCallback(
    (path) => {
      if (path === route) return;
      window.location.hash = path;
    },
    [route],
  );

  useEffect(() => {
    const syncRoute = () => setRoute(readRoute());
    window.addEventListener("hashchange", syncRoute);
    if (!window.location.hash) window.location.hash = "/";
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  const loadLibrary = useCallback(async ({ quiet = false } = {}) => {
    if (!quiet) setLibraryLoading(true);
    setLibraryError("");
    try {
      const result = await api.getMusic();
      const nextTracks = Array.isArray(result.musics) ? result.musics : [];
      setTracks(nextTracks);
      return nextTracks;
    } catch (error) {
      setLibraryError(getErrorMessage(error));
      throw error;
    } finally {
      setLibraryLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    if (!user) {
      setCheckingSession(false);
      return undefined;
    }
    setCheckingSession(true);
    api
      .getMusic()
      .then((result) => {
        if (!active) return;
        setTracks(Array.isArray(result.musics) ? result.musics : []);
        setLibraryError("");
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
        setTracks([]);
        localStorage.removeItem("musicfy:user");
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });
    return () => {
      active = false;
    };
  }, []); // Validate the stored UI identity against the protected backend route once on startup.

  const authenticate = async (form) => {
    const result =
      route === "/register"
        ? await api.register({
            username: form.username.trim(),
            email: form.email.trim(),
            password: form.password,
          })
        : await api.login(form.username.trim(), form.password);
    const raw = result.user || {};
    const nextUser = {
      id: raw.id || raw._id,
      username: raw.username || form.username,
      email: raw.email || raw.emial || form.email || "",
      role: raw.role || "user",
    };


    setUser(nextUser);
    localStorage.setItem("musicfy:user", JSON.stringify(nextUser));
   try {
  await loadLibrary({ quiet: true });
} catch (error) {
  console.error("Failed to load music library:", error);
  // Authentication succeeded; library loading can be retried.
}
    navigate(nextUser.role === "admin" ? "/admin" : "/explore");
  };

  const logout = async () => {
   try {
    await api.logout();
  } catch (error) {
    console.error("Logout request failed:", error);
  } finally {
    setUser(null);
    setTracks([]);
    setCurrentTrack(null);
    setQueue([]);
    localStorage.removeItem("musicfy:user");
    navigate("/");
  }
  };

  const playTrack = (track, nextQueue = tracks) => {
    if (!track?.uri) {
      setLibraryError("This track does not have a playable audio URL.");
      return;
    }
    setQueue(nextQueue?.length ? nextQueue : [track]);
    setCurrentTrack(track);
    setLibraryError("");
  };

  const isAuthRoute = route === "/login" || route === "/register";
  const renderContent = () => {
    if (checkingSession)
      return (
        <div className="grid min-h-[65vh] place-items-center">
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <LoaderCircle size={18} className="animate-spin text-violet-300" />{" "}
            Restoring your MusicFy session...
          </div>
        </div>
      );
    if (isAuthRoute)
      return (
        <AuthPage
          key={route}
          mode={route.slice(1)}
          onNavigate={navigate}
          onAuthenticate={authenticate}
        />
      );
    if (route.startsWith("/admin")) {
      if (!user)
        return (
          <AuthPage
            key="login-admin"
            mode="login"
            onNavigate={navigate}
            onAuthenticate={authenticate}
          />
        );
      return (
        <AdminPage
          route={route}
          user={user}
          tracks={tracks}
          onNavigate={navigate}
          onDataChanged={() => loadLibrary({ quiet: true })}
        />
      );
    }
    if (route.startsWith("/explore"))
      return (
        <ExplorePage
          user={user}
          tracks={tracks}
          search={search}
          setSearch={setSearch}
          onPlay={playTrack}
          onNavigate={navigate}
          loading={libraryLoading}
        />
      );
    if (route.startsWith("/albums"))
      return (
        <AlbumsPage user={user} onNavigate={navigate} onPlay={playTrack} />
      );
    return (
      <HomePage
        user={user}
        tracks={tracks}
        currentTrack={currentTrack}
        onNavigate={navigate}
        onPlay={playTrack}
      />
    );
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#09090f] text-white">
      <AppHeader
        user={user}
        route={route}
        onNavigate={navigate}
        onLogout={logout}
        search={search}
        setSearch={setSearch}
      />
      {libraryError && user && !route.startsWith("/admin") && (
        <div className="mx-auto mt-4 flex max-w-[1440px] items-center gap-2 px-4 text-xs text-amber-300 sm:px-7 xl:px-10">
          <AlertCircle size={14} />
          {libraryError}
          <button
            onClick={() => loadLibrary({ quiet: true }).catch(() => {})}
            className="ml-2 font-bold underline underline-offset-2"
          >
            Retry
          </button>
          <button
            onClick={() => setLibraryError("")}
            className="ml-auto text-zinc-600 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}
      {renderContent()}
      {currentTrack && (
        <AudioPlayer
          track={currentTrack}
          queue={queue.length ? queue : tracks}
          onTrackChange={setCurrentTrack}
          onClose={() => setCurrentTrack(null)}
        />
      )}
    </div>
  );
}
