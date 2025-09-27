"use client";
import { useShopStore } from "@/app/store/shop-page.store";

const BlogList = () => {
  const {
    sortedByFour,
    sortByTwoVertically,
    sortByTwoHorizontally,
    // handleIconClick,
  } = useShopStore();

  const resortedStyles = sortedByFour
    ? "grid-cols-2  lg:grid-cols-4"
    : sortByTwoVertically
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : sortByTwoHorizontally
    ? "grid-cols-1  lg:grid-cols-2"
    : "grid-cols-1  lg:grid-cols-3";

  return (
    <div className="w-full flex flex-col gap-10 lg:gap-20">
      <div className="w-full pt-8 lg:pt-10">
        <div
          className={`
          ${resortedStyles} 
        w-full grid h-full gap-y-4 gap-x-2 md:gap-y-6 md:gap-x-6`}
        >
          111
        </div>
      </div>

      <button>Show More</button>
    </div>
  );
};

export default BlogList;
