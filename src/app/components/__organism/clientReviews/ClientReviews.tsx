"use client";
import { useReviewStore } from "@/app/store/review.store";
import { SimplePagination, SortSelect } from "../../__molecules";
import { useEffect, useState } from "react";
import ClientReviewsItem from "../clientReviewsItem/ClientReviewsItem";

const ClientReviews = ({ productId }: { productId: string }) => {
  const {
    reviewData,
    reviewLength,
    take,
    getAllReviews,
    page,
    setPage,
    sortReview,
    setSortReview,
    updateReviewRating,
  } = useReviewStore();
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);

  useEffect(() => {
    getAllReviews(productId);
  }, [getAllReviews, page, productId]);

  const totalPages = Math.ceil(reviewLength / take);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1, productId);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1, productId);
    }
  };

  return (
    <section className="w-full h-full flex flex-col gap-10 ">
      <div className="w-full h-full flex flex-col gap-6 md:gap-0 md:flex-row  md:items-center justify-between">
        <h2 className="font-medium text-[28px] leading-[24px] tracking-[-0.6px]">
          {reviewLength} Reviews
        </h2>
        <SortSelect
          value={sortReview}
          onChange={(order: "newest" | "oldest") =>
            setSortReview(order, productId)
          }
        />
      </div>
      {Array.isArray(reviewData) &&
        reviewData.map((review) => (
          <ClientReviewsItem
            key={review._id}
            {...review}
            activeReviewId={activeReviewId}
            setActiveReviewId={setActiveReviewId}
            rating={review.rating}
            onRate={(score: number) => updateReviewRating(score, review._id!)}
          />
        ))}

      <SimplePagination
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        page={page}
        totalPages={totalPages}
      />
    </section>
  );
};

export default ClientReviews;
