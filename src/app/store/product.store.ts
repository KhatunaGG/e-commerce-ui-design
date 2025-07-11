import { create } from "zustand";
// import { ProductsDataType, useShopPageStore } from "./useShopPage.store";
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
  // selectedColor: string;
  wishlistData: ProductsDataType[];
  wishListStatus: boolean | undefined;
  pageNumber: number;
  take: number;
  wishlistDataLength: number;

  // setSelectedColor: (selectedColor: string) => void;
  getProductById: (id: string) => Promise<void>;
  clearProduct: () => void;
  // getProductColor: (color: string) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  emojiVisible: boolean;
  setEmojiVisible: (emojiVisible: boolean) => void;
  updateProduct: (id: string, val: boolean) => Promise<void>;
  getAllWishlist: (page: string) => Promise<void>;
  loadMoreWishList: () => void;
  clearWishlist: () => void;
  setWishlistDataFromCache: (page: string) => void;
}

export const useProductStore = create<IUseProductStore>((set, get) => ({
  cashedWishList: {},
  productById: null,
  isLoading: false,
  axiosError: null,
  selectedColor: "",
  activeTab: "Additional Info",
  emojiVisible: false,
  wishlistData: [],
  wishListStatus: undefined,
  pageNumber: 1,
  take: 6,
  wishlistDataLength: 0,

  setEmojiVisible: () =>
    set((state) => ({ emojiVisible: !state.emojiVisible })),

  setActiveTab: (activeTab) => set({ activeTab }),
  // setSelectedColor: (selectedColor) => set({ selectedColor }),

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

  // getProductColor: (color: string) => {
  //   set({ selectedColor: color });
  // },

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
        set({
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
      console.log(get().cashedWishList, "cashedWishList form WISHLIST");
    } catch (e) {
      set({
        isLoading: false,
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      });
    }
  },

  // setWishlistDataFromCache: (page: string) => {
  //   const cachedData = get().cashedWishList[page];
  //   if (cachedData) {
  //     set({ wishlistData: cachedData });
  //   }
  // },

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
  clearProduct: () => set({ productById: null }),
  clearWishlist: () => set({ wishlistData: [], pageNumber: 1, take: 6 }),
}));
