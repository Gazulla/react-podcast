import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IPodcast, IPodcastTrack } from "../types";
import { PodcastContext } from "../context/podcastContext";
import { getPodcastById, getPodcastsBySearch } from "../services/podcast";

export default function usePodcasts() {
  const {
    podcasts,
    setPodcasts,
    loading,
    setLoading,
    isPlaying,
    setIsPlaying,
    playingTrack,
    setPlayingTrack,
    isFirstTime,
  } = useContext(PodcastContext);

  const navigate = useNavigate();

  type GetPodcatsDetailsProps = { id: string };

  const getPodcastDetails = async ({ id }: GetPodcatsDetailsProps) => {
    setLoading(true);
    const podcast = await getPodcastById({ id: id });
    setLoading(false);
    return podcast;
  };

  type GetPodcatsProps = { search: string };

  const getPodcasts = async ({ search }: GetPodcatsProps) => {
    if (search.trim() === "") {
      return;
    }
    navigate("/");
    isFirstTime.current = false;
    setLoading(true);
    const newPodcasts: IPodcast[] = await getPodcastsBySearch({ search });
    setLoading(false);
    setPodcasts(newPodcasts);
  };

  const switchPlaying = () => {
    playingTrack.id !== "0" && setIsPlaying(!isPlaying);
  };

  type SwapPlayingTrackProps = { newTrack: IPodcastTrack };

  const swapPlayingTrack = ({ newTrack }: SwapPlayingTrackProps) => {
    setPlayingTrack(newTrack);
    setIsPlaying(true);
  };

  return {
    podcasts,
    getPodcasts,
    loading,
    isPlaying,
    switchPlaying,
    playingTrack,
    swapPlayingTrack,
    isFirstTime: isFirstTime.current,
    getPodcastDetails,
  };
}
