import usePlayer from "../hooks/usePlayer";
import { IPodcast } from "../types";
import LoadingTrack from "./LoadingTrack";

type PlayThumbnailProps = {
  podcast: IPodcast;
};

export default function PlayThumbnail({ podcast }: PlayThumbnailProps) {
  const { playingTrack, playingPodcast, isPlaying, play, pause, loadingTrack } = usePlayer();

  const handlePlayClic = () => {
    if (playingTrack.audio !== "") {
      if (playingPodcast.id !== podcast.id) {
        play({ track: podcast.tracks[0], podcast: podcast });
      } else {
        play();
      }
    }
  };

  const handlePauseClic = () => {
    pause();
  };

  return (
    <>
      <div className="w-full pt-[40%] relative rounded-md overflow-hidden mt-2">
        {podcast.imgBig !== "" ? (
          <img
            className="absolute object-cover -top-20 w-full"
            src={podcast.imgBig}
            alt={podcast.title}
          />
        ) : (
          <img className="bsolute object-cover top-0" src="/podcast.png" alt="Studio microphone" />
        )}
      </div>

      <div className="mt-2 mb-4 w-full">
        <div className="flex relative md:justify-center pl-16 md:pl-0">
          {loadingTrack && playingTrack.id !== "0" ? (
            <div className="absolute z-30 left-0 w-14 h-14 rounded-full justify-center items-center inline-flex">
              <LoadingTrack w={48} h={48}></LoadingTrack>
            </div>
          ) : isPlaying && playingPodcast.id === podcast.id ? (
            <button
              onClick={handlePauseClic}
              className="absolute z-30 left-0 w-14 h-14 rounded-full justify-center items-center inline-flex bg-indigo-500 sm:hover:bg-indigo-600"
            >
              <img className="w-5 h-5" src="/pause_1.svg" alt="Pause"></img>
            </button>
          ) : (
            <button
              onClick={handlePlayClic}
              className="absolute z-30 left-0 w-14 h-14 rounded-full justify-center items-center inline-flex bg-neutral-500 sm:hover:bg-neutral-600 duration-300"
            >
              <img className="w-5 h-5" src="/play_1.svg" alt="Play"></img>
            </button>
          )}

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold md:px-24 md:text-center">
            {podcast.title}
            <img className="inline ml-1 pb-1" src="/verify_1.svg" alt="Verify"></img>
          </h1>
        </div>
      </div>
    </>
  );
}
