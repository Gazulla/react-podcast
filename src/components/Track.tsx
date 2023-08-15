import { IPodcast, IPodcastTrack } from "../types";
import { getDate, formatTime } from "../utils/miscFunctions";
import usePlayer from "../hooks/usePlayer";
import LoadingTrack from "./LoadingTrack";

export default function Track({ track, podcast }: { track: IPodcastTrack; podcast: IPodcast }) {
  const { playingTrack, isPlaying, play, pause, loadingTrack } = usePlayer();

  const handlePlayClic = () => {
    play({ track: track, podcast: podcast });
  };
  const handlePauseClic = () => {
    pause();
  };
  const thisIsPlaying = playingTrack.id === track.id;

  return (
    <div className="w-full flex flex-col justify-center h-16 md:h-20 border-b border-neutral-600">
      <div className="grid grid-cols-12 gap-5 h-12 place-items-start justify-start">
        <div className="col-span-2 md:col-span-1 w-full flex justify-center place-items-center h-full ">
          {loadingTrack && thisIsPlaying ? (
            <LoadingTrack w={34} h={34}></LoadingTrack>
          ) : isPlaying && thisIsPlaying ? (
            <button
              className="w-8 h-8 rounded-full justify-center items-center gap-3 inline-flex duration-300 bg-indigo-500 sm:hover:bg-indigo-600"
              onClick={() => handlePauseClic()}
            >
              <img className="w-3.5 h-3.5" src="/pause_1.svg" alt="Pause" />
            </button>
          ) : (
            <button
              className="w-8 h-8 rounded-full justify-center items-center gap-3 inline-flex duration-300"
              onClick={() => handlePlayClic()}
            >
              <img className="w-3.5 h-3.5" src="/play_1.svg" alt="Play" />
            </button>
          )}
        </div>

        <div className="col-span-10 md:col-span-4 flex gap-4 justify-center place-items-center w-full h-full">
          {track.img !== "" ? (
            <img className="w-9 h-9 md:w-11 md:h-11 rounded-lg" src={track.img} alt={track.title} />
          ) : (
            <img className="w-9 h-9 md:w-11 md:h-11 rounded-lg" src="/grey.png" alt="grey img" />
          )}

          <div className="table table-fixed w-full h-full">
            <div className="table-row">
              <div className="text-white text-sm md:text-base font-medium whitespace-nowrap overflow-hidden overflow-ellipsis table-cell">
                {track.title}
              </div>
            </div>
            <div className="table-row">
              <div className="text-neutral-500 text-xs md:text-sm font-medium whitespace-nowrap overflow-hidden overflow-ellipsis table-cel">
                {track.authorName}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 hidden md:table table-fixed w-full">
          <div className="table-row">
            <div className=" text-neutral-500 text-base font-medium whitespace-nowrap overflow-hidden overflow-ellipsis table-cell">
              {track.description}
            </div>
          </div>
        </div>

        <div className="col-span-2 hidden md:table text-neutral-500 text-base font-medium">
          {getDate(track.date)}
        </div>
        <div className="col-span-1 hidden md:table text-neutral-500 text-base font-medium">
          {formatTime(Number(track.duration))}
        </div>
      </div>
    </div>
  );
}
