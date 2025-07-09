// import axios, { AxiosError } from "axios";
// import { create } from "zustand";
// import { axiosInstance } from "../libs/axiosInstance";
// import { Filter } from "../components/__atoms";
// import { file } from "zod/v4";

// export interface ErrorResponse {
//   message: string;
// }

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

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   if (axios.isAxiosError(error)) {
//     const errorMessage = error.response?.data.message || "An error occurred";
//     return errorMessage;
//   }
//   const unexpectedError = "An unexpected error occurred";
//   return unexpectedError;
// };

// export interface IUseShopStore {
//   isLoading: boolean;
//   axiosError: string | null;
//   selected: string;
//   isDroppedDown: boolean;
//   sortedByFour: boolean;
//   sortByTwoVertically: boolean;
//   sortByTwoHorizontally: boolean;
//   currentPage: string;
//   pageNumber: number;
//   take: number;
//   newArrivalProducts: ProductsDataType[];
//   rating: number;
//   sortBy: string;
//   filters: FiltersType;

//   productsData: ProductsDataType[];
//   productsDataLengthByKey: number;

//   cachedProductsData: Record<string, ProductsDataType[]>;
//   cachedDataLengthByKey: Record<string, number>;

//   productsDataTotalLength: number;
//   cachedProductsDataTotalLength: number;

//   cachedNewArrivalsByPage: Record<string, ProductsDataType[]>;
//   newArrivalsLoading: boolean;

//   // newArrivalsLoading: boolean;

//   calculateDiscount: (price?: number, discount?: number) => string;
//   setSortBy: (sortBy: string) => void;
//   setFilters: (filters: FiltersType) => void;
//   setRating: (rating: number) => void;
//   setCurrentPage: (currentPage: string) => void;
//   setsSortedByFour: (v: boolean) => void;
//   setSortByTwoVertically: (v: boolean) => void;
//   setSortByTwoHorizontally: (v: boolean) => void;
//   setSelected: (selected: string) => void;
//   setIsDroppedDown: (isDroppedDown: boolean) => void;
//   handleSelect: (value: string) => void;
//   resetAllByIconsSort: () => void;
//   getNewArrivalProductsFromApi: () => Promise<void>;
//   getAllProducts: () => Promise<void>;
//   getProductsFromCacheOrApi: () => Promise<void>;
//   mapSortValueToBackend: (sortValue: string) => string;
//   loadMoreProducts: (page: number) => Promise<void>;
//   applyFilters: (filters: FiltersType, sortBy: string) => Promise<void>;
//   normalizeFirstChar: (str?: string) => string;
//   setPageNumber: (pageNumber: number) => void;

//   buildCacheKey: (
//     page: number,
//     take: number,
//     category: string | null,
//     priceRange: string | null,
//     sortBy: string
//   ) => string;
// }

// export const useShopStore = create<IUseShopStore>((set, get) => ({
//   isLoading: false,
//   axiosError: null,
//   currentPage: "",
//   pageNumber: 1,
//   take: 12,
//   selected: "Sort By",
//   isDroppedDown: false,
//   sortedByFour: false,
//   sortByTwoVertically: false,
//   sortByTwoHorizontally: false,
//   newArrivalProducts: [],
//   rating: 0,
//   sortBy: "Sort By",
//   filters: {
//     category: null,
//     priceRange: null,
//   },
//   newArrivalsLoading: false,
//   cachedNewArrivalsByPage: {},

//   productsData: [],
//   cachedProductsData: {},
//   cachedDataLengthByKey: {},
//   productsDataLengthByKey: 0,
//   productsDataTotalLength: 0,
//   cachedProductsDataTotalLength: 0,

//   setSortBy: (sortBy: string) => set({ sortBy }),

//   setFilters: (filters: FiltersType) => {
//     set({
//       filters,
//       pageNumber: 1,
//     });
//   },
//    setPageNumber: (pageNumber: number) => set({ pageNumber }),

//   setRating: (rating: number) => set({ rating }),

//   // handleRate: (rate, id) => {}, // !!!!!!!!!!!!!!
//   calculateDiscount: (price?: number, discount?: number): string => {
//     if (typeof price !== "number") return "-";
//     if (!discount || discount <= 0) return `$${price.toFixed(2)}`;
//     const discountedPrice = price - (price * discount) / 100;
//     return `$${discountedPrice.toFixed(2)}`;
//   },

//   setCurrentPage: async (page: string) => {
//     const state = get();
//     if (state.currentPage === page) {
//       return;
//     }
//     const cachedImages = state.cachedProductsData[page];
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

//   normalizeFirstChar: (str?: string): string => {
//     if (!str) return "";
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   },

//   //   applyFilters: async (filters: FiltersType) => {
//   //     const state = get();
//   //     const currentFilter = state.filters;

//   //     console.log(currentFilter, "currentFilter");
//   //     const areFiltersEqual =
//   //       currentFilter.category === filters.category &&
//   //       currentFilter.priceRange === filters.priceRange;

//   //     console.log("Filters equal?", {
//   //       old: state.filters,
//   //       new: filters,
//   //       equal:
//   //         state.filters.category === filters.category &&
//   //         state.filters.priceRange === filters.priceRange,
//   //     });

//   //     if (areFiltersEqual) {
//   //       return;
//   //     }
//   //     // const backendSortValue = state.mapSortValueToBackend(state.sortBy);
//   //      const normalizedSortBy = state.sortBy === "Sort By" ? "" : state.sortBy;
//   //     const newCacheKey = state.buildCacheKey(
//   //       1,
//   //       state.take,
//   //       filters.category,
//   //       filters.priceRange,
//   //      normalizedSortBy
//   //     );

//   //     const cachedData = state.cachedProductsData[newCacheKey];
//   //     const cachedDataLength = state.cachedDataLengthByKey?.[newCacheKey];
//   //     if (cachedData && cachedData.length > 0) {
//   //       set({
//   //         filters,
//   //         pageNumber: 1,
//   //         productsData: cachedData,
//   //         productsDataLengthByKey: cachedDataLength || cachedData.length,
//   //         isLoading: false,
//   //         axiosError: null,
//   //       });
//   //       return;
//   //     }
//   //     set({
//   //       filters,
//   //       pageNumber: 1,
//   //       productsData: [],
//   //       isLoading: true,
//   //       axiosError: null,
//   //     });

//   //     await get().getAllProducts("1");
//   //     // await get().getProductsFromCacheOrApi("1");
//   //   },

//   applyFilters: async (filters: FiltersType) => {
//     const state = get();
//     const backendSortValue = state.mapSortValueToBackend(state.sortBy);
//     const newCacheKey = state.buildCacheKey(
//       1,
//       state.take,
//       filters.category,
//       filters.priceRange,
//       backendSortValue
//     );

//     const cachedData = state.cachedProductsData[newCacheKey];
//     const cachedDataLength = state.cachedDataLengthByKey?.[newCacheKey];

//     set({
//       filters,
//       pageNumber: 1,
//       productsData: [],
//       isLoading: true,
//       axiosError: null,
//     });

//     if (cachedData && cachedData.length > 0) {
//       set({
//         productsData: cachedData,
//         productsDataLengthByKey: cachedDataLength || cachedData.length,
//         isLoading: false,
//         axiosError: null,
//       });
//       return;
//     }

//     await get().getAllProducts();
//   },

//   getNewArrivalProductsFromApi: async () => {
//     const state = get();
//     const pageKey = "home";
//     const shopKey = "shop";
//     if (state.cachedProductsData[pageKey]?.length > 0) {
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
//           //   cachedImagesByPage: {
//           //     ...prev.cachedProductsData,
//           //     [shopKey]: newProducts,
//           //   },
//           cachedProductsData: {
//             ...prev.cachedProductsData,
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

//   buildCacheKey: (
//     page: number,
//     take: number,
//     category: string | null,
//     priceRange: string | null,
//     sortBy: string
//   ): string => {
//     let key = `page=${page}&take=${take}`;
//     if (category) {
//       key += `&category=${category}`;
//     }
//     if (priceRange) {
//       key += `&priceRange=${priceRange}`;
//     }
//     if (sortBy && sortBy !== "Sort By") {
//       key += `&sortBy=${sortBy}`;
//     }
//     return key;
//   },

//   getProductsFromCacheOrApi: async () => {
//     const state = get();
//     const {
//       pageNumber,
//       take,
//       filters,
//       sortBy,
//       mapSortValueToBackend,
//       buildCacheKey,
//     } = state;
//     const backendSortValue = mapSortValueToBackend(sortBy);
//     const cacheKey = buildCacheKey(
//       pageNumber,
//       take,
//       filters.category,
//       filters.priceRange,
//       backendSortValue
//     );

//     const cached = state.cachedProductsData[cacheKey];
//     if (cached && cached.length > 0) {
//       set({

//         productsData: cached,
//         isLoading: false,
//         axiosError: null,
//       });
//     } else {
//       set({

//         productsData: [],
//         isLoading: true,
//         axiosError: null,
//       });
//       await get().getAllProducts();
//     }

//     console.log(
//       state.pageNumber,
//       "state.pageNumber form getProductsFromCacheOrApi"
//     );
//     console.log(
//       state.currentPage,
//       "state.currentPage form getProductsFromCacheOrApi"
//     );
//   },

//   mapSortValueToBackend: (sortValue: string): string => {
//     const mapping: Record<string, string> = {
//       "Sort By": "",
//       Latest: "latest",
//       Oldest: "oldest",
//       "A to Z": "a-z",
//       "Z to A": "z-a",
//       Highest: "highest",
//       Lowest: "lowest",
//     };
//     return mapping[sortValue] || "";
//   },

//   getAllProducts: async () => {
//     const state = get();
//     const {
//       pageNumber,
//       take,
//       filters,
//       sortBy,
//       mapSortValueToBackend,
//       buildCacheKey,
//     } = state;
//     const backendSortValue = mapSortValueToBackend(sortBy);
//     const cacheKey = buildCacheKey(
//       pageNumber,
//       take,
//       filters.category,
//       filters.priceRange,
//       backendSortValue
//     );

//     set({ isLoading: true, axiosError: null });

//     try {
//       const query = `/product?${cacheKey}`;
//       const res = await axiosInstance.get(query);
//       if (res.status >= 200 && res.status <= 204) {
//         const newProducts = res.data.data;
//         const dataLength = res.data.productsDataLength;
//         const totalLength = res.data.totalProductsLength;

//         set((prev) => ({
//           productsData: newProducts,
//           productsDataLengthByKey: newProducts.length,
//           productsDataTotalLength: totalLength,
//           //   cachedProductsDataTotalLength: dataLength
//           isLoading: false,
//           axiosError: null,
//           cachedProductsData: {
//             ...prev.cachedProductsData,
//             [cacheKey]: newProducts,
//           },
//           cachedDataLengthByKey: {
//             ...prev.cachedDataLengthByKey,
//             [cacheKey]: newProducts.length,
//           },
//         }));

//         console.log(
//           state.pageNumber,
//           "state.pageNumber form GETALLPRODUCTS"
//         );
//         console.log(
//           state.currentPage,
//           "state.currentPage form GETALLPRODUCTS"
//         );
//       }
//       console.log(
//         get().cachedProductsData,
//         "cachedImagesByPage from getAllProducts"
//       );

//       console.log(
//         get().productsDataLengthByKey,
//         "productsDataLengthByKey from getAllProducts"
//       );

//       console.log(
//         get().cachedDataLengthByKey,
//         "cachedDataLengthByKey from getAllProducts"
//       );
//       console.log(
//         get().productsDataTotalLength,
//         "productsData TOTAL Length from getAllProducts"
//       );
//     } catch (e) {
//       set({
//         axiosError: handleApiError(e as AxiosError<ErrorResponse>),
//         isLoading: false,
//         productsData: [],
//       });
//     }
//   },

// //   loadMoreProducts: async (page: string, forceRefresh = false) => {
// //     // const state = get
// //     //  const nextPage = (pageNumber || 1) + 1;
// //     if (forceRefresh) {
// //       await get().getAllProducts(page);
// //     } else {
// //       await get().getProductsFromCacheOrApi(page);
// //     }
// //     console.log(
// //       get().cachedProductsData,
// //       "cachedImagesByPage from loadMoreProducts"
// //     );
// //   },

// loadMoreProducts: async (page: number, forceRefresh = false) => {
//   console.log(page, "page from loadMoreProducts");
//   const state = get();
//   const nextPage = page + 1;

//   if (forceRefresh) {
//     await get().getAllProducts();
//   } else {
//     await get().getProductsFromCacheOrApi();
//   }

//   console.log(
//     get().cachedProductsData,
//     "cachedImagesByPage from loadMoreProducts"
//   );
// },

// }));

// //   productsData: [],
// //   cachedProductsData: {},
// //   productsDataTotalLength: 0,
// //   cachedProductsDataTotalLength: 0,
// //   cachedDataLengthByKey: {},

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
  normalizeFirstChar: (str?: string) => string;
  setPageNumber: (pageNumber: number) => void;

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

  //   setSortBy: (sortBy: string) => set({ sortBy }),

  setSortBy: async (sortBy: string) => {
    set({
      sortBy,
      pageNumber: 1,
      productsData: [],
    });
    await get().getAllProducts(false);
  },

  // ... rest of your existing methods ...

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
    // const state = get();

    set({
      filters,
      pageNumber: 1, // Reset to page 1
      productsData: [],
      isLoading: true,
      axiosError: null,
    });

    await get().getAllProducts(false); // Initial load
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
          //   cachedImagesByPage: {
          //     ...prev.cachedProductsData,
          //     [shopKey]: newProducts,
          //   },
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
    await get().getAllProducts(false); // Initial load
    console.log(
      get().cachedProductsData,
      "cachedProductsData ->>> from getProductsFromCacheOrApi"
    );
  },

  hasMoreProducts: () => {
    const state = get();
    return state.productsData.length < state.productsDataTotalLength;
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

    // Use current pageNumber for load more, or 1 for initial load
    const currentPage = isLoadMore ? pageNumber : 1;

    const backendSortValue = mapSortValueToBackend(sortBy);
    const cacheKey = buildCacheKey(
      currentPage,
      take,
      filters.category,
      filters.priceRange,
      backendSortValue
    );

    // Check if data is already cached
    const cachedData = state.cachedProductsData[cacheKey];
    const cachedDataLength = state.cachedDataLengthByKey?.[cacheKey];

    if (cachedData && cachedData.length > 0) {
      if (isLoadMore) {
        // Append cached data to existing products
        set({
          productsData: [...state.productsData, ...cachedData],
          productsDataLengthByKey:
            state.productsDataLengthByKey + cachedData.length,
          isLoadingMore: false,
          axiosError: null,
        });
      } else {
        // Replace products data for initial load
        set({
          productsData: cachedData,
          productsDataLengthByKey: cachedDataLength || cachedData.length,
          isLoading: false,
          axiosError: null,
        });
      }
      console.log(`Loaded page ${currentPage} from cache`);
      console.log(
        get().cachedProductsData,
        "cachedProductsData ->>> from getAllProducts"
      );
      return;
    }

    // Set appropriate loading state
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
        const totalLength = res.data.totalProductsLength;

        set((prev) => ({
          productsData: isLoadMore
            ? [...prev.productsData, ...newProducts] // Append for load more
            : newProducts, // Replace for initial load
          productsDataLengthByKey: isLoadMore
            ? prev.productsDataLengthByKey + newProducts.length
            : newProducts.length,

          
          productsDataTotalLength: totalLength,
          isLoading: false,
          isLoadingMore: false,
          axiosError: null,
          // Cache the new page data
          cachedProductsData: {
            ...prev.cachedProductsData,
            [cacheKey]: newProducts,
          },
          cachedDataLengthByKey: {
            ...prev.cachedDataLengthByKey,
            [cacheKey]: newProducts.length,
          },
        }));

        console.log(`Loaded page ${currentPage} from API and cached`);
        console.log(get().productsDataLengthByKey, "productsDataLengthByKey");
      }
    } catch (e) {
      set({
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
        isLoading: false,
        isLoadingMore: false,
        productsData: isLoadMore ? get().productsData : [], // Keep existing data on load more error
      });
    }
  },

  loadMoreProducts: async () => {
    const state = get();

    // Check if we have more products to load
    const currentProductsLength = state.productsData.length;
    const totalLength = state.productsDataTotalLength;

    if (currentProductsLength >= totalLength && totalLength > 0) {
      console.log("No more products to load");
      return;
    }

    // Increment page number for next page
    const nextPage = state.pageNumber + 1;
    set({ pageNumber: nextPage });

    // Call getAllProducts with load more flag
    await get().getAllProducts(true);
    console.log(
      get().cachedProductsData,
      "cachedProductsData ->>> from loadMoreProducts"
    );
  },
}));
