import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PodcastType } from "../types";
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
    playingPodcast,
    setPlayingPodcast,
    isFirstTime,
  } = useContext(PodcastContext);
  const navigate = useNavigate();

  type GetPodcatsDetailsProps = { id: string };
  const getPodcastDetails = async ({ id }: GetPodcatsDetailsProps) => {
    setLoading(true);
    const podcast: PodcastType = await getPodcastById({ id: id });
    let authorPodcasts = [];
    if (podcast.id !== 0) {
      authorPodcasts = await getPodcastsBySearch({ search: podcast.authortName });
    }
    setLoading(false);
    return { podcast, authorPodcasts };
  };

  type GetPodcatsProps = { search: string };
  const getPodcasts = async ({ search }: GetPodcatsProps) => {
    if (search.trim() === "") {
      return;
    }
    navigate("/");
    isFirstTime.current = false;
    setLoading(true);
    const newPodcasts: PodcastType[] = await getPodcastsBySearch({ search });
    setLoading(false);
    setPodcasts(newPodcasts);
  };

  const switchPlaying = () => {
    playingPodcast.id !== 0 && setIsPlaying(!isPlaying);
  };

  type SwapPodcastProps = { newPodcast: PodcastType };
  const swapPlayingPodcast = ({ newPodcast }: SwapPodcastProps) => {
    setPlayingPodcast(newPodcast);
    setIsPlaying(true);
  };

  return {
    podcasts,
    getPodcasts,
    loading,
    isPlaying,
    switchPlaying,
    playingPodcast,
    swapPlayingPodcast,
    isFirstTime: isFirstTime.current,
    getPodcastDetails,
  };
}
