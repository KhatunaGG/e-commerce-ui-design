"use client";
import { categoriesFilter, priceFilter } from "../../../commons/data";
import Checkbox from "../../__molecules/checkbox/Checkbox";
import { Filter } from "../../__atoms";
import { useShopStore } from "@/app/store/shop-page.store";
import { CategoryFilter, PriceFilter } from "@/app/interfaces/interface";

const FilterSection = () => {
  const currentCategory = useShopStore((state) => state.filters.category);
  const currentPriceRange = useShopStore((state) => state.filters.priceRange);

  const handleCategoryChange = (category: CategoryFilter) => {
    const normalizedCategory = category === "All Rooms" ? null : category;
    useShopStore.getState().applyFilters(
      {
        category: normalizedCategory,
        priceRange: currentPriceRange,
      },
      useShopStore.getState().sortBy
    );
  };

  const handlePriceChange = (priceRange: PriceFilter) => {
    const normalizePriceRange = priceRange === "All Price" ? null : priceRange;
    useShopStore.getState().applyFilters(
      {
        category: currentCategory,
        priceRange: normalizePriceRange,
      },
      useShopStore.getState().sortBy
    );
  };

  return (
    <section className="w-full hidden  h-full md:w-[40%] lg:w-[22.67%] md:flex flex-col items-start justify-start md:gap-8">
      <div className="flex items-center  gap-2">
        <Filter />
        <p className="font-semibold text-[20px] leading-8 text-[#121212]">
          Filter
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
        <h2 className="font-semibold text-base leading-[26px] text-[#121212] uppercase">
          categories
        </h2>
        {Array.isArray(categoriesFilter) && categoriesFilter.length > 0 ? (
          categoriesFilter.map((category, i) => (
            <button
              onClick={() => handleCategoryChange(category as CategoryFilter)}
              type="button"
              key={i}
              className={`${
                currentCategory === category
                  ? "font-bold underline"
                  : "font-semibold "
              } text-sm leading-[22px] text-[#807E7E] flex items-start cursor-pointer`}
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
        {priceFilter.map((price) => {
          const id = `price-${price}`;
          return (
            <div
              key={id}
              className="w-full flex items-center justify-between text-[#807E7E]"
            >
              <label
                htmlFor={id}
                className={`${
                  currentPriceRange === price
                    ? "font-bold underline"
                    : "font-semibold"
                } md:text-sm lg:text-base leading-[26px] cursor-pointer`}
                onClick={() => handlePriceChange(price as PriceFilter)}
              >
                {price}
              </label>

              {price !== "All Price" && (
                <Checkbox
                  id={id}
                  checked={currentPriceRange === price}
                  onChange={() => handlePriceChange(price as PriceFilter)}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FilterSection;
