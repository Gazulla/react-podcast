import { useContext } from "react";
import { IPodcast, IPodcastTrack } from "../types";
import { PlayerContext } from "../context/playerContext";
import { dC } from "../utils/miscFunctions";

export default function usePlayer() {
  const {
    playingPodcast,
    setPlayingPodcast,
    isPlaying,
    setIsPlaying,
    playingTrack,
    setPlayingTrack,
    audioRef,
    loadingTrack,
    setLoadingTrack,
    replay,
    setReplay,
    shuffle,
    setShuffle,
  } = useContext(PlayerContext);

  type PlayProps = {
    track: IPodcastTrack;
    podcast: IPodcast;
  };

  const play = async (
    { track, podcast }: PlayProps = { track: playingTrack, podcast: playingPodcast }
  ) => {
    playingPodcast.id !== podcast.id && setPlayingPodcast(dC(podcast));
    track.id !== playingTrack.id && setPlayingTrack(dC(track));
    setIsPlaying(true);
  };

  const pause = async () => {
    if (!audioRef.current.paused && isPlaying && !loadingTrack) {
      setIsPlaying(false);
    }
  };

  const previousTrack = () => {
    if (playingTrack.id !== "0" && !loadingTrack) {
      const currIndex = playingPodcast.tracks.findIndex((t: IPodcastTrack) => {
        return t.id === playingTrack.id;
      });
      if (currIndex <= 0) {
        setPlayingTrack(dC(playingPodcast.tracks[playingPodcast.tracks.length - 1]));
        window.scrollTo(0, document.body.scrollHeight);
      } else {
        setPlayingTrack(dC(playingPodcast.tracks[currIndex - 1]));
      }
      !isPlaying && setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (playingTrack.id !== "0" && !loadingTrack) {
      const currIndex = playingPodcast.tracks.findIndex((t: IPodcastTrack) => {
        return t.id === playingTrack.id;
      });
      if (currIndex >= playingPodcast.tracks.length - 1) {
        setPlayingTrack(dC(playingPodcast.tracks[0]));
        window.scrollTo(0, 0);
      } else {
        setPlayingTrack(dC(playingPodcast.tracks[currIndex + 1]));
      }
      !isPlaying && setIsPlaying(true);
    }
  };

  const switchReplayTrack = () => {
    setReplay(!replay);
  };

  const switchShuffleTrack = () => {
    setShuffle(!shuffle);
  };

  const randomTrack = () => {
    const trackIndex = Math.floor(Math.random() * playingPodcast.tracks.length);
    setPlayingTrack(dC(playingPodcast.tracks[trackIndex]));
  };

  const replayTrack = () => {
    setPlayingTrack(dC(playingTrack));
  };

  return {
    isPlaying,
    playingPodcast,
    playingTrack,
    play,
    pause,
    audioRef,
    loadingTrack,
    setLoadingTrack,
    previousTrack,
    nextTrack,
    replay,
    switchReplayTrack,
    shuffle,
    switchShuffleTrack,
    replayTrack,
    randomTrack,
  };
}
