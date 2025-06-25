import React from "react";
import { Heart } from "../../__atoms";

export type WishlistButtonPropsType = {
  params?: string;
};

const WishlistButton = ({ params }: WishlistButtonPropsType) => {
  return (
    <button
      className={`${
        params &&
        "w-[64.72%] border border-[#141718] rounded-[8px] bg-transparent py-[14px]"
      } w-full flex items-center justify-center gap-1`}
    >
      <Heart />
      <p className="font-medium text-sm leading-[24px]">Wishlist</p>
    </button>
  );
};

export default WishlistButton;
