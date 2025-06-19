import React from "react";
import { ChevronDown } from "../../__atoms";
import { sortBy } from "@/app/commons/data";

const SortBy = () => {
  return (
    // <>
    //   <p className="font-semibold md:text-sm lg:text-base leading-[26px] text-[#121212]"> Sort By</p>
    //   <ChevronDown styles={"pt-1"} />
    // </>

    <>
      <div className="w-fit bg-green-400 max-w-auto relative flex items-center gap-1">
        <input
          type="text"
          readOnly
          className="w-full font-semibold md:text-sm lg:text-base leading-[26px] text-[#121212]"
        />
        <button className="w-auto h-auto">
          <ChevronDown styles={"pt-1"} />
        </button>

        <div className="w-full bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] rounded-md h-auto absolute z-20 left-0 right-0 top-[30px] p-4 flex flex-col gap-2 max-h-30 scroll-my-0.5 overflow-y-auto">
          {Object.values(sortBy).map((by, i) => {
            return <button key={i} className="flex items-center justify-start ">{by}</button>;
          })}
        </div>
      </div>
    </>
  );
};

export default SortBy;
