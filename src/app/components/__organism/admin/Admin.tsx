"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "@/app/libs/axiosInstance";

const formSchema = z.object({
  imageName: z.string().min(1, "Image name is required"),
});

type FormData = z.infer<typeof formSchema>;

const Admin = () => {
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
    },
  });

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSubmit = async (formData: FormData) => {
    if (!file) {
      toast.error("Please select a file before submitting.");
      return;
    }
    const fileUploadForm = new FormData();
    fileUploadForm.append("file", file);

    try {
      const uploadRes = await axiosInstance.post("/upload", fileUploadForm);
      const filePath = uploadRes.data;
      console.log(filePath, "filePath")
      if (!filePath) {
        throw new Error("No filePath returned from S3 upload.");
      }

      const res = await axiosInstance.post(`utilities`, {
        imageName: formData.imageName,
        filePath: filePath,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center justify-center py-10 min-h-screen"
    >
      <div className="w-[70%] bg-green-200 flex flex-col gap-8">
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
      </div>

      <button
        type="submit"
        className="px-10 py-4 rounded-lg bg-black text-white mt-8"
      >
        submit
      </button>
    </form>
  );
};

export default Admin;
