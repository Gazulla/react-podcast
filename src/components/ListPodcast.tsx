import useFilters from "../hooks/useFIlters";
import usePodcasts from "../hooks/usePodcasts";
import PlayThumbnail from "./PlayThumbnail";
import Podcast from "./Podcast";

export default function ListPodcasts() {
  const { podcasts, loading, isFirstTime } = usePodcasts();
  const { filters, changeFilters, sortPodcasts } = useFilters();
  const filteredPodcasts = sortPodcasts(podcasts);
  return (
    <>
      <PlayThumbnail filters={filters} changeFilters={changeFilters}></PlayThumbnail>

      {isFirstTime ? null : loading ? null : podcasts.length === 0 ? (
        <div>No podcasts found</div>
      ) : (
        <>
          <div className="w-full h-14">
            <div className="w-full grid grid-cols-12 gap-2 md:gap-4 h-10 relative border-b border-neutral-600">
              <div className="col-span-2 md:col-span-1 text-neutral-500 text-sm font-semibold">
                #
              </div>
              <div className="col-span-10 md:col-span-5 text-neutral-500 text-sm font-semibold">
                Name
              </div>
              <div className="col-span-4 hidden md:block text-neutral-500 text-sm font-semibold">
                Description
              </div>
              <div className="col-span-2 hidden md:block text-neutral-500 text-sm font-semibold">
                Released
              </div>
            </div>
          </div>

          {filteredPodcasts.map((podcast) => {
            return <Podcast key={podcast.id} podcast={podcast}></Podcast>;
          })}
        </>
      )}
    </>
  );
}
