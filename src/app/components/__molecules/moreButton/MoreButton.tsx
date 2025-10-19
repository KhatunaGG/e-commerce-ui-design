import { MoreButtonPropsType } from "@/app/interfaces/interface";
import { ArrowRight } from "../../__atoms";

const MoreButton = ({
  handleMoreProducts,
  styleClass,
  label = "More Products",
}: MoreButtonPropsType) => {
  return (
    <button
      onClick={handleMoreProducts}
      className={`flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer  pl-[8.53%]  ${styleClass}`}
    >
      <p className="text-[#141718] text-base font-medium leading-[28px] tracking-[-0.4px] whitespace-nowrap">
        {label}
      </p>
      <span className="w-[20px] h-[20px] mt-[2px]">
        <ArrowRight />
      </span>
    </button>
  );
};

export default MoreButton;
