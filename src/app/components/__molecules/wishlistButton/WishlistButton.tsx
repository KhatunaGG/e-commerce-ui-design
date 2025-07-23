"use client";
import { useProductStore } from "@/app/store/product.store";
import { Heart } from "../../__atoms";

const WishlistButton = ({ params }: { params?: string }) => {
  const { updateProduct, productById } = useProductStore();

  const wishlist = productById?.wishlist ?? false;

  return (
    <button
      onClick={() => updateProduct(params ?? "", !wishlist)}
      className={`${
        params &&
        "w-[64.72%] border border-[#141718] rounded-[8px] bg-transparent py-[14px]"
      } w-full flex items-center justify-center gap-1`}
    >
      <Heart wishlist={wishlist} />
      <p
        className={`${
          wishlist && "text-red-500"
        } font-medium text-sm leading-[24px]`}
      >
        Wishlist
      </p>
    </button>
  );
};

export default WishlistButton;
