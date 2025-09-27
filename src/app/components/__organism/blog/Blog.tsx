// "use client";
// import { useHomePageStore } from "@/app/store/useHomePage.store.";
// import { usePathname } from "next/navigation";
// import { useEffect, useMemo } from "react";
// import Banner from "../banner/Banner";

// const Blog = () => {
//   const { imagesData, setCurrentPage, isLoading } = useHomePageStore();
//   const pathName = usePathname();
//   const page = useMemo(
//     () => pathName?.split("/").pop() || "default",
//     [pathName]
//   );

//   useEffect(() => {
//     if (!page) return;
//     setCurrentPage(page);
//   }, [setCurrentPage, page]);

//   const bannerImages = imagesData.filter(
//     (img) =>
//       img.componentUsage?.includes("banner") &&
//       (img.pages?.includes(page) || img.pages?.includes("shop"))
//   );

//   // const bannerImages = imagesData.filter(
//   //   (img) => img.componentUsage?.includes("banner")
//   // );

//   const hasValidBanner = bannerImages.length > 0;

//   return (
//     <section className="w-full min-h-screen bg-green-200">
//       {!isLoading && hasValidBanner && <Banner images={bannerImages} />}
//       <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col bg-red-200"></div>
//     </section>
//   );
// };

// export default Blog;

"use client";
import { useHomePageStore } from "@/app/store/useHomePage.store.";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Banner from "../banner/Banner";
import SortByIcons from "../sortByIcons/SortByIcons";
import { useShopStore } from "@/app/store/shop-page.store";
import { sortIcons } from "@/app/commons/data";
import BlogList from "../blogList/BlogList";
import Overlay from "../overlay/Overlay";

const Blog = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const {
    imagesData,
    setCurrentPage,
    getAllImages,
    isLoading,
    clearCurrentPageData,
  } = useHomePageStore();
  const { handleIconClick } = useShopStore();

  const pathName = usePathname();
  const page = useMemo(
    () => pathName?.split("/").pop() || "default",
    [pathName]
  );
  useEffect(() => {
    if (!page) return;
    clearCurrentPageData();
    setCurrentPage(page);
    getAllImages(page);
  }, [setCurrentPage, getAllImages, clearCurrentPageData, page]);

  const bannerImages = imagesData.filter(
    (img) =>
      img.componentUsage?.includes("banner") &&
      (img.pages?.includes(page) || img.pages?.includes("blog"))
  );
  const hasValidBanner = bannerImages.length > 0;
  return (
    <section className="w-full min-h-screen bg-green-200 flex flex-col relative">
      <Overlay />
      {!isLoading && hasValidBanner && <Banner images={bannerImages} />}
      <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col bg-red-200 pt-8 md:pt-6 pb-10">
        <div className="NAV w-full py-[9px] flex items-center justify-between">
          <h2 className="text-sm font-semibold leading-[22px] text-[#121212]">
            All Blog
          </h2>
          <SortByIcons
            sortIcons={sortIcons}
            activeIcon={activeIcon}
            setActiveIcon={setActiveIcon}
            onIconClick={handleIconClick}
          />
        </div>
        <BlogList />
      </div>
    </section>
  );
};

export default Blog;
