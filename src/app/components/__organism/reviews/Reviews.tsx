import React from "react";
import StarRating from "../starRating/StarRating";
import ReviewsForm from "../reviewsForm/ReviewsForm";

export type ReviewsPropsType = {
  params: string;
  productName: string;
};

const Reviews = ({ productName, params }: ReviewsPropsType) => {
  return (
    <div className="w-full h-full ">
      <h2 className="text-[20px] md:text-[28px] font-medium leading-[28px] md:leading-[34px] tracking-[-0.6px] md-6 md:mb-[26px]">
        Customer Reviews
      </h2>
      <div className="w-full flex gap-2 items-center mb-2">
        <StarRating _id={""} rate={0} /> <span> (11)</span>
      </div>
      <div className="w-full flex items-center justify-start gap-2 mb-[30px]">
        {/* <Checkbox /> */}
        <p className="text-sm md:text-base leading-[22px] md:leading-[26px]">
         Write Review for <span className="font-semibold ">{productName}</span>
        </p>
      </div>

      <ReviewsForm params={params} />
  

    </div>
  );
};

export default Reviews;
