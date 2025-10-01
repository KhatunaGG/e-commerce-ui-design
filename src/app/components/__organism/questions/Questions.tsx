"use client";
import Answers from "../answers/Answers";
import QuestionForm from "../questionForm/QuestionForm";
import { useEffect, useState } from "react";
import { useShopStore } from "@/app/store/shop-page.store";
import { SimplePagination, SortSelect } from "../../__molecules";
import { useQuestionStore } from "@/app/store/question.store";
import { useReviewStore } from "@/app/store/review.store";

export type QuestionPropsType = {
  productId: string;
};

const Questions = ({ productId }: QuestionPropsType) => {
  const {
    questionData,
    getAllQuestions,
    page,
    questionsTotalLength,
    take,
    setPage,
  } = useQuestionStore();
  const { normalizeFirstChar } = useShopStore();
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const { setSortQuestions, sortQuestions } = useQuestionStore();
  const { formatDate } = useReviewStore();


  useEffect(() => {
    if (questionData.length === 0) {
      getAllQuestions(productId);
    }
  }, [getAllQuestions, page, productId, questionData.length]);

  const totalPages = Math.ceil(questionsTotalLength / take);

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
    <div className="w-full  flex flex-col gap-6">
      <div className="w-full flex flex-col  gap-2">
        <QuestionForm
          productId={productId}
          status="question"
          onSubmitSuccess={() => {
            getAllQuestions(productId);
          }}
        />
      </div>

      <div className="flex flex-col items-end gap-10 mt-2">
        <SortSelect
          value={sortQuestions}
          onChange={(order: "newest" | "oldest") =>
            setSortQuestions(order, productId)
          }
        />

        {questionData.length > 0 &&
          questionData.map((item, i) => {
            return (
              <div key={i} className="w-full flex flex-col gap-4">
                <p className="inline w-full pb-2 border-b border-b-[#E8ECEF] ">
                  {item.question}
                </p>

                <div className="w-full flex items-center justify-between">
                  <p className="w-[60%] text-[#a2a5a7] text-sm font-normal italic">
                    {`${normalizeFirstChar(
                      item.questionOwnerName ?? ""
                    )} ${normalizeFirstChar(item.questionOwnerLastName ?? "")}`}
                  </p>
                  <p className="inline text-right text-sm italic font-normal text-[#a2a5a7] w-[40%]">
                    {formatDate(item.createdAt)}
                  </p>
                </div>

                <div className="flex items-start ml-[20%] w-[80%] ">
                  <button
                    onClick={() =>
                      setActiveQuestionId(
                        activeQuestionId === item._id ? null : item._id
                      )
                    }
                    className="text-xs font-semibold leading-[20px] text-[#23262F] cursor-pointer"
                  >
                    Your Answer
                  </button>
                </div>
                <div className="w-full">
                  {activeQuestionId === item._id && (
                    <QuestionForm
                      productId={productId}
                      status="answer"
                      questionId={item._id}
                      onSubmitSuccess={() => {
                        setActiveQuestionId(null);
                        getAllQuestions(productId);
                      }}
                    />
                  )}
                </div>

                <div className="w-[80%] ml-auto flex flex-col items-start gap-4">
                  {item.answers.length > 0 &&
                    item.answers.map((answer) => {
                      return (
                        <Answers
                          key={answer._id}
                          _key={answer._id}
                          answerText={answer.answerText}
                          answerOwnerName={answer.answerOwnerName}
                          answerOwnerLastName={answer.answerOwnerLastName}
                          createdAt={answer.createdAt}
                        />
                      );
                    })}
                </div>
              </div>
            );
          })}

        {questionData.length > 0 && (
          <SimplePagination
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            page={page}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default Questions;
