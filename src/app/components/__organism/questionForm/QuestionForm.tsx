// "use client";
// import z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { toast } from "react-toastify";
// import { useQuestionStore } from "@/app/store/question.strore";
// import { useEffect } from "react";

// export const questionSchema = z.object({
//   question: z.string().min(1, "Question is required"),
//   questionsOwnerId: z.string().nullable().optional(),
//   // answers: z.string().optional(),
//   productId: z.string().min(1),
//   status: z.enum(["question", "answer"]),
// });

// export type QuestionType = z.infer<typeof questionSchema>;

// export type QuestionFormPropsType = {
//   productId?: string;
//   hasQuestionStatus?: boolean;

// };

// const QuestionForm = ({
//   productId,
//   hasQuestionStatus,
// }: QuestionFormPropsType) => {
//   const { accessToken, initialize } = useSignInStore();
//   const { submitQuestion, setShowQuestionTextarea, showQuestionTextarea } =
//     useQuestionStore();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     // setValue,
//   } = useForm<QuestionType>({
//     resolver: zodResolver(questionSchema),
//     defaultValues: {
//       question: "",
//       questionsOwnerId: "",
//       productId,
//       status: "question",
//     },
//   });

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   const onSubmit = async (formData: QuestionType) => {
//     if (!accessToken) {
//       toast.error("You must be signed in to submit.");
//       return;
//     }

//     if (formData.status === "question") {
//       const success = await submitQuestion(formData, accessToken);
//       if (success) reset();
//       setShowQuestionTextarea(!showQuestionTextarea);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="w-full  flex items-center justify-between gap-4"
//     >
//       <textarea
//         {...register("question")}
//         id=""
//         className="flex-1 p-4 resize-none overflow-hidden outline-none border border-[#f1f1f1] rounded-2xl"
//       ></textarea>
//       {errors.question && (
//         <p className="text-red-500 text-sm">{errors.question.message}</p>
//       )}

//       <button
//         type="submit"
//         className=" px-6 py-2  bg-[#141718] text-white rounded-[80px]"
//       >
//         {hasQuestionStatus ? "Tour Answer" : "  Your Question"}
//         {/* Your Question */}
//       </button>
//     </form>
//   );
// };

// export default QuestionForm;

"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInStore } from "@/app/store/sign-in.store";
import { toast } from "react-toastify";
import { AnswerInput, useQuestionStore } from "@/app/store/question.strore";
import { useEffect } from "react";
import { ArrowRight } from "../../__atoms";

export const questionSchema = z.object({
  text: z.string().min(1, "Text is required"),
  productId: z.string().min(1, "Product ID is required"),
  status: z.enum(["question", "answer"]),
  questionId: z.string().optional(),
  ownerId: z.string().optional(),
});
// .refine((data) => (data.status === "answer" ? !!data.questionId : true), {
//   message: "questionId is required for answers",
//   path: ["questionId"],
// });
export type QuestionType = z.infer<typeof questionSchema>;

export type QuestionFormPropsType = {
  productId: string;
  status: "question" | "answer";
  questionId?: string; // <-- add this!
  defaultValue?: string;
  onSubmitSuccess?: () => void;
  ownerId?: string;
};

const QuestionForm = ({
  productId,
  status,
  questionId,
  defaultValue,
  onSubmitSuccess,
  ownerId,
}: QuestionFormPropsType) => {
  const { accessToken, initialize } = useSignInStore();
  const { submitQuestion, submitAnswer } = useQuestionStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // setValue,
  } = useForm<QuestionType>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      text: defaultValue || "",
      productId,
      status,
      // questionId: status === "answer" ? questionId || "" : undefined,
      questionId: status === "answer" ? questionId : undefined,

      ownerId: ownerId || "",
    },
  });

  useEffect(() => {
    initialize();
  }, [initialize]);

  const onSubmit = async (formData: QuestionType) => {
    console.log(formData, "formData");
    if (!accessToken) {
      toast.error("You must be signed in to submit.");
      return;
    }

    if (formData.status === "question") {
      await submitQuestion(formData, accessToken);
    } else {
      if (!formData.questionId) {
        toast.error("Question ID is required for answers.");
        return;
      }

      const answerInput: AnswerInput = {
        answerText: formData.text,
        productId: formData.productId,
        questionId: formData.questionId,
        answersOwnerId: formData.ownerId,
        status: "answer",
      };

      await submitAnswer(answerInput, accessToken);
    }

    reset();
    onSubmitSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // className="w-full  flex items-center justify-between gap-4"
      className={`${
        status === "question"
          ? "w-full ml-0    "
          : "md:w-[80%] md:ml-[20%] sm:ml-0"
      } flex items-center justify-between gap-4  relative`}
    >
      <textarea
        {...register("text")}
        id=""
        className="flex-1 p-4 resize-none overflow-hidden outline-none border border-[#f1f1f1] rounded-2xl"
      ></textarea>
      {errors.text && (
        <p className="absolute -bottom-6 left-0 text-red-500 text-sm">
          {errors.text.message}
        </p>
      )}

      <input type="hidden" {...register("productId")} />
      <input type="hidden" {...register("status")} />
      {status === "answer" && (
        <input type="hidden" {...register("questionId")} />
      )}
      <input type="hidden" {...register("ownerId")} />

      <button
        type="submit"
        className=" px-6 py-2  bg-[#141718] text-white rounded-[80px]"
      >
        <span className="hidden md:flex text-white font-medium leading-[28px] tracking-[-0.4px]">

        {status === "question" ? "Your Question" : "Your Answer"}
        </span>
        <span className="md:hidden flex">
          <ArrowRight params={productId} />
        </span>
      </button>
    </form>
  );
};

export default QuestionForm;
