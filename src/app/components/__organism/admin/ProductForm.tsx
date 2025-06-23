"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "@/app/libs/axiosInstance";

export const productFormSchema = z.object({
  productName: z.string().min(1, "Image name is required"),
  pages: z.string().min(1, "Pages cannot be empty"),
  components: z.string().optional(),
  new: z.boolean(),
  price: z.number().min(0, "Price must be 0 or more"),
  rate: z.number().min(0, "Rate must be 0 or more"),
  discount: z.number().min(0, "Discount must be 0 or more"),
  colors: z.string().min(1, "Colors cannot be empty"),
  category: z.string().min(1, "Category cannot be empty"),
  // reviews: z.string().optional(), 
  // questions: z.string().optional(),
  stock: z.number().min(0, "Stock must be 0 or more"),
  wishlist: z.boolean(),
  measurements: z.string().optional(),
  details: z.string().min(1, "Details are required"),
  discountTill: z
    .string()
    .min(1)
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Discount end date must be a valid date",
    }),
});

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;

const ProductForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const {
    register,
    reset,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      productName: "",
      // filePath: '',
      pages: "",
      components: "",
      new: false,
      discount: 0,
      rate: 0,
      category: "",
      price: 0,
      colors: "",
      // reviews: "",
      // questions: "",
      stock: 0,
      wishlist: false,
      measurements: "",
      details: "",
      discountTill: new Date().toISOString().split("T")[0] || "",
    },
  });

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const toArray = (input: string | undefined): string[] => {
    return input
      ? input
          .toString()
          .toLowerCase()
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
      : [];
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    console.log("=== FORM SUBMIT EVENT ===");
    e.preventDefault(); 
    handleSubmit(onSubmit)(e);
  };

  const onSubmit = async (formData: ProductFormSchemaType) => {
    if (!file) {
      toast.error("Please select a file before submitting.");
      return;
    }
    const pagesArray = toArray(formData.pages);
    const componentsArray = toArray(formData.components);
    const colorsArray = toArray(formData.colors);
    const categoryArray = toArray(formData.category);
    const fileUploadForm = new FormData();
    fileUploadForm.append("file", file);

    try {
      const uploadRes = await axiosInstance.post("/upload", fileUploadForm);
      const filePath = uploadRes.data;
      console.log(filePath, "filePath");
      if (!filePath) {
        throw new Error("No filePath returned from S3 upload.");
      }

      const newFormData = {
        ...formData,
        pages: pagesArray || "",
        components: componentsArray || "",
        colors: colorsArray || "",
        category: categoryArray || "",
        // reviews: reviewsArray || "",
        // questions: questionsArray || "",
        filePath: filePath
      };
      const res = await axiosInstance.post(`/product`, newFormData)
      if(res.status >= 200 && res.status <= 204) {
        reset()
      }

      console.log(newFormData, "newFormData")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      onSubmit={handleFormSubmit}
      noValidate
      className="w-[68%] flex-col items-center justify-center py-10 min-h-screen"
    >
      <div className="w-full bg-green-200 flex flex-col gap-8">
        <div className="w-full flex items-center justify-center gap-6">
          <label htmlFor="" className="w-[20%]">
            image name
          </label>
          <input
            {...register("productName")}
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
        <div className="w-full flex items-center justify-between">
          <div className="w-full flex flex-col items-start justify-center ">
            <label htmlFor="" className="w-[20%]">
              Price
            </label>
            <input
              // {...register("price")}
              {...register("price", { valueAsNumber: true })}
              type="text"
              className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
              placeholder="price"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center">
            <label htmlFor="" className="w-[20%]">
              discount
            </label>
            <input
              // {...register("discount")}
                {...register("discount", { valueAsNumber: true })}
              type="text"
              className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
              placeholder="discount"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center">
            <label htmlFor="" className="w-[20%]">
              stock
            </label>
            <input
              // {...register("stock")}
              {...register("stock", { valueAsNumber: true })}
              type="text"
              className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
              placeholder="inStock"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center">
            <label htmlFor="" className="w-[20%]">
              measurements
            </label>
            <input
              {...register("measurements")}
              type="text"
              className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
              placeholder="measurements"
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-center gap-6">
          <label htmlFor="" className="w-[20%]">
            details
          </label>
          <input
            {...register("details")}
            type="text"
            className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
            placeholder=""
          />
        </div>

        <div className="w-full flex items-center justify-center gap-6">
          <label htmlFor="" className="w-[20%]">
            colors (comma separated)
          </label>
          <input
            {...register("colors")}
            type="text"
            className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
            placeholder="e.g. home, sign-in"
          />
        </div>

        <div className="w-full flex items-center justify-center gap-6">
          <label htmlFor="" className="w-[20%]">
            category
          </label>
          <input
            {...register("category")}
            type="text"
            className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
            placeholder="e.g. furniture, electronics"
          />
        </div>

        <div className="w-full flex items-center justify-center gap-6">
          <label htmlFor="" className="w-[20%]">
            discount till...
          </label>
          <input
            {...register("discountTill")}
            type="date"
            className="flex-1 py-2 px-4 rounded-lg border border-gray-400 outline-none"
            placeholder="  discount till... "
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

export default ProductForm;

// const newFormData = {
//   ...formData,
//   new: true,
//   filePath,
//   rate: 0,
//   wishlist: false,
//   reviews: reviewsArray,
//   page: pagesArray,
//   category: componentsArray,
//   colors: colorArray,
//   questions: questionsArray,
// };
// console.log(newFormData, "newFormData");
// const res = axiosInstance.post(`/product`);

//     export type ProductPropsType = {
// presignedUrl: string;
// imageName: string;
// new: boolean;         //true
// discount: number;
// rate: number;        //0
// category: string[];
// price: number;
// colors: string[];
// reviews: string[];         //""
// stock: number;
// wishlist: boolean;       //false
// measurements: string;
// details: string;
// packaging: string;
// questions: string[];  //string[]
// };

// export const productFormSchema = z.object({
//   productName: z.string().min(1, "Image name is required"),
//   // filePath: z.string().min(1, "File path is required"),
//   pages: z.array(z.string().min(1)).min(1, "Pages cannot be empty"),
//   components: z.array(z.string().min(1)).optional(),
//   new: z.boolean(),
//   discount: z.number().min(0, "Discount must be 0 or more"),
//   rate: z.number().min(0, "Rate must be 0 or more"),
//   category: z.array(z.string().min(1)).min(1, "Category cannot be empty"),
//   price: z.number().min(0, "Price must be 0 or more"),
//   colors: z.array(z.string().min(1)).min(1, "Colors cannot be empty"),
//   reviews: z.array(z.string()).optional(),
//   stock: z.number().min(0, "Stock must be 0 or more"),
//   wishlist: z.boolean(),
//   measurements: z.string().optional(),
//   details: z.string().min(1, "Details are required"),
//   questions: z.array(z.string().min(1)).optional(),
//   discountTill: z
//     .string()
//     .min(1)
//     .refine((val) => !isNaN(Date.parse(val)), {
//       message: "Discount end date must be a valid date",
//     }),
// });
