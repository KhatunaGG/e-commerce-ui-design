import React from "react";
import Answers from "../answers/Answers";
import QuestionForm from "../questionForm/QuestionForm";

export type QuestionPropsType = {
  productId: string;
};

const Questions = ({ productId }: QuestionPropsType) => {
  return (
    <div className="w-full bg-green-200 flex flex-col gap-10">
      <div className="w-full flex flex-col  gap-2">
        <QuestionForm productId={productId} />
        {/* <div className="w-full flex items-start ml-[20%]">
          <button className="text-xs font-semibold leading-[20px] text-[#23262F] cursor-pointer">Your Answer</button>
        </div> */}
      </div>

      <div className="flex flex-col items-end gap-4 bg-violet-300">
        <div className="w-full flex flex-col gap-4">
          <p className="inline w-full">Displayed Question</p>
          <div className="w-full flex items-start ml-[20%]">
            <button className="text-xs font-semibold leading-[20px] text-[#23262F] cursor-pointer">
              Your Answer
            </button>
          </div>

          <div className="w-[80%] ml-auto flex flex-col items-start gap-4">
            <Answers />
            <Answers />
            <Answers />
          </div>
        </div>

        {/* <QuestionForm /> */}
      </div>
    </div>
  );
};

export default Questions;
