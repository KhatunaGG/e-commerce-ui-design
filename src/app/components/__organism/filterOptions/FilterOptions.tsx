// import React from "react";
// import {
//   ChevronDown,
//   Filter,
//   FirstFilterIcon,
//   FourthFilterIcon,
//   ThirdFilterIcon,
// } from "../../__atoms";
// import SecondFilterIcon from "../../__atoms/secondFilterIcon.tsx/SecondFilterIcon";

// const FilterOptions = () => {
//   return (
//     <div className="w-full flex items-center justify-between bg-blue-200">
//       <div className="flex-1 fle">
//         <div className="flex items-center  gap-2 md:hidden">
//           <Filter />
//           <p className="font-semibold text-[20px] leading-8 text-[#121212]">
//             Filter
//           </p>
//         </div>
//         <h2 className="font-semibold text-[20px] leading-8 text-[#121212] hidden md:flex">
//           Living Room
//         </h2>
//       </div>

//       <div className="w-full md:flex-1 flex items-center justify-end md:gap-4 lg:gap-8">
//         <div className="lg:flex items-center gap-1 hidden">
//           <p> Sort By</p>
//           <ChevronDown />
//         </div>
//         <div className="flex items-center">
//           <div className="w-[46px] h-[46px] md:flex items-center justify-center hidden ">
//             <FirstFilterIcon />
//           </div>
//           <div className="w-[46px] h-[46px] md:flex items-center justify-center hidden">
//             <SecondFilterIcon />
//           </div>
//           <div className="w-[46px] h-[46px] flex items-center justify-center">
//             <ThirdFilterIcon />
//           </div>
//           <div className="w-[46px] h-[46px] flex items-center justify-center">
//             <FourthFilterIcon />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterOptions;

// "use client";
// import { useProductsFilterStore } from "@/app/store/products.filter.store";
// import {
//   Filter,
//   FirstFilterIcon,
//   FourthFilterIcon,
//   SecondFilterIcon,
//   ThirdFilterIcon,
// } from "../../__atoms";
// import { SortBy } from "../../__molecules";
// import { sortIcons } from "@/app/commons/data";

// const iconMap: Record<string, React.FC> = {
//   FirstFilterIcon,
//   SecondFilterIcon,
//   ThirdFilterIcon,
//   FourthFilterIcon,
// };

// const FilterOptions = () => {
//   return (
//     <div className="w-full flex flex-col items-center justify-between gap-4  ">
//       <div className="w-full flex items-center justify-between border-t border-t-[#E8ECEF] border-b border-b-[#E8ECEF] md:border-none">
//         <div className="flex-1 fle">
//           <div className="flex items-center  gap-2 md:hidden">
//             <Filter />
//             <p className="font-semibold text-[20px] leading-8 text-[#121212]">
//               Filter
//             </p>
//           </div>
//           <h2 className="font-semibold text-[20px] leading-8 text-[#121212] hidden md:flex">
//             Living Room
//           </h2>
//         </div>

//         <div className="w-full md:flex-1 flex items-center justify-end md:gap-4 lg:gap-8">
//           <div className="lg:flex lg:justify-end items-center gap-1 hidden  ">
//             <SortBy />
//           </div>
//           <div className="flex items-center ">
//             {sortIcons.map((item, i) => {
//               const Icon = iconMap[item];
//               const isFirstOrSecond =
//                 item === "FirstFilterIcon" || item === "SecondFilterIcon";
//               return (
//                 <div
//                   key={i}
//                   className={`w-[46px] h-[46px] items-center justify-center ${
//                     isFirstOrSecond ? "hidden md:flex" : "flex"
//                   }`}
//                 >
//                   {Icon && <Icon />}
//                 </div>
//               );
//             })}
//             {/* <div className="w-[46px] h-[46px] md:flex items-center justify-center hidden ">
//               <FirstFilterIcon />
//             </div>
//             <div className="w-[46px] h-[46px] md:flex items-center justify-center hidden">
//               <SecondFilterIcon />
//             </div>
//             <div className="w-[46px] h-[46px] flex items-center justify-self-center">
//               <ThirdFilterIcon />
//             </div>
//             <div className="w-[46px] h-[46px] flex items-center justify-center ">
//               <FourthFilterIcon />
//             </div> */}
//           </div>
//         </div>
//       </div>
//       <div className="w-full flex flex-row lg:hidden items-center justify-between">
//         <h2 className="font-semibold text-base md:text-[20px] leading-8 text-[#121212] flex md:hidden ">
//           Living Room
//         </h2>
//         <div className="flex items-center gap-1  justify-end md:w-full ">
//           <SortBy />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FilterOptions;

"use client";
import { useShopPageStore } from "@/app/store/useShopPage.store";
import {
  Filter,
  FirstFilterIcon,
  FourthFilterIcon,
  SecondFilterIcon,
  ThirdFilterIcon,
} from "../../__atoms";
import { SortBy } from "../../__molecules";
import { sortIcons } from "@/app/commons/data";
import { useState } from "react";

const iconMap: Record<string, React.FC> = {
  FirstFilterIcon,
  SecondFilterIcon,
  ThirdFilterIcon,
  FourthFilterIcon,
};

const FilterOptions = () => {
  const {
    // sortedByFour,
    // sortByTwoVertically,
    // sortByTwoHorizontally,
    setsSortedByFour,
    setSortByTwoVertically,
    setSortByTwoHorizontally,
    resetAllByIconsSort,
  } = useShopPageStore();
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  // console.log(sortedByFour, "sortedByFour");
  // console.log(sortByTwoVertically, "sortByTwoVertically");
  // console.log(sortByTwoHorizontally, "sortByTwoHorizontally");

  return (
    <div className="w-full flex flex-col items-center justify-between gap-4">
      <div className="w-full flex items-center justify-between border-t border-t-[#E8ECEF] border-b border-b-[#E8ECEF] md:border-none">
        <div className="flex-1">
          <div className="flex items-center gap-2 md:hidden">
            <Filter />
            <p className="font-semibold text-[20px] leading-8 text-[#121212]">
              Filter
            </p>
          </div>
          <h2 className="font-semibold text-[20px] leading-8 text-[#121212] hidden md:flex">
            Living Room
          </h2>
        </div>

        <div className="w-full md:flex-1 flex items-center justify-end md:gap-4 lg:gap-8">
          <div className="lg:flex lg:justify-end items-center gap-1 hidden">
            <SortBy />
          </div>

          <div className="flex items-center">
            {sortIcons.map((item, i) => {
              const Icon = iconMap[item];
              const handleClick = (iconName: string) => {
                setActiveIcon(iconName);
                if (item === "SecondFilterIcon") {
                  setsSortedByFour(true);
                } else if (item === "ThirdFilterIcon") {
                  setSortByTwoVertically(true);
                } else if (item === "FourthFilterIcon") {
                  setSortByTwoHorizontally(true);
                } else {
                  resetAllByIconsSort();
                }
              };
              const hiddenOnSm =
                item === "FirstFilterIcon" || item === "SecondFilterIcon"
                  ? "hidden md:flex"
                  : "flex";

              return (
                <div
                  key={i}
                  onClick={() => handleClick(item)}
                  className={`w-[46px] h-[46px] ${hiddenOnSm} items-center justify-center cursor-pointer rounded-md ${
                    activeIcon === item ? "bg-gray-200" : ""
                  }`}
                >
                  {Icon && <Icon />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row lg:hidden items-center justify-between">
        <h2 className="font-semibold text-base md:text-[20px] leading-8 text-[#121212] flex md:hidden">
          Living Room
        </h2>
        <div className="flex items-center gap-1 justify-end md:w-full">
          <SortBy />
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
