
import SearchBar from "./search-bar";
import { useState } from "react";


export default function navbar(){
     const [search, setSearch] = useState("");

    return(
        <>
        <nav className="sticky rounded-full mt-3 top-0 z-50 flex min-h-20 items-center justify-between gap-8 border-b border-white/10 bg-[#09090f]/90 px-[6%] text-white backdrop-blur-xl">

  {/* Logo */}
  <div className="flex shrink-0 items-center text-2xl font-extrabold tracking-tight">
    <span className="mr-0 flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-fuchsia-800 via-violet-900 to-blue-800 text-2xl font-black shadow-lg shadow-purple-500/20">
      M
    </span>
    usicFy
  </div>

  {/* Navigation Links */}
  <ul className="flex items-center gap-8">
    {["Home", "Explore", "Albums", "Artists", "About"].map((item) => (
      <li
        key={item}
        className="group relative cursor-pointer text-sm font-medium text-gray-400 transition-colors duration-300 hover:text-white"
      >
        {item}
        <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-linear-to-r from-fuchsia-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
      </li>
    ))}
  </ul>

  {/* Search Bar */}
  <div className="w-full max-w-xs">
    <SearchBar onSearch={setSearch} />
  </div>

 <div className="flex items-center gap-3">
  {/* Sign In */}
  <button
    className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5
    text-sm font-semibold text-gray-200 transition-all duration-300
    hover:border-purple-400/60 hover:bg-white/10 hover:text-white"
  >
    Sign In
  </button>

  {/* Sign Up */}
  <button
    className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600
    px-5 py-2.5 text-sm font-semibold text-white shadow-lg
    shadow-purple-500/20 transition-all duration-300
    hover:-translate-y-0.5 hover:from-purple-500 hover:to-blue-500
    hover:shadow-purple-500/40 active:translate-y-0"
  >
    Sign Up
  </button>
</div>

</nav>
        
        </>
    )

}