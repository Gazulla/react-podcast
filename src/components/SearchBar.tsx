import { useState } from "react";
import usePodcasts from "../hooks/usePodcasts";

export default function SearchBar() {
  const { getPodcasts } = usePodcasts();
  const [search, setSearch] = useState<string>("");

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    getPodcasts({ search });
    setSearch("");
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  return (
    <form
      onSubmit={(e) => handleSearchSubmit(e)}
      className="w-full h-12 pl-5 bg-zinc-900 rounded-2xl justify-start items-center gap-4 inline-flex"
    >
      <button type="submit" className="w-5 h-5">
        <img src="/search_1.svg" alt="Search"></img>
      </button>
      <input
        className="text-white text-opacity-90 text-base font-normal bg-transparent w-full pr-4"
        placeholder="Podcast"
        type="text"
        onChange={(e) => handleSearchChange(e.target.value)}
        value={search}
      ></input>
    </form>
  );
}
