import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "../libs/axiosInstance";

export interface ErrorResponse {
  message: string;
}

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    // toast.error(errorMessage);
    return errorMessage;
  }
  const unexpectedError = "An unexpected error occurred";
  // toast.error(unexpectedError);
  return unexpectedError;
};

export interface IImageData {
  imageName: string;
  url: string;

  componentUsage: string[];
  page: string[];
  presignedUrl: string;
}

export interface IUseManageImageStore {
  axiosError: string | null;
  imagesData: IImageData[];
  isLoading: boolean;
  currentPath: string;
  filteredImagesData: IImageData[];
  setPath: (path: string) => void;
  clearImages: () => void;
  // fetchImagesByPage: (page: string) => void;
  fetchImagesByPage: (page: string) => void;
}

const useManageImageStore = create<IUseManageImageStore>((set) => ({
  imagesData: [],
  isLoading: false,
  error: null,
  axiosError: "",
  currentPath: "",
  filteredImagesData: [],
  setPath: (path: string) => set({ currentPath: path }),

  fetchImagesByPage: async (page: string) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/utilities/by-page?page=${page}`);
      if (res.status >= 200 && res.status <= 204) {
        set({ imagesData: res.data, isLoading: false });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage, isLoading: false });
    }
  },

  // clearImages: () => set({ imagesData: [], axiosError: null, loading: false }),
  clearImages: () =>
    set({
      imagesData: [],
      filteredImagesData: [],
      axiosError: null,
      isLoading: false,
    }),
}));

export default useManageImageStore;
