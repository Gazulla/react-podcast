export interface PodcastType {
  id: number;
  title: string;
  authortName: string;
  date: string;
  img: string;
}

// Podcast context
export interface PodcastContextType {
  podcasts: PodcastType[];
  setPodcasts: (podcasts: PodcastType[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  playingPodcast: PodcastType;
  setPlayingPodcast: (playingPodcast: PodcastType) => void;
  isPlaying: boolean;
  setIsPlaying: (loading: boolean) => void;
}

// Children prop
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
export type ChildrenType = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
