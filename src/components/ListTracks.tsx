import useFilters from "../hooks/useFIlters";
import { IPodcast, IPodcastTrack } from "../types";
import FilterControls from "./FIlterControls";
import Track from "./Track";

type ListPodcastProps = {
  podcast: IPodcast;
};
export default function ListPodcastTracks({ podcast }: ListPodcastProps) {
  const { filters, changeFilters, sortElements, filterElements } = useFilters();
  const tracks = podcast.tracks;
  const filteredTracks = filterElements(sortElements(tracks) as IPodcastTrack[]) as IPodcastTrack[];

  return (
    <>
      <div className="w-full h-14 relative">
        <FilterControls filters={filters} changeFilters={changeFilters}></FilterControls>
      </div>
      {tracks.length === 0 ? (
        <div>No related podcasts found</div>
      ) : (
        <>
          <div className="h-14 w-full ">
            <div className="grid grid-cols-12 gap-2 md:gap-4 h-10 relative border-b border-neutral-600 w-full ">
              <div className="col-span-2 md:col-span-1 text-neutral-500 text-sm font-semibold">
                #
              </div>
              <div className="col-span-10 md:col-span-4 text-neutral-500 text-sm font-semibold">
                Title
              </div>
              <div className="col-span-4 hidden md:block text-neutral-500 text-sm font-semibold">
                Topic
              </div>
              <div className="col-span-2 hidden md:block text-neutral-500 text-sm font-semibold">
                Released
              </div>
              <div className="col-span-1 hidden md:block">
                <img className="w-4 h-4" src="/time_1.svg" alt="Clock" />
              </div>
            </div>
          </div>

          {filteredTracks.map((track) => {
            return <Track key={track.id} track={track} podcast={podcast}></Track>;
          })}
        </>
      )}
    </>
  );
}
