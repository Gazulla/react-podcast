import { useEffect, useState } from "react";
type VolumeControlProps = {
  audioRef: any;
};

export default function VolumeControl({ audioRef }: VolumeControlProps) {
  const [volume, setVolume] = useState<number>(40);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);
  return (
    <div className="flex justify-center place-items-center gap-2 w-full px-3">
      <div className="w-6 h-6">
        <img src="/volume_1.svg" alt="Repeat"></img>
      </div>
      <div className="w-16 md:w-20 lg:w-24 h-1 relative">
        <div className="w-full h-1 absolute bg-white bg-opacity-30 rounded-lg" />
        <div className="h-1 absolute bg-white rounded-lg" style={{ width: `${volume}%` }} />
        <input
          className="absolute w-full -top-1 opacity-0 cursor-pointer"
          type="range"
          defaultValue="0"
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
