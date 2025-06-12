import { ArrowRight } from "../../__atoms";

export type MoreButtonPropsType = {
  handleMoreProducts: () => void;
  styleClass: string;
};

const MoreButton = ({ handleMoreProducts, styleClass }: MoreButtonPropsType) => {
  return (
    <button
      onClick={handleMoreProducts}
      className={`flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer ${styleClass}`}
    >
      <p className="text-[#141718] text-base font-medium leading-[28px] tracking-[-0.4px]">
        More Products
      </p>
      <span className="w-[20px] h-[20px] mt-[2px]">
        <ArrowRight />
      </span>
    </button>
  );
};

export default MoreButton;
