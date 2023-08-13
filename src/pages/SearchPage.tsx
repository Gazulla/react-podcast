import Header from "../components/Header";
import ListPodcasts from "../components/ListPodcast";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import usePodcasts from "../hooks/usePodcasts";

export default function Search() {
  const { podcasts, loading, isFirstTime } = usePodcasts();
  return (
    <>
      <Header>
        <SearchBar></SearchBar>
      </Header>
      <main className="w-full max-w-5xl px-3">
        {isFirstTime ? null : loading ? <Loading></Loading> : <ListPodcasts podcasts={podcasts} />}
      </main>
    </>
  );
}
