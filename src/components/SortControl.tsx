import { SORT_TYPES } from "../constants/appConstants";
import { FiltersType } from "../types";

type SortingControlProps = {
  filters: FiltersType;
  changeFilters: ({ newFilters }: { newFilters: FiltersType }) => void;
};

export default function SortingControl({ filters, changeFilters }: SortingControlProps) {
  const handleChangeSort = (newSort: string) => {
    const nFilters = { sort: newSort };
    changeFilters({ newFilters: nFilters });
  };
  return (
    <div className="right-0 top-[10px] absolute justify-start items-center gap-5 inline-flex">
      <div className="w-4 h-4">
        <img src="/search_1.svg" alt="Search"></img>
      </div>
      <div className="rounded-2xl justify-start items-center gap-1.5 flex">
        <select
          className="text-white text-sm md:text-base font-normal bg-black border-0"
          onChange={(e) => handleChangeSort(e.target.value)}
          value={filters.sort}
        >
          <option disabled={true} value="">
            Order by
          </option>

          {SORT_TYPES.map((st) => {
            return (
              <option key={st.value} value={st.value}>
                {st.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
