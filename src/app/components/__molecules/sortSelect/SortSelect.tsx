// "use client";
// import { Down } from "../../__atoms";

// export type SortSelectProps = {
//   value: "newest" | "oldest";
//   onChange: (value: "newest" | "oldest") => void;
//   isBlogPage?: boolean;
// };

// const SortSelect = ({ value, onChange, isBlogPage }: SortSelectProps) => {
//   return (
//     // <div className="w-full relative inline-block  md:max-w-[22.85%] bg-yellow-200">
//     <div className={`${isBlogPage ? "w-full md:w-[40%] lg:w-[20%]": "w-full  md:max-w-[22.85%]"}  relative inline-block `}>
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value as "newest" | "oldest")}
//         className="peer appearance-none w-full  px-4  py-[14px] border border-[#E8ECEF] rounded-md text-sm outline-none"
//       >
//         <option value="newest" className="outline-none">
//           Newest
//         </option>
//         <option value="oldest" className="outline-none">
//           Oldest
//         </option>
//       </select>
//       <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500       transition-transform duration-300 peer-focus:rotate-180">
//         <Down />
//       </div>
//     </div>
//   );
// };

// export default SortSelect;

"use client";
import { useState } from "react";
import { Down } from "../../__atoms";

export type SortSelectProps = {
  value: "newest" | "oldest";
  onChange: (value: "newest" | "oldest") => void;
  isBlogPage?: boolean;
};

const SortSelect = ({ value, onChange, isBlogPage }: SortSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as "newest" | "oldest");
    setIsOpen(false);
  };

  return (
    <div
      className={`${
        isBlogPage
          ? "w-full md:w-[40%] lg:w-[20%]"
          : "w-full  md:max-w-[22.85%]"
      }  relative inline-block `}
    >
      <select
        value={value}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="appearance-none w-full  px-4  py-[14px] border border-[#E8ECEF] rounded-md text-sm outline-none"
      >
        <option value="newest" className="outline-none">
          Newest
        </option>
        <option value="oldest" className="outline-none">
          Oldest
        </option>
      </select>
       <div
        className={`${
          isOpen ? "rotate-180" : "rotate-0"
        } pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-transform duration-300 `}
      >
        <Down />
      </div>
    </div>
  );
};

export default SortSelect;
