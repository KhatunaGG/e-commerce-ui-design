import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../libs/axiosInstance";
import { toast } from "react-toastify";

export interface AnswerType {
  answersOwnerId: string;
  answerToQuestionsOwnerId: string;
  answerText: string;

  productId?: string;
  status?: string;
}

export interface IQuestions {
  question: string;
  questionsOwnerId?: string | null;
  answers?: AnswerType[];

  productId?: string;
  // status?: string;
  status?: "question" | "answer";
}

export interface DbQuestions extends IQuestions {
  createdAt: string;
  _id: string;
}

export interface ErrorResponse {
  message: string;
}

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message || "An error occurred";
  }
  return "An unexpected error occurred";
};

export type IQuestionStoreType = {
  isLoading: boolean;
  axiosError: string | null;
  questionData: IQuestions[];
  submitQuestion: (
    formatDate: IQuestions,
    accessToken: string
  ) => Promise<boolean>;
};

export const useQuestionStore = create<IQuestionStoreType>()(
  persist(
    (set) => ({
      isLoading: false,
      axiosError: null,
      questionData: [],

      submitQuestion: async (FormData: IQuestions, accessToken: string) => {
        set({
          isLoading: true,
          axiosError: null,
        });
        const newDormData = {
          question: FormData.question,
          productId: FormData.productId,
          questionsOwnerId: "",
          status: "question",
          answers: [],
        };
        try {
          const res = await axiosInstance.post("/question", newDormData, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (res.status >= 200 && res.status <= 204) {
            toast.success("Question submitted successfully!");
            set({
              questionData: res.data,
              axiosError: null,
              isLoading: false,
            });

            return true;
          }
          return false;
        } catch (e) {
          const errorMsg = handleApiError(e as AxiosError<ErrorResponse>);
          set({
            isLoading: false,
            axiosError: errorMsg,
          });
          toast.error(errorMsg);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "question-store",
      partialize: () => ({}),
    }
  )
);
