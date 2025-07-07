"use client";
import { useProductStore } from "@/app/store/product.store";
import { useShopPageStore } from "@/app/store/useShopPage.store";

export type ShowMoreButtonPropsType = {
  isWishlistPage?: boolean;
};

const ShowMoreButton = ({ isWishlistPage }: ShowMoreButtonPropsType) => {
  const { loadMoreProducts, productsData, productsDataLength, isLoading } =
    useShopPageStore();
  const { wishlistData, loadMoreWishList, wishlistDataLength } =
    useProductStore();

  const safeProductsData = productsData || [];
  const isAllLoaded = isWishlistPage
    ? wishlistData.length >= wishlistDataLength
    : safeProductsData.length >= productsDataLength;


    console.log(safeProductsData.length, "safeProductsData.length from button")
    console.log(productsDataLength, "productsDataLength from button")


  return (
    <button
      onClick={() => {
        if (isWishlistPage) {
          loadMoreWishList();
        } else {
          loadMoreProducts();
        }
      }}
      disabled={isAllLoaded || isLoading}
      className={`${
        isAllLoaded || isLoading
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90"
      } text-base font-medium leading-[28px] tracking-[-0.4px] text-[#141718] py-[6px] px-10 rounded-[80px] border border-[#141718]`}
    >
      {/* {isAllLoaded ? "No more products" : "Show more"} */}
      {isAllLoaded
        ? "No more products"
        : isLoading
        ? "Loading..."
        : "Show more"}
    </button>
  );
};

export default ShowMoreButton;
