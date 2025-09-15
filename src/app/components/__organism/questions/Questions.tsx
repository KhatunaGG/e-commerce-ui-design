"use client";
import { useQuestionStore } from "@/app/store/question.strore";
import Answers from "../answers/Answers";
import QuestionForm from "../questionForm/QuestionForm";
import { useEffect } from "react";

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
    setShowQuestionTextarea,
    showQuestionTextarea,
  } = useQuestionStore();

  useEffect(() => {
    getAllQuestions(productId);
  }, [getAllQuestions, page, productId]);

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
    <div className="w-full bg-green-200 flex flex-col gap-6">
      <div className="w-full flex flex-col  gap-2">
        <QuestionForm productId={productId} />
        {/* <div className="w-full flex items-start ml-[20%]">
          <button className="text-xs font-semibold leading-[20px] text-[#23262F] cursor-pointer">Your Answer</button>
        </div> */}
      </div>

      <div className="flex flex-col items-end gap-4 bg-violet-300">
        {questionData.length > 0 &&
          questionData.map((item, i) => {
            return (
              <div key={i} className="w-full flex flex-col gap-4">
                <p className="inline w-full">{item.question}</p>
                <div className="w-full flex items-start ml-[20%]">
                  <button
                    onClick={() =>
                      setShowQuestionTextarea(!showQuestionTextarea)
                    }
                    className="text-xs font-semibold leading-[20px] text-[#23262F] cursor-pointer"
                  >
                    Your Answer
                  </button>
                </div>

                {showQuestionTextarea && (
                  <div className="w-full">
                    <QuestionForm hasQuestionStatus={item.status === "question"} />
                  </div>
                )}

                <div className="w-[80%] ml-auto flex flex-col items-start gap-4">
                  <Answers />
                </div>
              </div>
            );
          })}
        {/* <div className="w-full flex flex-col gap-4">
          <p className="inline w-full">Displayed Question</p>
          <div className="w-full flex items-start ml-[20%]">
            <button className="text-xs font-semibold leading-[20px] text-[#23262F] cursor-pointer">
              Your Answer
            </button>
          </div>

          <div className="w-full">
            <QuestionForm />
          </div>

          <div className="w-[80%] ml-auto flex flex-col items-start gap-4">
            <Answers />;

          </div>
        </div> */}

        <div className="w-full flex justify-between mt-4 px-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === totalPages}
            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* <QuestionForm /> */}
      </div>
    </div>
  );
};

export default Questions;
