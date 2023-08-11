import { useState } from "react";
import usePodcasts from "../hooks/usePodcasts";

export default function SearchBar() {
  const { getPodcasts } = usePodcasts();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    getPodcasts({ search });
  };

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
  };

  return (
    <form>
      <input
        type="search"
        onChange={(e) => handleSearchChange(e.target.value)}
        value={search}
      ></input>
      <button type="submit" onClick={(e) => handleSearchSubmit(e)}>
        Buscar
      </button>
    </form>
  );
}
