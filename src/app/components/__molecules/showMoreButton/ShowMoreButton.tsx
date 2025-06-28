"use client";
import { useProductStore } from "@/app/store/product.store";
import { useShopPageStore } from "@/app/store/useShopPage.store";

export type ShowMoreButtonPropsType = {
  isWishlistPage?: boolean;
};

const ShowMoreButton = ({ isWishlistPage }: ShowMoreButtonPropsType) => {
  const { loadMoreProducts, productsData, productsDataLength } =
    useShopPageStore();
  const { wishlistData, loadMoreWishList, wishlistDataLength } =
    useProductStore();
const isAllLoaded = isWishlistPage
  ? wishlistData.length >= wishlistDataLength
  : productsData.length >= productsDataLength;
  return (
    <button
      onClick={() => {
        if (isWishlistPage) {
          loadMoreWishList();
        } else {
          loadMoreProducts();
        }
      }}
      disabled={isAllLoaded}
      className={`${
        isAllLoaded ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
      } text-base font-medium leading-[28px] tracking-[-0.4px] text-[#141718] py-[6px] px-10 rounded-[80px] border border-[#141718]`}
    >
      {isAllLoaded ? "No more products" : "Show more"}
    </button>
  );
};

export default ShowMoreButton;
