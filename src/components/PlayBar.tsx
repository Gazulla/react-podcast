import { useEffect } from "react";
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

  const handleLoadStart = () => {
    setLoadingTrack(true);
  };

  const handleLoaded = () => {
    setLoadingTrack(false);
  };

  useEffect(() => {
    if (isPlaying) {
      var playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((_: any) => {
            return;
          })
          .catch((/*error: any*/) => {
            // Handle play() new media load request error
            // console.log(error);
          });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, audioRef, playingTrack]);

  return (
    <div className="fixed grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-6 justify-center place-items-center bg-zinc-900 w-full h-20 sm:h-28 bottom-0">
      <audio
        className="hidden"
        ref={audioRef}
        src={playingTrack.audio}
        onLoadedData={() => handleLoaded()}
        onLoadStart={() => handleLoadStart()}
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
        <ProgressionBar />
      </div>
      <div className="col-span-2 hidden lg:block">
        <VolumeControl />
      </div>
    </div>
  );
}
