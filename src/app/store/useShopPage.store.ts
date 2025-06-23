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
  const unexpectedError = "An unexpected error occurred";
  return unexpectedError;
};

export type ProductsDataType = {
  productName: string;
  filePath?: string;
  pages: string[];
  components: string[];
  new: boolean;
  discount: number;
  rate: number;
  category: string[];
  price: number;
  colors: string[];
  reviews?: string[];
  questions?: string[];
  stock: number;
  wishlist: boolean;
  measurements: string;
  details: string;
  discountTill: string;
  _id: string;
  presignedUrl: string;
};

export interface IUseShopPageStore {
  cachedImagesByPage: Record<string, ProductsDataType[]>;
  selected: string;
  isDroppedDown: boolean;
  sortedByFour: boolean;
  sortByTwoVertically: boolean;
  sortByTwoHorizontally: boolean;
  productsData: ProductsDataType[];
  isLoading: boolean;
  axiosError: string | null;
  currentPage: string;
  pageNumber: number;
  take: number;
  productsDataLength: number;
  // setPageNumber: (pageNumber: string) => void;
  // setTake: (take: number) => string;
  setCachedImagesByPage: (
    cachedImages: Record<string, ProductsDataType[]>
  ) => void;
  setCurrentPage: (currentPage: string) => void;
  setsSortedByFour: (v: boolean) => void;
  setSortByTwoVertically: (v: boolean) => void;
  setSortByTwoHorizontally: (v: boolean) => void;
  setSelected: (selected: string) => void;
  setIsDroppedDown: (isDroppedDown: boolean) => void;
  handleSelect: (value: string) => void;
  resetAllByIconsSort: () => void;
  getAllProducts: (page: string) => Promise<void>;
  clearCurrentPageData: () => void;
  clearCache: () => void;
  loadMoreProducts: () => Promise<void>;
  newArrivalProducts: [];
  getNewArrivalProductsFromApi: () => Promise<void>;

  cachedNewArrivalsByPage: Record<string, ProductsDataType[]>;
  setCachedNewArrivalsByPage: (page: string, data: ProductsDataType[]) => void;
  newArrivalsLoading: boolean;
}

export const useShopPageStore = create<IUseShopPageStore>((set, get) => ({
  cachedImagesByPage: {},
  productsData: [],
  isLoading: false,
  axiosError: null,
  selected: "Sort By",
  isDroppedDown: false,
  sortedByFour: false,
  sortByTwoVertically: false,
  sortByTwoHorizontally: false,
  currentPage: "",
  pageNumber: 1,
  take: 12,
  productsDataLength: 0,
  newArrivalProducts: [],

  cachedNewArrivalsByPage: {},

  setCachedNewArrivalsByPage: (page, data) =>
    set((state) => ({
      cachedNewArrivalsByPage: {
        ...state.cachedNewArrivalsByPage,
        [page]: data,
      },
    })),
  newArrivalsLoading: false,

  setCurrentPage: async (page: string) => {
    const state = get();
    if (state.currentPage === page) {
      return;
    }
    const cachedImages = state.cachedImagesByPage[page];
    if (cachedImages && cachedImages.length > 0) {
      set({
        currentPage: page,
        productsData: cachedImages,
        axiosError: null,
        isLoading: false,
      });
    } else {
      set({
        currentPage: page,
        productsData: [],
        axiosError: null,
        isLoading: true,
      });
      await get().getAllProducts(page);
    }
  },
  setsSortedByFour: (v) =>
    set({
      sortedByFour: v,
      sortByTwoVertically: false,
      sortByTwoHorizontally: false,
    }),
  setSortByTwoVertically: (v) =>
    set({
      sortedByFour: false,
      sortByTwoVertically: v,
      sortByTwoHorizontally: false,
    }),
  setSortByTwoHorizontally: (v) =>
    set({
      sortedByFour: false,
      sortByTwoVertically: false,
      sortByTwoHorizontally: v,
    }),
  setSelected: (selected) => set({ selected }),
  setIsDroppedDown: (isDroppedDown) => set({ isDroppedDown }),
  handleSelect: (value) => {
    set({ selected: value });
  },
  resetAllByIconsSort: () => {
    set({
      sortedByFour: false,
      sortByTwoVertically: false,
      sortByTwoHorizontally: false,
    });
  },
  getAllProducts: async (page: string) => {
    const state = get();
    if (state.cachedImagesByPage[page]?.length > 0) {
      return;
    }
    set({ isLoading: true, axiosError: null });
    const { pageNumber, take } = state;

    try {
      const res = await axiosInstance.get(
        `product?page=${pageNumber}&take=${take}`
      );
      if (res.status >= 200 && res.status <= 204) {
        console.log("getting data from SERVER")
        const newProducts = res.data.data;
        const dataLength = res.data.productsDataLength;
        const updatedProducts = [...state.productsData, ...newProducts];
        set((prev) => ({
          productsData: updatedProducts,
          productsDataLength: dataLength,
          isLoading: false,
          axiosError: null,
          cachedImagesByPage: {
            ...prev.cachedImagesByPage,
            [page]: updatedProducts,
          },
        }));
      }
      console.log(get().cachedImagesByPage, "cachedImagesByPage form SHOP");
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({
        axiosError: errorMessage,
        isLoading: false,
        productsData: [],
      });
    }
  },

  loadMoreProducts: async () => {
    const state = get();
    const { pageNumber, productsData, productsDataLength } = state;
    const alreadyLoaded = productsData.length;
    if (alreadyLoaded >= productsDataLength) return;
    const nextPage = pageNumber + 1;
    set({ pageNumber: nextPage });
    await get().getAllProducts(state.currentPage);
  },

  getNewArrivalProductsFromApi: async () => {
    const state = get();
    const pageKey = "home";

    if (state.cachedNewArrivalsByPage[pageKey]?.length > 0) {
      console.log("✅ Using cached new arrivals for home");
      return;
    }

    set({ newArrivalsLoading: true, axiosError: null });

    try {
      const res = await axiosInstance.get("/product/new-arrivals");
      if (res.status >= 200 && res.status <= 204) {
        const newProducts = res.data;
        console.log("📦 Caching new arrival products:", newProducts);
        set((prev) => ({
          cachedNewArrivalsByPage: {
            ...prev.cachedNewArrivalsByPage,
            [pageKey]: newProducts,
          },
          newArrivalsLoading: false,
          axiosError: null,
        }));
      }
      console.log(
        get().cachedNewArrivalsByPage,
        "cachedImagesByPage form SHOP"
      );
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage, newArrivalsLoading: false });
    }
  },

  clearCache: () => {
    set({
      productsData: [],
      isLoading: false,
      axiosError: null,
    });
  },
  clearCurrentPageData: () =>
    set({
      productsData: [],
      isLoading: false,
      axiosError: null,
    }),

  setCachedImagesByPage: (cachedImages: Record<string, ProductsDataType[]>) =>
    set({ cachedImagesByPage: cachedImages }),
}));
