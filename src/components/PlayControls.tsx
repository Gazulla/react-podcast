export default function ControlsBar() {
  const playing = false;
  return (
    <div className="flex gap-6 place-items-center">
      <button className="w-6 h-6">
        <img src="/shuffle_1.svg" alt="Shuflle"></img>
      </button>
      <button className="w-6 h-6">
        <img src="/step_forward_2.svg" alt="Previous"></img>
      </button>
      <button className="w-12 h-12 bg-indigo-500 rounded-full justify-center items-center gap-3 inline-flex sm:hover:bg-indigo-600 duration-300">
        {playing ? (
          <img className="w-5 h-5" src="/pause_1.svg" alt="Pause"></img>
        ) : (
          <img className="w-5 h-5" src="/play_1.svg" alt="Pause"></img>
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
