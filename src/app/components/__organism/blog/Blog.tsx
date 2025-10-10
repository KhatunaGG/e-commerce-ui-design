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
import { useBlogStore } from "@/app/store/blog.store";
import { SortSelect } from "../../__molecules";

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
  const { showOverlay, toggleOverlay, sortBlogs, setSortBlogs } =
    useBlogStore();

  const pathName = usePathname();
  const isBlogPage = pathName.includes("blog");
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
    <section className="w-full min-h-screen flex flex-col relative">
      {showOverlay && <Overlay isBlogPage={isBlogPage} />}

      {!isLoading && hasValidBanner && <Banner images={bannerImages} />}
      <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col pt-8 md:pt-6 pb-10">
        <div className="NAV w-full py-[9px] flex flex-col md:flex-row md:items-center md:justify-between ">
          <div className="w-fit flex items-center gap-6  md:flex-1">
            <h2 className="text-sm font-semibold leading-[22px] text-[#121212]">
              All Blog
            </h2>
            <button
              onClick={toggleOverlay}
              className="text-sm font-bold leading-[22px] text-[#121212] px-2 underline"
            >
              Create your blog
            </button>
          </div>

          <div className=" flex items-center justify-end gap-8 flex-1">
            <SortSelect
              value={sortBlogs}
              onChange={(order: "newest" | "oldest") => setSortBlogs(order)}
              isBlogPage={isBlogPage}
            />
            <SortByIcons
              sortIcons={sortIcons}
              activeIcon={activeIcon}
              setActiveIcon={setActiveIcon}
              onIconClick={handleIconClick}
              isBlogPage={isBlogPage}
            />
          </div>
        </div>

        <BlogList page={page} />
      </div>
    </section>
  );
};

export default Blog;
