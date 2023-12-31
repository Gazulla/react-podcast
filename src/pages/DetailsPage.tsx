import { Link, useParams } from "react-router-dom";
import usePodcasts from "../hooks/usePodcasts";
import { useEffect, useState } from "react";
import { IPodcast } from "../types";
import { EMPTY_PODCAST } from "../constants/appConstants";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import PlayThumbnail from "../components/PlayThumbnail";
import Loading from "../components/Loading";
import ListTracks from "../components/ListTracks";
import { dC } from "../utils/miscFunctions";

export default function Details() {
  const { id } = useParams<{ id: string }>();
  const { getPodcastDetails, loading } = usePodcasts();
  const [podcast, setPodcast] = useState<IPodcast>(dC(EMPTY_PODCAST));

  useEffect(() => {
    const getDetails = async () => {
      const newPodcastDetails = await getPodcastDetails({ id: podcastId });
      setPodcast(newPodcastDetails);
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
        ) : podcast.id === "0" ? null : (
          <>
            <PlayThumbnail podcast={podcast}></PlayThumbnail>
            <ListTracks podcast={podcast} />
          </>
        )}
      </main>
    </>
  );
}
