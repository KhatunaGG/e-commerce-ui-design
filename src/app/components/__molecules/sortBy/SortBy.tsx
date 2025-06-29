"use client";
import { useShopPageStore } from "@/app/store/useShopPage.store";
import { ChevronDown } from "../../__atoms";
import { sortBy } from "@/app/commons/data";

const SortBy = () => {
  const { selected, setIsDroppedDown, isDroppedDown, handleSelect } =
    useShopPageStore();
  return (
    // <>
    //   <p className="font-semibold md:text-sm lg:text-base leading-[26px] text-[#121212]"> Sort By</p>
    //   <ChevronDown styles={"pt-1"} />
    // </>

    <>
      <div
        onClick={() => setIsDroppedDown(!isDroppedDown)}
        className=" relative flex items-center gap-1 max-w-[40%] md:max-w-[18%] lg:max-w-[40%] "
      >
        <input
          type="text"
          readOnly
          value={selected}
          className="w-full font-semibold md:text-sm lg:text-base leading-[26px] text-[#121212] outline-none"
        />
        <button className="w-auto h-auto absolute right-0 top-1/2 transform -translate-y-1/2">
          <ChevronDown styles={"pt-1"} />
        </button>

        {isDroppedDown && (
          <div className="min-w-[150px] bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] rounded-md h-auto absolute z-20  right-0 top-[30px] p-4 flex flex-col gap-2 max-h-30 scroll-my-0.5 overflow-y-auto">
            {Object.values(sortBy).map((by, i) => {
              return (
                <button
                  onClick={() => handleSelect(by)}
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
