"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { AnimateSpin } from "../../__molecules";
import Banner from "../banner/Banner";
import FilterSection from "../filterSection/FilterSection";
import Products from "../products/Products";
import { useHomePageStore } from "@/app/store/useHomePage.store.";
import { useShopStore } from "@/app/store/shop-page.store";
import { CategoryFilter } from "@/app/interfaces/interface";

const Shop = () => {
  const pathName = usePathname();
  const page = useMemo(
    () => pathName?.split("/").pop() || "default",
    [pathName]
  );
  const searchParams = useSearchParams();
  const { setFilters } = useShopStore();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setFilters({
        category: decodeURIComponent(category) as CategoryFilter,
        priceRange: null,
      });
    } else {
      setFilters({
        category: null,
        priceRange: null,
      });
    }
  }, [searchParams, setFilters]);

  const {
    imagesData,
    isLoading: homeLoading,
    getAllImages,
    clearCurrentPageData: clearHomePageData,
  } = useHomePageStore();
  const {
    isLoading: shopLoading,
    clearCurrentPageData: clearShopPageData,
    sortedByFour,
    sortByTwoVertically,
    sortByTwoHorizontally,
  } = useShopStore();

  const { getProductsFromCacheOrApi } = useShopStore();

  useEffect(() => {
    if (!page) return;
    clearHomePageData();
    clearShopPageData();
    getAllImages(page);
    getProductsFromCacheOrApi();
  }, [
    page,
    clearHomePageData,
    clearShopPageData,
    getAllImages,
    getProductsFromCacheOrApi,
  ]);

  if (homeLoading || shopLoading) return <AnimateSpin />;

  const bannerImages =
    imagesData.filter((img) => img.componentUsage?.includes("banner")) || [];
  const isResorted =
    sortedByFour || sortByTwoVertically || sortByTwoHorizontally;

  return (
    <section className="w-full min-h-screen">
      <Banner images={bannerImages} />
      <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col md:flex-row items-start justify-start pt-10 pb-[100px] gap-6">
        {!isResorted && <FilterSection />}
        <Products />
      </div>
    </section>
  );
};

export default Shop;
