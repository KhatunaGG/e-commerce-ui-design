
"use client";
import { Down } from "../../__atoms";
import { categoriesFilter, priceFilter } from "@/app/commons/data";
import {
  CategoryFilter,
  PriceFilter,
  // CategoryFilter,
  // PriceFilter,
  useShopStore,
} from "@/app/store/shop-page.store";

const MobileFilter = () => {
  const { filters } = useShopStore();

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
    <>
      <div className="w-full md:w-fit flex flex-col gap-4 md:min-w-[170px] lg:min-w-[261px]">
        <label htmlFor="category" className="uppercase">
          Categories
        </label>
        <div className="relative">
          <select
            id="category"
            value={filters.category ?? ""}
            // onChange={handleCategoryChange}
            onChange={(e) => {
              const selected = e.target.value as CategoryFilter;
              handleCategoryChange(selected);
            }}
            className="w-full py-[14px] px-4 border border-[#6C7275] rounded-md text-sm outline-none appearance-none"
          >
            {Array.isArray(categoriesFilter) &&
              categoriesFilter.map((category, i) => (
                <option key={`${category}-${i}`} value={category}>
                  {category}
                </option>
              ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Down />
          </div>
        </div>
      </div>

      <div className="w-full md:w-fit flex flex-col gap-4 lg:min-w-[261px] md:min-w-[170px]">
        <label htmlFor="price" className="uppercase">
          Price Range
        </label>
        <div className="relative">
          <select
            id="price"
            value={filters.priceRange ?? ""}
            // onChange={handlePriceChange}
            onChange={(e) => {
              const selected = e.target.value as PriceFilter;
              handlePriceChange(selected);
            }}
            className="w-full py-[14px] px-4 border border-[#6C7275] rounded-md text-sm outline-none appearance-none"
          >
            {priceFilter.map((price, i) => (
              <option key={`${price}-${i}`} value={price}>
                {price}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Down />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilter;
