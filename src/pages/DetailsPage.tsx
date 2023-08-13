import { useParams } from "react-router-dom";
import usePodcasts from "../hooks/usePodcasts";
import { useEffect, useState } from "react";
import { PodcastDetails } from "../types";
import { EMPTY_PODCAST } from "../constants/appConstants";

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

  return loading ? (
    <div>Loading</div>
  ) : podcastDetails.podcast.id === 0 ? (
    <div>Resource not found.</div>
  ) : (
    <div>
      <div>{podcastDetails.podcast.title}</div>
    </div>
  );
}
