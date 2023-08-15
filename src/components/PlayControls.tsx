import { IPodcastTrack } from "../types";
import LoadingTrack from "./LoadingTrack";

type ControlsBarProps = {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  playingTrack: IPodcastTrack;
  loadingTrack: boolean;
  previousTrack: () => void;
  nextTrack: () => void;
};

export default function PlayControls({
  isPlaying,
  play,
  pause,
  playingTrack,
  loadingTrack,
  previousTrack,
  nextTrack,
}: ControlsBarProps) {
  const handlePlayClic = () => {
    playingTrack.audio !== "" && play();
  };

  const handlePauseClic = () => {
    pause();
  };

  const handlePreviousClic = () => {
    previousTrack();
  };

  const handleNextClic = () => {
    nextTrack();
  };

  return (
    <div className="flex gap-6 place-items-center">
      <button className="w-6 h-6">
        <img src="/shuffle_1.svg" alt="Shuflle"></img>
      </button>
      <button className="w-6 h-6">
        <img src="/step_forward_2.svg" alt="Previous" onClick={() => handlePreviousClic()}></img>
      </button>

      {loadingTrack && playingTrack.id !== "0" ? (
        <LoadingTrack w={48} h={48}></LoadingTrack>
      ) : isPlaying ? (
        <button
          onClick={() => handlePauseClic()}
          className="w-12 h-12 rounded-full justify-center items-center gap-3 inline-flex bg-indigo-500 sm:hover:bg-indigo-600 duration-300"
        >
          <img className="w-5 h-5" src="/pause_1.svg" alt="Pause"></img>
        </button>
      ) : (
        <button
          onClick={() => handlePlayClic()}
          className="w-12 h-12 rounded-full justify-center items-center gap-3 inline-flex duration-300"
        >
          <img className="w-5 h-5" src="/play_1.svg" alt="Play"></img>
        </button>
      )}

      <button className="w-6 h-6">
        <img src="/step_forward_1.svg" alt="Next" onClick={() => handleNextClic()}></img>
      </button>
      <button className="w-6 h-6">
        <img src="/rotate_right_1.svg" alt="Repeat"></img>
      </button>
    </div>
  );
}
