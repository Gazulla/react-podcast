import { useState, createContext, useRef } from "react";
import { PodcastContextType, ChildrenType, IPodcast, IPodcastTrack } from "../types";
import { EMPTY_TRACK } from "../constants/appConstants";
import { dC } from "../utils/miscFunctions";

export const PodcastContext = createContext<PodcastContextType>({} as PodcastContextType);

type Props = {
  children: ChildrenType;
};

export function PodcastContextProvider({ children }: Props) {
  const [podcasts, setPodcasts] = useState<IPodcast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [playingTrack, setPlayingTrack] = useState<IPodcastTrack>(dC(EMPTY_TRACK));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isFirstTime = useRef<boolean>(true);

  return (
    <PodcastContext.Provider
      value={{
        podcasts,
        setPodcasts,
        loading,
        setLoading,
        playingTrack,
        setPlayingTrack,
        isPlaying,
        setIsPlaying,
        isFirstTime,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}
