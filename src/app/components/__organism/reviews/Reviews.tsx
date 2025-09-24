"use client";
import StarRating from "../starRating/StarRating";
import ReviewsForm from "../reviewsForm/ReviewsForm";
import { useReviewStore } from "@/app/store/review.store";
import { useEffect } from "react";
import { useProductStore } from "@/app/store/product.store";

export type ReviewsPropsType = {
  productId: string;
  productName: string;
};

const Reviews = ({ productName, productId }: ReviewsPropsType) => {
  const { reviewLength, getAllReviews, page, totalRating } = useReviewStore();
  const { getAverageRating, averageRatings } = useProductStore();

  useEffect(() => {
    getAllReviews(productId);
    getAverageRating(productId);
  }, [getAllReviews, getAverageRating, page, productId]);

  const averageRating = averageRatings[productId];

  useEffect(() => {
    getAllReviews(productId);
  }, [getAllReviews, page, productId, reviewLength]);

  return (
    <div className="w-full h-full  ">
      <h2 className="text-[20px] md:text-[28px] font-medium leading-[28px] md:leading-[34px] tracking-[-0.6px] md-6 md:mb-[26px]  ">
        Customer Reviews
      </h2>
      <div className="w-full flex gap-2 items-center mb-2">
        {/* <StarRating
          productId={productId}
          rating={0}
          totalRating={totalRating}
          readOnly
        />{" "} */}
        <StarRating
          productId={productId}
          rating={averageRating ?? 0}
          totalRating={totalRating}
          readOnly
        />{" "}
        <span>{reviewLength || 0}</span> Reviews
      </div>
      <div className="w-full flex items-center justify-start gap-2 mb-[30px]">
        <p className="text-sm md:text-base leading-[22px] md:leading-[26px]">
          Write Review for <span className="font-semibold ">{productName}</span>
        </p>
      </div>
      <ReviewsForm productId={productId} status="review" />
    </div>
  );
};

export default Reviews;
