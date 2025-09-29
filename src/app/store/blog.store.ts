import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BlogType } from "../components/__organism/overlay/Overlay";
import axios, { AxiosError } from "axios";
import { useSignInStore } from "./sign-in.store";
import { axiosInstance } from "../libs/axiosInstance";

export interface ErrorResponse {
  message: string;
}

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    return errorMessage;
  }
  const unexpectedError = "An unexpected error occurred";
  return unexpectedError;
};

export interface IBlogStore {
  isLoading: boolean;
  axiosError: string | null;
  showOverlay: boolean;
  setShowOverlay: (val: boolean) => void;
  toggleOverlay: () => void;
  createBlog: (
    formData: BlogType,
    file: File,
    accessToken: string
  ) => Promise<boolean>;
  getFilePathFromAwsS3: (file: File) => Promise<string>;
}

export type DbBlogType = {
  title: string;
  filePath: string;

  authorFName: "";
  authorLName: "";
  articles: [];
  authorId: "";
  _id: string;
  createdAt: string;
};

export const useBlogStore = create<IBlogStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      showOverlay: false,
      axiosError: null,
      setShowOverlay: (val) => set({ showOverlay: val }),
      toggleOverlay: () => set({ showOverlay: !get().showOverlay }),

      getFilePathFromAwsS3: async (file: File) => {
        console.log(file, "file form Store");
        const signInStore = useSignInStore.getState();
        const { accessToken } = signInStore;
        // if (!file || !accessToken) return "";
        // if (!file.type.startsWith("image/")) {
        //   set({ axiosError: "Only image files are allowed." });
        //   return "";
        // }

        if (!file) {
          set({ axiosError: "File is missing" });
          return null;
        }
        if (!accessToken) {
          set({ axiosError: "Access token is missing" });
        }
        if (!file.type.startsWith("image/")) {
          set({ axiosError: "Only image files are allowed." });
          return null;
        }

        set({ isLoading: true, axiosError: null });
        try {
          const formData = new FormData();
          formData.append("file", file);
          console.log(formData, "formdata from Store");
          const res = await axiosInstance.patch("blog/upload-file", formData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.status >= 200 && res.status <= 204) {
            set({ isLoading: false });
            return res.data;
          }
          set({ isLoading: false, axiosError: "Upload failed" });
          return null;
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
          return null;
        }
      },

      createBlog: async (formData, file, accessToken) => {
        set({ isLoading: true, axiosError: null });
        try {
          const filePathFromAwsS3 = await get().getFilePathFromAwsS3(file);
          if (!filePathFromAwsS3) {
            set({
              isLoading: false,
              axiosError: "File upload failed, no path returned",
            });
            return false;
          }

          const updatedFormData = {
            ...formData,
            filePath: filePathFromAwsS3,

            authorFName: "",
            authorLName: "",
            articles: [],
            authorId: "",
          };

          //           const signInStore = useSignInStore.getState();
          // const { accessToken } = signInStore;

          const res = await axiosInstance.post("blog/create", updatedFormData, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          if (res.status >= 200 && res.status <= 204) {
            set({ isLoading: false });
            return true;
          }
          set({ isLoading: false });
          return false;
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
        return false;
      },
    }),
    {
      name: "blog-store",
    }
  )
);
