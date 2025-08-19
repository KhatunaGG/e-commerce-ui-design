import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ReviewType } from "../components/__organism/reviewsForm/ReviewsForm";
import { axiosInstance } from "../libs/axiosInstance";
import { toast } from "react-toastify";

export interface ErrorResponse {
  message: string;
}

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message || "An error occurred";
  }
  return "An unexpected error occurred";
};

export interface ReplyType {
  replyToId: string;
  replyOwnerId: string;
  replyText: string;
}

export interface IQuestions {
  questions: string;
  questionsOwnerId: string;
  answers: AnswerType[];
}

export interface AnswerType {
  answersOwnerId: string;
  questionsOwnerId: string;
  answerText: string;
}

// Full Review object sent to backend
export interface DbReviewType extends ReviewType {
  reviewOwnerId: string | null;
  likes: number;
  status: string;
  rating: number;
  replies: ReplyType[];
  _id?: string;
  questions: IQuestions[];
}

export interface IUseReviewStore {
  reviewFormData: {
    text: string;
    productId: string;
  };
  reviewData: DbReviewType[];
  isLoading: boolean;
  axiosError: string | null;

  emojiVisible: boolean;
  setEmojiVisible: (emojiVisible: boolean) => void;
  submitReview: (formData: ReviewType, accessToken: string) => Promise<boolean>;
  getAllReviews: () => Promise<void>;
}

export const useReviewStore = create<IUseReviewStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      axiosError: null,
      reviewData: [],
      reviewFormData: { text: "", productId: "" },

      emojiVisible: false,
      setEmojiVisible: () =>
        set((state) => ({ emojiVisible: !state.emojiVisible })),
      submitReview: async (formData: ReviewType, accessToken: string) => {
        set({
          isLoading: true,
          axiosError: null,
        });
        const newFormData = {
          // ...formData,
          reviewText: formData.text,
          productId: formData.productId,
          reviewOwnerId: null,
          likes: 0,
          status: "review",
          rating: 0,
          replies: [
            {
              replyToId: "",
              replyOwnerId: "",
              replyText: "",
            },
          ],
          questions: [
            {
              questions: "",
              questionsOwnerId: "",
              answers: [
                {
                  answersOwnerId: "",
                  questionsOwnerId: "",
                  answerText: "",
                },
              ],
            },
          ],
        };

        try {
          const res = await axiosInstance.post(`/review`, newFormData, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (res.status >= 200 && res.status <= 204) {
            toast.success("Review submitted successfully!");
            set({ reviewData: res.data, axiosError: null, isLoading: false });
            get().getAllReviews()
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

      getAllReviews: async () => {
        set({ isLoading: true, axiosError: null });
        try {
          const res = await axiosInstance.get("/review");
          if (res.status >= 200 && res.status <= 204) {
            set({
              isLoading: false,
              axiosError: null,
              reviewData: res.data,
            });
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
      },
    }),
    {
      name: "review-store",
      partialize: (state) => ({
        reviewFormData: state.reviewFormData,
      }),
    }
  )
);
