import { useCallback, useState } from "react";
import { FiltersType, IPodcastTrack, IPodcast } from "../types";
import { NEW_FILTERS } from "../constants/appConstants";
import { dC } from "../utils/miscFunctions";

export default function useFilters() {
  const [filters, setFilters] = useState<FiltersType>(dC(NEW_FILTERS));

  const changeFilters = ({ newFilters }: { newFilters: FiltersType }) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters(dC(NEW_FILTERS));
  };

  const filterElements = useCallback(
    (elementsToFilter: IPodcastTrack[] | IPodcast[]) => {
      if (filters.word.trim() === "") {
        return elementsToFilter;
      }

      return [...elementsToFilter].filter((e) => {
        return e.title.toLowerCase().includes(filters.word.toLowerCase());
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters]
  );

  const sortElements = useCallback(
    (elementsToSort: IPodcast[] | IPodcastTrack[]) => {
      if (filters.sort === "no_sort") {
        return elementsToSort;
      }
      if (filters.sort === "title") {
        const sortedPodcasts = [...elementsToSort].sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
        return sortedPodcasts;
      }

      if (filters.sort === "title_inverse") {
        const sortedPodcasts = [...elementsToSort].sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
        return sortedPodcasts;
      }

      if (filters.sort === "released") {
        const sortedPodcasts = [...elementsToSort].sort((a, b) => {
          const aDate = new Date(a.date).getTime();
          const bDate = new Date(b.date).getTime();
          return bDate - aDate;
        });
        return sortedPodcasts;
      }

      if (filters.sort === "released_inverse") {
        const sortedPodcasts = [...elementsToSort].sort((a, b) => {
          const aDate = new Date(a.date).getTime();
          const bDate = new Date(b.date).getTime();
          return aDate - bDate;
        });
        return sortedPodcasts;
      }

      return elementsToSort;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters]
  );

  return { filters, changeFilters, sortElements, filterElements, clearFilters };
}
