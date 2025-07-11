"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useCallback } from "react";
import { AnimateSpin, SubText } from "../../__molecules";
import Hero from "../hero/Hero";
import ByRooms from "../byRooms/ByRooms";
import NewArrivals from "../newArrivals/NewArrivals";
import Info from "../info/Info";
import SaleOffer from "../saleOffer/SaleOffer";
import Articles from "../articles/Articles";
import { useHomePageStore } from "@/app/store/useHomePage.store.";
import { useShopStore } from "@/app/store/shop-page.store";
// import { useShopPageStore } from "@/app/store/useShopPage.store";

const Dashboard = () => {
  const path = usePathname();
  const {
    isLoading,
    setCurrentPage,
    imagesData,
    clearCurrentPageData,
    axiosError,
  } = useHomePageStore();

  const { cachedNewArrivalsByPage, getNewArrivalProductsFromApi } =
    useShopStore();

  const page = useMemo(
    () => path?.split("/").filter(Boolean).pop() || "home",
    [path]
  );

  const handlePageChange = useCallback(async () => {
    await setCurrentPage(page);
  }, [page, setCurrentPage]);

  useEffect(() => {
    handlePageChange();
    return () => {
      clearCurrentPageData();
    };
  }, [handlePageChange, clearCurrentPageData]);

  useEffect(() => {
    getNewArrivalProductsFromApi();
  }, [getNewArrivalProductsFromApi]);

  const newArrivalProducts = cachedNewArrivalsByPage?.["home"] ?? [];

  const heroImages = useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData)) return [];
    return imagesData.filter((img) => img.componentUsage?.includes("hero"));
  }, [imagesData]);

  const byRoomImages = useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData)) return [];
    return imagesData.filter((img) => img.componentUsage?.includes("byroom"));
  }, [imagesData]);

  const saleOfferImages = useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData)) return [];
    return imagesData.filter((img) =>
      img.componentUsage?.includes("saleoffer")
    );
  }, [imagesData]);

  const articleImages = useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData)) return [];
    return imagesData.filter((img) => img.componentUsage?.includes("article"));
  }, [imagesData]);

  if (isLoading) {
    return <AnimateSpin />;
  }

  if (axiosError) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-red-500">Error: {axiosError}</p>
      </div>
    );
  }

  return (
    <section className="w-full">
     
      {/* {showNavbar && <Navbar />} */}
      <div className="w-full h-full flex flex-col">
        <Hero images={heroImages} />
        <SubText />
        <ByRooms images={byRoomImages} />
        <NewArrivals images={newArrivalProducts} />
        <Info />
        <SaleOffer images={saleOfferImages} />
        <Articles images={articleImages} />
      </div>
    </section>
  );
};

export default Dashboard;
