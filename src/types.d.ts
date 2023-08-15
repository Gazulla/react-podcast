export interface IPodcastTrack {
  id: string;
  title: string;
  date: string;
  img: string;
  audio: string;
  duration: string;
  authorName: string;
  description: string;
}

export interface IPodcast {
  id: string;
  title: string;
  authorName: string;
  description: string;
  imgSmall: string;
  imgBig: string;
  date: string;
  feedUrl: string;
  tracks: IPodcastTrack[];
}

// Podcast context
export interface PodcastContextType {
  podcasts: IPodcast[];
  setPodcasts: (podcasts: IPodcast[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isFirstTime: MutableRefObject<boolean>;
}

// Player context
export interface PlayerContextType {
  playingPodcast: IPodcast;
  setPlayingPodcast: (playingPodcast: IPodcast) => void;
  loadingTrack: boolean;
  setLoadingTrack: (loadingTrack: boolean) => void;
  playingTrack: IPodcastTrack;
  setPlayingTrack: (playingTrack: IPodcastTrack) => void;
  isPlaying: boolean;
  setIsPlaying: (loading: boolean) => void;
  audioRef: MutableRefObject<HTMLAudioElement>;
}

export interface FiltersType {
  sort: string;
  word: string;
}

// Children prop
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
export type ChildrenType = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
