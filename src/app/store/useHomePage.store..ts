// import axios, { AxiosError } from "axios";
// import { create } from "zustand";
// import { axiosInstance } from "../libs/axiosInstance";

// export interface ErrorResponse {
//   message: string;
// }

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   if (axios.isAxiosError(error)) {
//     const errorMessage = error.response?.data.message || "An error occurred";
//     return errorMessage;
//   }
//   return "An unexpected error occurred";
// };

// export interface IImageData {
//   imageName: string;
//   url: string;
//   componentUsage: string[];
//   page: string[];
//   presignedUrl: string;
//   title?: string;
//   getCurrentPage: (page: string) => void;
// }

// export interface IUseHomePageStore {
//   cachedImagesByPage: Record<string, IImageData[]>;

//   imagesData: IImageData[];
//   isLoading: boolean;
//   axiosError: string | null;
//   currentPage: string;
//   setCurrentPage: (currentPage: string) => void;
//   getCurrentPage: (page: string) => void;
//   getAllImages: (page: string) => Promise<void>;
//   setCachedImagesByPage: (cachedImages: Record<string, IImageData[]>) => void;
//   clearImagesData: () => void;
// }

// export const useHomePageStore = create<IUseHomePageStore>((set, get) => ({
//   cachedImagesByPage: {},
//   imagesData: [],
//   isLoading: false,
//   axiosError: null,
//   currentPage: "",
//   setCurrentPage: (currentPage: string) => set({ currentPage }),

//   getCurrentPage: (page: string) => {
//     const currentPage = get().currentPage;
//     if (currentPage !== page) {
//       const cachedImages = get().cachedImagesByPage[page] || [];
//       set({
//         currentPage: page,
//         imagesData: cachedImages,
//         axiosError: null,
//         isLoading: cachedImages.length === 0,
//       });
//       if (cachedImages.length === 0) {
//         get().getAllImages(page);
//       }
//     }
//   },

//   getAllImages: async (page: string) => {
//     const currentPage = get().currentPage;
//     const imagesData = get().imagesData;
//     set({ isLoading: true, axiosError: null });
//     if (currentPage === page && imagesData.length > 0) {
//       return;
//     }
//     try {
//       const res = await axiosInstance.get(`/utilities/by-page?page=${page}`);
//       if (res.status >= 200 && res.status <= 204) {
//         set({
//           cachedImagesByPage: { ...get().cachedImagesByPage, [page]: res.data },
//           imagesData: res.data,
//           isLoading: false,
//         });
//       }
//       // console.log(get().cachedImagesByPage, "cachedImagesByPage");
//     } catch (e) {
//       const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//       set({ axiosError: errorMessage, isLoading: false });
//     }
//   },
//   setCachedImagesByPage: (cachedImages: Record<string, IImageData[]>) =>
//     set({ cachedImagesByPage: cachedImages }),
//   clearImagesData: () => set({ imagesData: [], isLoading: false }),
// }));



import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";

export interface ErrorResponse {
  message: string;
}

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    return errorMessage;
  }
  return "An unexpected error occurred";
};

export interface IImageData {
  imageName: string;
  url: string;
  componentUsage: string[];
  page: string[];
  presignedUrl: string;
  title?: string;
}

export interface IUseHomePageStore {
  cachedImagesByPage: Record<string, IImageData[]>;
  imagesData: IImageData[];
  isLoading: boolean;
  axiosError: string | null;
  currentPage: string;
  
  // Actions
  setCurrentPage: (page: string) => void;
  getAllImages: (page: string) => Promise<void>;
  setCachedImagesByPage: (cachedImages: Record<string, IImageData[]>) => void;
  clearCache: () => void;
  clearCurrentPageData: () => void;
}

export const useHomePageStore = create<IUseHomePageStore>((set, get) => ({
  cachedImagesByPage: {},
  imagesData: [],
  isLoading: false,
  axiosError: null,
  currentPage: "",

  setCurrentPage: async (page: string) => {
    const state = get();
    if (state.currentPage === page) {
      return;
    }
    const cachedImages = state.cachedImagesByPage[page];
    if (cachedImages && cachedImages.length > 0) {
      set({
        currentPage: page,
        imagesData: cachedImages,
        axiosError: null,
        isLoading: false,
      });
    } else {
      set({
        currentPage: page,
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
          [page]: res.data 
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
        imagesData: [] 
      });
    }
  },

  setCachedImagesByPage: (cachedImages: Record<string, IImageData[]>) =>
    set({ cachedImagesByPage: cachedImages }),

  // Clear all cache and current data
  clearCache: () => set({ 
    cachedImagesByPage: {}, 
    imagesData: [], 
    isLoading: false,
    axiosError: null 
  }),
  clearCurrentPageData: () => set({ 
    imagesData: [], 
    isLoading: false,
    axiosError: null 
  }),
}));