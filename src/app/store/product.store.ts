import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { axiosInstance } from "../libs/axiosInstance";
import { ProductsDataType, useShopStore } from "./shop-page.store";

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

export interface IUseProductStore {
  cashedWishList: Record<string, ProductsDataType[]>;
  productById: ProductsDataType | null;
  isLoading: boolean;
  axiosError: string | null;
  wishlistData: ProductsDataType[];
  wishListStatus: boolean | undefined;
  pageNumber: number;
  take: number;
  wishlistDataLength: number;
  activeTab: string;
  getProductById: (id: string) => Promise<void>;
  clearProduct: () => void;
  setActiveTab: (activeTab: string) => void;
  updateProduct: (id: string, val: boolean) => Promise<void>;
  getAllWishlist: (page: string) => Promise<void>;
  loadMoreWishList: () => void;
  clearWishlist: () => void;
  setWishlistDataFromCache: (page: string) => void;
  averageRatings: Record<string, number>;
  getAverageRating: (productId: string) => Promise<number>;
  setAverageRating: (productId: string, rating: number) => void;
}

export const useProductStore = create<IUseProductStore>((set, get) => ({
  cashedWishList: {},
  productById: null,
  isLoading: false,
  axiosError: null,
  selectedColor: "",
  activeTab: "Additional Info",
  wishlistData: [],
  wishListStatus: undefined,
  pageNumber: 1,
  take: 6,
  wishlistDataLength: 0,
  averageRatings: {},
  setAverageRating: (productId, rating) => {
    set((state) => ({
      averageRatings: {
        ...state.averageRatings,
        [productId]: rating,
      },
    }));
  },

  setActiveTab: (activeTab) => set({ activeTab }),
  getProductById: async (id) => {
    set({ isLoading: true, axiosError: null });
    const shopCash = useShopStore.getState();
    let searchedProduct = shopCash.productsData.find((pr) => pr._id === id);
    if (!searchedProduct) {
      const arr = shopCash.cachedProductsData.shop || [];
      searchedProduct = arr.find((pr) => pr._id === id);
    }
    if (searchedProduct) {
      set({ productById: searchedProduct, isLoading: false });
      return;
    }

    try {
      const res = await axiosInstance.get(`/product/${id}`);
      if (res.status >= 200 && res.status <= 204) {
        set({ productById: res.data, isLoading: false });
      }
    } catch (e) {
      set({
        productById: null,
        isLoading: false,
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      });
    }
  },

  updateProduct: async (id: string, val: boolean) => {
    set({ isLoading: true, axiosError: null });

    try {
      const res = await axiosInstance.patch(`/product/${id}`, {
        wishlist: val,
      });

      if (res.status >= 200 && res.status <= 204) {
        const wishlistStatus = res.data.wishlist;
        const currentProduct = get().productById;

        if (currentProduct && currentProduct._id === id) {
          set({
            productById: {
              ...currentProduct,
              wishlist: wishlistStatus,
            },
          });
        }
        const shopStore = useShopStore.getState();
        const updatedCachedData = { ...shopStore.cachedProductsData };

        Object.keys(updatedCachedData).forEach((page) => {
          updatedCachedData[page] = updatedCachedData[page].map((product) =>
            product._id === id
              ? { ...product, wishlist: wishlistStatus }
              : product
          );
        });

        const updatedProductsData = shopStore.productsData.map((product) =>
          product._id === id
            ? { ...product, wishlist: wishlistStatus }
            : product
        );
        useShopStore.setState({
          cachedProductsData: updatedCachedData,
          productsData: updatedProductsData,
        });
        const prevWishlistData = get().wishlistData;
        let newWishlistData: ProductsDataType[] = [];

        if (wishlistStatus) {
          const productToAdd =
            updatedProductsData.find((p) => p._id === id) || currentProduct;
          if (productToAdd) {
            newWishlistData = [
              productToAdd,
              ...prevWishlistData.filter((p) => p._id !== id),
            ];
          }
        } else {
          newWishlistData = prevWishlistData.filter((item) => item._id !== id);
        }
        const currentCache = get().cashedWishList;
        const updatedCache: Record<string, ProductsDataType[]> = {};
        Object.keys(currentCache).forEach((pageKey) => {
          updatedCache[pageKey] = wishlistStatus
            ? [
                ...(currentCache[pageKey] || []),
                ...newWishlistData.filter(
                  (p) => !currentCache[pageKey]?.some((c) => c._id === p._id)
                ),
              ]
            : (currentCache[pageKey] || []).filter((item) => item._id !== id);
        });

        set({
          wishlistData: newWishlistData,
          cashedWishList: updatedCache,
          wishListStatus: wishlistStatus,
          isLoading: false,
          axiosError: null,
        });
      }
    } catch (e) {
      set({
        isLoading: false,
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      });
    }
  },

  getAllWishlist: async (wishlistPage: string) => {
    const state = get();
    if (state.cashedWishList[wishlistPage]?.length > 0) return;
    set({ isLoading: true, axiosError: null });
    const page = state.pageNumber || 1;
    const take = state.take || 6;
    try {
      const res = await axiosInstance.get(
        `/product/all-whishList?page=${page}&take=${take}`
      );
      if (res.status >= 200 && res.status <= 204) {
        const newWishlist = res.data.data;
        const wishListLength = res.data.productsDataLength;
        const updatedWishlistData = [...state.wishlistData, ...newWishlist];

        set((prev) => ({
          wishlistData: updatedWishlistData,
          wishlistDataLength: wishListLength,
          isLoading: false,
          axiosError: null,
          cashedWishList: {
            ...prev.cashedWishList,
            // [wishlistPage]: updatedWishlistData,
            [wishlistPage]: newWishlist,
          },
        }));
      }
    } catch (e) {
      set({
        isLoading: false,
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      });
    }
  },

  setWishlistDataFromCache: async (page: string) => {
    const cached = get().cashedWishList[page];
    if (cached) {
      set({ wishlistData: cached });
    } else {
      await get().getAllWishlist(page);
    }
  },

  loadMoreWishList: async () => {
    const state = get();
    const { pageNumber, wishlistData, wishlistDataLength, take } = state;
    const alreadyLoaded = wishlistData.length;
    if (alreadyLoaded >= wishlistDataLength) return;
    const nextPage = pageNumber + 1;
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(
        `/product/all-whishList?page=${nextPage}&take=${take}`
      );

      if (res.status >= 200 && res.status <= 204) {
        set({
          wishlistData: [...wishlistData, ...res.data.data],
          wishlistDataLength: res.data.productsDataLength,
          pageNumber: nextPage,
          isLoading: false,
        });
      }
    } catch (e) {
      set({
        isLoading: false,
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      });
    }
  },
  // getAverageRating: async (productId: string) => {
  //   try {
  //     const res = await axiosInstance.get(
  //       `/review/average-rating/${productId}`
  //     );
  //     if (res.status >= 200 && res.status <= 204) {
  //       console.log(res.data.averageRating, "res.data.averageRating")
  //       return res.data.averageRating;
  //     }
  //   } catch (e) {
  //     console.error("Error fetching average rating", e);
  //     return 0;
  //   }
  // },

  getAverageRating: async (productId) => {
    const cachedRating = get().averageRatings[productId];
    if (cachedRating !== undefined) {
      return cachedRating;
    }
    try {
      const res = await axiosInstance.get(
        `/review/average-rating/${productId}`
      );
      if (res.status >= 200 && res.status <= 204) {
        const rating = res.data.averageRating ?? 0;
        get().setAverageRating(productId, rating);
        return rating;
      }
    } catch (e) {
      console.error("Error fetching average rating", e);
    }
    return 0;
  },

  clearProduct: () => set({ productById: null }),
  clearWishlist: () => set({ wishlistData: [], pageNumber: 1, take: 6 }),
}));
