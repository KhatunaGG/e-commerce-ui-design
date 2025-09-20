// "use client";
// import { useReviewStore } from "@/app/store/review.store";
// import { ChevronDown } from "../../__atoms";
// import ClientReviewsItem from "../clientReviewsItem/ClientReviewsItem";
// import { SimplePagination } from "../../__molecules";
// import { useEffect, useState } from "react";

// const ClientReviews = ({ productId }: { productId: string }) => {
//   const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
//   const { reviewData, reviewLength, take, getAllReviews, page, setPage } =
//     useReviewStore();

//   const reviews = Array.isArray(reviewData) ? reviewData : [];
//   const filteredReviewByParams = reviews.filter(
//     (item) => item.productId === productId
//   );

//   console.log(reviewData, "reviewData")

//   console.log(filteredReviewByParams, "filteredReviewByParams")

//   useEffect(() => {
//     getAllReviews(productId);
//   }, [getAllReviews, page, productId]);

//   const totalPages = Math.ceil(reviewLength / take);

//   const handleNextPage = () => {
//     if (page < totalPages) {
//       setPage(page + 1, productId);
//     }
//   };

//   const handlePrevPage = () => {
//     if (page > 1) {
//       setPage(page - 1, productId);
//     }
//   };

//   return (
//     <section className="w-full h-full flex flex-col gap-10 ">
//       <div className="w-full h-full flex flex-col gap-6 md:gap-0 md:flex-row  md:items-center justify-between">
//         <h2 className="font-medium text-[28px] leading-[24px] tracking-[-0.6px]">
//           {reviewLength} Reviews
//         </h2>
//         <div className="w-full relative inline-block  md:max-w-[22.85%]">
//           <select className="appearance-none w-full  px-4  py-[14px] border border-[#E8ECEF] rounded-md text-sm outline-none">
//             <option value="" className="outline-none">
//               Newest
//             </option>
//             <option value="" className="outline-none">
//               Oldest
//             </option>
//           </select>
//           <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
//             <ChevronDown />
//           </div>
//         </div>
//       </div>
//       {Array.isArray(filteredReviewByParams) &&
//         filteredReviewByParams.length > 0 &&
//         filteredReviewByParams.map((review, i) => {
//           return (
//             <ClientReviewsItem
//               key={review._id || i}
//               {...review}
//               activeReviewId={activeReviewId}
//               setActiveReviewId={setActiveReviewId}
//             />
//           );
//         })}

//       <SimplePagination
//         handlePrevPage={handlePrevPage}
//         handleNextPage={handleNextPage}
//         page={page}
//         totalPages={totalPages}
//       />
//     </section>
//   );
// };

// export default ClientReviews;

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
    updateReviewRating
  } = useReviewStore();
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
  // console.log(reviewData, "reviewData")


    
  // const handleRate = (score: number) => {
  //   updateReviewRating(score, productId);
  // };


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
