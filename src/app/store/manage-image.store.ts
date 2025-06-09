// import { create } from "zustand";

// export interface IUseManageImageStore {
//   bannerImage: string[];
//   addImage: (url: string) => void;
// }

// const useManageImageStore = create<IUseManageImageStore>((set) => ({
//   bannerImage: [],
//   addImage: (url: string) =>
//     set((state) => ({
//       bannerImage: [...state.bannerImage, url],
//     })),
// }));

// export default useManageImageStore;

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
}

export interface IUseManageImageStore {
  axiosError: string | null;
  imagesData: IImageData[];
  loading: boolean;
  currentPath: string;
  setPath: (path: string) => void;
  clearImages: () => void;
  fetchImagesByPage: (page: string) => void;
}

const useManageImageStore = create<IUseManageImageStore>((set) => ({
  imagesData: [],
  loading: false,
  error: null,
  axiosError: "",
  currentPath: "",

  setPath: (path: string) => set({ currentPath: path }),

  fetchImagesByPage: async (page: string) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/utilities/by-page?page=${page}`);
      if (res.status >= 200 && res.status <= 204) {
        set({ imagesData: res.data, loading: false });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },

  clearImages: () => set({ imagesData: [], axiosError: null, loading: false }),
}));

export default useManageImageStore;
