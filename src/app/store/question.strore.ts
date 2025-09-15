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
  // questionData: IQuestions[];
  questionData: DbQuestions[];
  showQuestionTextarea: boolean;
  take: number;
  page: number;
  questionsTotalLength: number;
  setShowQuestionTextarea: (show: boolean) => void;
  submitQuestion: (
    formData: IQuestions,
    accessToken: string
  ) => Promise<boolean>;

  getAllQuestions: (productId: string) => Promise<void>;
  getQuestionsCountOnly: () => Promise<void>;
  setPage: (page: number, productId: string) => void;
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

      setPage: (page: number, productId: string) => {
        set({ page });
        get().getAllQuestions(productId);
      },

      setShowQuestionTextarea: (showQuestionTextarea: boolean) =>
        set({ showQuestionTextarea }),

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
            get().getAllQuestions(FormData.productId ?? "");
            set({
              // questionData: res.data,
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
        set({ isLoading: true, axiosError: null });
        try {
          const res = await axiosInstance.get(
            `/question?page=${get().page}&take=${
              get().take
            }&productId=${productId}`
            // {
            //   headers: { Authorization: `Bearer ${signInStore.accessToken}` },
            // }
          );
          if (res.status >= 200 && res.status <= 204) {
            set({
              isLoading: false,
              axiosError: null,
              questionData: res.data.allQuestions,
              questionsTotalLength: res.data.questionsTotalLength,
            });
            console.log(get().questionData, "questionData");
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
    }),
    {
      name: "question-store",
      partialize: () => ({}),
    }
  )
);
