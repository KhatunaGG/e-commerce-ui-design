"use client";
import { useBlogStore } from "@/app/store/blog.store";
import Overlay from "../overlay/Overlay";
import { ChevronLeft, ChevronRight } from "../../__atoms";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useShopStore } from "@/app/store/shop-page.store";

import Article from "../article/Article";

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

  console.log("blogByParams", blogByParams);

  return (
    <section className="w-full bg-green-200  min-h-[calc(100vh-61px)]">
      <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col pt-8 md:pt-6 pb-10  min-h-screen relative">
        {showOverlay && <Overlay blogId={params} />}

        <div className="w-full flex flex-col items-center  gap-4 md:gap-10">
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
              <button onClick={toggleOverlay}>Create your Article</button>
            </div>
            <div className="w-full flex items-start">
              <button
                onClick={() => router.push(`/${page}`)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="mt-1">
                  <ChevronLeft />
                </div>
                <span>Back</span>
              </button>
            </div>

            <div className="w-full ">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserBlogItems;
