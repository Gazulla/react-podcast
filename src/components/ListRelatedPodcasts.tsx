import useFilters from "../hooks/useFIlters";
import { PodcastType } from "../types";
import PodcastWithHour from "./PodcastWithHour";
import SortingControl from "./SortControl";

type ListPodcastProps = {
  podcasts: PodcastType[];
};
export default function ListRelatedPodcasts({ podcasts }: ListPodcastProps) {
  const { filters, changeFilters, sortPodcasts } = useFilters();
  const filteredPodcasts = sortPodcasts(podcasts);
  return (
    <>
      <div className="w-full h-14 relative">
        <SortingControl filters={filters} changeFilters={changeFilters}></SortingControl>
      </div>
      {podcasts.length === 0 ? (
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

          {filteredPodcasts.map((podcast) => {
            return <PodcastWithHour key={podcast.id} podcast={podcast}></PodcastWithHour>;
          })}
        </>
      )}
    </>
  );
}
