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

export type ClientReviewsItemPropsType = {
  activeReviewId: string | null;
  setActiveReviewId: React.Dispatch<React.SetStateAction<string | null>>;
  rating: number;
  onRate: (score: number) => Promise<boolean>;
};

const ClientReviewsItem = ({
  reviewText,
  _id,
  likes,
  reviewOwnerId,
  replies,
  productId,
  createdAt,
  activeReviewId,
  onRate,
  setActiveReviewId,
  ratedBy,
}: DbReviewType & ClientReviewsItemPropsType) => {
  const { avatar } = useAccountStore();
  const { currentUser } = useSignInStore();
  const { normalizeFirstChar } = useShopStore();
  const { formatDate, updateReplyRating, likeReview } = useReviewStore();

  const calculateAverageRating = () => {
    if (!ratedBy || ratedBy.length === 0) return 0;
    const totalSum = ratedBy.reduce((sum, rated) => sum + rated.rating, 0);
    return Math.round((totalSum / ratedBy.length) * 10) / 10;
  };
  const averageRating = calculateAverageRating();

  const isLiked = currentUser?._id
    ? likes.some((like) => like.likedById === currentUser._id)
    : false;

  const likesCount = likes.reduce((sum, count) => (sum += count.like), 0);
  console.log(likesCount, "likesCount");

  const handleLike = async () => {
    if (!_id || !currentUser?._id) return;
    await likeReview(_id, currentUser._id);
  };

  return (
    <div
      className={`${
        replies.length > 0 ? "border-0" : "border-b border-b-[#E8ECEF]"
      } w-full h-full flex flex-col items-center gap-4 md:gap-4 `}
    >
      <div className="w-full flex items-start justify-start gap-4 md:gap-10">
        <ReviewAvatar avatar={avatar ?? ""} />
        <div className="flex-1 flex flex-col gap-4 ">
          <h2 className="text-[20px] font-semibold leading-[32px] text-[#141718]">
            {normalizeFirstChar(currentUser?.yourName ?? "")}{" "}
            {normalizeFirstChar(currentUser?.lastName ?? "")}
          </h2>
          <StarRating
            productId={productId}
            rating={averageRating}
            onRate={onRate}
          />
        </div>
      </div>

      <p className="w-full pl-0 md:pl-[112px] inline font-normal text-base leading-[26px] text-[#353945]">
        {reviewText}
      </p>
      <p className="inline w-full  text-right text-sm italic font-normal text-[#a2a5a7]">
        {formatDate(createdAt)}
      </p>

      <div className="w-full pt-[12px] pb-6 flex items-center justify-center md:justify-start gap-4 md:pl-[223px]">
        <button
          onClick={handleLike}
          className={`text-xs font-semibold leading-[20px] ${
            isLiked ? "text-blue-600" : "text-[#23262F] cursor-pointer"
          }`}
        >
          {isLiked ? "Liked" : "Like"} ({likesCount})
        </button>
        <button
          onClick={() => {
            if (!_id) return;
            setActiveReviewId(activeReviewId === _id ? null : _id);
          }}
          className="text-xs font-semibold leading-[20px] text-[#23262F] cursor-pointer"
        >
          Reply
        </button>
      </div>
      {activeReviewId === _id && (
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-end">
            <ReviewsForm
              reviewOwnerId={reviewOwnerId ?? undefined}
              productId={productId}
              status="reply"
              replyToId={_id}
              setActiveReviewId={setActiveReviewId}
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
                <ReplyItem
                  {...reply}
                  updateReplyRating={updateReplyRating}
                  reviewId={_id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ClientReviewsItem;
