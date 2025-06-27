import React from "react";
import StarRating from "../starRating/StarRating";


const ClientReviewsItem = () => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-4 md:gap-6    border-b border-b-[#E8ECEF]">
      <div className="w-full flex items-start justify-start gap-4 md:gap-10">
        <div className="w-[72px] h-[72px] rounded-full border border-[#E8ECEF]">
          Image
        </div>
        <div className="flex-1 flex flex-col gap-4 ">
          <h2 className="text-[20px] font-semibold leading-[32px] text-[#141718]">
            Sofia
          </h2>
          <StarRating _id={""} rate={0} />
        </div>
      </div>

      <p className="pl-0 md:pl-[112px] inline font-normal text-base leading-[26px] text-[#353945] ">
        I bought it 3 weeks ago and now come back just to say “Awesome Product”.
        I really enjoy it. At vero eos et accusamus et iusto odio dignissimos
        ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et
        quas molestias excepturi sint non provident.
      </p>

      <div className="w-full pt-[12px] pb-6 flex items-center justify-center md:justify-start gap-4 md:pl-[223px]">
        <button className="text-xs font-semibold leading-[20px] text-[#23262F]">
          Likes
        </button>
        <button className="text-xs font-semibold leading-[20px] text-[#23262F]">
          Reply
        </button>
      </div>
    </div>
  );
};

export default ClientReviewsItem;
