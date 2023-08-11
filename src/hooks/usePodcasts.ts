import { useState } from "react";
import { MAX_NUM_PODCASTS_TO_FETCH } from "../constants/appConstants";
import { PodcastType } from "../types";

export default function usePodcasts() {
  const [podcasts, setPodcasts] = useState<PodcastType[]>();

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

  type GetPodcatsProps = {
    search: string;
  };

  const getPodcasts = async ({ search }: GetPodcatsProps) => {
    try {
      const result = await fetch(
        `https://itunes.apple.com/search?term=${search}&limit=${MAX_NUM_PODCASTS_TO_FETCH}&media=podcast&entity=podcast`
      );
      const data = await result.json();
      const podcasts: any = data.results.map((podcastRaw: any) => mapPodcast(podcastRaw));
      console.log(podcasts);
    } catch (error) {
      throw new Error("Error fetching Podcasts from the API.");
    }
  };

  return { podcasts, getPodcasts, setPodcasts };
}
