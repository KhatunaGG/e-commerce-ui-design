"use client";
import StarRating from "../starRating/StarRating";
import {
  DbReplyType,
  DbReviewType,
  useReviewStore,
} from "@/app/store/review.store";
import { useAccountStore } from "@/app/store/account.store";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useShopStore } from "@/app/store/shop-page.store";
import ReviewsForm from "../reviewsForm/ReviewsForm";
import ReviewAvatar from "../reviewAvatar/ReviewAvatar";
import ReplyItem from "../replyItem/ReplyItem";

const ClientReviewsItem = ({
  reviewText,
  // rating,
  _id,
  // likes,
  reviewOwnerId,
  replies,
  // questions,
  productId,
  createdAt
}: 
DbReviewType) => {
  const { avatar } = useAccountStore();
  const { currentUser } = useSignInStore();
  const { normalizeFirstChar } = useShopStore();
  const { showReply, setShowReply, formatDate } = useReviewStore();

  return (
    <div className={`${replies.length > 0 ? "border-0" : "border-b border-b-[#E8ECEF]"} w-full h-full flex flex-col items-center gap-4 md:gap-4 `}>
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

      <p className="w-full pl-0 md:pl-[112px] inline font-normal text-base leading-[26px] text-[#353945]">
        {reviewText}
      </p>
       <p className="inline w-full  text-right text-sm italic font-normal text-[#a2a5a7]">{formatDate(createdAt)}</p>

      <div className="w-full pt-[12px] pb-6 flex items-center justify-center md:justify-start gap-4 md:pl-[223px]">
        <button className="text-xs font-semibold leading-[20px] text-[#23262F]">
          Likes
        </button>
        <button
          onClick={() => setShowReply(!showReply)}
          className="text-xs font-semibold leading-[20px] text-[#23262F] cursor-pointer"
        >
          Reply
        </button>
      </div>
      {showReply && (
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-end">
            <ReviewsForm
              reviewOwnerId={reviewOwnerId ?? undefined}
              productId={productId}
              status="reply"
              replyToId={_id}
            />
          </div>
        </div>
      )}

      <div className=" w-full md:w-[73%] flex flex-col pb-6">
        {replies.length > 0 &&
          replies.map((reply: DbReplyType, i: number) => {
            return (
              <div
                key={i}
                className="w-full flex flex-col gap-8  p-2          "
              >
                <ReplyItem {...reply} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ClientReviewsItem;
