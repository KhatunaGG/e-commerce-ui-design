"use client";
import { useAccountStore } from "@/app/store/account.store";
import ReviewAvatar from "../reviewAvatar/ReviewAvatar";
import StarRating from "../starRating/StarRating";
import { useShopStore } from "@/app/store/shop-page.store";
import { useReviewStore } from "@/app/store/review.store";

export type ReplyItemPropsType = {
  text: string;
  replyOwnerName?: string;
  replyOwnerLastName?: string;



   createdAt?: string;
};

const ReplyItem = ({
  text,
  replyOwnerName,
  replyOwnerLastName,
  createdAt
}: ReplyItemPropsType) => {
  const { avatar } = useAccountStore();
  const { normalizeFirstChar } = useShopStore();
  const {formatDate} = useReviewStore()

  return (
    <div className="w-full flex flex-col gap-2 p-2       border-b border-b-[#E8ECEF]">
      <div className="w-full flex items-center justify-between">
        <ReviewAvatar avatar={avatar ?? ""} />
        <h2 className="text-[20px] font-semibold leading-[32px] text-[#141718]">
          {normalizeFirstChar(replyOwnerName ?? "")} {""}
          {normalizeFirstChar(replyOwnerLastName ?? "")}
        </h2>
        <StarRating _id={""} rate={0} />
      </div>
      <div className="w-full flex flex-col items-start">
      <p>{text}</p>
      <p className="inline w-full  text-right text-sm italic font-normal text-[#a2a5a7]"> {formatDate(createdAt ?? "")}</p>


      </div>
    </div>
  );
};

export default ReplyItem;
