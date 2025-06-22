"use client";
import { useProductsFilterStore } from "@/app/store/products.filter.store";
import { Heart } from "../../__atoms";

export type LabelPropsType = {
  productName?: string;
  price?: number;
  rate?: number;
  discount?: number;
};

const Label = ({ productName, rate, discount, price }: LabelPropsType) => {

  console.log(rate, "rate")

  // const calculateDiscount = (price: number, discount: number): string => {
  //   if (discount <= 0) return `$${price.toFixed(2)}`;
  //   const discountedPrice = price - (price * discount) / 100;
  //   return `$${discountedPrice.toFixed(2)}`;
  // };
  const calculateDiscount = (price?: number, discount?: number): string => {
  if (typeof price !== "number") return "-";
  if (!discount || discount <= 0) return `$${price.toFixed(2)}`;

  const discountedPrice = price - (price * discount) / 100;
  return `$${discountedPrice.toFixed(2)}`;
};

  const { sortByTwoVertically, sortByTwoHorizontally } =
    useProductsFilterStore();

  return (
    <div
      className={`${
        sortByTwoHorizontally ? "items-center justify-center px-4" : ""
      } w-full flex flex-col gap-4 `}
    >
      <div className="text-[#141718] w-full gap-1 flex flex-col items-start  ">
        <div className="text-sm text-yellow-500">★★★★★</div>
        <p className="text-base font-semibold leading-[26px]">{productName}</p>
        <div className="w-auto flex gap-2">
          <p className="text-sm font-semibold leading-[22px]">
            {calculateDiscount(price, discount)}
          </p>
          <p className="line-through text-[#6C7275] text-sm font-semibold leading-[22px]">
            ${price && price.toFixed(2)}
          </p>
        </div>
      </div>

      {(sortByTwoVertically || sortByTwoHorizontally) && (
        <p className=" text-[#6C7275] text-xs md:text-sm font-semibold leading-[22px] ">
          Super-soft cushion cover in off-white with a tactile pattern that
          enhances the different tones in the pile and base.
        </p>
      )}

      {sortByTwoHorizontally && (
        <div className="w-full flex flex-col gap-4">
          <button className={`${sortByTwoHorizontally ? "opacity-100" : "opacity-0"} w-full bg-[#141718] text-white rounded-lg py-[6.29px] lg:py-[9px] text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors`}>
            Add to cart
          </button>

          <button className="w-full flex items-center justify-center gap-1">
            <Heart />
            <p className="font-medium text-sm leading-[24px]">Wishlist</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default Label;
