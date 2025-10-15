// "use client";
// import { Down } from "../../__atoms";
// import { categoriesFilter, priceFilter } from "@/app/commons/data";
// import {
//   CategoryFilter,
//   PriceFilter,
//   useShopStore,
// } from "@/app/store/shop-page.store";

// // export enum CategoriesEnum {
// //   AllRooms = "All Rooms",
// //   LivingRoom = "Living Room",
// //   Bedroom = "Bedroom",
// //   Kitchen = "Kitchen",
// //   Bathroom = "Bathroom",
// //   Dinning = "Dinning",
// //   Outdoor = "Outdoor",
// // }

// // export enum PriceEnum {
// //   AllPrice = "All Price",
// //   Under100 = "0.00 - 99.99",
// //   From100To199 = "100.00 - 199.99",
// //   From200To299 = "200.00 - 299.99",
// //   From300To399 = "300.00 - 399.99",
// //   Over400 = "400.00+",
// // }

// // export type MobileFilterProps = {
// //   value: CategoryFilter | PriceFilter;
// //   onChange: (val:CategoryFilter | PriceFilter ) => void;
// // };

// const MobileFilter = () => {
//   const { filters, setFilters } = useShopStore();

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newCategory = e.target.value as typeof filters.category;
//     setFilters({ ...filters, category: newCategory });
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newPrice = e.target.value as typeof filters.priceRange;
//     setFilters({ ...filters, priceRange: newPrice });
//   };

//   return (
//     <>
//       <div className="w-full md:w-fit flex flex-col gap-4        ">
//         <label htmlFor="category" className="uppercase">
//           categories
//         </label>
//         <select
//           id="category"
//           value={filters.category ?? ""}
//           onChange={handleCategoryChange}
//           className="w-full py-[14px] px-4  border border-[#6C7275] rounded-md text-sm outline-none appearance-none       relative"
//         >
//           {Array.isArray(categoriesFilter) && categoriesFilter.length > 0
//             ? categoriesFilter.map((category, i) => (
//                 <option key={`${category}-${i}`} value={category}>
//                   {category}
//                 </option>
//               ))
//             : null}
//         </select>

//         <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
//           <Down />
//         </div>
//       </div>
//       <div className="w-full md:w-fit flex flex-col gap-4  mt-4    ">
//         <label htmlFor="price" className="uppercase">
//           Price Range
//         </label>
//         <select
//           id="price"
//           value={filters.priceRange ?? ""}
//           onChange={handlePriceChange}
//           className="w-full py-[14px] px-4 border border-[#6C7275] rounded-md text-sm outline-none appearance-none          relative"
//         >
//           {priceFilter.map((price, i) => (
//             <option key={`${price}-${i}`} value={price}>
//               {price}
//             </option>
//           ))}
//         </select>
//         <div className="pointer-events-none absolute right-3 top-[58%] -translate-y-1/2 text-gray-500">
//           <Down />
//         </div>
//       </div>
//     </>
//   );
// };

// export default MobileFilter;

"use client";
import { Down } from "../../__atoms";
import { categoriesFilter, priceFilter } from "@/app/commons/data";
import {
  // CategoryFilter,
  // PriceFilter,
  useShopStore,
} from "@/app/store/shop-page.store";

const MobileFilter = () => {
  const { filters, setFilters } = useShopStore();

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as typeof filters.category;
    setFilters({ ...filters, category: newCategory });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrice = e.target.value as typeof filters.priceRange;
    setFilters({ ...filters, priceRange: newPrice });
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
            onChange={handleCategoryChange}
            onClick={(e) => e.stopPropagation()}
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
            onChange={handlePriceChange}
            onClick={(e) => e.stopPropagation()}
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
