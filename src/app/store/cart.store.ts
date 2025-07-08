// import axios, { AxiosError } from "axios";
import { create } from "zustand";
// import { useShopPageStore } from "./useShopPage.store";

export interface ErrorResponse {
  message: string;
}

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   if (axios.isAxiosError(error)) {
//     const errorMessage = error.response?.data.message || "An error occurred";
//     return errorMessage;
//   }
//   const unexpectedError = "An unexpected error occurred";
//   return unexpectedError;
// };

export type CartDataType = {
  productName: string;
  filePath?: string;
  new: boolean;
  discount: number;
  category: string[];
  price: number;
  color: string;
  stock: number;
  wishlist: boolean;
  measurements: string;
  details: string;
  discountTill: string;
  _id: string;
  purchasedQty: number;
};

export interface IUseCartStore {
  isLoading: boolean;
  axiosError: string | null;
  showNavbar: boolean;
  cartData: CartDataType[];
  cartDataLength: number;
  handleShowNavbar: () => void;
  addProductToCart: (id: string) => void;
}

export const useCartStore = create<IUseCartStore>((set) => ({
  isLoading: false,
  axiosError: null,
  showNavbar: false,
  cartData: [],
  cartDataLength: 0,

  handleShowNavbar: () => set((state) => ({ showNavbar: !state.showNavbar })),

  addProductToCart: (id: string) => {
    console.log(id, "id from store");

    // const {
    //   cachedImagesByPage,
    //   createCacheKey,
    //   pageNumber,
    //   filters,
    //   mapSortValueToBackend,
    //   sortBy,
    // } = useShopPageStore();

    // console.log(
    //   cachedImagesByPage,
    //   "cachedImagesByPage from CART"
    // );

    // const backendSortValue = mapSortValueToBackend(sortBy);
    // const cacheKey = createCacheKey(
    //   pageNumber,
    //   filters.category,
    //   filters.priceRange,
    //   backendSortValue
    // );
    // const cached = cachedImagesByPage[cacheKey]
  },
}));
