"use client";
import StarRating from "../starRating/StarRating";
import ReviewsForm from "../reviewsForm/ReviewsForm";
import { useReviewStore } from "@/app/store/review.store";

export type ReviewsPropsType = {
  params: string;
  productName: string;
};

const Reviews = ({ productName, params }: ReviewsPropsType) => {
  const { reviewLength } = useReviewStore();

  // useEffect(() => {
  //   getAllReviews();
  // }, [getAllReviews]);

  return (
    <div className="w-full h-full">
      <h2 className="text-[20px] md:text-[28px] font-medium leading-[28px] md:leading-[34px] tracking-[-0.6px] md-6 md:mb-[26px]  ">
        Customer Reviews
      </h2>
      <div className="w-full flex gap-2 items-center mb-2">
        <StarRating _id={""} rate={0} /> <span> ({reviewLength})</span>
      </div>
      <div className="w-full flex items-center justify-start gap-2 mb-[30px]">
        <p className="text-sm md:text-base leading-[22px] md:leading-[26px]">
          Write Review for <span className="font-semibold ">{productName}</span>
        </p>
      </div>
      <ReviewsForm productId={params} status="review" />
    </div>
  );
};

export default Reviews;
