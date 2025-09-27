// "use client";
// import { useShopStore } from "@/app/store/shop-page.store";
// import {
//   Filter,
//   FirstFilterIcon,
//   FourthFilterIcon,
//   SecondFilterIcon,
//   ThirdFilterIcon,
// } from "../../__atoms";
// import { SortBy } from "../../__molecules";
// import { sortIcons } from "@/app/commons/data";
// import { useState } from "react";

// const iconMap: Record<string, React.FC> = {
//   FirstFilterIcon,
//   SecondFilterIcon,
//   ThirdFilterIcon,
//   FourthFilterIcon,
// };

// const FilterOptions = () => {
//   const {
//     // sortedByFour,
//     // sortByTwoVertically,
//     // sortByTwoHorizontally,
//     setsSortedByFour,
//     setSortByTwoVertically,
//     setSortByTwoHorizontally,
//     resetAllByIconsSort,
//   } = useShopStore();
//   const [activeIcon, setActiveIcon] = useState<string | null>(null);
//   const currentCategory = useShopStore.getState().filters.category;
//   // console.log(sortedByFour, "sortedByFour");
//   // console.log(sortByTwoVertically, "sortByTwoVertically");
//   // console.log(sortByTwoHorizontally, "sortByTwoHorizontally");

//   return (
//     <div className="w-full flex flex-col items-center justify-between gap-4">
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

//         <div className="w-full md:flex-1 flex items-center justify-end md:gap-4 lg:gap-8">
//           <div className="lg:flex lg:justify-end items-center gap-1 hidden">
//             <SortBy />
//           </div>

//           <div className="flex items-center">
//             {sortIcons.map((item, i) => {
//               const Icon = iconMap[item];
//               const handleClick = (iconName: string) => {
//                 setActiveIcon(iconName);
//                 if (item === "SecondFilterIcon") {
//                   setsSortedByFour(true);
//                 } else if (item === "ThirdFilterIcon") {
//                   setSortByTwoVertically(true);
//                 } else if (item === "FourthFilterIcon") {
//                   setSortByTwoHorizontally(true);
//                 } else {
//                   resetAllByIconsSort();
//                 }
//               };
//               const hiddenOnSm =
//                 item === "FirstFilterIcon" || item === "SecondFilterIcon"
//                   ? "hidden md:flex"
//                   : "flex";
//               return (
//                 <div
//                   key={i}
//                   onClick={() => handleClick(item)}
//                   className={`w-[46px] h-[46px] ${hiddenOnSm} items-center justify-center cursor-pointer rounded-md ${
//                     activeIcon === item ? "bg-gray-200" : ""
//                   }`}
//                 >
//                   {Icon && <Icon />}
//                 </div>
//               );
//             })}
//           </div>
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
import {
  Filter,
  // FirstFilterIcon,
  // FourthFilterIcon,
  // SecondFilterIcon,
  // ThirdFilterIcon,
} from "../../__atoms";
import { SortBy } from "../../__molecules";
import { sortIcons } from "@/app/commons/data";
import { useState } from "react";
import SortByIcons from "../sortByIcons/SortByIcons";

// const iconMap: Record<string, React.FC> = {
//   FirstFilterIcon,
//   SecondFilterIcon,
//   ThirdFilterIcon,
//   FourthFilterIcon,
// };

const FilterOptions = () => {
  const {
    // setsSortedByFour,
    // setSortByTwoVertically,
    // setSortByTwoHorizontally,
    // resetAllByIconsSort,
    handleIconClick
  } = useShopStore();
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const currentCategory = useShopStore.getState().filters.category;

  // const handleIconClick = (icon: string) => {
  //   switch (icon) {
  //     case "SecondFilterIcon":
  //       setsSortedByFour(true);
  //       break;
  //     case "ThirdFilterIcon":
  //       setSortByTwoVertically(true);
  //       break;
  //     case "FourthFilterIcon":
  //       setSortByTwoHorizontally(true);
  //       break;
  //     default:
  //       resetAllByIconsSort();
  //   }
  // };

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
            {currentCategory}
          </h2>
        </div>

        <div className="w-full md:flex-1 flex items-center justify-end md:gap-4 lg:gap-8">
          <div className="lg:flex lg:justify-end items-center gap-1 hidden">
            <SortBy />
          </div>

          {/* <SortByIcons
            sortIcons={sortIcons}
            setActiveIcon={setActiveIcon}
            setsSortedByFour={setsSortedByFour}
            setSortByTwoVertically={setSortByTwoVertically}
            setSortByTwoHorizontally={setSortByTwoHorizontally}
            resetAllByIconsSort={resetAllByIconsSort}
            activeIcon={activeIcon}
           onIconClick={handleIconClick}
          /> */}
          <SortByIcons
            sortIcons={sortIcons}
            setActiveIcon={setActiveIcon}
            activeIcon={activeIcon}
            onIconClick={handleIconClick}
          />
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
