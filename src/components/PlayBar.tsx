import { useEffect, useRef, useState, useCallback } from "react";
import usePlayer from "../hooks/usePlayer";
import PlayControls from "./PlayControls";
import ProgressionBar from "./ProgressionBar";
import VolumeControl from "./VolumeControl";

export default function PlayBar() {
  const {
    playingTrack,
    isPlaying,
    play,
    pause,
    audioRef,
    loadingTrack,
    setLoadingTrack,
    previousTrack,
    nextTrack,
  } = usePlayer();

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const playAnimationRef = useRef<number>(0);

  const handleLoadStart = () => {
    setLoadingTrack(true);
  };

  const handleLoaded = () => {
    setLoadingTrack(false);
  };

  const handleLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    if (progressBarRef.current !== null) {
      progressBarRef.current.max = seconds;
    }
  };

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    if (progressBarRef.current !== null) {
      progressBarRef.current.value = currentTime;
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      var playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then((_: any) => {
            playAnimationRef.current = requestAnimationFrame(repeat);
          })
          .catch((/*error: any*/) => {
            // Handle play() new media load request error
            // console.log(error);
          });
      }
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, audioRef, playingTrack, repeat]);

  return (
    <div className="fixed grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-6 justify-center place-items-center bg-zinc-900 w-full h-20 sm:h-28 bottom-0">
      <audio
        className="hidden"
        ref={audioRef}
        src={playingTrack.audio}
        onLoadedData={() => handleLoaded()}
        onLoadStart={() => handleLoadStart()}
        onLoadedMetadata={() => handleLoadedMetadata()}
        onEnded={() => nextTrack()}
        preload="none"
      />
      <div className="hidden sm:flex col-span-3 lg:col-span-4 gap-4 justify-betweeen place-items-center w-full">
        {playingTrack.img !== "" ? (
          <img
            className="w-28 h-28 left-0 top-0"
            alt={playingTrack.title}
            src={playingTrack.img}
          ></img>
        ) : (
          <img className="w-28 h-28 left-0 top-0" alt={playingTrack.title} src="/grey.png"></img>
        )}

        <div className="table table-fixed w-full h-full">
          <div className="table-row">
            <div className="text-white text-base font-medium whitespace-nowrap overflow-hidden overflow-ellipsis table-cell">
              {playingTrack.title}
            </div>
          </div>
          <div className="table-row">
            <div className="text-neutral-500 text-base font-medium whitespace-nowrap overflow-hidden overflow-ellipsis table-cel">
              {playingTrack.authorName}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <PlayControls
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          playingTrack={playingTrack}
          loadingTrack={loadingTrack}
          previousTrack={previousTrack}
          nextTrack={nextTrack}
        ></PlayControls>
      </div>
      <div className="col-span-3 lg:col-span-3 w-full hidden lg:block">
        <ProgressionBar
          audioRef={audioRef}
          progressBarRef={progressBarRef}
          timeProgress={timeProgress}
          duration={duration}
        />
      </div>
      <div className="col-span-2 hidden lg:block">
        <VolumeControl />
      </div>
    </div>
  );
}
