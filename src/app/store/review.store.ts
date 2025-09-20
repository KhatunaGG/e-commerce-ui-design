import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ReviewType } from "../components/__organism/reviewsForm/ReviewsForm";
import { axiosInstance } from "../libs/axiosInstance";
import { toast } from "react-toastify";
import { useSignInStore } from "./sign-in.store";

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
  replyToId?: string;
  replyOwnerId?: string;
  text: string;
  productId: string;
  status: string;
}

export type RateType = {
  rating: number;
  ratedById: string;
};

export interface DbReplyType extends ReplyType {
  userName: string;
  lastName: string;
  filePath: string;
  replyOwnerName: string;
  replyOwnerLastName: string;
  createdAt: string;
}

export interface DbReviewType extends ReviewType {
  reviewOwnerId: string | null;
  likes: number;
  status: "review" | "reply";
  rating: number;
  replies: DbReplyType[];
  _id?: string;
  reviewText: string;
  productId: string;
  createdAt: string;
  ratedBy: RateType[];
}

export interface IUseReviewStore {
  rating: number;
  reviewFormData: {
    text: string;
    productId: string;
  };
  reviewData: DbReviewType[];
  isLoading: boolean;
  axiosError: string | null;
  emojiVisible: boolean;

  replyOwnerName: string;
  replyOwnerLastName: string;
  reviewLength: number;
  take: number;
  page: number;
  sortReview: "newest" | "oldest";
  totalRating: number;
  setSortReview: (order: "newest" | "oldest", productId: string) => void;
  setPage: (page: number, productId: string) => void;

  setEmojiVisible: (emojiVisible: boolean) => void;
  submitReview: (formData: ReviewType, accessToken: string) => Promise<boolean>;
  getAllReviews: (productId: string) => Promise<void>;
  addReplayToReview: (formData: ReplyType) => Promise<boolean>;
  formatDate: (dateString: string | "") => string;
  getReviewsCountOnly: () => Promise<void>;
  resetReviewStore: () => void;
  // updateReviewRating: (score: number, reviewId: string) => Promise<void>;
  updateReviewRating: (score: number, reviewId: string) => Promise<boolean>;
}

export const useReviewStore = create<IUseReviewStore>()(
  persist(
    (set, get) => ({
      rating: 0,
      isLoading: false,
      axiosError: null,
      reviewData: [],
      reviewFormData: { text: "", productId: "" },
      emojiVisible: false,
      // showReply: false,
      replyOwnerName: "",
      replyOwnerLastName: "",
      reviewLength: 0,
      take: 5,
      page: 1,
      totalRating: 0,

      sortReview: "newest",
      setSortReview: (order, productId) => {
        set({ sortReview: order });
        get().getAllReviews(productId);
      },

      setPage: (page: number, productId: string) => {
        set({ page });
        get().getAllReviews(productId);
      },
      // setShowReply: () => set((state) => ({ showReply: !state.showReply })),
      setEmojiVisible: () =>
        set((state) => ({ emojiVisible: !state.emojiVisible })),
      formatDate: (dateString: string | "") => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },

      submitReview: async (formData: ReviewType, accessToken: string) => {
        set({
          isLoading: true,
          axiosError: null,
        });
        const newFormData = {
          reviewText: formData.text,
          productId: formData.productId,
          reviewOwnerId: null,
          likes: 0,
          status: "review",
          rating: 0,
          replies: [],
          ratedBy: [],
        };

        try {
          const res = await axiosInstance.post(`/review`, newFormData, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (res.status >= 200 && res.status <= 204) {
            toast.success("Review submitted successfully!");
            set({
              reviewData: res.data,
              axiosError: null,
              isLoading: false,
            });
            get().getAllReviews(formData.productId);
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

      getAllReviews: async (productId: string) => {
        const { page, take, sortReview } = get();
        set({ isLoading: true, axiosError: null });
        const sortParam = sortReview === "newest" ? "desc" : "asc";
        try {
          const res = await axiosInstance.get(
            `/review?page=${page}&take=${take}&productId=${productId}&sort=${sortParam}`
          );
          if (res.status >= 200 && res.status <= 204) {
            set({
              isLoading: false,
              axiosError: null,
              reviewData: res.data.reviews,
              reviewLength: res.data.reviewsTotalLength,


              totalRating: res.data.totalRating || 0, 
            });
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
      },

      addReplayToReview: async (formData: ReplyType): Promise<boolean> => {
        const { accessToken } = useSignInStore.getState();
        if (!accessToken) {
          toast.error("You must be signed in to reply.");
          return false;
        }
        try {
          const res = await axiosInstance.patch(
            `/review/update-reply/${formData.replyToId}`,
            formData,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          if (res.status >= 200 && res.status <= 204) {
            toast.success("Reply added successfully!");
            set({
              replyOwnerName: res.data.replyOwnerName,
              replyOwnerLastName: res.data.replyOwnerLastName,
            });
            await get().getAllReviews(formData.productId);
            return true;
          }
          return false;
        } catch (e) {
          const errorMsg = handleApiError(e as AxiosError<ErrorResponse>);
          toast.error(errorMsg);
          set({ axiosError: errorMsg });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      getReviewsCountOnly: async () => {
        try {
          const res = await axiosInstance.get(`/review?countOnly=true`);
          if (res.status >= 200 && res.status <= 204) {
            set({ reviewLength: res.data.reviewsTotalLength });
          }
        } catch (e) {
          console.error("Failed to fetch reviews count", e);
        }
      },

      resetReviewStore: () => {
        set({
          reviewFormData: { text: "", productId: "" },
          reviewData: [],
          emojiVisible: false,
          replyOwnerName: "",
          replyOwnerLastName: "",
          reviewLength: 0,
          page: 1,
          take: 5,
          sortReview: "newest",
          axiosError: null,
          isLoading: false,
        });
      },

      updateReviewRating: async (
        score: number,
        reviewId: string
      ): Promise<boolean> => {
        const { accessToken } = useSignInStore.getState();

        if (!accessToken) {
          toast.error("You must be signed in to rate a review.");
          return false;
        }

        try {
          const res = await axiosInstance.patch(
            `/review/update-rate/${reviewId}`,
            { rating: score },
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );

          if (res.status >= 200 && res.status <= 204) {
            const updatedReview = res.data.review;
            const totalRating = res.data.totalRating;

            set((state) => ({
              rating: updatedReview.rating,
              totalRating,
              reviewData: state.reviewData.map((review) =>
                review._id === updatedReview._id ? updatedReview : review
              ),
            }));
            console.log(res.data.review, "res.data.reviews")
            console.log(res.data.totalRating, "res.data.totalRating")

            // set({
            //   isLoading: false,
            //   axiosError: null,
            //   reviewData: res.data.reviews,
            //   reviewLength: res.data.reviewsTotalLength,
            //   totalRating: res.data.totalRating, 
            // });

            toast.success("Rating updated successfully!");
            return true;
          }

          return false;
        } catch (e) {
          const errorMsg = handleApiError(e as AxiosError<ErrorResponse>);
          toast.error(errorMsg);
          set({ axiosError: errorMsg });
          return false;
        }
      },
    }),
    {
      name: "review-store",
      partialize: (state) => ({
        reviewFormData: state.reviewFormData,
        page: state.page,
        take: state.take,
        sortReview: state.sortReview,
        replyOwnerName: state.replyOwnerName,
        replyOwnerLastName: state.replyOwnerLastName,
      }),
    }
  )
);
