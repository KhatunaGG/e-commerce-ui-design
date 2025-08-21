// import React from "react";
// import StarRating from "../starRating/StarRating";

// const ClientReviewsItem = () => {
//   return (
//     <div className="w-full h-full flex flex-col items-center gap-4 md:gap-6    border-b border-b-[#E8ECEF]">
//       <div className="w-full flex items-start justify-start gap-4 md:gap-10">
//         <div className="w-[72px] h-[72px] rounded-full border border-[#E8ECEF]">
//           Image
//         </div>
//         <div className="flex-1 flex flex-col gap-4 ">
//           <h2 className="text-[20px] font-semibold leading-[32px] text-[#141718]">
//             Sofia
//           </h2>
//           <StarRating _id={""} rate={0} />
//         </div>
//       </div>

//       <p className="pl-0 md:pl-[112px] inline font-normal text-base leading-[26px] text-[#353945] ">
//         I bought it 3 weeks ago and now come back just to say “Awesome Product”.
//         I really enjoy it. At vero eos et accusamus et iusto odio dignissimos
//         ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt et
//         quas molestias excepturi sint non provident.
//       </p>

//       <div className="w-full pt-[12px] pb-6 flex items-center justify-center md:justify-start gap-4 md:pl-[223px]">
//         <button className="text-xs font-semibold leading-[20px] text-[#23262F]">
//           Likes
//         </button>
//         <button className="text-xs font-semibold leading-[20px] text-[#23262F]">
//           Reply
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClientReviewsItem;

"use client";
import StarRating from "../starRating/StarRating";
import { DbReviewType, useReviewStore } from "@/app/store/review.store";
import { useAccountStore } from "@/app/store/account.store";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useShopStore } from "@/app/store/shop-page.store";
import ReviewsForm from "../reviewsForm/ReviewsForm";
import ReviewAvatar from "../reviewAvatar/ReviewAvatar";


const ClientReviewsItem = ({
  reviewText,
  // rating,
  // _id,
  // likes,
  reviewOwnerId,
  // replies,
  // questions,
  productId,
  // status,
}: DbReviewType) => {
  const { avatar } = useAccountStore();
  const { currentUser } = useSignInStore();
  const { normalizeFirstChar } = useShopStore();
  const { showReply, setShowReply } = useReviewStore();

  return (
    <div className="w-full h-full flex flex-col items-center gap-4 md:gap-6    border-b border-b-[#E8ECEF]  bg-green-200">
      <div className="w-full flex items-start justify-start gap-4 md:gap-10">
        <ReviewAvatar avatar={avatar ?? ""} />
        <div className="flex-1 flex flex-col gap-4 ">
          <h2 className="text-[20px] font-semibold leading-[32px] text-[#141718]">
            {normalizeFirstChar(currentUser?.yourName ?? "")}{" "}
            {normalizeFirstChar(currentUser?.lastName ?? "")}
          </h2>
          <StarRating _id={""} rate={0} />
        </div>
      </div>

      <p className="pl-0 md:pl-[112px] inline font-normal text-base leading-[26px] text-[#353945] ">
        {reviewText}
      </p>

      <div className="w-full pt-[12px] pb-6 flex items-center justify-center md:justify-start gap-4 md:pl-[223px] bg-red-200">
        <button className="text-xs font-semibold leading-[20px] text-[#23262F]">
          Likes
        </button>
        <button
          onClick={() => setShowReply(!showReply)}
          // onClick={() => {
          //   if (!_id || !reviewOwnerId) return;
          //   addReplayToReview(_id, reviewOwnerId, productId);
          // }}
          className="text-xs font-semibold leading-[20px] text-[#23262F] cursor-pointer"
        >
          Reply
        </button>
      </div>
      {showReply && (
        <div className="w-full bg-blue-400 flex flex-col">
          <div className="w-full flex justify-end">
            <ReviewsForm
              reviewOwnerId={reviewOwnerId ?? undefined}
              productId={productId}
              status="reply"
              replyToId={reviewOwnerId ?? undefined}
            />
          </div>

          {/* <div className="w-full pt-[12px] pb-6 flex items-center justify-center md:justify-start gap-4 md:pl-[373px] bg-red-200">
            <button className="text-xs font-semibold leading-[20px] text-[#23262F]">
              Likes
            </button>
            <button
              onClick={() => setShowReply(!showReply)}
              // onClick={() => {
              //   if (!_id || !reviewOwnerId) return;
              //   addReplayToReview(_id, reviewOwnerId, productId);
              // }}
              className="text-xs font-semibold leading-[20px] text-[#23262F] cursor-pointer"
            >
              Reply
            </button>
          </div> */}
        </div>
      )}

      <div className="bg-violet-400 w-full">1111111111111111</div>
    </div>
  );
};

export default ClientReviewsItem;

{
  /* <div className="w-[72px] h-[72px] rounded-full border border-[#E8ECEF] relative">
          {avatar ? (
            <Image
              src={avatar}
              alt="User Avatar"
              fill
              className="object-cover z-10 absolute inset-0 w-20 h-20 rounded-full"
            />
          ) : (
            <span className="text-sm text-gray-500 w-full h-full flex items-center justify-center">
              {normalizeFirstChar(currentUser?.yourName || "").charAt(0)}{" "}
              {normalizeFirstChar(currentUser?.lastName || "").charAt(0)}
            </span>
          )}
        </div> */
}

// <div className="REPLY-wrapper w-full  pb-6 flex items-center justify-start gap-4 pl-[28px] md:pl-[112px] bg-blue-300">
//   <div className="w-full flex flex-col items-start justify-center gap-4">
//     <ReviewAvatar avatar={avatar ?? ""} />
//     <ReviewsForm params={""} />
//   </div>

//   {/* <ClientReviewsItem
//   reviewOwnerId={null}
//   likes={0}
//   status={""}
//   rating={0}
//   replies={[]}
//   questions={[]}
//   reviewText={""}
//   productId={""}
//   text={""} */}

// </div>
