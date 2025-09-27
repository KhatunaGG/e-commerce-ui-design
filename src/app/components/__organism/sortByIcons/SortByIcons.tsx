import {
  FirstFilterIcon,
  SecondFilterIcon,
  ThirdFilterIcon,
  FourthFilterIcon,
} from "../../__atoms";

// export type SortByIconsProps = {
//   sortIcons: string[];
//   setActiveIcon: (val: string | null) => void;
//   setsSortedByFour: (v: boolean) => void;
//   setSortByTwoVertically: (v: boolean) => void;
//   setSortByTwoHorizontally: (v: boolean) => void;
//   resetAllByIconsSort: () => void;
//   activeIcon: string | null;
//   onIconClick?: (icon: string) => void;
// };

export type SortByIconsProps = {
  sortIcons: string[];
  activeIcon: string | null;
  setActiveIcon: (val: string | null) => void;
  onIconClick?: (icon: string) => void;
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
//   setsSortedByFour,
//   setSortByTwoVertically,
//   setSortByTwoHorizontally,
//   resetAllByIconsSort,
  onIconClick,
}: SortByIconsProps) => {
  return (
    <div className="flex items-center">
      {sortIcons.map((item, i) => {
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
