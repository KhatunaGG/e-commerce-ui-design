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
  newArrivalProducts: [];
  rating: number;
  setRating: (rating: number) => void;

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
  getNewArrivalProductsFromApi: () => Promise<void>;

  cachedNewArrivalsByPage: Record<string, ProductsDataType[]>;
  setCachedNewArrivalsByPage: (page: string, data: ProductsDataType[]) => void;
  newArrivalsLoading: boolean;
  onRate: (rating: number) => void;

  // handleRate: (rate: number, id: string) => void;
  normalizeFirstChar: (str: string) => string | undefined;
  calculateDiscount: (price?: number, discount?: number) => string;
  getProductsFromCacheOrApi: (page: string) => Promise<void>
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

  rating: 0,
  setRating: (rating: number) => set({ rating }),

  // handleRate: (rate, id) => {}, // !!!!!!!!!!!!!!
  calculateDiscount: (price?: number, discount?: number): string => {
    if (typeof price !== "number") return "-";
    if (!discount || discount <= 0) return `$${price.toFixed(2)}`;
    const discountedPrice = price - (price * discount) / 100;
    return `$${discountedPrice.toFixed(2)}`;
  },

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

  // getAllProducts: async (page: string) => {
  //   const state = get();
  //   if (state.cachedImagesByPage[page]?.length > 0) {
  //     return;
  //   }
  //   set({ isLoading: true, axiosError: null });
  //   const { pageNumber, take } = state;

  //   try {
  //     const res = await axiosInstance.get(
  //       `product?page=${pageNumber}&take=${take}`
  //     );
  //     if (res.status >= 200 && res.status <= 204) {
  //       const newProducts = res.data.data;
  //       const dataLength = res.data.productsDataLength;
  //       const updatedProducts = [...state.productsData, ...newProducts];
  //       set((prev) => ({
  //         productsData: updatedProducts,
  //         productsDataLength: dataLength,
  //         isLoading: false,
  //         axiosError: null,
  //         cachedImagesByPage: {
  //           ...prev.cachedImagesByPage,
  //           [page]: updatedProducts,
  //         },
  //       }));
  //     }
  //     console.log(get().cachedImagesByPage, "cachedImagesByPage form HOME");
  //   } catch (e) {
  //     const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
  //     set({
  //       axiosError: errorMessage,
  //       isLoading: false,
  //       productsData: [],
  //     });
  //   }
  // },

  getAllProducts: async (page: string) => {
    const state = get();
    const cached = state.cachedImagesByPage[page];
    if (cached && cached.length > 0) {
      return;
    }
    set({ isLoading: true, axiosError: null });
    const { pageNumber, take } = state;
    try {
      const res = await axiosInstance.get(
        `product?page=${pageNumber}&take=${take}`
      );
      if (res.status >= 200 && res.status <= 204) {
        const newProducts = res.data.data;
        const dataLength = res.data.productsDataLength;
        set((prev) => ({
          productsData: newProducts,
          productsDataLength: dataLength,
          isLoading: false,
          axiosError: null,
          cachedImagesByPage: {
            ...prev.cachedImagesByPage,
            [page]: newProducts,
          },
        }));
      }
    } catch (e) {
      set({
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
        isLoading: false,
        productsData: [],
      });
    }
  },

  getProductsFromCacheOrApi: async (page: string) => {
    const state = get();
    const cached = state.cachedImagesByPage[page];
    if (cached && cached.length > 0) {
      set({
        currentPage: page,
        productsData: cached,
        isLoading: false,
        axiosError: null,
      });
    } else {
      set({
        currentPage: page,
        productsData: [],
        isLoading: true,
        axiosError: null,
      });
      await get().getAllProducts(page);
    }
  },

  loadMoreProducts: async () => {
    const state = get();
    const { pageNumber, productsData, productsDataLength, take, currentPage } =
      state;
    const alreadyLoaded = productsData.length;
    if (alreadyLoaded >= productsDataLength) return;
    const nextPage = pageNumber + 1;
    try {
      const res = await axiosInstance.get(
        `product?page=${nextPage}&take=${take}`
      );

      if (res.status >= 200 && res.status <= 204) {
        const newProducts = res.data.data;
        const dataLength = res.data.productsDataLength;

        const updatedProducts = [...productsData, ...newProducts];

        set((prev) => ({
          pageNumber: nextPage,
          productsData: updatedProducts,
          productsDataLength: dataLength,
          cachedImagesByPage: {
            ...prev.cachedImagesByPage,
            [currentPage]: updatedProducts,
          },
          isLoading: false,
          axiosError: null,
        }));
      }
    } catch (e) {
      set({
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
        isLoading: false,
      });
    }
  },

  getNewArrivalProductsFromApi: async () => {
    const state = get();
    const pageKey = "home";
    const shopKey = "shop";

    if (state.cachedNewArrivalsByPage[pageKey]?.length > 0) {
      return;
    }

    set({ newArrivalsLoading: true, axiosError: null });

    try {
      const res = await axiosInstance.get("/product/new-arrivals");
      if (res.status >= 200 && res.status <= 204) {
        const newProducts = res.data;

        set((prev) => ({
          cachedNewArrivalsByPage: {
            ...prev.cachedNewArrivalsByPage,
            [pageKey]: newProducts,
          },

          cachedImagesByPage: {
            ...prev.cachedImagesByPage,
            [shopKey]: newProducts,
          },

          newArrivalsLoading: false,
          axiosError: null,
        }));
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage, newArrivalsLoading: false });
    }
  },

  normalizeFirstChar: (str?: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  onRate: () => {},

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
      sortByTwoVertically: false,
    }),

  setCachedImagesByPage: (cachedImages: Record<string, ProductsDataType[]>) =>
    set({ cachedImagesByPage: cachedImages }),
}));
