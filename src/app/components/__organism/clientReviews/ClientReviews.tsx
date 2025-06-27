import React from "react";
import { ChevronDown } from "../../__atoms";
import ClientReviewsItem from "../clientReviewsItem/ClientReviewsItem";

const ClientReviews = () => {
  return (
    <section className="w-full h-full flex flex-col gap-10">
      <div className="w-full h-full flex flex-col gap-6 md:gap-0 md:flex-row  md:items-center justify-between">
        <h2 className="font-medium text-[28px] leading-[24px] tracking-[-0.6px]">
          11 Reviews
        </h2>

        <div className="w-full relative inline-block  md:max-w-[22.85%]">
          <select className="appearance-none w-full  px-4  py-[14px] border border-[#E8ECEF] rounded-md text-sm outline-none">
            <option value="" className="outline-none">
              Newest
            </option>
            <option value="" className="outline-none">
              Oldest
            </option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <ChevronDown />
          </div>
        </div>
      </div>

      <ClientReviewsItem />
    </section>
  );
};

export default ClientReviews;
