export default function ProgressionBar() {
  const progression = "30";
  return (
    <div className="flex justify-center place-items-center gap-3.5 w-full">
      <div className="text-white text-base font-medium">03:41</div>
      <div className="grow h-1 relative w-full">
        <div className="w-full h-1 absolute bg-white bg-opacity-30 rounded-lg" />
        <div
          className="w-4 h-1 absolute bg-white rounded-lg"
          style={{ width: `${progression}%` }}
        />
      </div>
      <div className="text-white text-opacity-30 text-base font-medium">12:11</div>
    </div>
  );
}
