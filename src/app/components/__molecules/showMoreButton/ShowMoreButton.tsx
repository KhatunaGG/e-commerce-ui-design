"use client";
import { useProductStore } from "@/app/store/product.store";
import { useShopStore } from "@/app/store/shop-page.store";
// import { useShopPageStore } from "@/app/store/useShopPage.store";

export type ShowMoreButtonPropsType = {
  isWishlistPage?: boolean;
};

const ShowMoreButton = ({ isWishlistPage }: ShowMoreButtonPropsType) => {
  const { loadMoreProducts,
    //  productsData, 
    // productsDataLengthByKey, isLoading, 
    // productsDataTotalLength 
  } =
    useShopStore();
  const { 
    // wishlistData, 
    loadMoreWishList} =
    useProductStore();

  // const safeProductsData = productsData || [];
  // const isAllLoaded = isWishlistPage
  //   ? wishlistData.length >= wishlistDataLength
  //   : safeProductsData.length >= productsDataTotalLength;

  return (
    <button
      onClick={() => {
        if (isWishlistPage) {
          loadMoreWishList();
        } else {
          loadMoreProducts();
        }
      }}
      // disabled={isAllLoaded || isLoading}
      className={`
        
      
      text-base font-medium leading-[28px] tracking-[-0.4px] text-[#141718] py-[6px] px-10 rounded-[80px] border border-[#141718]`}
    >
      Show more
      {/* {isAllLoaded
        ? "No more products"
        : isLoading
        ? "Loading..."
        : "Show more"} */}
    </button>
  );
};

export default ShowMoreButton;




