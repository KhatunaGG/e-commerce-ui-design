"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { sortBy as sortByOptions } from "@/app/commons/data";
import { Down } from "../../__atoms";

const SortBy = () => {
  const {  setIsDroppedDown, isDroppedDown,  sortBy, setSortBy, getAllProducts  } =
    useShopStore();

const handleSortChange = async (selected: string) => {
  setSortBy(selected);
  await getAllProducts(false);
};

  return (
    <>
      <div
        onClick={() => setIsDroppedDown(!isDroppedDown)}
        className=" relative flex items-center gap-1 max-w-[40%] md:max-w-[18%] lg:max-w-[40%] "
      >
        <input
          type="text"
          readOnly
          value={sortBy}
          className="w-full font-semibold md:text-sm lg:text-base leading-[26px] text-[#121212] outline-none"
        />
        <button className="w-auto h-auto absolute right-0 top-1/2 transform -translate-y-1/2">
          <Down styles={"pt-1"} />
        </button>

        {isDroppedDown && (
          <div className="min-w-[150px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] rounded-md h-auto absolute z-20  right-0 top-[30px] p-4 flex flex-col gap-2 max-h-30 scroll-my-0.5 overflow-y-auto">
            {sortByOptions.map((by, i) => {
              return (
                <button
                  onClick={() => handleSortChange(by)}
                  key={i}
                  className="flex items-center justify-start "
                >
                  {by}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SortBy;
