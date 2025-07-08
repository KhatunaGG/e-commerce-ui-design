"use client";
export type AddToCartButtonPropsType = {
  // sortByTwoHorizontally?: boolean;
  onClick?: () => void;
};

const AddToCartButton = ({ onClick  }: AddToCartButtonPropsType) => {
  return (
    <button
      onClick={onClick}
      className={`
      w-full bg-[#141718] text-white rounded-lg py-[8px] md:py-[6.29px] lg:py-[9px] text-sm md:text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors duration-300`}
    >
      Add to cart
    </button>
  );
};

export default AddToCartButton;

//   ${
//   sortByTwoHorizontally ? "opacity-0" : "opacity-100"
// }
