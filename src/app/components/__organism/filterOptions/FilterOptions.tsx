"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { Filter } from "../../__atoms";
import { MobileFilter, SortBy } from "../../__molecules";
import { sortIcons } from "@/app/commons/data";
import SortByIcons from "../sortByIcons/SortByIcons";

const FilterOptions = () => {
  const { handleIconClick } = useShopStore();
  const currentCategory = useShopStore.getState().filters.category;
  const sortedByFour = useShopStore.getState().sortedByFour;
  const sortByTwoVertically = useShopStore.getState().sortByTwoVertically;
  const sortByTwoHorizontally = useShopStore.getState().sortByTwoHorizontally;
  const shouldHideCategory =
    sortedByFour || sortByTwoVertically || sortByTwoHorizontally;

  return (
    <div className="w-full flex flex-col items-center justify-between gap-4">
      <div className="w-full flex items-center justify-between border-t border-t-[#E8ECEF] border-b border-b-[#E8ECEF] md:border-none">
        <div className="flex-1 hidden md:flex">
          <div className="flex items-center gap-2 md:hidden">
            <Filter />
            <p className="font-semibold text-[20px] leading-8 text-[#121212]">
              Filter
            </p>
          </div>

          {!shouldHideCategory && currentCategory && (
            <h2 className="font-semibold text-[20px] leading-8 text-[#121212] hidden md:flex">
              {currentCategory}
            </h2>
          )}
        </div>

        <div
          className={`w-full ${
            sortedByFour || sortByTwoVertically || sortByTwoHorizontally
              ? "flex md:flex"
              : "flex md:hidden"
          } items-center justify-start gap-6 flex-col md:flex-row`}
        >
          <MobileFilter />
        </div>

        <div className="w-fit hidden md:flex md:flex-col lg:flex-row items-center justify-end md:gap-4 lg:gap-8">
          <div className="md:flex md:justify-start items-start gap-1 hidden max-w-[120px]">
            <SortBy />
          </div>
          <SortByIcons sortIcons={sortIcons} onIconClick={handleIconClick} />
        </div>
      </div>

      <div className="w-full flex flex-row md:hidden items-center justify-between">
        <div className="flex items-center gap-1 justify-end md:w-full">
          <SortBy />
        </div>
        <SortByIcons sortIcons={sortIcons} onIconClick={handleIconClick} />
      </div>
    </div>
  );
};

export default FilterOptions;
