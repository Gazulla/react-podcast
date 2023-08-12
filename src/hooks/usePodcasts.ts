import { useContext } from "react";
import { MAX_NUM_PODCASTS_TO_FETCH } from "../constants/appConstants";
import { PodcastType } from "../types";
import { PodcastContext } from "../context/podcastContext";

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

  const mapPodcast = (podcastRaw: any) => {
    return {
      id: podcastRaw.trackId,
      title: podcastRaw.trackName,
      authortName: podcastRaw.artistName,
      date: podcastRaw.releaseDate,
      img:
        podcastRaw.artworkUrl100 ||
        podcastRaw.artworkUrl60 ||
        podcastRaw.artworkUrl30 ||
        podcastRaw.artworkUrl600,
    };
  };

  type GetPodcatsProps = { search: string };

  const getPodcasts = async ({ search }: GetPodcatsProps) => {
    if (search === "") {
      return;
    }
    isFirstTime.current = false;
    setLoading(true);
    try {
      const result = await fetch(
        `https://itunes.apple.com/search?term=${search}&limit=${MAX_NUM_PODCASTS_TO_FETCH}&media=podcast&entity=podcast`
      );
      const data = await result.json();
      const newPodcasts: PodcastType[] = data.results.map((podcastRaw: any) =>
        mapPodcast(podcastRaw)
      );
      setPodcasts(newPodcasts);
    } catch (error) {
      throw new Error("Error fetching Podcasts from the API.");
    } finally {
      setLoading(false);
    }
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
  };
}
