"use client";
import { useAccountStore } from "@/app/store/account.store";
import ReviewAvatar from "../reviewAvatar/ReviewAvatar";
import StarRating from "../starRating/StarRating";

export type ReplyItemPropsType = {
  text: string;
  replyOwnerName?: string;
  replyOwnerLastName?: string;
};

const ReplyItem = ({
  text,
  replyOwnerName,
  replyOwnerLastName,
}: ReplyItemPropsType) => {
  const { avatar } = useAccountStore();

  return (
    <div className="w-full flex flex-col gap-2 p-2       border-b border-b-[#E8ECEF]">
      <div className="w-full flex items-center justify-between">
        <ReviewAvatar avatar={avatar ?? ""} />
        <h2 className="text-[20px] font-semibold leading-[32px] text-[#141718]">
          {replyOwnerName} {""} {replyOwnerLastName}
        </h2>
        <StarRating _id={""} rate={0} />
      </div>
      <p>{text}</p>
    </div>
  );
};

export default ReplyItem;
