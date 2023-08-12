import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <header className="w-full max-w-3xl px-3 pt-7 pb-5 justify-start items-start gap-3.5 inline-flex">
      <SearchBar></SearchBar>
    </header>
  );
}
