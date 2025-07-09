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
//   const unexpectedError = "An unexpected error occurred";
//   return unexpectedError;
// };

// export type CategoryFilter =
//   | "All Rooms"
//   | "Living Room"
//   | "Bedroom"
//   | "Kitchen"
//   | "Bathroom"
//   | "Dinning"
//   | "Outdoor"
//   | null;

// export type PriceFilter =
//   | "All Price"
//   | "0.00 - 99.99"
//   | "100.00 - 199.99"
//   | "200.00 - 299.99"
//   | "300.00 - 399.99"
//   | "400.00+"
//   | null;

// export type SortByType =
//   | "Sort By"
//   | "Latest"
//   | "Oldest"
//   | "A to Z"
//   | "Z to A"
//   | "Highest"
//   | "Lowest";

// export interface FiltersType {
//   category: CategoryFilter;
//   priceRange: PriceFilter;
// }

// export type ProductsDataType = {
//   productName: string;
//   filePath?: string;
//   pages: string[];
//   components: string[];
//   new: boolean;
//   discount: number;
//   rate: number;
//   category: string[];
//   price: number;
//   colors: string[];
//   reviews?: string[];
//   questions?: string[];
//   stock: number;
//   wishlist: boolean;
//   measurements: string;
//   details: string;
//   discountTill: string;
//   _id: string;
//   presignedUrl: string;
// };

// export interface IUseShopPageStore {
//   cachedImagesByPage: Record<string, ProductsDataType[]>;
//   selected: string;
//   isDroppedDown: boolean;
//   sortedByFour: boolean;
//   sortByTwoVertically: boolean;
//   sortByTwoHorizontally: boolean;
//   productsData: ProductsDataType[];
//   isLoading: boolean;
//   axiosError: string | null;
//   currentPage: string;
//   pageNumber: number;
//   take: number;
//   productsDataLength: number;
//   newArrivalProducts: [];
//   rating: number;
//   sortBy: string;
//   filters: FiltersType;

//   cachedDataLengthByKey: Record<string, number>;

//   setSortBy: (sortBy: string) => void;
//   setFilters: (filters: FiltersType) => void;
//   setRating: (rating: number) => void;
//   setCachedImagesByPage: (
//     cachedImages: Record<string, ProductsDataType[]>
//   ) => void;
//   setCurrentPage: (currentPage: string) => void;
//   setsSortedByFour: (v: boolean) => void;
//   setSortByTwoVertically: (v: boolean) => void;
//   setSortByTwoHorizontally: (v: boolean) => void;
//   setSelected: (selected: string) => void;
//   setIsDroppedDown: (isDroppedDown: boolean) => void;
//   handleSelect: (value: string) => void;
//   resetAllByIconsSort: () => void;
//   getAllProducts: (page: string) => Promise<void>;
//   clearCurrentPageData: () => void;
//   clearCache: () => void;
//   loadMoreProducts: () => Promise<void>;
//   getNewArrivalProductsFromApi: () => Promise<void>;

//   cachedNewArrivalsByPage: Record<string, ProductsDataType[]>;
//   setCachedNewArrivalsByPage: (page: string, data: ProductsDataType[]) => void;
//   newArrivalsLoading: boolean;
//   onRate: (rating: number) => void;

//   // handleRate: (rate: number, id: string) => void;
//   normalizeFirstChar: (str: string) => string | undefined;
//   calculateDiscount: (price?: number, discount?: number) => string;
//   getProductsFromCacheOrApi: (page: string) => Promise<void>;

//   applyFilters: (filters: FiltersType, sortBy: string) => Promise<void>;
//   createCacheKey: (
//     page: number,
//     category: string | null,
//     priceRange: string | null,
//     sortBy: string
//   ) => string;
//     mapSortValueToBackend: (sortValue: string) => string;
// }

// export const useShopPageStore = create<IUseShopPageStore>((set, get) => ({
//   cachedImagesByPage: {},
//   productsData: [],
//   isLoading: false,
//   axiosError: null,
//   selected: "Sort By",
//   isDroppedDown: false,
//   sortedByFour: false,
//   sortByTwoVertically: false,
//   sortByTwoHorizontally: false,
//   currentPage: "",
//   pageNumber: 1,
//   take: 12,
//   productsDataLength: 0,
//   newArrivalProducts: [],
//   cachedNewArrivalsByPage: {},

//   rating: 0,

//   cachedDataLengthByKey: {},

//   sortBy: "Sort By",
//   setSortBy: (sortBy: string) => set({ sortBy }),
//   filters: {
//     category: null,
//     priceRange: null,
//   },

//   setFilters: (filters: FiltersType) => {
//     set({
//       filters,
//       pageNumber: 1,
//     });
//   },

//   setRating: (rating: number) => set({ rating }),

//   // handleRate: (rate, id) => {}, // !!!!!!!!!!!!!!
//   calculateDiscount: (price?: number, discount?: number): string => {
//     if (typeof price !== "number") return "-";
//     if (!discount || discount <= 0) return `$${price.toFixed(2)}`;
//     const discountedPrice = price - (price * discount) / 100;
//     return `$${discountedPrice.toFixed(2)}`;
//   },

//   setCachedNewArrivalsByPage: (page, data) =>
//     set((state) => ({
//       cachedNewArrivalsByPage: {
//         ...state.cachedNewArrivalsByPage,
//         [page]: data,
//       },
//     })),
//   newArrivalsLoading: false,

//   setCurrentPage: async (page: string) => {
//     const state = get();
//     if (state.currentPage === page) {
//       return;
//     }
//     const cachedImages = state.cachedImagesByPage[page];
//     if (cachedImages && cachedImages.length > 0) {
//       set({
//         currentPage: page,
//         productsData: cachedImages,
//         axiosError: null,
//         isLoading: false,
//       });
//     } else {
//       set({
//         currentPage: page,
//         productsData: [],
//         axiosError: null,
//         isLoading: true,
//       });
//     }
//   },

//   setsSortedByFour: (v) =>
//     set({
//       sortedByFour: v,
//       sortByTwoVertically: false,
//       sortByTwoHorizontally: false,
//     }),
//   setSortByTwoVertically: (v) =>
//     set({
//       sortedByFour: false,
//       sortByTwoVertically: v,
//       sortByTwoHorizontally: false,
//     }),
//   setSortByTwoHorizontally: (v) =>
//     set({
//       sortedByFour: false,
//       sortByTwoVertically: false,
//       sortByTwoHorizontally: v,
//     }),
//   setSelected: (selected) => set({ selected }),
//   setIsDroppedDown: (isDroppedDown) => set({ isDroppedDown }),
//   handleSelect: (value) => {
//     set({ selected: value });
//   },
//   resetAllByIconsSort: () => {
//     set({
//       sortedByFour: false,
//       sortByTwoVertically: false,
//       sortByTwoHorizontally: false,
//     });
//   },

//   applyFilters: async (filters: FiltersType) => {
//     const state = get();
//     const currentFilters = state.filters;
//     const areFiltersEqual =
//       currentFilters.category === filters.category &&
//       currentFilters.priceRange === filters.priceRange;

//     if (areFiltersEqual) {
//       return;
//     }
//     const normalizedSortBy = state.sortBy === "Sort By" ? "" : state.sortBy;
//     const newCacheKey = state.createCacheKey(
//       1,
//       filters.category,
//       filters.priceRange,
//       normalizedSortBy
//     );
//     const cachedData = state.cachedImagesByPage[newCacheKey];
//     const cachedDataLength = state.cachedDataLengthByKey?.[newCacheKey];
//     if (cachedData && cachedData.length > 0) {
//       set({
//         filters,
//         pageNumber: 1,
//         productsData: cachedData,
//         productsDataLength: cachedDataLength || cachedData.length,
//         isLoading: false,
//         axiosError: null,
//       });
//       return;
//     }
//     set({
//       filters,
//       pageNumber: 1,
//       productsData: [],
//       isLoading: true,
//       axiosError: null,
//     });

//     await get().getAllProducts("1");
//   },

//     mapSortValueToBackend: (sortValue: string): string => {
//     const mapping: Record<string, string> = {
//       "Sort By": "",
//       "Latest": "latest",
//       "Oldest": "oldest",
//       "A to Z": "a-z",
//       "Z to A": "z-a", 
//       "Highest": "highest",
//       "Lowest": "lowest",
//     };
//     return mapping[sortValue] || "";
//   },


//   createCacheKey: (
//     page: number,
//     category: string | null,
//     priceRange: string | null,
//     sortBy: string
//   ): string => {
//     return `page=${page}&category=${category ?? ""}&priceRange=${
//       priceRange ?? ""
//     }&sortBy=${sortBy ?? ""}`;
//   },

//   getAllProducts: async () => {
//     const state = get();
//     const { pageNumber, take, filters, createCacheKey, sortBy, mapSortValueToBackend } = state;
//     const backendSortValue = mapSortValueToBackend(sortBy);
//     const cacheKey = createCacheKey(
//       pageNumber,
//       filters.category,
//       filters.priceRange,
//       // normalizedSortBy
//       backendSortValue
//     );
//     const cached = state.cachedImagesByPage[cacheKey];
//     const cachedDataLength = state.cachedDataLengthByKey?.[cacheKey];

//     if (cached && cached.length > 0) {
//       set({
//         productsData: cached,
//         isLoading: false,
//         axiosError: null,
//         productsDataLength: cachedDataLength || cached.length,
//       });

//       return;
//     } else {
//       set({ isLoading: true, axiosError: null });
//     }

//     let query = `product?page=${pageNumber}&take=${take}`;
//     if (filters.category) query += `&category=${filters.category}`;
//     if (filters.priceRange) query += `&priceRange=${filters.priceRange}`;
//     if (backendSortValue) {
//     query += `&sortBy=${backendSortValue}`;
//   }

//     try {
//       const res = await axiosInstance.get(query);
//       if (res.status >= 200 && res.status <= 204) {
//         const newProducts = res.data.data;
//         const dataLength = res.data.productsDataLength;
//         set((prev) => ({
//           productsData: newProducts,
//           productsDataLength: dataLength,
//           isLoading: false,
//           axiosError: null,
//           pageNumber: 1,
//           cachedImagesByPage: {
//             ...prev.cachedImagesByPage,
//             [cacheKey]: newProducts,
//           },
//           cachedDataLengthByKey: {
//             ...prev.cachedDataLengthByKey,
//             [cacheKey]: dataLength,
//           },
//         }));
//       }
//       console.log(get().cachedImagesByPage, "cachedImagesByPage from getAllProducts STORE")
//       // console.log(get().productsData, "productsData from getAllProducts Store")

//     } catch (e) {
//       set({
//         axiosError: handleApiError(e as AxiosError<ErrorResponse>),
//         isLoading: false,
//         productsData: [],
//       });
//     }
//   },

//   getProductsFromCacheOrApi: async (page: string) => {
//     const state = get();
//     const cached = state.cachedImagesByPage[page];
//     if (cached && cached.length > 0) {
//       set({
//         currentPage: page,
//         productsData: cached,
//         isLoading: false,
//         axiosError: null,
//       });
//     } else {
//       set({
//         currentPage: page,
//         productsData: [],
//         isLoading: true,
//         axiosError: null,
//       });
//       await get().getAllProducts(page);
//     }
//   },

//   loadMoreProducts: async () => {
//     const state = get();
//     const {
//       pageNumber,
//       productsData,
//       productsDataLength,
//       take,
//       filters,
//       sortBy,
//       createCacheKey,
//     } = state;

//     const alreadyLoaded = productsData.length;
//     if (alreadyLoaded >= productsDataLength) return;

//     const nextPage = (pageNumber || 1) + 1;
//     const {mapSortValueToBackend} = state
//     const backendSortValue = mapSortValueToBackend(sortBy);

//     let query = `product?page=${nextPage}&take=${take}`;
//     if (filters.category) query += `&category=${filters.category}`;
//     if (filters.priceRange) query += `&priceRange=${filters.priceRange}`;
//  if (backendSortValue) {
//     query += `&sortBy=${backendSortValue}`;
//   }

//   console.log(get().cachedImagesByPage, "cachedImagesByPage from LOAD MORE PRODUCTS")
//     try {
//       const res = await axiosInstance.get(query);

//       if (res.status >= 200 && res.status <= 204) {
//         const newProducts = res.data.data;
//         const dataLength = res.data.productsDataLength;

//         const updatedProducts = [...productsData, ...newProducts];
//         const cacheKey = createCacheKey(
//           1,
//           filters.category,
//           filters.priceRange,
//           // normalizedSortBy
//           backendSortValue

//         );

//         set((prev) => ({
//           pageNumber: nextPage,
//           productsData: updatedProducts,
//           productsDataLength: dataLength,
//           cachedImagesByPage: {
//             ...prev.cachedImagesByPage,
//             [cacheKey]: updatedProducts,
//           },
//           cachedDataLengthByKey: {
//             ...prev.cachedDataLengthByKey,
//             [cacheKey]: dataLength,
//           },
//           isLoading: false,
//           axiosError: null,
//         }));
//       }
//     } catch (e) {
//       set({
//         axiosError: handleApiError(e as AxiosError<ErrorResponse>),
//         isLoading: false,
//       });
//     }
//   },

//   getNewArrivalProductsFromApi: async () => {
//     const state = get();
//     const pageKey = "home";
//     const shopKey = "shop";
//     if (state.cachedNewArrivalsByPage[pageKey]?.length > 0) {
//       return;
//     }
//     set({ newArrivalsLoading: true, axiosError: null });
//     try {
//       const res = await axiosInstance.get("/product/new-arrivals");
//       if (res.status >= 200 && res.status <= 204) {
//         const newProducts = res.data;

//         set((prev) => ({
//           cachedNewArrivalsByPage: {
//             ...prev.cachedNewArrivalsByPage,
//             [pageKey]: newProducts,
//           },
//           cachedImagesByPage: {
//             ...prev.cachedImagesByPage,
//             [shopKey]: newProducts,
//           },
//           newArrivalsLoading: false,
//           axiosError: null,
//         }));
//       }
//     } catch (e) {
//       const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
//       set({ axiosError: errorMessage, newArrivalsLoading: false });
//     }
//   },

//   normalizeFirstChar: (str?: string): string => {
//     if (!str) return "";
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   },

//   onRate: () => {},

//   clearCache: () => {
//     set({
//       productsData: [],
//       isLoading: false,
//       axiosError: null,
//       cachedImagesByPage: {},
//       cachedDataLengthByKey: {},
//     });
//   },
//   clearCurrentPageData: () =>
//     set({
//       productsData: [],
//       isLoading: false,
//       axiosError: null,
//       sortByTwoVertically: false,
//     }),

//   setCachedImagesByPage: (cachedImages: Record<string, ProductsDataType[]>) =>
//     set({ cachedImagesByPage: cachedImages }),
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
  const unexpectedError = "An unexpected error occurred";
  return unexpectedError;
};

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
  sortBy: string;
  filters: FiltersType;

  cachedDataLengthByKey: Record<string, number>;
   cachedPagesByKey: Record<string, number>;

  setSortBy: (sortBy: string) => void;
  setFilters: (filters: FiltersType) => void;
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
  newArrivalsLoading: boolean;
  setCachedNewArrivalsByPage: (page: string, data: ProductsDataType[]) => void;
  onRate: (rating: number) => void;

  // handleRate: (rate: number, id: string) => void;
  normalizeFirstChar: (str: string) => string | undefined;
  calculateDiscount: (price?: number, discount?: number) => string;
  getProductsFromCacheOrApi: (page: string) => Promise<void>;

  applyFilters: (filters: FiltersType, sortBy: string) => Promise<void>;
  createCacheKey: (
    page: number,
    category: string | null,
    priceRange: string | null,
    sortBy: string
  ) => string;
    mapSortValueToBackend: (sortValue: string) => string;
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

  cachedDataLengthByKey: {},
  cachedPagesByKey: {},

  sortBy: "Sort By",
  setSortBy: (sortBy: string) => set({ sortBy }),
  filters: {
    category: null,
    priceRange: null,
  },

  setFilters: (filters: FiltersType) => {
    set({
      filters,
      pageNumber: 1,
    });
  },

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

  applyFilters: async (filters: FiltersType) => {
    const state = get();
    const currentFilters = state.filters;
    const areFiltersEqual =
      currentFilters.category === filters.category &&
      currentFilters.priceRange === filters.priceRange;

    if (areFiltersEqual) {
      return;
    }
    const normalizedSortBy = state.sortBy === "Sort By" ? "" : state.sortBy;
    const newCacheKey = state.createCacheKey(
      1,
      filters.category,
      filters.priceRange,
      normalizedSortBy
    );
    const cachedData = state.cachedImagesByPage[newCacheKey];
    const cachedDataLength = state.cachedDataLengthByKey?.[newCacheKey];
    if (cachedData && cachedData.length > 0) {
      set({
        filters,
        pageNumber: 1,
        productsData: cachedData,
        productsDataLength: cachedDataLength || cachedData.length,
        isLoading: false,
        axiosError: null,
      });
      return;
    }
    set({
      filters,
      pageNumber: 1,
      productsData: [],
      isLoading: true,
      axiosError: null,
    });

    await get().getAllProducts("1");
  },

    mapSortValueToBackend: (sortValue: string): string => {
    const mapping: Record<string, string> = {
      "Sort By": "",
      "Latest": "latest",
      "Oldest": "oldest",
      "A to Z": "a-z",
      "Z to A": "z-a", 
      "Highest": "highest",
      "Lowest": "lowest",
    };
    return mapping[sortValue] || "";
  },


  createCacheKey: (
    page: number,
    category: string | null,
    priceRange: string | null,
    sortBy: string
  ): string => {
    return `page=${page}&category=${category ?? ""}&priceRange=${priceRange ?? ""}&sortBy=${sortBy}`;
  },

  // getAllProducts: async () => {
  //   const state = get();
  //   const { pageNumber, take, filters, createCacheKey, sortBy, mapSortValueToBackend } = state;
  //   const backendSortValue = mapSortValueToBackend(sortBy);
  //   const cacheKey = createCacheKey(
  //     pageNumber,
  //     filters.category,
  //     filters.priceRange,
  //     // normalizedSortBy
  //     backendSortValue
  //   );
  //   const cached = state.cachedImagesByPage[cacheKey];
  //   const cachedDataLength = state.cachedDataLengthByKey?.[cacheKey];

  //   if (cached && cached.length > 0) {
  //     const currentPage = Math.ceil(cached.length / take);
  //     set({
  //       productsData: cached,
  //       isLoading: false,
  //       axiosError: null,
  //       productsDataLength: cachedDataLength || cached.length,
  //       pageNumber: currentPage,
  //     });

  //     return;
  //   } else {
  //     set({ isLoading: true, axiosError: null });
  //   }

  //   let query = `product?page=${pageNumber}&take=${take}`;
  //   if (filters.category) query += `&category=${filters.category}`;
  //   if (filters.priceRange) query += `&priceRange=${filters.priceRange}`;
  //   if (backendSortValue) {
  //   query += `&sortBy=${backendSortValue}`;
  // }

  //   try {
  //     const res = await axiosInstance.get(query);
  //     if (res.status >= 200 && res.status <= 204) {
  //       const newProducts = res.data.data;
  //       const dataLength = res.data.productsDataLength;
  //       set((prev) => ({
  //         productsData: newProducts,
  //         productsDataLength: dataLength,
  //         isLoading: false,
  //         axiosError: null,
  //         pageNumber: 1,
  //         cachedImagesByPage: {
  //           ...prev.cachedImagesByPage,
  //           [cacheKey]: newProducts,
  //         },
  //         cachedDataLengthByKey: {
  //           ...prev.cachedDataLengthByKey,
  //           [cacheKey]: dataLength,
  //         },
  //       }));
  //     }
  //     console.log(get().cachedImagesByPage, "cachedImagesByPage from getAllProducts STORE")
  //     // console.log(get().productsData, "productsData from getAllProducts Store")

  //   } catch (e) {
  //     set({
  //       axiosError: handleApiError(e as AxiosError<ErrorResponse>),
  //       isLoading: false,
  //       productsData: [],
  //     });
  //   }
  // },


// Modified getAllProducts function - simple approach
getAllProducts: async () => {
  const state = get();
  const { take, filters, createCacheKey, sortBy, mapSortValueToBackend } = state;
  const backendSortValue = mapSortValueToBackend(sortBy);
  
  // Use page=1 as base cache key for accumulated data
  const baseCacheKey = createCacheKey(1, filters.category, filters.priceRange, backendSortValue);
  const cached = state.cachedImagesByPage[baseCacheKey];
  const cachedDataLength = state.cachedDataLengthByKey?.[baseCacheKey];

  if (cached && cached.length > 0) {
    // Calculate current page based on cached data length
    const currentPage = Math.ceil(cached.length / take);
    
    set({
      productsData: cached,
      isLoading: false,
      axiosError: null,
      productsDataLength: cachedDataLength, // Keep the original total length from API
      pageNumber: currentPage,
    });
    return;
  } else {
    set({ isLoading: true, axiosError: null });
  }

  // Always fetch page 1 for fresh data
  let query = `product?page=1&take=${take}`;
  if (filters.category) query += `&category=${filters.category}`;
  if (filters.priceRange) query += `&priceRange=${filters.priceRange}`;
  if (backendSortValue) {
    query += `&sortBy=${backendSortValue}`;
  }

  try {
    const res = await axiosInstance.get(query);
    if (res.status >= 200 && res.status <= 204) {
      const newProducts = res.data.data;
      const dataLength = res.data.productsDataLength; // This is the TOTAL items available
      
      set((prev) => ({
        productsData: newProducts,
        productsDataLength: dataLength, // Total items available, not cached items
        isLoading: false,
        axiosError: null,
        pageNumber: 1,
        cachedImagesByPage: {
          ...prev.cachedImagesByPage,
          [baseCacheKey]: newProducts,
        },
        cachedDataLengthByKey: {
          ...prev.cachedDataLengthByKey,
          [baseCacheKey]: dataLength, // Store total length, not cached length
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
  const {
    pageNumber,
    productsData,
    productsDataLength,
    take,
    filters,
    sortBy,
    createCacheKey,
  } = state;

  const alreadyLoaded = productsData.length;
  if (alreadyLoaded >= productsDataLength) return;

  const nextPage = (pageNumber || 1) + 1;
  const {mapSortValueToBackend} = state
  const backendSortValue = mapSortValueToBackend(sortBy);

  // Use base cache key for accumulated data
  const baseCacheKey = createCacheKey(1, filters.category, filters.priceRange, backendSortValue);

  let query = `product?page=${nextPage}&take=${take}`;
  if (filters.category) query += `&category=${filters.category}`;
  if (filters.priceRange) query += `&priceRange=${filters.priceRange}`;
  if (backendSortValue) {
    query += `&sortBy=${backendSortValue}`;
  }

  console.log(get().cachedImagesByPage, "cachedImagesByPage from LOAD MORE PRODUCTS")
  
  try {
    const res = await axiosInstance.get(query);

    if (res.status >= 200 && res.status <= 204) {
      const newProducts = res.data.data;
      const dataLength = res.data.productsDataLength; // Total items available

      const updatedProducts = [...productsData, ...newProducts];

      set((prev) => ({
        pageNumber: nextPage,
        productsData: updatedProducts,
        productsDataLength: dataLength, // Keep the total length from API
        cachedImagesByPage: {
          ...prev.cachedImagesByPage,
          [baseCacheKey]: updatedProducts, // Cache accumulated products
        },
        cachedDataLengthByKey: {
          ...prev.cachedDataLengthByKey,
          [baseCacheKey]: dataLength, // Store total length, not cached length
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
      cachedImagesByPage: {},
      cachedDataLengthByKey: {},
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
