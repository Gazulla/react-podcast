import { useState, createContext } from "react";
import { PodcastContextType, ChildrenType, PodcastType } from "../types";
import { EMPTY_PODCAST } from "../constants/appConstants";

export const PodcastContext = createContext<PodcastContextType>({} as PodcastContextType);

type Props = {
  children: ChildrenType;
};

export function PodcastContextProvider({ children }: Props) {
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [playingPodcast, setPlayingPodcast] = useState<PodcastType>(EMPTY_PODCAST);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <PodcastContext.Provider
      value={{
        podcasts,
        setPodcasts,
        loading,
        setLoading,
        playingPodcast,
        setPlayingPodcast,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}
