import { useState, createContext, useRef } from "react";
import { PodcastContextType, ChildrenType, IPodcast } from "../types";

export const PodcastContext = createContext<PodcastContextType>({} as PodcastContextType);

type Props = {
  children: ChildrenType;
};

export function PodcastContextProvider({ children }: Props) {
  const [podcasts, setPodcasts] = useState<IPodcast[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isFirstTime = useRef<boolean>(true);

  return (
    <PodcastContext.Provider
      value={{
        podcasts,
        setPodcasts,
        loading,
        setLoading,
        isFirstTime,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}
