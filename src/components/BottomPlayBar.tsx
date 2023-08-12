import PlayControls from "./PlayControls";
import ProgressionBar from "./ProgressionBar";
import VolumeControl from "./VolumeControl";

export default function BottomPlayBar() {
  return (
    <div className="fixed grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-6 justify-center place-items-center bg-zinc-900 w-full h-20 sm:h-28 bottom-0">
      <div className="hidden sm:flex col-span-3 gap-4 justify-betweeen place-items-center w-full">
        <img
          className="w-28 h-28 left-0 top-0"
          alt="Img Description"
          src="https://via.placeholder.com/110x110"
        ></img>

        <div>
          <div className="text-white text-base font-medium">How to make your partner talk more</div>
          <div className="text-white text-opacity-30 text-base font-medium">Ken Adams</div>
        </div>
      </div>
      <div className="col-span-3">
        <PlayControls />
      </div>
      <div className="col-span-3 lg:col-span-4 w-full hidden lg:block">
        <ProgressionBar />
      </div>
      <div className="col-span-2 hidden lg:block">
        <VolumeControl />
      </div>
    </div>
  );
}
