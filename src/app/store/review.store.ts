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
  ratedBy: RateType[];
}

export type RateType = {
  rating: number;
  ratedById: string;
};

export type LikeType = {
  like: number;
  likedById: string;
};

export interface DbReplyType extends ReplyType {
  userName: string;
  lastName: string;
  filePath: string;
  replyOwnerName: string;
  replyOwnerLastName: string;
  createdAt: string;
  ratedBy: RateType[];
  _id: string;
}

export interface DbReviewType extends ReviewType {
  reviewOwnerId: string | null;
  likes: LikeType[];
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
  likes: LikeType[];
  setSortReview: (order: "newest" | "oldest", productId: string) => void;
  setPage: (page: number, productId: string) => void;
  setEmojiVisible: (emojiVisible: boolean) => void;
  submitReview: (formData: ReviewType, accessToken: string) => Promise<boolean>;
  getAllReviews: (productId: string) => Promise<void>;
  addReplayToReview: (formData: ReplyType) => Promise<boolean>;
  formatDate: (dateString: string | "") => string;
  getReviewsCountOnly: () => Promise<void>;
  resetReviewStore: () => void;
  updateReviewRating: (score: number, reviewId: string) => Promise<boolean>;
  updateReplyRating: (
    score: number,
    replyId: string,
    productId: string,
    reviewId: string
  ) => Promise<boolean>;
  likeReview: (reviewId: string, userId: string) => Promise<void>;
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
      replyOwnerName: "",
      replyOwnerLastName: "",
      reviewLength: 0,
      take: 5,
      page: 1,
      totalRating: 0,
      sortReview: "newest",
      likes: [],

      setSortReview: (order, productId) => {
        set({ sortReview: order });
        get().getAllReviews(productId);
      },

      setPage: (page: number, productId: string) => {
        set({ page });
        get().getAllReviews(productId);
      },
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
          status: "review",
          rating: 0,
          replies: [],
          ratedBy: [],
          likes: [],
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

      updateReplyRating: async (
        score: number,
        replyId: string,
        productId: string,
        reviewId: string
      ) => {
        const { accessToken } = useSignInStore.getState();

        set({
          isLoading: true,
          axiosError: null,
        });
        try {
          const res = await axiosInstance.patch(
            `/review/update-reply-rate?productId=${productId}&reviewId=${reviewId}&replyId=${replyId}`,
            { rating: score },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (res.status >= 200 && res.status <= 204) {
            const updatedReply = res.data.updatedReply;
            const reviewId = res.data.reviewId;

            set((state) => ({
              reviewData: state.reviewData.map((review) => {
                if (review._id !== reviewId) return review;
                return {
                  ...review,
                  replies: review.replies.map((reply) =>
                    reply._id === updatedReply._id ? updatedReply : reply
                  ),
                };
              }),
            }));
            toast.success("Reply rating updated!");
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





      // likeReview: async (reviewId: string, userId: string) => {
      //   set((state) => {
      //     const updatedReviewData: DbReviewType[] = state.reviewData.map(
      //       (review) => {
      //         if (review._id !== reviewId) return review;
      //         const currentLikes = Array.isArray(review.likes)
      //           ? review.likes
      //           : [];

      //         const alreadyLiked = currentLikes.some(
      //           (like) => like.likedById === userId
      //         );

      //         let updatedLikes: LikeType[];
      //         if (alreadyLiked) {
      //           updatedLikes = currentLikes.filter(
      //             (like) => like.likedById !== userId
      //           );
      //         } else {
      //           updatedLikes = [
      //             ...currentLikes,
      //             { likedById: userId, like: 1 },
      //           ];
      //         }
      //         return { ...review, likes: updatedLikes };
      //       }
      //     );
      //     return {
      //       reviewData: updatedReviewData,
      //     };
      //   });
      //   const { accessToken } = useSignInStore.getState();
      //   set({
      //     isLoading: true,
      //     axiosError: null,
      //   });
      //   try {
      //     const res = await axiosInstance.patch(
      //       `/review/${reviewId}/like`,
      //       { userId },
      //       {
      //         headers: {
      //           Authorization: `Bearer ${accessToken}`,
      //         },
      //       }
      //     );
      //     if (res.status >= 0 && res.status <= 204) {
      //       set({ isLoading: false, axiosError: null });
      //     }
      //   } catch (e) {
      //     const errorMsg = handleApiError(e as AxiosError<ErrorResponse>);
      //     toast.error(errorMsg);
      //     set({ axiosError: errorMsg, isLoading: false });
      //   }
      // },

    likeReview: async (reviewId: string, userId: string) => {
  const state = get();
  const { reviewData } = state;
  const { accessToken } = useSignInStore.getState();

  if (!accessToken) {
    toast.error("You must be signed in to like a review.");
    return;
  }

  const review = reviewData.find((review) => review._id === reviewId);
  if (!review) {
    toast.error("Review not found.");
    return;
  }

  const currentLikes = Array.isArray(review.likes) ? review.likes : [];
  const alreadyLiked = currentLikes.some(
    (like) => like.likedById === userId
  );

  // 1. Optimistically update the local store first
  set((state) => {
    const updatedReviewData = state.reviewData.map((r) => {
      if (r._id !== reviewId) return r;
      let updatedLikes: LikeType[] = [];

      if (alreadyLiked) {
        updatedLikes = r.likes.filter((like) => like.likedById !== userId);
      } else {
        updatedLikes = [...r.likes, { likedById: userId, like: 1 }];
      }

      return { ...r, likes: updatedLikes };
    });

    return {
      reviewData: updatedReviewData,
    };
  });

  // 2. Send request to server
  set({
    isLoading: true,
    axiosError: null,
  });

  try {
    const res = await axiosInstance.patch(
      `/review/${reviewId}/like`,
      { userId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.status >= 200 && res.status <= 204) {
      toast.success(alreadyLiked ? "Review unliked." : "Review liked!");
      set({ isLoading: false });
    }
  } catch (e) {
    const errorMsg = handleApiError(e as AxiosError<ErrorResponse>);
    toast.error(errorMsg);
    set({ axiosError: errorMsg, isLoading: false });
  }
}








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
