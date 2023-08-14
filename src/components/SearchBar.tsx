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
      className="w-full relative h-12 pl-5 bg-zinc-900 rounded-2xl justify-end items-center gap-4 inline-flex"
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
      <a
        className="absolute r-0 rounded-2xl font-bold bg-green-700 p-3"
        href="https://cors-anywhere.herokuapp.com/corsdemo"
        target="_blank"
        rel="noreferrer"
      >
        CORS
      </a>
    </form>
  );
}
