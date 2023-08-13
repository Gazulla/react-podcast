import { Link, useParams } from "react-router-dom";
import usePodcasts from "../hooks/usePodcasts";
import { useEffect, useState } from "react";
import { PodcastDetails } from "../types";
import { EMPTY_PODCAST } from "../constants/appConstants";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ListRelatedPodcasts from "../components/ListRelatedPodcasts";
import PlayThumbnail from "../components/PlayThumbnail";
import Loading from "../components/Loading";

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const { getPodcastDetails, loading } = usePodcasts();
  const [podcastDetails, setPodcastDetails] = useState<PodcastDetails>({
    podcast: EMPTY_PODCAST,
    authorPodcasts: [],
  });

  useEffect(() => {
    const getDetails = async () => {
      const newPodcastDetails = await getPodcastDetails({ id: podcastId });
      setPodcastDetails(newPodcastDetails);
    };
    const podcastId = id || "";
    podcastId !== "" && getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {/* Header (Search Bar + Back Button) */}
      <Header>
        <Link
          to="/"
          className="w-12 h-12 px-1 bg-zinc-900 rounded-2xl justify-center items-center gap-2.5 inline-flex"
        >
          <img className="w-5 h-5" src="/arrow_left.svg" alt="Pause"></img>
        </Link>
        <SearchBar></SearchBar>
      </Header>

      <main className="w-full max-w-5xl px-3">
        {loading ? (
          <Loading></Loading>
        ) : podcastDetails.podcast.id === 0 ? null : (
          <>
            <PlayThumbnail podcast={podcastDetails.podcast}></PlayThumbnail>
            <ListRelatedPodcasts
              podcasts={podcastDetails.authorPodcasts.filter(
                (pc) => pc.id !== podcastDetails.podcast.id
              )}
            />
          </>
        )}
      </main>
    </>
  );
}
