
import { useState } from "react";
import { Search, X } from "lucide-react";


export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch?.("");
  };

  return (
    <div className="w-full max-w-xl">
      <div className="group flex items-center gap-3 rounded-full
        border border-white/10 bg-[#171721] px-5 py-3
        transition-all duration-300
        hover:border-white/20
        focus-within:border-purple-500
        focus-within:ring-2 focus-within:ring-purple-500/20">

        <Search
          size={21}
          className="shrink-0 text-gray-400 transition-colors
          group-focus-within:text-purple-400"
        />

        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="What do you want to listen to?"
          aria-label="Search music"
          className="w-full bg-transparent text-sm text-white
          placeholder:text-gray-500 outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="shrink-0 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
