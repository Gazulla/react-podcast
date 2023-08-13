import ListPodcasts from "../components/ListPodcast";
import usePodcasts from "../hooks/usePodcasts";

export default function Search() {
  const { podcasts, loading, isFirstTime } = usePodcasts();
  return isFirstTime ? null : loading ? <div>Loading</div> : <ListPodcasts podcasts={podcasts} />;
}
