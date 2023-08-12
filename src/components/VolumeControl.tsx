export default function VolumeControl() {
  const volume = 30;
  return (
    <div className="flex justify-center place-items-center gap-2 w-full px-3">
      <div className="w-6 h-6">
        <img src="/volume_1.svg" alt="Repeat"></img>
      </div>
      <div className="w-16 md:w-20 lg:w-24 h-1 relative">
        <div className="w-full h-1 absolute bg-white bg-opacity-30 rounded-lg" />
        <div className="h-1 absolute bg-white rounded-lg" style={{ width: `${volume}%` }} />
      </div>
    </div>
  );
}
