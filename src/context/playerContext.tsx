import { useState, createContext, useRef } from "react";
import { PlayerContextType, ChildrenType, IPodcastTrack, IPodcast } from "../types";
import { EMPTY_PODCAST, EMPTY_TRACK } from "../constants/appConstants";
import { dC } from "../utils/miscFunctions";

export const PlayerContext = createContext<PlayerContextType>({} as PlayerContextType);

type Props = {
  children: ChildrenType;
};

export function PlayerContextProvider({ children }: Props) {
  const [playingPodcast, setPlayingPodcast] = useState<IPodcast>(dC(EMPTY_PODCAST));
  const [loadingTrack, setLoadingTrack] = useState<boolean>(false);
  const [playingTrack, setPlayingTrack] = useState<IPodcastTrack>(dC(EMPTY_TRACK));
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef(null);
  return (
    <PlayerContext.Provider
      value={{
        playingPodcast,
        setPlayingPodcast,
        loadingTrack,
        setLoadingTrack,
        playingTrack,
        setPlayingTrack,
        isPlaying,
        setIsPlaying,
        audioRef,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
