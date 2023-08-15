import { formatTime } from "../utils/miscFunctions";

type ProgressionBarProps = {
  progressBarRef: any;
  audioRef: any;
  timeProgress: number;
  duration: number;
};

export default function ProgressionBar({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
}: ProgressionBarProps) {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };
  return (
    <div className="flex justify-center place-items-center gap-3.5 w-full">
      <div className="text-white text-base font-medium">{formatTime(timeProgress)}</div>
      <div className="grow h-1 relative">
        <div className="w-full h-1 absolute bg-white bg-opacity-30 rounded-lg" />
        <div
          className="w-4 h-1 absolute bg-white rounded-lg"
          style={{ width: `${(timeProgress / duration) * 100}%` }}
        />
        <input
          className="absolute w-full -top-1 opacity-0 cursor-pointer"
          type="range"
          ref={progressBarRef}
          defaultValue="0"
          max={100}
          min={0}
          onChange={() => handleProgressChange()}
        />
      </div>

      <div className="text-white text-opacity-30 text-base font-medium">{formatTime(duration)}</div>
    </div>
  );
}
