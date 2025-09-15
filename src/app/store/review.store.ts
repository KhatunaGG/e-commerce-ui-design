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
  // questions: IQuestions[];
  reviewText: string;
  productId: string;
  createdAt: string;
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
  showReply: boolean;
  replyOwnerName: string;
  replyOwnerLastName: string;
  reviewLength: number;
  take: number;
  page: number;

  // questionFormData: {
  //   question: string;
  //   productId: string;
  // };
  // submitQuestion: (formData: QuestionType) => Promise<boolean>;

  setPage: (page: number, productId: string) => void;
  setShowReply: (showReply: boolean) => void;
  setEmojiVisible: (emojiVisible: boolean) => void;
  submitReview: (formData: ReviewType, accessToken: string) => Promise<boolean>;
  getAllReviews: (productId: string) => Promise<void>;
  addReplayToReview: (formData: ReplyType) => Promise<boolean>;
  formatDate: (dateString: string | "") => string;
  getReviewsCountOnly: () => Promise<void>;
}

export const useReviewStore = create<IUseReviewStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      axiosError: null,
      reviewData: [],
      reviewFormData: { text: "", productId: "" },
      emojiVisible: false,
      showReply: false,
      replyOwnerName: "",
      replyOwnerLastName: "",
      reviewLength: 0,
      take: 5,
      page: 1,

      // questionFormData: { question: "", productId: "" },
      // submitQuestion: async (formData: QuestionType) => {
      //   set({
      //     isLoading: true,
      //     axiosError: null,
      //   });
      //   const newQuestionData = {
      //     question: formData.question,
      //     productId: formData.productId,
      //     questionsOwnerId: null,
      //     status: "question",
      //     answers: [],
      //   };
      //   try {

      //     return true
      //   }catch(e) {
      //            const errorMsg = handleApiError(e as AxiosError<ErrorResponse>);
      //     set({
      //       isLoading: false,
      //       axiosError: errorMsg,
      //     });
      //     toast.error(errorMsg);
      //     return false;
      //   }finally {
      //     set({ isLoading: false });
      //   }

      // },

     setPage: (page: number, productId: string) => {
  set({ page });
  get().getAllReviews(productId);
},
      setShowReply: () => set((state) => ({ showReply: !state.showReply })),
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
          // questions: [],
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

      // getAllReviews: async () => {
      //   set({ isLoading: true, axiosError: null });
      //   try {
      //     const res = await axiosInstance.get("/review");
      //     if (res.status >= 200 && res.status <= 204) {
      //       set({
      //         isLoading: false,
      //         axiosError: null,
      //         reviewData: res.data,
      //         reviewLength: res.data.length,
      //       });
      //     }
      //   } catch (e) {
      //     set({
      //       isLoading: false,
      //       axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      //     });
      //   }
      // },

      getAllReviews: async (productId: string) => {
        const { page, take } = get();
        set({ isLoading: true, axiosError: null });

        try {
          const res = await axiosInstance.get(
            `/review?page=${page}&take=${take}&productId=${productId}`
          );
          if (res.status >= 200 && res.status <= 204) {
            set({
              isLoading: false,
              axiosError: null,
              reviewData: res.data.reviews,
              reviewLength: res.data.reviewsTotalLength,
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
        // const {currentUser} = useSignInStore.getState()
        // console.log(formData, "formData from STORE")

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
    }),
    {
      name: "review-store",
      partialize: (state) => ({
        reviewFormData: state.reviewFormData,
      }),
    }
  )
);
