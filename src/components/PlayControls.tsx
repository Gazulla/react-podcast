import { useState } from "react";

export default function ControlsBar() {
  const [playing, setPlaying] = useState<boolean>();
  const handleClickPlay = () => {
    setPlaying(!playing);
  };
  return (
    <div className="flex gap-6 place-items-center">
      <button className="w-6 h-6">
        <img src="/shuffle_1.svg" alt="Shuflle"></img>
      </button>
      <button className="w-6 h-6">
        <img src="/step_forward_2.svg" alt="Previous"></img>
      </button>
      <button
        onClick={(e) => handleClickPlay()}
        className={`w-12 h-12 rounded-full justify-center items-center gap-3 inline-flex ${
          playing && "bg-indigo-500 sm:hover:bg-indigo-600"
        } duration-300`}
      >
        {playing ? (
          <img className="w-5 h-5" src="/pause_1.svg" alt="Pause"></img>
        ) : (
          <img className="w-5 h-5" src="/play_1.svg" alt="Play"></img>
        )}
      </button>
      <button className="w-6 h-6">
        <img src="/step_forward_1.svg" alt="Next"></img>
      </button>
      <button className="w-6 h-6">
        <img src="/rotate_right_1.svg" alt="Repeat"></img>
      </button>
    </div>
  );
}
