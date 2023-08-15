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
  replay: boolean;
  replayTrack: () => void;
  shuffle: boolean;
  shuffleTrack: () => void;
};

export default function PlayControls({
  isPlaying,
  play,
  pause,
  playingTrack,
  loadingTrack,
  previousTrack,
  nextTrack,
  replay,
  replayTrack,
  shuffle,
  shuffleTrack,
}: ControlsBarProps) {
  const handlePlayClic = () => {
    playingTrack.audio !== "" && play();
  };

  return (
    <div className="flex gap-6 place-items-center">
      <button
        className={`w-9 h-9 rounded-full justify-center items-center gap-3 inline-flex ${
          shuffle && "bg-indigo-500"
        } duration-300 `}
      >
        <img src="/shuffle_1.svg" alt="Shuflle" onClick={() => shuffleTrack()}></img>
      </button>
      <button className="w-6 h-6">
        <img src="/step_forward_2.svg" alt="Previous" onClick={() => previousTrack()}></img>
      </button>

      {loadingTrack && playingTrack.id !== "0" ? (
        <LoadingTrack w={48} h={48}></LoadingTrack>
      ) : isPlaying ? (
        <button
          onClick={() => pause()}
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
        <img src="/step_forward_1.svg" alt="Next" onClick={() => nextTrack()}></img>
      </button>
      <button
        className={`w-9 h-9 rounded-full justify-center items-center gap-3 inline-flex ${
          replay && "bg-indigo-500"
        } duration-300 `}
      >
        <img src="/rotate_right_1.svg" alt="Repeat" onClick={() => replayTrack()}></img>
      </button>
    </div>
  );
}
