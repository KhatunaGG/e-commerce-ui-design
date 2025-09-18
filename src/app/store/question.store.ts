import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../libs/axiosInstance";
import { toast } from "react-toastify";

export type AnswerType = {
  _id: string;
  answerText: string;
  answerOwnerName: string;
  answerOwnerLastName: string;
  answersOwnerId: string;
  createdAt: string;
  status: "answer";
};

export type IQuestions = {
  id: string;
  text: string;
  answers: AnswerType[];
  status: "question" | "answer";
  productId: string;
  questionsOwnerId?: string;
};

export interface DbQuestions {
  _id: string;
  question: string;
  questionsOwnerId?: string;
  answers: AnswerType[];
  status: "question";
  productId: string;
  createdAt: string;
  questionOwnerName: string;
  questionOwnerLastName: string;
}

export type QuestionInput = {
  text: string;
  productId: string;
  status: "question" | "answer";
  questionId?: string;
  ownerId?: string;
};

export type AnswerInput = {
  answerText: string;
  answersOwnerId?: string;
  questionId: string;
  productId: string;
  status: "answer";
};

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
  questionData: DbQuestions[];
  showQuestionTextarea: boolean;
  take: number;
  page: number;
  questionsTotalLength: number;
  answerOwnerName: string | "";
  answerOwnerLastName: string | null;

  sortQuestions: "newest" | "oldest";
  setSortQuestions: (order: "newest" | "oldest", productId: string) => void;
  setShowQuestionTextarea: (show: boolean) => void;
  submitQuestion: (
    formData: QuestionInput,
    accessToken: string
  ) => Promise<boolean>;
  getAllQuestions: (productId: string) => Promise<void>;
  getQuestionsCountOnly: () => Promise<void>;
  setPage: (page: number, productId: string) => void;
  submitAnswer: (data: AnswerInput, token: string) => Promise<boolean>;
};

export const useQuestionStore = create<IQuestionStoreType>()(
  persist(
    (set, get) => ({
      isLoading: false,
      axiosError: null,
      questionData: [],
      showQuestionTextarea: false,
      take: 5,
      page: 1,
      questionsTotalLength: 0,
      answerOwnerName: "",
      answerOwnerLastName: "",

      sortQuestions: "newest",
      setSortQuestions: (order, productId) => {
        set({ sortQuestions: order });
        get().getAllQuestions(productId);
      },

      setPage: (page: number, productId: string) => {
        set({ page });
        get().getAllQuestions(productId);
      },

      setShowQuestionTextarea: (showQuestionTextarea: boolean) =>
        set({ showQuestionTextarea }),

      submitQuestion: async (FormData: QuestionInput, accessToken: string) => {
        set({
          isLoading: true,
          axiosError: null,
        });
        const newDormData = {
          question: FormData.text,
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
            get().getAllQuestions(FormData.productId ?? "");
            set({
              axiosError: null,
              isLoading: false,
            });
            console.log(get().questionData, "questionData");
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

      getAllQuestions: async (productId: string) => {
        const { page, take, sortQuestions } = get();
        set({ isLoading: true, axiosError: null });
        const sortParam = sortQuestions === "newest" ? "desc" : "asc";
        try {
          const res = await axiosInstance.get(
            `/question?page=${page}&take=${take}&productId=${productId}&sort=${sortParam}`
          );
          if (res.status >= 200 && res.status <= 204) {
            set({
              isLoading: false,
              axiosError: null,
              questionData: res.data.allQuestions,
              questionsTotalLength: res.data.questionsTotalLength,
            });
          }
        } catch (e) {
          const errorMsg = handleApiError(e as AxiosError<ErrorResponse>);
          set({
            isLoading: false,
            axiosError: errorMsg,
          });
          toast.error(errorMsg);
        } finally {
          set({ isLoading: false });
        }
      },

      getQuestionsCountOnly: async () => {
        try {
          const res = await axiosInstance.get(`/question?countOnly=true`);
          if (res.status >= 200 && res.status <= 204) {
            set({ questionsTotalLength: res.data.questionsTotalLength });
          }
        } catch (e) {
          console.error("Failed to fetch questions count", e);
        }
      },

      submitAnswer: async (data: AnswerInput, token: string) => {
        set({ isLoading: true, axiosError: null });
        try {
          const res = await axiosInstance.patch(
            `/question/${data.questionId}`,
            data,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (res.status >= 200 && res.status <= 204) {
            set({
              answerOwnerLastName: res.data.answerOwnerLastName,
              answerOwnerName: res.data.answerOwnerName,
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
