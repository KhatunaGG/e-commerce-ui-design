"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

import { AnimateSpin } from "../../__molecules";
import Banner from "../banner/Banner";
import FilterSection from "../filterSection/FilterSection";
import Products from "../products/Products";
import { useHomePageStore } from "@/app/store/useHomePage.store.";
import { useShopPageStore } from "@/app/store/useShopPage.store";

const Shop = () => {
  const pathName = usePathname();

  const {
    imagesData,
    currentPage: shopCurrentPage,
    isLoading,
    getAllImages,
    clearCurrentPageData: clearHomePageData,
    setCurrentPage,
  } = useHomePageStore();

  const {
    getAllProducts,
    clearCurrentPageData: clearShopPageData,
    sortedByFour,
    sortByTwoVertically,
    sortByTwoHorizontally,
  } = useShopPageStore();

  // Extract current page from path
  const page = useMemo(() => pathName?.split("/").pop() || "default", [pathName]);

  // On page change, fetch data and set current page
  useEffect(() => {
    if (page && page !== shopCurrentPage) {
      setCurrentPage(page);
      getAllImages(page);
      getAllProducts(page);
    }
  }, [page, shopCurrentPage, setCurrentPage, getAllImages, getAllProducts]);

  // Clear data on unmount
  useEffect(() => {
    return () => {
      clearHomePageData();
      clearShopPageData();
      
    };
  }, [clearHomePageData, clearShopPageData]);

  const isResorted = sortedByFour || sortByTwoVertically || sortByTwoHorizontally;

  const bannerImages = useMemo(
    () => imagesData.filter((img) => img.componentUsage?.includes("banner")) || [],
    [imagesData]
  );

  if (isLoading) return <AnimateSpin />;

  return (
    <section className="w-full min-h-screen">
      <Banner images={bannerImages} />
      <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col md:flex-row items-start justify-start pt-10 pb-[100px] gap-6">
        {!isResorted && <FilterSection />}
        {imagesData.length > 0 && <Products />}
      </div>
    </section>
  );
};

export default Shop;
