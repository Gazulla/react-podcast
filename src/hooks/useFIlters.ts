import { useCallback, useState } from "react";
import { FiltersType, PodcastType } from "../types";
import { NEW_FILTERS } from "../constants/appConstants";

export default function useFilters() {
  const [filters, setFilters] = useState<FiltersType>(NEW_FILTERS);

  const changeFilters = ({ newFilters }: { newFilters: FiltersType }) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters(NEW_FILTERS);
  };

  const filterPodcasts = useCallback(
    (podcastsToFilter: PodcastType[]) => {
      if (filters.word.trim() === "") {
        return podcastsToFilter;
      }

      return [...podcastsToFilter].filter((podcast) => {
        return podcast.title.includes(filters.word);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters]
  );

  const sortPodcasts = useCallback(
    (podcastsToSort: PodcastType[]) => {
      if (filters.sort === "no_sort") {
        return podcastsToSort;
      }
      if (filters.sort === "title") {
        const sortedPodcasts = [...podcastsToSort].sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        return sortedPodcasts;
      }

      if (filters.sort === "title_inverse") {
        const sortedPodcasts = [...podcastsToSort].sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
        return sortedPodcasts;
      }

      if (filters.sort === "released") {
        const sortedPodcasts = [...podcastsToSort].sort((a, b) => {
          const aDate = new Date(a.date).getTime();
          const bDate = new Date(b.date).getTime();
          return bDate - aDate;
        });
        return sortedPodcasts;
      }

      if (filters.sort === "released_inverse") {
        const sortedPodcasts = [...podcastsToSort].sort((a, b) => {
          const aDate = new Date(a.date).getTime();
          const bDate = new Date(b.date).getTime();
          return aDate - bDate;
        });
        return sortedPodcasts;
      }

      return podcastsToSort;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters]
  );

  return { filters, changeFilters, sortPodcasts, filterPodcasts, clearFilters };
}
