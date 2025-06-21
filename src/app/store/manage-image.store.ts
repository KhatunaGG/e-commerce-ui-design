// import { create } from "zustand";
// import axios, { AxiosError } from "axios";
// import { axiosInstance } from "../libs/axiosInstance";

// export interface ErrorResponse {
//   message: string;
// }

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   if (axios.isAxiosError(error)) {
//     const errorMessage = error.response?.data.message || "An error occurred";
//     return errorMessage;
//   }
//   const unexpectedError = "An unexpected error occurred";
//   return unexpectedError;
// };

// export interface IImageData {
//   imageName: string;
//   url: string;
//   componentUsage: string[];
//   page: string[];
//   presignedUrl: string;
//   title?: string;
// }

// export interface IUseManageImageStore {
//   axiosError: string | null;
//   imagesData: IImageData[];
//   isLoading: boolean;
//   currentPath: string;
//   filteredImagesData: IImageData[];
//   currentPage: string;
//   fetchingPages: Set<string>;
//   setPath: (path: string) => void;
//   clearImages: () => void;
//   fetchImagesByPage: (page: string) => Promise<void>;
//   // clearAndFetchImages: (page: string) => Promise<void>;
//   cleanupImages: () => void;
// }

// const useManageImageStore = create<IUseManageImageStore>((set, get) => ({
//   imagesData: [],
//   isLoading: false,
//   axiosError: null,
//   currentPath: "",
//   filteredImagesData: [],
//   currentPage: "",
//   fetchingPages: new Set(),

//   setPath: (path: string) => {
//     // Clear images when path changes
//     const currentState = get();
//     if (currentState.currentPath !== path) {

//       set({
//         currentPath: path,
//         imagesData: [],
//         filteredImagesData: [],
//         currentPage: "",
//         axiosError: null,
//         fetchingPages: new Set(),
//       });

//     }
//   },

//   fetchImagesByPage: async (page: string) => {
//     const state = get();
//     // If we're already on this page and have data, don't fetch again
//     if (state.currentPage === page && state.imagesData.length > 0) {
//       console.log(state.currentPage, "currentPage")
//       return;
//     }
//     // Prevent duplicate requests
//     if (state.fetchingPages.has(page)) {
//       return;
//     }
//     // Clear previous data and start fresh
//     set({
//       fetchingPages: new Set([page]),
//       isLoading: true,
//       axiosError: null,
//       imagesData: [], // Clear previous images
//       filteredImagesData: [],
//     });

//     try {
//       const res = await axiosInstance.get(`/utilities/by-page?page=${page}`);

//       if (res.status >= 200 && res.status <= 204) {
//         set({
//           imagesData: res.data || [],
//           currentPage: page,
//           isLoading: false,
//           fetchingPages: new Set(),
//         });
//       }
//     } catch (e) {
//       const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//       set({
//         axiosError: errorMessage,
//         isLoading: false,
//         fetchingPages: new Set(),
//         imagesData: [],
//         filteredImagesData: [],
//       });
//     }
//   },

//   // clearAndFetchImages: async (page: string) => {
//   //   // Force clear and fetch - synchronous cleanup
//   //   set({
//   //     imagesData: [],
//   //     filteredImagesData: [],
//   //     currentPage: "",
//   //     axiosError: null,
//   //     fetchingPages: new Set(),
//   //     isLoading: true // Set loading immediately
//   //   });

//   //   // Directly fetch new data
//   //   await get().fetchImagesByPage(page);
//   // },

//   clearImages: () => {
//     set({
//       imagesData: [],
//       filteredImagesData: [],
//       axiosError: null,
//       isLoading: false,
//       fetchingPages: new Set(),
//     });
//   },

//   cleanupImages: () => {
//     // Complete cleanup - use this when unmounting or navigating away
//     set({
//       imagesData: [],
//       isLoading: false,
//       axiosError: null,
//       currentPath: "",
//       filteredImagesData: [],
//       currentPage: "",
//       fetchingPages: new Set(),
//     });
//   },
// }));

// export default useManageImageStore;

// IMPROVED STORE WITH DEBUG LOGGING





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
  cleanupImages: () => void;
}

const useManageImageStore = create<IUseManageImageStore>()(
  (set, get) => ({
  imagesData: [],
  isLoading: false,
  axiosError: null,
  currentPath: "",
  filteredImagesData: [],
  currentPage: "",
  fetchingPages: new Set(),

  setPath: (path: string) => {
    const currentState = get();
    // Only clear if path actually changed
    if (currentState.currentPath !== path) {
      console.log(`Path changed from ${currentState.currentPath} to ${path}, clearing data`);
      set({
        currentPath: path,
        imagesData: [],
        filteredImagesData: [],
        currentPage: "",
        axiosError: null,
        isLoading: false,
        fetchingPages: new Set(),
      });
    }
  },

  fetchImagesByPage: async (page: string) => {
    const state = get();
    
    console.log(`Attempting to fetch page: ${page}, current page: ${state.currentPage}, has data: ${state.imagesData.length > 0}`);
    
    // Prevent duplicate requests for the same page
    if (state.fetchingPages.has(page)) {
      console.log(`Already fetching page: ${page}`);
      return;
    }

    // If we already have data for this page, don't fetch again
    if (state.currentPage === page && state.imagesData.length > 0) {
      console.log(`Already have data for page: ${page}`);
      return;
    }

    console.log(`Starting fetch for page: ${page}`);

    // Add to fetching pages and set loading
    set((prevState) => ({
      ...prevState,
      fetchingPages: new Set([...prevState.fetchingPages, page]),
      isLoading: true,
      axiosError: null,
    }));

    try {
      const res = await axiosInstance.get(`/utilities/by-page?page=${page}`);

      if (res.status >= 200 && res.status <= 204) {
        const newState = get();
        // Only update if we're still fetching this page (prevents race conditions)
        if (newState.fetchingPages.has(page)) {
          set((prevState) => ({
            ...prevState,
            imagesData: res.data || [],
            currentPage: page,
            isLoading: false,
            fetchingPages: new Set([...prevState.fetchingPages].filter(p => p !== page)),
            axiosError: null,
          }));
          console.log(`Successfully fetched ${res.data?.length || 0} images for page: ${page}`);
        } else {
          console.log(`Fetch completed but page ${page} is no longer being fetched`);
        }
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      const newState = get();
      
      // Only update error state if we're still fetching this page
      if (newState.fetchingPages.has(page)) {
        set((prevState) => ({
          ...prevState,
          axiosError: errorMessage,
          isLoading: false,
          fetchingPages: new Set([...prevState.fetchingPages].filter(p => p !== page)),
        }));
        console.error(`Failed to fetch images for page ${page}:`, errorMessage);
      }
    }
  },

  clearImages: () => {
    console.log('Clearing images data');
    set({
      imagesData: [],
      filteredImagesData: [],
      axiosError: null,
      isLoading: false,
      fetchingPages: new Set(),
    });
  },

  cleanupImages: () => {
    console.log('Complete cleanup of images store');
    set({
      imagesData: [],
      isLoading: false,
      axiosError: null,
      filteredImagesData: [],
      currentPage: "",
      fetchingPages: new Set(),
      // Don't clear currentPath to allow proper comparison
    });
  },
}));

export default useManageImageStore;