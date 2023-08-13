import usePodcasts from "../hooks/usePodcasts";
import { PodcastType } from "../types";

type PlayThumbnailProps = {
  podcast: PodcastType;
};

export default function PlayThumbnail({ podcast }: PlayThumbnailProps) {
  const { isPlaying, playingPodcast, switchPlaying, swapPlayingPodcast } = usePodcasts();
  const thisIsPlaying = playingPodcast.id === podcast.id;

  const handlePlayClic = () => {
    if (playingPodcast.id !== podcast.id) {
      swapPlayingPodcast({ newPodcast: podcast });
      !isPlaying && switchPlaying();
    } else {
      switchPlaying();
    }
  };

  return (
    <>
      <img className="w-full mt-2" src="/podcast.png" alt="Studio microphone" />
      <div className="mt-2 mb-4 w-full">
        <div className="flex relative md:justify-center pl-16 md:pl-0">
          <button
            onClick={handlePlayClic}
            className={`absolute z-30 left-0 w-14 h-14 rounded-full justify-center items-center inline-flex ${
              isPlaying && thisIsPlaying
                ? "bg-indigo-500 sm:hover:bg-indigo-600"
                : "bg-neutral-500 sm:hover:bg-neutral-600"
            } duration-300`}
          >
            {isPlaying && thisIsPlaying ? (
              <img className="w-5 h-5" src="/pause_1.svg" alt="Pause"></img>
            ) : (
              <img className="w-5 h-5" src="/play_1.svg" alt="Play"></img>
            )}
          </button>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            {podcast.title}
            <img className="inline ml-1 pb-1" src="/verify_1.svg" alt="Verify"></img>
          </h1>
        </div>
      </div>
    </>
  );
}
