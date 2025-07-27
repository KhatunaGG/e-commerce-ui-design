import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";

export interface ErrorResponse {
  message: string;
}

export type CategoryFilter =
  | "All Rooms"
  | "Living Room"
  | "Bedroom"
  | "Kitchen"
  | "Bathroom"
  | "Dinning"
  | "Outdoor"
  | null;

export type PriceFilter =
  | "All Price"
  | "0.00 - 99.99"
  | "100.00 - 199.99"
  | "200.00 - 299.99"
  | "300.00 - 399.99"
  | "400.00+"
  | null;

export type SortByType =
  | "Sort By"
  | "Latest"
  | "Oldest"
  | "A to Z"
  | "Z to A"
  | "Highest"
  | "Lowest";

export interface FiltersType {
  category: CategoryFilter;
  priceRange: PriceFilter;
}

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

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    return errorMessage;
  }
  const unexpectedError = "An unexpected error occurred";
  return unexpectedError;
};

export interface IUseShopStore {
  isLoading: boolean;
  axiosError: string | null;
  selected: string;
  isDroppedDown: boolean;
  sortedByFour: boolean;
  sortByTwoVertically: boolean;
  sortByTwoHorizontally: boolean;
  currentPage: string;
  pageNumber: number;
  take: number;
  newArrivalProducts: ProductsDataType[];
  rating: number;
  sortBy: string;
  filters: FiltersType;

  productsData: ProductsDataType[];
  productsDataLengthByKey: number;

  cachedProductsData: Record<string, ProductsDataType[]>;
  cachedDataLengthByKey: Record<string, number>;

  productsDataTotalLength: number;
  cachedProductsDataTotalLength: number;

  cachedNewArrivalsByPage: Record<string, ProductsDataType[]>;
  newArrivalsLoading: boolean;
  isLoadingMore: boolean;

  calculateDiscount: (price?: number, discount?: number) => string;
  setSortBy: (sortBy: string) => void;
  setFilters: (filters: FiltersType) => void;
  setRating: (rating: number) => void;
  setCurrentPage: (currentPage: string) => void;
  setsSortedByFour: (v: boolean) => void;
  setSortByTwoVertically: (v: boolean) => void;
  setSortByTwoHorizontally: (v: boolean) => void;
  setSelected: (selected: string) => void;
  setIsDroppedDown: (isDroppedDown: boolean) => void;
  handleSelect: (value: string) => void;
  resetAllByIconsSort: () => void;
  getNewArrivalProductsFromApi: () => Promise<void>;
  getAllProducts: (v: boolean) => Promise<void>;
  getProductsFromCacheOrApi: () => Promise<void>;
  mapSortValueToBackend: (sortValue: string) => string;
  loadMoreProducts: () => Promise<void>;
  applyFilters: (filters: FiltersType, sortBy: string) => Promise<void>;
  normalizeFirstChar: (str: string) => string;
  setPageNumber: (pageNumber: number) => void;
  hasMoreProducts: () => boolean;
  clearCache: () => void;
  clearCurrentPageData: () => void;
  setCachedProductsData: (
    cachedImages: Record<string, ProductsDataType[]>
  ) => void;

  buildCacheKey: (
    page: number,
    take: number,
    category: string | null,
    priceRange: string | null,
    sortBy: string
  ) => string;
}

export const useShopStore = create<IUseShopStore>((set, get) => ({
  isLoading: false,
  axiosError: null,
  currentPage: "",
  pageNumber: 1,
  take: 12,
  selected: "Sort By",
  isDroppedDown: false,
  sortedByFour: false,
  sortByTwoVertically: false,
  sortByTwoHorizontally: false,
  newArrivalProducts: [],
  rating: 0,
  sortBy: "Sort By",
  filters: {
    category: null,
    priceRange: null,
  },
  newArrivalsLoading: false,
  cachedNewArrivalsByPage: {},
  isLoadingMore: false,
  productsData: [],
  cachedProductsData: {},
  cachedDataLengthByKey: {},
  productsDataLengthByKey: 0,
  productsDataTotalLength: 0,
  cachedProductsDataTotalLength: 0,
  setSortBy: async (sortBy: string) => {
    set({
      sortBy,
      pageNumber: 1,
      productsData: [],

      productsDataTotalLength: 0, 
      productsDataLengthByKey: 0,
    });
    await get().getAllProducts(false);
  },
  setFilters: (filters: FiltersType) => {
    set({
      filters,
      pageNumber: 1,
    });
  },

  setPageNumber: (pageNumber: number) => set({ pageNumber }),

  setRating: (rating: number) => set({ rating }),

  // handleRate: (rate, id) => {}, // !!!!!!!!!!!!!!
  calculateDiscount: (price?: number, discount?: number): string => {
    if (typeof price !== "number") return "-";
    if (!discount || discount <= 0) return `$${price.toFixed(2)}`;
    const discountedPrice = price - (price * discount) / 100;
    return `$${discountedPrice.toFixed(2)}`;
  },

  setCurrentPage: async (page: string) => {
    const state = get();
    if (state.currentPage === page) {
      return;
    }
    const cachedImages = state.cachedProductsData[page];
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

  normalizeFirstChar: (str?: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  applyFilters: async (filters: FiltersType) => {
    set({
      filters,
      pageNumber: 1,
      productsData: [],
      productsDataTotalLength: 0,
      productsDataLengthByKey: 0,
      isLoading: true,
      axiosError: null,
    });

    await get().getAllProducts(false);
  },

  getNewArrivalProductsFromApi: async () => {
    const state = get();
    const pageKey = "home";
    const shopKey = "shop";
    if (state.cachedProductsData[pageKey]?.length > 0) {
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

          cachedProductsData: {
            ...prev.cachedProductsData,
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

  buildCacheKey: (
    page: number,
    take: number,
    category: string | null,
    priceRange: string | null,
    sortBy: string
  ): string => {
    let key = `page=${page}&take=${take}`;
    if (category) {
      key += `&category=${category}`;
    }
    if (priceRange) {
      key += `&priceRange=${priceRange}`;
    }
    if (sortBy && sortBy !== "Sort By") {
      key += `&sortBy=${sortBy}`;
    }
    return key;
  },

  getProductsFromCacheOrApi: async () => {
    await get().getAllProducts(false);
    // console.log(
    //   get().cachedProductsData,
    //   "cachedProductsData ->>> from getProductsFromCacheOrApi"
    // );
  },

  hasMoreProducts: () => {
    const state = get();
    return (
      state.productsData.length < state.productsDataTotalLength &&
      state.productsDataTotalLength > 0
    );
  },

  mapSortValueToBackend: (sortValue: string): string => {
    const mapping: Record<string, string> = {
      "Sort By": "",
      Latest: "latest",
      Oldest: "oldest",
      "A to Z": "a-z",
      "Z to A": "z-a",
      Highest: "highest",
      Lowest: "lowest",
    };
    return mapping[sortValue] || "";
  },

  getAllProducts: async (isLoadMore = false) => {
    const state = get();
    const {
      pageNumber,
      take,
      filters,
      sortBy,
      mapSortValueToBackend,
      buildCacheKey,
    } = state;
    const currentPage = isLoadMore ? pageNumber : 1;

    const backendSortValue = mapSortValueToBackend(sortBy);
    const cacheKey = buildCacheKey(
      currentPage,
      take,
      filters.category,
      filters.priceRange,
      backendSortValue
    );
    const cachedData = state.cachedProductsData[cacheKey];
    const cachedDataLength = state.cachedDataLengthByKey?.[cacheKey];

    if (cachedData && cachedData.length > 0) {
      if (isLoadMore) {
        set({
          productsData: [...state.productsData, ...cachedData],
          productsDataLengthByKey:
            state.productsDataLengthByKey + cachedData.length,
          isLoadingMore: false,
          axiosError: null,
        });
      } else {
        set({
          productsData: cachedData,
          productsDataLengthByKey: cachedDataLength || cachedData.length,
          isLoading: false,
          axiosError: null,
        });
      }
      // console.log(`Loaded page ${currentPage} from cache`);
      return;
    }

    if (isLoadMore) {
      set({ isLoadingMore: true, axiosError: null });
    } else {
      set({ isLoading: true, axiosError: null });
    }

    try {
      const query = `/product?${cacheKey}`;
      const res = await axiosInstance.get(query);

      if (res.status >= 200 && res.status <= 204) {
        const newProducts = res.data.data;
        const filteredTotalLength = res.data.productsDataLength; 

        set((prev) => ({
          productsData: isLoadMore
            ? [...prev.productsData, ...newProducts] 
            : newProducts,
          productsDataLengthByKey: isLoadMore
            ? prev.productsDataLengthByKey + newProducts.length
            : newProducts.length,
          productsDataTotalLength: filteredTotalLength,
          isLoading: false,
          isLoadingMore: false,
          axiosError: null,
          cachedProductsData: {
            ...prev.cachedProductsData,
            [cacheKey]: newProducts,
          },
          cachedDataLengthByKey: {
            ...prev.cachedDataLengthByKey,
            [cacheKey]: newProducts.length,
          },
        }));


        // console.log(get().productsData, "productsData");
        // console.log(get().cachedProductsData, "cachedProductsData");
      }
    } catch (e) {
      set({
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
        isLoading: false,
        isLoadingMore: false,
        productsData: isLoadMore ? get().productsData : [], 
      });
    }
  },

  loadMoreProducts: async () => {
    const state = get();
    if (!get().hasMoreProducts()) {
      console.log("No more products to load");
      return;
    }

    if (state.isLoadingMore) {
      console.log("Already loading more products");
      return;
    }

    const nextPage = state.pageNumber + 1;
    set({ pageNumber: nextPage });
    await get().getAllProducts(true);
    console.log(
      get().cachedProductsData,
      "cachedProductsData ->>> from loadMoreProducts"
    );
  },

  clearCache: () => {
    set({
      productsData: [],
      isLoading: false,
      axiosError: null,
      cachedProductsData: {},
      cachedDataLengthByKey: {},

      productsDataTotalLength: 0,
      productsDataLengthByKey: 0,
      pageNumber: 1,
    });
  },
  clearCurrentPageData: () =>
    set({
      productsData: [],
      isLoading: false,
      axiosError: null,
      sortByTwoVertically: false,

      productsDataTotalLength: 0,
      productsDataLengthByKey: 0,
      pageNumber: 1,
    }),

  setCachedProductsData: (cachedImages: Record<string, ProductsDataType[]>) =>
    set({ cachedProductsData: cachedImages }),
}));
