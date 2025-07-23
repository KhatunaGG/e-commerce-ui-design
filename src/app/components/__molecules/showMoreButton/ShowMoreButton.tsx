"use client";
import { useProductStore } from "@/app/store/product.store";
import { useShopStore } from "@/app/store/shop-page.store";

export type ShowMoreButtonPropsType = {
  isWishlistPage?: boolean;
};

const ShowMoreButton = ({ isWishlistPage }: ShowMoreButtonPropsType) => {
  const {
    loadMoreProducts,
    hasMoreProducts,
    isLoadingMore,
    isLoading, // Add this to track initial loading state
    productsData,
    productsDataTotalLength,
  } = useShopStore();

  const {
    wishlistData,
    wishlistDataLength,
    isLoading: isLoadingFromProducts,
    loadMoreWishList,
  } = useProductStore();

  const handleLoadMore = async () => {
    if (hasMoreProducts() && !isLoadingMore) {
      await loadMoreProducts();
    }
  };

  // Enhanced logic for determining if button should be disabled
  const isDisabled = isWishlistPage
    ? !wishlistData ||
      wishlistData.length === 0 ||
      wishlistData.length >= wishlistDataLength
    : !hasMoreProducts() ||
      isLoadingMore ||
      isLoading ||
      isLoadingFromProducts ||
      (productsData.length === 0 && productsDataTotalLength === 0);

  // Debug logging (remove in production)
  // if (!isWishlistPage) {
  //   console.log("ShowMoreButton Debug:", {
  //     hasMore: hasMoreProducts(),
  //     isLoadingMore,
  //     isLoading,
  //     currentLength: productsData.length,
  //     totalLength: productsDataTotalLength,
  //     isDisabled,
  //     // Add this to see the exact comparison
  //     comparison: `${productsData.length} < ${productsDataTotalLength} = ${
  //       productsData.length < productsDataTotalLength
  //     }`,
  //   });
  // }

  const getButtonText = () => {
    if (isWishlistPage) {
      if (isLoading || isLoadingFromProducts) return "Loading...";
      if (!wishlistData || wishlistData.length === 0) return "No items";
      if (wishlistData.length >= wishlistDataLength) return "All items loaded";
      return "Show more";
    } else {
      if (isLoading || isLoadingFromProducts || isLoadingMore)
        return "Loading...";
      if (productsData.length === 0 && productsDataTotalLength === 0)
        return "No products";
      if (!hasMoreProducts()) return "All products loaded";
      return "Show more";
    }
  };

  // Always render the button, but disable it when appropriate
  // Don't render only if there are truly no products at all and not loading
  if (
    (!isWishlistPage &&
      productsData.length === 0 &&
      productsDataTotalLength === 0 &&
      !isLoadingMore &&
      !isLoading) ||
    isLoadingFromProducts
  ) {
    return null;
  }

  return (
    <button
      onClick={async () => {
        if (isWishlistPage) {
          await loadMoreWishList();
        } else {
          await handleLoadMore();
        }
      }}
      disabled={isDisabled}
      className={`
        text-base font-medium leading-[28px] tracking-[-0.4px] text-[#141718] py-[6px] px-10 rounded-[80px] border border-[#141718]
        ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:opacity-90 cursor-pointer"
        }
      `}
    >
      {getButtonText()}
    </button>
  );
};

export default ShowMoreButton;
