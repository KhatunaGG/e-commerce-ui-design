import { categoriesFilter, priceFilter } from "../../../commons/data";
import React from "react";
import Checkbox from "../../__molecules/checkbox/Checkbox";
import { Filter } from "../../__atoms";

const FilterSection = () => {
  return (
    <section className="w-full hidden  h-full md:w-[40%] lg:w-[22.67%] md:flex flex-col items-start justify-start md:gap-8">
      <div className="flex items-center  gap-2">
        <Filter />
        <p className="font-semibold text-[20px] leading-8 text-[#121212]">
          Filter
        </p>
      </div>

      {/* <div className="DIV_1 flex flex-col items-start gap-4 max-h-[200px] overflow-y-auto "> */}
      <div className="w-full flex flex-col gap-4 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
        <h2 className="font-semibold text-base leading-[26px] text-[#121212] uppercase">
          categories
        </h2>
        <p className="font-semibold text-sm leading-[22px] text-[#807E7E]">
          All Rooms
        </p>
        {Array.isArray(categoriesFilter) && categoriesFilter.length > 0 ? (
          categoriesFilter.map((category, i) => (
            <button
            type="button"
              key={i}
              className="font-semibold text-sm leading-[22px] text-[#807E7E] flex items-start"
            >
              {category}
            </button>
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>

      <div className="w-full flex flex-col items-start gap-4">
        <h2 className="font-semibold md:text-sm lg:text-base leading-[26px] text-[#121212] uppercase">
          Price
        </h2>
        <p className="font-semibold text-sm leading-[22px] text-[#807E7E]">
          All Price
        </p>

        {priceFilter.map((price) => {
          const id = `price-${price}`;
          return (
            <div
              key={id}
              className="w-full flex items-center justify-between text-[#807E7E] "
            >
              <label
                htmlFor={id}
                className="font-semibold md:text-sm lg:text-base leading-[26px] cursor-pointer"
              >
                {price}
              </label>
              <Checkbox 
              // id={id}
               />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FilterSection;
