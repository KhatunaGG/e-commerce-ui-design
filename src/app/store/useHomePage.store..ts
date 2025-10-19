import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";
import {
  ErrorResponse,
  IImageData,
  IUseHomePageStore,
} from "../interfaces/interface";

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    return errorMessage;
  }
  return "An unexpected error occurred";
};

export const useHomePageStore = create<IUseHomePageStore>((set, get) => ({
  cachedImagesByPage: {},
  imagesData: [],
  isLoading: false,
  axiosError: null,
  currentPage: "",

  setCurrentPage: async (page: string) => {
    const state = get();
    set({ currentPage: page });

    const cachedImages = state.cachedImagesByPage[page];
    if (cachedImages && cachedImages.length > 0) {
      set({
        imagesData: cachedImages,
        axiosError: null,
        isLoading: false,
      });
    } else {
      set({
        imagesData: [],
        axiosError: null,
        isLoading: true,
      });
      await get().getAllImages(page);
    }
  },

  getAllImages: async (page: string) => {
    const state = get();
    if (state.cachedImagesByPage[page]?.length > 0) {
      return;
    }
    set({ isLoading: true, axiosError: null });
    try {
      const res = await axiosInstance.get(`/utilities/by-page?page=${page}`);
      if (res.status >= 200 && res.status <= 204) {
        const newCachedData = {
          ...state.cachedImagesByPage,
          [page]: res.data,
        };
        set({
          cachedImagesByPage: newCachedData,
          imagesData: res.data,
          isLoading: false,
        });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({
        axiosError: errorMessage,
        isLoading: false,
        imagesData: [],
      });
    }
  },

  setCachedImagesByPage: (cachedImages: Record<string, IImageData[]>) =>
    set({ cachedImagesByPage: cachedImages }),
  clearCache: () =>
    set({
      cachedImagesByPage: {},
      imagesData: [],
      isLoading: false,
      axiosError: null,
    }),
  clearCurrentPageData: () =>
    set({
      imagesData: [],
      isLoading: false,
      axiosError: null,
    }),
}));
