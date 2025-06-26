import React from "react";
import { ArrowRight } from "../../__atoms";

const ReviewsForm = ({params}: {params: string}) => {
  return (
    <form className="w-full flex items-center  py-2 px-4 md:py-4 md:px-6 border border-[#E8ECEF] rounded-2xl mb-10">
      <textarea
        name=""
        id=""
        placeholder="Share your thoughts"
        className="flex-1 resize-none outline-none"
      ></textarea>

      <button className="w-8 h-8  md:h-auto md:w-fit bg-[#141718] rounded-full md:rounded-[80px] flex items-center justify-center md:py-[6px] md:px-10 ">
        <span className="hidden md:inline text-white font-medium leading-[28px] tracking-[-0.4px]">
          Write Review
        </span>
        <span className="md:hidden flex">
          <ArrowRight params={params} />
        </span>
      </button>
    </form>
  );
};

export default ReviewsForm;
