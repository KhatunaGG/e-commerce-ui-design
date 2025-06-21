// import { create } from "zustand";

// export interface IUseProductsFilterStore {
//   selected: string;
//   isDroppedDown: boolean;
//   sortedByFour: boolean;
//   sortByTwoVertically: boolean;
//   sortByTwoHorizontally: boolean;
//   setsSortedByFour: (v: boolean) => void;
//   setSelected: (selected: string) => void;
//   setIsDroppedDown: (isDroppedDown: boolean) => void;
//   handleSelect: (value: string) => void;
// }

// export const useProductsFilterStore = create<IUseProductsFilterStore>(
//   (set) => ({
//     selected: "Sort By",
//     isDroppedDown: false,
//     sortedByFour: false,
//     sortByTwoVertically: false,
//     sortByTwoHorizontally: false,
//     setsSortedByFour: (v) => set({ sortedByFour: !v }),
//     setSelected: (selected) => set({ selected }),
//     setIsDroppedDown: (isDroppedDown) => set({ isDroppedDown }),
//     handleSelect: (value: string) => {
//       set({ selected: value });
//     },
//   })
// );

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

export interface IUseProductsFilterStore {
  selected: string;
  isDroppedDown: boolean;
  sortedByFour: boolean;
  sortByTwoVertically: boolean;
  sortByTwoHorizontally: boolean;
  productsData: ProductsDataType[];
  isLoading: boolean;
  axiosError: string | null;
  setsSortedByFour: (v: boolean) => void;
  setSortByTwoVertically: (v: boolean) => void;
  setSortByTwoHorizontally: (v: boolean) => void;
  setSelected: (selected: string) => void;
  setIsDroppedDown: (isDroppedDown: boolean) => void;
  handleSelect: (value: string) => void;
  resetAllByIconsSort: () => void;
  getAllProducts: () => Promise<void>;
  cleanupProducts: () => void;
}

export const useProductsFilterStore = create<IUseProductsFilterStore>(
  (set) => ({
    productsData: [],
    isLoading: false,
    axiosError: null,
    selected: "Sort By",
    isDroppedDown: false,
    sortedByFour: false,
    sortByTwoVertically: false,
    sortByTwoHorizontally: false,
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
    getAllProducts: async () => {
      try {
        const res = await axiosInstance.get(`/product`);
        if (res.status >= 200 && res.status <= 204) {
          set({
            productsData: res.data || [],
            // currentPage: page,
            isLoading: false,
          });
        }
      } catch (e) {
        const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
        set({ axiosError: errorMessage, isLoading: false });
      }
    },

    cleanupProducts: () => {
      set({
        productsData: [],
        isLoading: false,
        axiosError: null,
        selected: "Sort By",
        isDroppedDown: false,
        sortedByFour: false,
        sortByTwoVertically: false,
        sortByTwoHorizontally: false,
        // currentPage: ""
      });
    },
  })
);
