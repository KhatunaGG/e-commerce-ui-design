"use client";

import { useBlogStore } from "@/app/store/blog.store";
import Overlay from "../overlay/Overlay";
import { ChevronLeft, ChevronRight } from "../../__atoms";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useShopStore } from "@/app/store/shop-page.store";

export type UserBlogItemsProps = {
  params: string;
};

const UserBlogItems = ({ params }: UserBlogItemsProps) => {
  const pathName = usePathname();
  const router = useRouter()

  const { showOverlay, toggleOverlay } = useBlogStore();
  const { normalizeFirstChar } = useShopStore();
  const page = useMemo(() => {
    const parts = pathName?.split("/") || [];
    return parts[1] || "default";
  }, [pathName]);


  return (
    <section className="w-full bg-green-200  max-h-[calc(100vh-61px)]">
      <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col pt-8 md:pt-6 pb-10  min-h-screen relative">
        {showOverlay && <Overlay blogId={params} />}

        <div className="w-full flex flex-col items-center  gap-4 md:gap-10">
          <div className="11111111111111   w-full flex flex-col gap-4 bg-blue-300">
            <div className="w-full flex flex-col lg:flex-row items-start gap-4 lg:gap-0 lg:items-center justify-between bg-yellow-300">
              <div className="flex items-center gap-4">
                <ChevronRight />
                <span>Home</span>
                <ChevronRight />
                <span>{normalizeFirstChar(page)}</span>
                <ChevronRight />
                <span>Title</span>
              </div>
              <button
              onClick={toggleOverlay}
              >Create your Article</button>
            </div>
            <div className="w-full flex items-start">
              <button
              onClick={() => router.push(`/${page}`)}
              className="flex items-center gap-2 cursor-pointer">
                <div className="mt-1">
                  <ChevronLeft />
                </div>
                <span>Back</span>
              </button>
            </div>

            <div className="w-full flex flex-col gap-6 mt-[36px] lg:mt-[48px] bg-violet-300">
              <p>article</p>
              <h1>Title</h1>
              <div className="flex items-center justify-between md:justify-start md:gap-6">
                <div className="flex items-center gap-[6px]">
                  <span>icon</span>
                  <h2>firstName lastName</h2>
                </div>
                <div className="flex items-center gap-[6px]">
                  <span>icon</span>
                  <h2>created at</h2>
                </div>
              </div>
            </div>
          </div>

          <div>222</div>
          <div>333</div>
        </div>
      </div>
    </section>
  );
};

export default UserBlogItems;
