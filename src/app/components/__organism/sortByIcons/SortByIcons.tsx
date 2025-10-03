// import {
//   FirstFilterIcon,
//   SecondFilterIcon,
//   ThirdFilterIcon,
//   FourthFilterIcon,
// } from "../../__atoms";

// export type SortByIconsProps = {
//   sortIcons: string[];
//   activeIcon: string | null;
//   setActiveIcon: (val: string | null) => void;
//   onIconClick?: (icon: string) => void;

//   isBlogPage?: boolean;
// };

// const iconMap: Record<string, React.FC> = {
//   FirstFilterIcon,
//   SecondFilterIcon,
//   ThirdFilterIcon,
//   FourthFilterIcon,
// };

// const SortByIcons = ({
//   activeIcon,
//   sortIcons,
//   setActiveIcon,
//   onIconClick,
//    isBlogPage = false,
// }: SortByIconsProps) => {
//   return (
//     <div className="flex items-end">
//       {sortIcons.map((item, i) => {
//         if (
//           isBlogPage &&
//           (item === "FirstFilterIcon" || item === "SecondFilterIcon")
//         ) {
//           return null;
//         }

//         const Icon = iconMap[item];
//         const hiddenOnSm =
//           item === "FirstFilterIcon" || item === "SecondFilterIcon"
//             ? "hidden md:flex"
//             : "flex";

//         return (
//           <div
//             key={i}
//             onClick={() => {
//               setActiveIcon(item);
//               onIconClick?.(item);
//             }}
//             className={`w-[46px] h-[46px] ${hiddenOnSm} items-center justify-center cursor-pointer rounded-md ${
//               activeIcon === item ? "bg-gray-200" : ""
//             }`}
//           >
//             {Icon && <Icon />}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default SortByIcons;

"use client";
import { useEffect } from "react";
import {
  FirstFilterIcon,
  SecondFilterIcon,
  ThirdFilterIcon,
  FourthFilterIcon,
} from "../../__atoms";

export type SortByIconsProps = {
  sortIcons: string[];
  activeIcon: string | null;
  setActiveIcon: (val: string | null) => void;
  onIconClick?: (icon: string) => void;

  isBlogPage?: boolean;
};

const iconMap: Record<string, React.FC> = {
  FirstFilterIcon,
  SecondFilterIcon,
  ThirdFilterIcon,
  FourthFilterIcon,
};

const SortByIcons = ({
  activeIcon,
  sortIcons,
  setActiveIcon,
  onIconClick,
  isBlogPage = false,
}: SortByIconsProps) => {
  // useEffect(() => {
  //   if (isBlogPage && !activeIcon && sortIcons.includes("ThirdFilterIcon")) {
  //     setActiveIcon("ThirdFilterIcon");
  //     onIconClick?.("ThirdFilterIcon");
  //   }
  // }, [isBlogPage, activeIcon, sortIcons, setActiveIcon, onIconClick]);

  // useEffect(() => {
  //   if (isBlogPage && !activeIcon && sortIcons.includes("ThirdFilterIcon")) {
  //     setActiveIcon("ThirdFilterIcon");
  //     onIconClick?.("ThirdFilterIcon");
  //   } else if (
  //     !isBlogPage &&
  //     !activeIcon &&
  //     sortIcons.includes("FirstFilterIcon")
  //   ) {
  //     setActiveIcon("FirstFilterIcon");
  //     onIconClick?.("FirstFilterIcon");
  //   }

  useEffect(() => {
    if (isBlogPage && !activeIcon && sortIcons.includes("ThirdFilterIcon")) {
      setActiveIcon("ThirdFilterIcon");
      onIconClick?.("ThirdFilterIcon");
    } else if (
      !isBlogPage &&
      !activeIcon &&
      sortIcons.includes("FirstFilterIcon")
    ) {
      setActiveIcon("FirstFilterIcon");
      onIconClick?.("FirstFilterIcon");
    }else if (
      !isBlogPage &&
      !activeIcon &&
      sortIcons.includes("ThirdFilterIcon")
    ) {
      setActiveIcon("ThirdFilterIcon");
      onIconClick?.("ThirdFilterIcon");
    } 
  }, [isBlogPage, activeIcon, sortIcons, setActiveIcon, onIconClick]);

  return (
    <div className="flex items-end">
      {sortIcons.map((item, i) => {
        if (
          isBlogPage &&
          (item === "FirstFilterIcon" || item === "SecondFilterIcon")
        ) {
          return null;
        }

        const Icon = iconMap[item];
        const hiddenOnSm =
          item === "FirstFilterIcon" || item === "SecondFilterIcon"
            ? "hidden md:flex"
            : "flex";

        return (
          <div
            key={i}
            onClick={() => {
              setActiveIcon(item);
              onIconClick?.(item);
            }}
            className={`w-[46px] h-[46px] ${hiddenOnSm} items-center justify-center cursor-pointer rounded-md ${
              activeIcon === item ? "bg-gray-200" : ""
            }`}
          >
            {Icon && <Icon />}
          </div>
        );
      })}
    </div>
  );
};

export default SortByIcons;
