"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignInStore } from "@/app/store/sign-in.store";
import { toast } from "react-toastify";
import { useQuestionStore } from "@/app/store/question.strore";
import { useEffect } from "react";

export const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  questionsOwnerId: z.string().nullable().optional(),
  // answers: z.string().optional(),
  productId: z.string().min(1),
  status: z.enum(["question", "answer"]),
});

export type QuestionType = z.infer<typeof questionSchema>;

export type QuestionFormPropsType = {
  productId?: string;

  hasQuestionStatus?: boolean;
};

const QuestionForm = ({
  productId,
  hasQuestionStatus,
}: QuestionFormPropsType) => {
  const { accessToken, initialize } = useSignInStore();
  const { submitQuestion, setShowQuestionTextarea, showQuestionTextarea } =
    useQuestionStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // setValue,
  } = useForm<QuestionType>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      questionsOwnerId: "",
      productId,
      status: "question",
    },
  });

  useEffect(() => {
    initialize();
  }, [initialize]);

  const onSubmit = async (formData: QuestionType) => {
    if (!accessToken) {
      toast.error("You must be signed in to submit.");
      return;
    }

    if (formData.status === "question") {
      const success = await submitQuestion(formData, accessToken);
      if (success) reset();
      setShowQuestionTextarea(!showQuestionTextarea);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full  flex items-center justify-between gap-4"
    >
      <textarea
        {...register("question")}
        id=""
        className="flex-1 p-4 resize-none overflow-hidden outline-none border border-[#f1f1f1] rounded-2xl"
      ></textarea>
      {errors.question && (
        <p className="text-red-500 text-sm">{errors.question.message}</p>
      )}

      <button
        type="submit"
        className=" px-6 py-2  bg-[#141718] text-white rounded-[80px]"
      >
        {hasQuestionStatus ? "Tour Answer" : "  Your Question"}
        {/* Your Question */}
      </button>
    </form>
  );
};

export default QuestionForm;
