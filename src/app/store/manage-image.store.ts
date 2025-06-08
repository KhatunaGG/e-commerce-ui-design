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
  fetchImages: () => Promise<void>;
  clearImages: () => void;
}

const useManageImageStore = create<IUseManageImageStore>((set) => ({
  imagesData: [],
  loading: false,
  error: null,
  axiosError: "",

  fetchImages: async () => {
    set({ loading: true, axiosError: null });
    try {
      const response = await axiosInstance.get<IImageData[]>("/all-images");
      set({ imagesData: response.data, loading: false });
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },

  clearImages: () => set({ imagesData: [], axiosError: null, loading: false }),
}));

export default useManageImageStore;
