"use client";
import { useBlogStore } from "@/app/store/blog.store";
import Overlay from "../overlay/Overlay";
import { ChevronLeft, ChevronRight } from "../../__atoms";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useShopStore } from "@/app/store/shop-page.store";

import Article from "../article/Article";
import Articles from "../articles/Articles";

export type UserBlogItemsProps = {
  params: string;
};

const UserBlogItems = ({ params }: UserBlogItemsProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const { normalizeFirstChar } = useShopStore();

  const { showOverlay, toggleOverlay, getBlogById, blogByParams } =
    useBlogStore();

  const page = useMemo(() => {
    const parts = pathName?.split("/") || [];
    return parts[1] || "default";
  }, [pathName]);

  useEffect(() => {
    const fetchBlogById = async () => {
      try {
        await getBlogById(params);
      } catch (error) {
        console.error("Failed to fetch blog by ID:", error);
      }
    };
    fetchBlogById();
  }, [getBlogById, params]);

  const articleArray = Array.isArray(blogByParams?.articles)
    ? blogByParams!.articles
    : [];

  return (
    <section className="w-full min-h-[calc(100vh-61px)]">
      <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col pt-8 md:pt-6 pb-10  min-h-screen relative">
        {showOverlay && <Overlay blogId={params} />}

        <div className="w-full flex flex-col items-center  gap-4 md:gap-10 ">
          <div className="w-full flex flex-col gap-4 ">
            <div className="w-full flex flex-col lg:flex-row items-start gap-4 lg:gap-0 lg:items-center justify-between ">
              <div className="hidden md:flex items-center gap-4 text-sm font-medium leading-[24px]">
                <ChevronRight />
                <span>Home</span>
                <ChevronRight />
                <span>{normalizeFirstChar(page)}</span>
                <ChevronRight />
                <span>{blogByParams?.title}</span>
              </div>
              <button onClick={toggleOverlay} className="text-sm font-bold leading-[22px] text-[#121212] px-2 underline">Create your Article</button>
            </div>
            <div className="w-full flex items-start">
              <button
                onClick={() => router.push(`/${page}`)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="mt-[3px]">
                  <ChevronLeft dark={true} />
                </div>
                <span className="text-sm md:text-base font-bold text-[#121212]">Back</span>
              </button>
            </div>

            {/* <div className="w-full ">
              {articleArray.map((article) => {
                return (
                  <Article
                    key={`${article._id}-${article?.articleTitle}`}
                    {...article}
                    blogOwenName={blogByParams?.authorFName ?? ""}
                    blogOwnerLastName={blogByParams?.authorLName ?? ""}
                    blogId={params}
                  />
                );
              })}
            </div> */}

            <div className="w-full">
              {articleArray.length > 0 ? (
                articleArray.map((article) => (
                  <Article
                    key={`${article._id}-${article?.articleTitle}`}
                    {...article}
                    blogOwenName={blogByParams?.authorFName ?? ""}
                    blogOwnerLastName={blogByParams?.authorLName ?? ""}
                    blogId={params} 
                  />
                ))
              ) : (
                <div className="w-full text-center flex items-center justify-center text-xs md:text-base text-red-600 italic">
                  <h2>
                    You haven’t added any articles yet. Start sharing your
                    thoughts!
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {articleArray.length > 0 && <Articles blogId={params} />}
    </section>
  );
};

export default UserBlogItems;
