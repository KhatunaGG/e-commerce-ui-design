"use client";
import { useHomePageStore } from "@/app/store/useHomePage.store.";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import Banner from "../banner/Banner";

const Blog = () => {
  const { imagesData, setCurrentPage, isLoading } = useHomePageStore();

  const pathName = usePathname();
  const page = useMemo(
    () => pathName?.split("/").pop() || "default",
    [pathName]
  );

  useEffect(() => {
    if (!page) return;
    setCurrentPage(page);
  }, [setCurrentPage, page]);

  const bannerImages = imagesData.filter(
    (img) =>
      img.componentUsage?.includes("banner") &&
      (img.pages?.includes(page) || img.pages?.includes("shop"))
  );

  // const bannerImages = imagesData.filter(
  //   (img) => img.componentUsage?.includes("banner")
  // );

  const hasValidBanner = bannerImages.length > 0;

  return (
    <section className="w-full min-h-screen bg-green-200">
      {!isLoading && hasValidBanner && <Banner images={bannerImages} />}
      <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col bg-red-200"></div>
    </section>
  );
};

export default Blog;
