"use client";
import { useBlogStore } from "@/app/store/blog.store";
import { Close, UploadImage } from "../../__atoms";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { toast } from "react-toastify";
import { useSignInStore } from "@/app/store/sign-in.store";

export const blogSchema = z.object({
  // title: z.string().min(1, "Title is required"),
  title: z.string().optional(),
  filepath: z.string().optional(),
  context: z.string().optional(),
  articleTitle: z.string().optional(),
});

export type BlogType = z.infer<typeof blogSchema>;

export type overlayProps = {
  isBlogPage?: boolean;
  blogId?: string;
};

const Overlay = ({ isBlogPage, blogId }: overlayProps) => {
  const { setShowOverlay, createBlog } = useBlogStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { initialize } = useSignInStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BlogType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      filepath: "",
      context: "",
      articleTitle: "",
    },
  });

  // const onSubmit = async (formData: BlogType) => {
  //   await initialize();
  //  const updatedAccessToken = useSignInStore.getState().accessToken;

  //   if (!updatedAccessToken) {
  //     toast.error("You must be signed in to proceed.");
  //     return;
  //   }

  //   const file = fileInputRef.current?.files?.[0];
  //   if (!file) {
  //     toast.error("Please upload a file.");
  //     return;
  //   }
  //   console.log(file, "file from Overlay");
  //   try {
  //     const success = await createBlog(formData, file, updatedAccessToken);
  //     if (success) {
  //       reset();
  //       if (fileInputRef.current) fileInputRef.current.value = "";
  //       setShowOverlay(false);
  //       toast.success("Blog created successfully!");
  //     } else {
  //       toast.error("Failed to create blog. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error creating blog:", error);
  //     toast.error("An error occurred while creating the blog.");
  //   }
  // };

  const onSubmit = async (formData: BlogType) => {
    await initialize();
    const updatedAccessToken = useSignInStore.getState().accessToken;

    if (!updatedAccessToken) {
      toast.error("You must be signed in to proceed.");
      return;
    }

    const files = fileInputRef.current?.files
      ? Array.from(fileInputRef.current.files)
      : [];
    if (!files.length) {
      toast.error("Please upload at least one file.");
      return;
    }

    try {
      let success = false;
      if (blogId) {
        success = await useBlogStore
          .getState()
          .createArticle(blogId, formData, files, updatedAccessToken);
      } else {
        success = await createBlog(formData, files[0], updatedAccessToken);
      }

      if (success) {
        reset();
        if (fileInputRef.current) fileInputRef.current.value = "";
        setShowOverlay(false);
        toast.success(
          blogId
            ? "Article created successfully!"
            : "Blog created successfully!"
        );
      } else {
        toast.error("Failed to create. Please try again.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("An error occurred while creating the blog.");
    }
  };

  return (
    <section className="fixed inset-0 bg-black/50 w-full h-full z-20">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[83%] md:w-[77%] lg:w-[50%]  rounded-lg bg-white p-8 shadow-2xl">
          <div className="w-full flex items-center justify-end">
            <Close
              isBlogPage={isBlogPage}
              setShowOverlay={setShowOverlay}
              blogId={blogId}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex  flex-col  gap-10"
          >
            <div className={`${blogId ? "hidden" : 'flex'} flex flex-col gap-2`}>
              <label
                htmlFor="title"
                className="text-sm font-semibold leading-[22px] text-[#121212]"
              >
                {blogId ? "Article title" : "Blog title"}
              </label>
              <input
                {...register("title")}
                type="text"
                name="title"
                id="title"
                className="border border-[#f1f1f1] px-4 py-2 outline-none"
                placeholder="Title..."
              />
              {errors.title && (
                <span className="text-red-500 text-xs">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className={`${blogId ? "flex" : "hidden"} w-full flex  flex-col  gap-4`}>
              <label
                htmlFor="articleTitle"
                className="text-sm font-semibold leading-[22px] text-[#121212]"
              >
                Article title
              </label>
              <input
                {...register("articleTitle")}
                type="text"
                name="articleTitle"
                id="articleTitle"
                className="border border-[#f1f1f1] px-4 py-2 outline-none"
                placeholder="Your Article Title..."
              />

              <textarea
                {...register("context")}
                className="w-full border border-[#f1f1f1] min-h-[100px] overflow-y-scroll outline-none px-4 py-2 resize-none"
                placeholder="Type your text..."
              ></textarea>
            </div>

            <div className="w-full flex items-start gap-4">
              <UploadImage />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                // accept=".jpg,.jpeg,.png,.gif,.webp"
                multiple
                className="text-sm font-semibold leading-[22px] text-[#121212]"
              />
            </div>

            <button
              type="submit"
              className="py-2 px-4 text-base font-semibold leading-[22px] text-[#121212] w-fit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Overlay;
