"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "@/app/libs/axiosInstance";

const formSchema = z.object({
  imageName: z.string().min(1, "Image name is required"),
  pages: z.string().min(1, "Pages cannot be empty"),
  components: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim().length > 0, {
      message: "Components cannot be empty if provided",
    }),
  title: z
    .string()
    .optional()
    .refine((val) => val === undefined || val.trim().length > 0, {
      message: "Title cannot be empty if provided",
    }),
});

type FormData = z.infer<typeof formSchema>;

const Form = () => {
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageName: "",
      pages: "",
      components: "",
      title: "",
    },
  });

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSubmit = async (formData: FormData) => {
    console.log(formData, "formData");
    if (!file) {
      toast.error("Please select a file before submitting.");
      return;
    }
    const pagesArray: string[] = formData.pages
      .toString()
      .toLowerCase()
      .split(",")
      .map((page) => page.trim())
      .filter((page) => page.length > 0);

    const componentsArray: string[] = (formData.components || "")
      .toString()
      .toLowerCase()
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    const fileUploadForm = new FormData();
    fileUploadForm.append("file", file);

    try {
      const uploadRes = await axiosInstance.post("/upload", fileUploadForm);
      const filePath = uploadRes.data;
      if (!filePath) {
        throw new Error("No filePath returned from S3 upload.");
      }

      const res = await axiosInstance.post(`utilities`, {
        imageName: formData.imageName,
        filePath: filePath,
        pages: pagesArray,
        componentUsage: componentsArray || "",
        title: formData.title || "",
      });

      if (res.status >= 200 && res.status <= 204) {
        reset();
        setFile(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[30%] flex-col items-center justify-center py-10 min-h-screen"
      >
        <div className="w-full bg-green-200 flex flex-col gap-8">
          <div className="w-full flex items-center justify-center gap-6">
            <label htmlFor="" className="w-[20%]">
              image name
            </label>
            <input
              {...register("imageName")}
              type="text"
              className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
            />
          </div>

          <div className="w-full flex items-center justify-center gap-6">
            <label htmlFor="" className="w-[20%]">
              image/file
            </label>
            <input
              onChange={handleFile}
              type="file"
              className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
            />
          </div>

          <div className="w-full flex items-center justify-center gap-6">
            <label htmlFor="" className="w-[20%]">
              pages (comma separated)
            </label>
            <input
              {...register("pages")}
              type="text"
              className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
              placeholder="e.g. home, sign-in"
            />
          </div>

          <div className="w-full flex items-center justify-center gap-6">
            <label htmlFor="" className="w-[20%]">
              component (comma separated)
            </label>
            <input
              {...register("components")}
              type="text"
              className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
              placeholder="e.g. Hero, ByRooms"
            />
          </div>

          <div className="w-full flex items-center justify-center gap-6">
            <label htmlFor="" className="w-[20%]"></label>
            <input
              {...register("title")}
              type="text"
              className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
              placeholder="Title"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-10 py-4 rounded-lg bg-black text-white mt-8"
        >
          submit
        </button>
      </form>

    </>
  );
};

export default Form;
