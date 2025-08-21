// "use client";
// import { ArrowRight } from "../../__atoms";
// import EmojiSection from "../emojiSection/EmojiSection";
// import z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useReviewStore } from "@/app/store/review.store";
// import { useEffect, useRef } from "react";
// import { useEmojiInsert } from "@/app/commons/useEmoji";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { toast } from "react-toastify";

// export const reviewSchema = z.object({
//   text: z.string().min(1, "Please write a review"),
//   productId: z.string().min(1, "Product ID is required"),
// });

// export type ReviewType = z.infer<typeof reviewSchema>;

// const ReviewsForm = ({ params }: { params: string }) => {
//   const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
//   const { submitReview, isLoading } = useReviewStore();
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
//       productId: params,
//     },
//   });

//   const insertEmoji = useEmojiInsert(textAreaRef, setValue, "text");

//   const onSubmit = async (formData: ReviewType) => {
//     if (!accessToken) {
//       toast.error("You must be signed in to submit a review.");
//       return;
//     }

//     const success = await submitReview(formData, accessToken);
//     if (success) {
//       reset();
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="w-full flex items-center py-2 px-4 md:py-4 md:px-6 border border-[#E8ECEF] rounded-2xl mb-10"
//     >
//       <div className="flex-1 resize-none outline-none relative group">
//         <textarea
//           {...register("text")}
//           placeholder="Share your thoughts"
//           className="flex-1 resize-none outline-none w-full"
//           disabled={isLoading}
//           ref={textAreaRef}
//         />
//         {errors.text && (
//           <span className="text-red-500 text-sm">{errors.text.message}</span>
//         )}
//         <EmojiSection onSelectEmoji={insertEmoji} />
//       </div>
//       <input type="hidden" {...register("productId")} value={params} />

//       <button
//         type="submit"
//         disabled={isLoading}
//         className="w-8 h-8 md:h-auto md:w-fit bg-[#141718] rounded-full md:rounded-[80px] flex items-center justify-center md:py-[6px] md:px-10"
//       >
//         <span className="hidden md:inline text-white font-medium leading-[28px] tracking-[-0.4px]">
//           Write Review
//         </span>
//         <span className="md:hidden flex">
//           <ArrowRight params={params} />
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
import { useReviewStore } from "@/app/store/review.store";
import { useEffect, useRef } from "react";
import { useEmojiInsert } from "@/app/commons/useEmoji";
import { useSignInStore } from "@/app/store/sign-in.store";
import { toast } from "react-toastify";

export const reviewSchema = z.object({
  text: z.string().min(1, "Please write a review"),
  productId: z.string().min(1, "Product ID is required"),
  status: z.enum(["review", "reply"]),
  reviewOwnerId: z.string().nullable().optional(),
});

export type ReviewType = z.infer<typeof reviewSchema>;

export interface ReviewsFormProps {
  productId: string;
  reviewOwnerId?: string | null;
  status: "review" | "reply";
  replyToId?: string | null;
}

const ReviewsForm = ({
  // params,
  productId,
  // reviewOwnerId,
  status = "reply",
  // replyToId,
}: ReviewsFormProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { submitReview, isLoading } = useReviewStore();
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
    },
  });

  const insertEmoji = useEmojiInsert(textAreaRef, setValue, "text");

  const onSubmit = async (formData: ReviewType) => {
    if (!accessToken) {
      toast.error("You must be signed in to submit a review.");
      return;
    }

    const success = await submitReview(formData, accessToken);
    if (success) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      // className="w-full flex items-center py-2 px-4 md:py-4 md:px-6 border border-[#E8ECEF] rounded-2xl mb-10"
      className={`${
        status === "reply" ? "w-[80%]" : "w-full"
      }  flex items-center py-2 px-4 md:py-4 md:px-6 border border-[#E8ECEF] rounded-2xl mb-10 `}
    >
      <div className="flex-1 resize-none outline-none relative group">
        <textarea
          {...register("text")}
          placeholder="Share your thoughts"
          className="flex-1 resize-none outline-none w-full"
          disabled={isLoading}
          ref={textAreaRef}
        />
        {errors.text && (
          <span className="text-red-500 text-sm">{errors.text.message}</span>
        )}
        <EmojiSection onSelectEmoji={insertEmoji} />
      </div>
      <input type="hidden" {...register("productId")} value={productId} />

      <button
        type="submit"
        disabled={isLoading}
        className="w-8 h-8 md:h-auto md:w-fit bg-[#141718] rounded-full md:rounded-[80px] flex items-center justify-center md:py-[6px] md:px-10"
      >
        <span className="hidden md:inline text-white font-medium leading-[28px] tracking-[-0.4px]">
          Write {status === "reply" ? "Reply" : "Review"}
          {/* Write Review */}
        </span>
        <span className="md:hidden flex">
          <ArrowRight params={productId} />
        </span>
      </button>
    </form>
  );
};

export default ReviewsForm;
