// "use client";
// import { ArrowRight } from "../../__atoms";
// import EmojiSection from "../emojiSection/EmojiSection";
// import z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ReplyType, useReviewStore } from "@/app/store/review.store";
// import { useEffect, useRef } from "react";
// import { useEmojiInsert } from "@/app/commons/useEmoji";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { toast } from "react-toastify";

// export const reviewSchema = z.object({
//   text: z.string().min(1, "Please write a review"),
//   productId: z.string().min(1, "Product ID is required"),
//   status: z.enum(["review", "reply"]),
//   reviewOwnerId: z.string().nullable().optional(),
//   replyToId: z.string().optional(),
//   replyOwnerId: z.string().optional(),
// });

// export type ReviewType = z.infer<typeof reviewSchema>;

// export interface ReviewsFormProps {
//   productId: string;
//   status: "review" | "reply";
//   reviewOwnerId?: string;
//   replyToId?: string;
// }

// const ReviewsForm = ({
//   productId,
//   reviewOwnerId,
//   status = "reply",
//   replyToId,
// }: ReviewsFormProps) => {
//   const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
//   const {
//     submitReview,
//     isLoading,
//     addReplayToReview,
//     setShowReply,
//     showReply,
//   } = useReviewStore();
//   const { accessToken, initialize } = useSignInStore();

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     setValue,
//   } = useForm<ReviewType>({
//     resolver: zodResolver(reviewSchema),
//     defaultValues: {
//       text: "",
//       productId,
//       status,
//       reviewOwnerId: reviewOwnerId ?? "",
//       replyToId: replyToId ?? "",
//     },
//   });

//   const insertEmoji = useEmojiInsert(textAreaRef, setValue, "text");

//   useEffect(() => {
//     if (Object.keys(errors).length > 0) {
//       console.warn("Validation Errors:", errors);
//     }
//   }, [errors]);

//   const onSubmit = async (formData: ReviewType) => {
//     if (!accessToken) {
//       toast.error("You must be signed in to submit.");
//       return;
//     }
//     if (formData.status === "reply") {
//       if (!formData.replyToId || !formData.reviewOwnerId) {
//         toast.error("Missing replyToId or reviewOwnerId.");
//         return;
//       }
//       const replyData: ReplyType = {
//         replyToId: formData.replyToId,
//         replyOwnerId: formData.reviewOwnerId,
//         text: formData.text,
//         productId: formData.productId,
//         status: formData.status,
//       };
//       const success = await addReplayToReview(replyData);
//       if (success) reset();
//       setShowReply(!showReply);
//       return;
//     } else {
//       const success = await submitReview(formData, accessToken);
//       if (success) reset();
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className={`${
//         status === "reply" ? "w-[80%]" : "w-full"
//       }  flex items-center py-2 px-4 md:py-4 md:px-6 border border-[#E8ECEF] rounded-2xl mb-10 `}
//     >
//       <div className="flex-1 resize-none outline-none relative group">
//         {/* <textarea
//           {...register("text")}
//           placeholder="Share your thoughts"
//           className="flex-1 resize-none outline-none w-full"
//           disabled={isLoading}
//           ref={textAreaRef}
//         /> */}
//         <textarea
//           placeholder="Share your thoughts"
//           className="flex-1 resize-none outline-none w-full"
//           disabled={isLoading}
//           {...register("text", {
//             onChange: (e) => {
//               setValue("text", e.target.value); 
//             },
//           })}
//           ref={(el) => {
//             register("text").ref(el);
//             textAreaRef.current = el;
//           }}
//         />
//         {errors.text && (
//           <span className="text-red-500 text-sm">{errors.text.message}</span>
//         )}
//         <EmojiSection onSelectEmoji={insertEmoji} />
//       </div>
//       <input type="hidden" {...register("productId")} value={productId} />
//       <input type="hidden" {...register("status")} value={status} />
//       <input type="hidden" {...register("replyToId")} value={replyToId} />
//       <input
//         type="hidden"
//         {...register("reviewOwnerId")}
//         value={reviewOwnerId ?? ""}
//       />

//       <button
//         type="submit"
//         disabled={isLoading}
//         className="w-8 h-8 md:h-auto md:w-fit bg-[#141718] rounded-full md:rounded-[80px] flex items-center justify-center md:py-[6px] md:px-10"
//       >
//         <span className="hidden md:inline text-white font-medium leading-[28px] tracking-[-0.4px]">
//           Write {status === "reply" ? "Reply" : "Review"}
//         </span>
//         <span className="md:hidden flex">
//           <ArrowRight params={productId} />
//         </span>
//       </button>
//     </form>
//   );
// };

// export default ReviewsForm;




"use client";
import { ArrowRight } from "../../__atoms";
import EmojiSection from "../emojiSection/EmojiSection";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReplyType, useReviewStore } from "@/app/store/review.store";
import { useEffect, useRef } from "react";
import { useEmojiInsert } from "@/app/commons/useEmoji";
import { useSignInStore } from "@/app/store/sign-in.store";
import { toast } from "react-toastify";

export const reviewSchema = z.object({
  text: z.string().min(1, "Please write a review"),
  productId: z.string().min(1, "Product ID is required"),
  status: z.enum(["review", "reply"]),
  reviewOwnerId: z.string().nullable().optional(),
  replyToId: z.string().optional(),
  replyOwnerId: z.string().optional(),
});

export type ReviewType = z.infer<typeof reviewSchema>;

export interface ReviewsFormProps {
  productId: string;
  status: "review" | "reply";
  reviewOwnerId?: string;
  replyToId?: string;
   setActiveReviewId?: (id: string | null) => void; 
}

const ReviewsForm = ({
  productId,
  reviewOwnerId,
  status = "reply",
  replyToId,
  setActiveReviewId
}: ReviewsFormProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    submitReview,
    isLoading,
    addReplayToReview,
  } = useReviewStore();
  const { accessToken, initialize } = useSignInStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ReviewType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      text: "",
      productId,
      status,
      reviewOwnerId: reviewOwnerId ?? "",
      replyToId: replyToId ?? "",
    },
  });

  const insertEmoji = useEmojiInsert(textAreaRef, setValue, "text");

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.warn("Validation Errors:", errors);
    }
  }, [errors]);

  const onSubmit = async (formData: ReviewType) => {
    if (!accessToken) {
      toast.error("You must be signed in to submit.");
      return;
    }
    if (formData.status === "reply") {
      if (!formData.replyToId || !formData.reviewOwnerId) {
        toast.error("Missing replyToId or reviewOwnerId.");
        return;
      }
      const replyData: ReplyType = {
        replyToId: formData.replyToId,
        replyOwnerId: formData.reviewOwnerId,
        text: formData.text,
        productId: formData.productId,
        status: formData.status,


        
         ratedBy: [],
      };
      const success = await addReplayToReview(replyData);
      if (success) reset();
      setActiveReviewId?.(null);
      return;
    } else {
      const success = await submitReview(formData, accessToken);
      if (success) reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        status === "reply" ? "w-[80%]" : "w-full"
      }  flex items-center py-2 px-4 md:py-4 md:px-6 border border-[#E8ECEF] rounded-2xl mb-10 `}
    >
      <div className="flex-1 resize-none outline-none relative group">
        <textarea
          placeholder="Share your thoughts"
          className="flex-1 resize-none outline-none w-full"
          disabled={isLoading}
          {...register("text", {
            onChange: (e) => {
              setValue("text", e.target.value); 
            },
          })}
          ref={(el) => {
            register("text").ref(el);
            textAreaRef.current = el;
          }}
        />
        {errors.text && (
          <span className="text-red-500 text-sm">{errors.text.message}</span>
        )}
        <EmojiSection onSelectEmoji={insertEmoji} />
      </div>
      <input type="hidden" {...register("productId")} value={productId} />
      <input type="hidden" {...register("status")} value={status} />
      <input type="hidden" {...register("replyToId")} value={replyToId} />
      <input
        type="hidden"
        {...register("reviewOwnerId")}
        value={reviewOwnerId ?? ""}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-8 h-8 md:h-auto md:w-fit bg-[#141718] rounded-full md:rounded-[80px] flex items-center justify-center md:py-[6px] md:px-10"
      >
        <span className="hidden md:inline text-white font-medium leading-[28px] tracking-[-0.4px]">
          Write {status === "reply" ? "Reply" : "Review"}
        </span>
        <span className="md:hidden flex">
          <ArrowRight params={productId} />
        </span>
      </button>
    </form>
  );
};

export default ReviewsForm;
