import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ReviewType } from "../components/__organism/reviewsForm/ReviewsForm";

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

// Full Review object sent to backend
export interface DbReviewType extends ReviewType {
  reviewOwnerId: string | null;
  likes: number;
  status: string;
  rating: number;
  replies: ReplyType[];
  _id?: string;
}

export interface IUseReviewStore {
  reviewFormData: {
    text: string;
    productId: string;
  };
  isLoading: boolean;
  axiosError: string | null;

  submitReview: (formData: ReviewType) => Promise<void>;
}

export const useReviewStore = create<IUseReviewStore>()(
  persist(
    (set) => ({
      isLoading: false,
      axiosError: null,
      reviewFormData: { text: "", productId: "" },

      submitReview: async (formData: ReviewType) => {
        set({
          isLoading: true,
          axiosError: null,
        });
        const newFormData = {
          ...formData,
          reviewOwnerId: null,
          likes: 0,
          status: "review",
          rating: 0,
          replies: {
            replyToId: "",
            replyOwnerId: "",
            replyText: "",
          },
        };
        console.log(newFormData, "newFormData")
        try {
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
