"use client";
export type AddToCartButtonPropsType = {
  // sortByTwoHorizontally?: boolean;
  onClick?: (id: string, color?: string | null, qty?: number) => void;
  params?: string;
  selectedQty?: number;
  selectedColor?: string | null;
};

// const AddToCartButton = ({
//   onClick,
//   params,
//   selectedQty,
//   selectedColor,
// }: AddToCartButtonPropsType) => {
//   const isItemAddFromParams = params && selectedColor && selectedQty && selectedQty > 0;
//   return (
//     <button
//       onClick={() => {
//         if (params && isItemAddFromParams) {
//           onClick?.(params, selectedColor, selectedQty);
//         } else if (params) {
//           onClick?.(params);
//         }
//       }}
//       // onClick={onClick}
//       className={`
//       w-full bg-[#141718] text-white rounded-lg py-[8px] md:py-[6.29px] lg:py-[9px] text-sm md:text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors duration-300`}
//     >
//       Add to cart
//     </button>
//   );
// };

const AddToCartButton = ({
  onClick,
  params,
  selectedQty,
  selectedColor,
}: AddToCartButtonPropsType) => {
  const isValidToAdd =
    !params || 
    (selectedColor !== null && selectedQty !== undefined && selectedQty > 0); 

  return (
    <button
      onClick={() => {
        if (!isValidToAdd) {
          console.warn("Please select quantity and color before adding to cart");
          return;
        }
        if (params) {
          onClick?.(params, selectedColor, selectedQty);
        } else {
          onClick?.(params!);
        }
      }}
      className={`
        w-full bg-[#141718] text-white rounded-lg py-[8px] md:py-[6.29px] lg:py-[9px]
        text-sm md:text-base font-medium leading-[28px] tracking-[-0.4px]
        hover:bg-gray-800 transition-colors duration-300
      `}
    >
      Add to cart
    </button>
  );
};


export default AddToCartButton;
