import { useState, createContext } from "react";
import { PodcastContextType, ChildrenType, PodcastType } from "../types";

export const PodcastContext = createContext<PodcastContextType>({} as PodcastContextType);

type Props = {
  children: ChildrenType;
};

export function PodcastContextProvider({ children }: Props) {
  const [podcasts, setPodcasts] = useState<PodcastType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <PodcastContext.Provider value={{ podcasts, setPodcasts, loading, setLoading }}>
      {children}
    </PodcastContext.Provider>
  );
}
