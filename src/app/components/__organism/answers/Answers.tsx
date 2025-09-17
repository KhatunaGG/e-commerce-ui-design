"use client";
import { useReviewStore } from "@/app/store/review.store";
import { useShopStore } from "@/app/store/shop-page.store";

export type AnswerPropsType = {
  _key: string;
  answerText: string;
  answerOwnerLastName?: string;
  answerOwnerName?: string;
  createdAt: string;
};

const Answers = ({
  answerText,
  createdAt,
  answerOwnerName,
  answerOwnerLastName
}: AnswerPropsType) => {
  const { formatDate } = useReviewStore();
  const { normalizeFirstChar } = useShopStore();

  console.log(answerOwnerName, "answerOwnerName")
  console.log(answerOwnerLastName, "answerOwnerLastName")
  return (
    <div className="w-full  flex flex-col items-start gap-4 mb-2 border-b border-b-[#E8ECEF]">
      <div className="w-full">{answerText}</div>

      <div className="w-full flex items-center justify-between ">

          <p className="w-[60%] text-[#a2a5a7] text-sm font-normal italic">
            {`${normalizeFirstChar(answerOwnerName ?? "")} ${normalizeFirstChar(
              answerOwnerLastName ?? ""
            )}`}
          </p>
        <p className="inline text-right text-sm italic font-normal text-[#a2a5a7] w-[40%]">
          {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default Answers;
