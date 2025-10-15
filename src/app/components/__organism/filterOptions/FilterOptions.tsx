// "use client";
// import { useShopStore } from "@/app/store/shop-page.store";
// import {
//   Filter,
// } from "../../__atoms";
// import { SortBy } from "../../__molecules";
// import { sortIcons } from "@/app/commons/data";
// import { useState } from "react";
// import SortByIcons from "../sortByIcons/SortByIcons";

// const FilterOptions = () => {
//   const {

//     handleIconClick
//   } = useShopStore();
//   const [activeIcon, setActiveIcon] = useState<string | null>(null);
//   const currentCategory = useShopStore.getState().filters.category;

//   const sortBy = useShopStore.getState().sortBy;
//   const sortedByFour = useShopStore.getState().sortedByFour;
//   const sortByTwoVertically = useShopStore.getState().sortByTwoVertically;
//   const sortByTwoHorizontally = useShopStore.getState().sortByTwoHorizontally;

//   console.log('sortBy', sortBy)
//   console.log('sortedByFour', sortedByFour)
//   console.log('sortByTwoVertically', sortByTwoVertically)
//   console.log('sortByTwoHorizontally', sortByTwoHorizontally)

//   return (
//     <div className="w-full flex flex-col items-center justify-between gap-4   bg-violet-300">
//       <div className="w-full flex items-center justify-between border-t border-t-[#E8ECEF] border-b border-b-[#E8ECEF] md:border-none">
//         <div className="flex-1">
//           <div className="flex items-center gap-2 md:hidden">
//             <Filter />
//             <p className="font-semibold text-[20px] leading-8 text-[#121212]">
//               Filter
//             </p>
//           </div>
//           <h2 className="font-semibold text-[20px] leading-8 text-[#121212] hidden md:flex">
//             {currentCategory}
//           </h2>
//         </div>

//         <div className="w-fit  flex md:flex-col lg:flex-row  items-center justify-end md:gap-4 lg:gap-8">
//           <div className="lg:flex lg:justify-end items-center gap-1 hidden">
//             <SortBy />
//           </div>
//           <SortByIcons
//             sortIcons={sortIcons}
//             setActiveIcon={setActiveIcon}
//             activeIcon={activeIcon}
//             onIconClick={handleIconClick}
//           />
//         </div>
//       </div>

//       <div className="w-full flex flex-row lg:hidden items-center justify-between">
//         <h2 className="font-semibold text-base md:text-[20px] leading-8 text-[#121212] flex md:hidden">
//           Living Room
//         </h2>
//         <div className="flex items-center gap-1 justify-end md:w-full">
//           <SortBy />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterOptions;

"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { Filter } from "../../__atoms";
import { MobileFilter, SortBy } from "../../__molecules";
import { sortIcons } from "@/app/commons/data";
import { useState } from "react";
import SortByIcons from "../sortByIcons/SortByIcons";

const FilterOptions = () => {
  const { handleIconClick } = useShopStore();
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const currentCategory = useShopStore.getState().filters.category;

  // const sortBy = useShopStore.getState().sortBy;
  const sortedByFour = useShopStore.getState().sortedByFour;
  const sortByTwoVertically = useShopStore.getState().sortByTwoVertically;
  const sortByTwoHorizontally = useShopStore.getState().sortByTwoHorizontally;

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
          <h2 className="font-semibold text-[20px] leading-8 text-[#121212] hidden md:flex">
            {currentCategory}
          </h2>
        </div>

        {/* {(sortedByFour || sortByTwoVertically || sortByTwoHorizontally) ? (
          <div className="w-full flex items-center justify-start gap-6 flex-col md:flex-row">
            <MobileFilter />
          </div>
        ) : (
          ""
        )} */}

        {/* <div
          className={`w-full ${
            sortedByFour || sortByTwoVertically || sortByTwoHorizontally
              ? "flex"
              : "md:hidden "
          } items-center justify-start gap-6 flex-col md:flex-row`}
        >
          <MobileFilter />
        </div> */}

        <div
          className={`w-full ${
            sortedByFour || sortByTwoVertically || sortByTwoHorizontally
              ? "flex md:flex"
              : "flex md:hidden"
          } items-center justify-start gap-6 flex-col md:flex-row`}
        >
          <MobileFilter />
        </div>

        <div className="w-fit hidden  md:flex md:flex-col lg:flex-row  items-center justify-end md:gap-4 lg:gap-8  ">
          <div className="lg:flex lg:justify-end items-center gap-1 hidden">
            <SortBy />
          </div>
          <SortByIcons
            sortIcons={sortIcons}
            setActiveIcon={setActiveIcon}
            activeIcon={activeIcon}
            onIconClick={handleIconClick}
          />
        </div>
      </div>
      <div className="w-full flex flex-row md:hidden items-center justify-between">
        <div className="flex items-center gap-1 justify-end md:w-full">
          <SortBy />
        </div>
        <SortByIcons
          sortIcons={sortIcons}
          setActiveIcon={setActiveIcon}
          activeIcon={activeIcon}
          onIconClick={handleIconClick}
        />
      </div>
    </div>
  );
};

export default FilterOptions;
