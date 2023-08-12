import { PodcastType } from "../types";
import { DAYS_OF_WEEK, MONTHS } from "../constants/appConstants";
import usePodcasts from "../hooks/usePodcasts";

export default function Podcast({ podcast }: { podcast: PodcastType }) {
  const { playingPodcast, isPlaying, switchPlaying, swapPlayingPodcast } = usePodcasts();

  const handlePlayClic = () => {
    if (playingPodcast.id === podcast.id) {
      switchPlaying();
    } else {
      swapPlayingPodcast({ newPodcast: podcast });
    }
  };

  const getDate = (fullDate: string) => {
    const now = new Date(Date.now());
    const releasedDate = new Date(fullDate);
    const difference = now.getTime() - releasedDate.getTime();
    let stringDate =
      difference < 60 * 60 * 1000
        ? "An our ago"
        : difference < 24 * 60 * 60 * 1000 && now.getDate() === releasedDate.getDate()
        ? "Today"
        : difference < 7 * 24 * 60 * 60 * 1000
        ? "Last " + DAYS_OF_WEEK[releasedDate.getDay()]
        : releasedDate.getFullYear() === now.getFullYear()
        ? releasedDate.getDate() + "/" + MONTHS[releasedDate.getMonth()]
        : releasedDate.getDate() +
          "/" +
          (releasedDate.getMonth() + 1) +
          "/" +
          releasedDate.getFullYear();
    return stringDate;
  };
  const thisIsPlaying = playingPodcast.id === podcast.id;
  return (
    <div className="w-full flex flex-col justify-center h-16 md:h-20 border-b border-neutral-600">
      <div className="grid grid-cols-12 gap-5 h-12 place-items-start justify-start">
        <div className="col-span-2 md:col-span-1 w-full flex justify-center place-items-center h-full ">
          <button
            className={`w-8 h-8 rounded-full justify-center items-center gap-3 inline-flex ${
              isPlaying && thisIsPlaying && "bg-indigo-500 sm:hover:bg-indigo-600"
            } duration-300`}
            onClick={handlePlayClic}
          >
            {isPlaying && thisIsPlaying ? (
              <img className="w-3.5 h-3.5" src="/pause_1.svg" alt="Pause" />
            ) : (
              <img className="w-3.5 h-3.5" src="/play_1.svg" alt="Play" onClick={handlePlayClic} />
            )}
          </button>
        </div>

        <div className="col-span-10 md:col-span-5 flex gap-4 justify-center place-items-center w-full h-full">
          <img
            className="w-9 h-9 md:w-11 md:h-11 rounded-lg"
            src={podcast.img}
            alt={podcast.title}
          />
          <div className="table table-fixed w-full h-full">
            <div className="table-row">
              <div className="text-white text-sm md:text-base font-medium whitespace-nowrap overflow-hidden overflow-ellipsis table-cell">
                {podcast.title}
              </div>
            </div>
            <div className="table-row">
              <div className="text-neutral-500 text-xs md:text-sm font-medium whitespace-nowrap overflow-hidden overflow-ellipsis table-cel">
                {podcast.authortName}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 hidden md:table table-fixed w-full">
          <div className="table-row">
            <div className=" text-neutral-500 text-base font-medium whitespace-nowrap overflow-hidden overflow-ellipsis table-cell">
              {podcast.title}
            </div>
          </div>
        </div>

        <div className="col-span-2 hidden md:table text-neutral-500 text-base font-medium">
          {getDate(podcast.date)}
        </div>
      </div>
    </div>
  );
}
