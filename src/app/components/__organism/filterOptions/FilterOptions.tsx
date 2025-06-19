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

import React from "react";
import {
  Filter,
  FirstFilterIcon,
  FourthFilterIcon,
  ThirdFilterIcon,
} from "../../__atoms";
import SecondFilterIcon from "../../__atoms/secondFilterIcon.tsx/SecondFilterIcon";
import { SortBy } from "../../__molecules";

const FilterOptions = () => {
  return (
    <div className="w-full flex flex-col items-center justify-between gap-4  ">
      <div className="w-full flex items-center justify-between border-t border-t-[#E8ECEF] border-b border-b-[#E8ECEF] md:border-none">
        <div className="flex-1 fle">
          <div className="flex items-center  gap-2 md:hidden">
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
          <div className="lg:flex items-center gap-1 hidden  ">
            <SortBy />
          </div>
          <div className="flex items-center ">
            <div className="w-[46px] h-[46px] md:flex items-center justify-center hidden ">
              <FirstFilterIcon />
            </div>
            <div className="w-[46px] h-[46px] md:flex items-center justify-center hidden">
              <SecondFilterIcon />
            </div>
            <div className="w-[46px] h-[46px] flex items-center justify-self-center">
              <ThirdFilterIcon />
            </div>
            <div className="w-[46px] h-[46px] flex items-center justify-center ">
              <FourthFilterIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row lg:hidden items-center justify-between">
        <h2 className="font-semibold text-base md:text-[20px] leading-8 text-[#121212] flex md:hidden ">
          Living Room
        </h2>
        <div className="flex items-center gap-1  md:justify-end md:w-full ">
          <SortBy />
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
