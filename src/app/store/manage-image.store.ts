// import { create } from "zustand";
// import axios, { AxiosError } from "axios";
// import { axiosInstance } from "../libs/axiosInstance";

// export interface ErrorResponse {
//   message: string;
// }

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   if (axios.isAxiosError(error)) {
//     const errorMessage = error.response?.data.message || "An error occurred";
//     // toast.error(errorMessage);
//     return errorMessage;
//   }
//   const unexpectedError = "An unexpected error occurred";
//   // toast.error(unexpectedError);
//   return unexpectedError;
// };

// export interface IImageData {
//   imageName: string;
//   url: string;
//   componentUsage: string[];
//   page: string[];
//   presignedUrl: string;

//   title?: string
// }

// export interface IUseManageImageStore {
//   axiosError: string | null;
//   imagesData: IImageData[];
//   isLoading: boolean;
//   currentPath: string;
//   filteredImagesData: IImageData[];
//   currentPage: string;
//   setPath: (path: string) => void;
//   clearImages: () => void;
//   // fetchImagesByPage: (page: string) => void;
//   fetchImagesByPage: (page: string) => void;
// }

// const useManageImageStore = create<IUseManageImageStore>((set, get) => ({
//   imagesData: [],
//   isLoading: false,
//   error: null,
//   axiosError: "",
//   currentPath: "",
//   filteredImagesData: [],
//   currentPage: "",
//   setPath: (path: string) => set({ currentPath: path }),

//   // fetchImagesByPage: async (page: string) => {
//   //   set({ isLoading: true });
//   //   try {
//   //     const res = await axiosInstance.get(`/utilities/by-page?page=${page}`);
//   //     if (res.status >= 200 && res.status <= 204) {
//   //       set({ imagesData: res.data, isLoading: false });
//   //     }
//   //   } catch (e) {
//   //     const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//   //     set({ axiosError: errorMessage, isLoading: false });
//   //   }
//   // },

//   // clearImages: () => set({ imagesData: [], axiosError: null, loading: false }),

//  fetchImagesByPage: async (page: string) => {
//   const state = get();
//   if (state.currentPage === page) return;

//   set({ isLoading: true, currentPage: page, imagesData: [] });

//   try {
//     const res = await axiosInstance.get(`/utilities/by-page?page=${page}`);
//     if (res.status >= 200 && res.status <= 204) {
//       set({
//         imagesData: res.data,
//         isLoading: false,
//       });
//     }
//   } catch (e) {
//     const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//     set({ axiosError: errorMessage, isLoading: false });
//   }
// },
//   clearImages: () =>
//     set({
//       imagesData: [],
//       filteredImagesData: [],
//       axiosError: null,
//       isLoading: false,
//     }),
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
    return errorMessage;
  }
  const unexpectedError = "An unexpected error occurred";
  return unexpectedError;
};

export interface IImageData {
  imageName: string;
  url: string;
  componentUsage: string[];
  page: string[];
  presignedUrl: string;
  title?: string;
}

export interface IUseManageImageStore {
  axiosError: string | null;
  imagesData: IImageData[];
  isLoading: boolean;
  currentPath: string;
  filteredImagesData: IImageData[];
  currentPage: string;
  fetchingPages: Set<string>;
  setPath: (path: string) => void;
  clearImages: () => void;
  fetchImagesByPage: (page: string) => Promise<void>;
  // clearAndFetchImages: (page: string) => Promise<void>; 
  cleanup: () => void; 
}

const useManageImageStore = create<IUseManageImageStore>((set, get) => ({
  imagesData: [],
  isLoading: false,
  axiosError: null,
  currentPath: "",
  filteredImagesData: [],
  currentPage: "",
  fetchingPages: new Set(),

  setPath: (path: string) => {
    // Clear images when path changes
    const currentState = get();
    if (currentState.currentPath !== path) {
      
      set({
        currentPath: path,
        imagesData: [],
        filteredImagesData: [],
        currentPage: "",
        axiosError: null,
        fetchingPages: new Set(),
      });
      
    }
  },

  fetchImagesByPage: async (page: string) => {
    const state = get();
    // If we're already on this page and have data, don't fetch again
    if (state.currentPage === page && state.imagesData.length > 0) {
      console.log(state.currentPage, "currentPage")
      return;
    }
    // Prevent duplicate requests
    if (state.fetchingPages.has(page)) {
      return;
    }
    // Clear previous data and start fresh
    set({
      fetchingPages: new Set([page]),
      isLoading: true,
      axiosError: null,
      imagesData: [], // Clear previous images
      filteredImagesData: [],
    });

    try {
      const res = await axiosInstance.get(`/utilities/by-page?page=${page}`);

      if (res.status >= 200 && res.status <= 204) {
        set({
          imagesData: res.data || [],
          currentPage: page,
          isLoading: false,
          fetchingPages: new Set(),
        });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({
        axiosError: errorMessage,
        isLoading: false,
        fetchingPages: new Set(),
        imagesData: [],
        filteredImagesData: [],
      });
    }
  },

  // clearAndFetchImages: async (page: string) => {
  //   // Force clear and fetch - synchronous cleanup
  //   set({
  //     imagesData: [],
  //     filteredImagesData: [],
  //     currentPage: "",
  //     axiosError: null,
  //     fetchingPages: new Set(),
  //     isLoading: true // Set loading immediately
  //   });

  //   // Directly fetch new data
  //   await get().fetchImagesByPage(page);
  // },

  clearImages: () => {
    set({
      imagesData: [],
      filteredImagesData: [],
      axiosError: null,
      isLoading: false,
      fetchingPages: new Set(),
    });
  },

  cleanup: () => {
    // Complete cleanup - use this when unmounting or navigating away
    set({
      imagesData: [],
      isLoading: false,
      axiosError: null,
      currentPath: "",
      filteredImagesData: [],
      currentPage: "",
      fetchingPages: new Set(),
    });
  },
}));

export default useManageImageStore;
