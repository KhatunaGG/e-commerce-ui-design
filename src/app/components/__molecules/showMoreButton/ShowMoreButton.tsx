"use client";
import { useProductStore } from "@/app/store/product.store";
import { useShopStore } from "@/app/store/shop-page.store";
import { useBlogStore } from "@/app/store/blog.store";
import { ShowMoreButtonPropsType } from "@/app/interfaces/interface";

const ShowMoreButton = ({
  isWishlistPage,
  isAccountWishlistPage,
  isBlogPage,
}: ShowMoreButtonPropsType) => {
  const {
    loadMoreProducts,
    hasMoreProducts,
    isLoadingMore,
    isLoading,
    productsData,
    productsDataTotalLength,
  } = useShopStore();

  const {
    wishlistData,
    wishlistDataLength,
    isLoading: isLoadingFromProducts,
    loadMoreWishList,
  } = useProductStore();

  const {
    blogsData,
    blogsTotalLength,
    isLoading: isLoadingBlogs,
    getAllBlogs,
  } = useBlogStore();

  const isAnyWishlist = isWishlistPage || isAccountWishlistPage;

  const handleLoadMore = async () => {
    if (isBlogPage) {
      await getAllBlogs();
      return;
    }
    if (!isAnyWishlist) {
      if (!isLoadingMore) {
        await loadMoreProducts();
      }
    } else {
      await loadMoreWishList();
    }
  };

  const isDisabled = isBlogPage
    ? !blogsData ||
      blogsData.length === 0 ||
      blogsData.length >= blogsTotalLength ||
      isLoadingBlogs
    : isAnyWishlist
    ? !wishlistData ||
      wishlistData.length === 0 ||
      wishlistData.length >= wishlistDataLength
    : (productsDataTotalLength > 0 && !hasMoreProducts()) ||
      isLoadingMore ||
      isLoading;

  const getButtonText = () => {
    if (isBlogPage) {
      if (isLoadingBlogs) return "Loading...";
      if (!blogsData || blogsData.length === 0) return "No blogs";
      if (blogsData.length >= blogsTotalLength) return "All blogs loaded";
      return "Show more";
    }

    if (isAnyWishlist) {
      if (isLoading || isLoadingFromProducts) return "Loading...";
      if (!wishlistData || wishlistData.length === 0) return "No items";
      if (wishlistData.length >= wishlistDataLength) return "All items loaded";
      return "Show more";
    } else {
      if (isLoading || isLoadingFromProducts || isLoadingMore)
        return "Loading...";
      if (
        productsData.length === 0 &&
        productsDataTotalLength === 0 &&
        !isLoading
      )
        return "No products";
      if (productsDataTotalLength > 0 && !hasMoreProducts())
        return "All products loaded";
      return "Show more";
    }
  };

  if (
    !isAnyWishlist &&
    !isBlogPage &&
    productsData.length === 0 &&
    productsDataTotalLength === 0 &&
    !isLoadingMore &&
    !isLoading &&
    !isLoadingFromProducts
  ) {
    return null;
  }
  return (
    <button
      onClick={handleLoadMore}
      disabled={isDisabled}
      className={`text-base font-medium leading-[28px] tracking-[-0.4px] text-[#141718] py-[6px] px-10 rounded-[80px] border border-[#141718] ${
        isDisabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:opacity-90 cursor-pointer"
      }`}
    >
      {getButtonText()}
    </button>
  );
};

export default ShowMoreButton;
