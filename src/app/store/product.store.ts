import { create } from "zustand";
import { ProductsDataType, useShopPageStore } from "./useShopPage.store";
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

export interface IUseProductStore {
  productById: ProductsDataType | null;
  isLoading: boolean;
  axiosError: string | null;
  selectedColor: string;
  wishlistData: ProductsDataType[];
  wishListStatus: boolean | undefined;
  pageNumber: number;
  take: number;
  wishlistDataLength: number;

  setSelectedColor: (selectedColor: string) => void;
  getProductById: (id: string) => Promise<void>;
  clearProduct: () => void;
  getProductColor: (color: string) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
  emojiVisible: boolean;
  setEmojiVisible: (emojiVisible: boolean) => void;
  updateProduct: (id: string, val: boolean) => Promise<void>;
  // initWishlistData: () => void;

  // updateWishList: (id: string) => Promise<void>
  getAllWishlist: () => Promise<void>;
  loadMoreWishList: () => void;
  clearWishlist: () => void;
}

export const useProductStore = create<IUseProductStore>((set, get) => ({
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
  setSelectedColor: (selectedColor) => set({ selectedColor }),
  getProductById: async (id) => {
    set({ isLoading: true, axiosError: null });
    const shopCash = useShopPageStore.getState();
    let searchedProduct = shopCash.productsData.find((pr) => pr._id === id);
    if (!searchedProduct) {
      const arr = shopCash.cachedImagesByPage.shop || [];
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
  getProductColor: (color: string) => {
    set({ selectedColor: color });
  },

  // updateProduct: async (id: string, val: boolean) => {
  //   set({ isLoading: true, axiosError: null });
  //   const wishlistStatus = val;

  //   try {
  //     const res = await axiosInstance.patch(`/product/${id}`, {
  //       wishlist: wishlistStatus,
  //     });
  //     if (res.status >= 200 && res.status <= 204) {
  //       set({wishListStatus: res.data.wishlist})
  //       const shopStore = useShopPageStore.getState();
  //       const updatedCachedData = { ...shopStore.cachedImagesByPage };
  //       Object.keys(updatedCachedData).forEach((page) => {
  //         updatedCachedData[page] = updatedCachedData[page].map((product) =>
  //           product._id === id
  //             ? { ...product, wishlist: wishlistStatus }
  //             : product
  //         );
  //       });
  //       const updatedProductsData = shopStore.productsData.map((product) =>
  //         product._id === id
  //           ? { ...product, wishlist: wishlistStatus }
  //           : product
  //       );
  //       useShopPageStore.setState({
  //         cachedImagesByPage: updatedCachedData,
  //         productsData: updatedProductsData,
  //       });
  //       // set({
  //       //   isLoading: false,
  //       //   axiosError: null,
  //       // });

  //       console.log(
  //         shopStore.cachedImagesByPage,
  //         "cachedImagesByPage form PRODUCT STORE"
  //       );
  //       const allProducts = Object.values(shopStore.cachedImagesByPage).flat();

  //       const newWishlist = allProducts.filter(
  //         (item) => item.wishlist === true
  //       );
  //       set({
  //         isLoading: false,
  //         axiosError: null,
  //         wishlistData: newWishlist,
  //       });
  //     }
  //   } catch (e) {
  //     set({
  //       isLoading: false,
  //       axiosError: handleApiError(e as AxiosError<ErrorResponse>),
  //     });
  //   }
  // },

  updateProduct: async (id: string, val: boolean) => {
    set({ isLoading: true, axiosError: null });

    try {
      const res = await axiosInstance.patch(`/product/${id}`, {
        wishlist: val,
      });

      if (res.status >= 200 && res.status <= 204) {
        const wishlistStatus = res.data.wishlist;

        // Update productById if it matches
        const currentProduct = get().productById;
        if (currentProduct && currentProduct._id === id) {
          set({
            productById: {
              ...currentProduct,
              wishlist: wishlistStatus,
            },
          });
        }

        // Update cached data and productsData in shop store
        const shopStore = useShopPageStore.getState();
        const updatedCachedData = { ...shopStore.cachedImagesByPage };

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

        useShopPageStore.setState({
          cachedImagesByPage: updatedCachedData,
          productsData: updatedProductsData,
        });

        // Rebuild wishlistData
        // const allProducts = Object.values(updatedCachedData).flat();
        // const newWishlist = allProducts.filter(
        //   (item) => item.wishlist === true
        // );

        set({
          // wishlistData: newWishlist,
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

  getAllWishlist: async () => {
    const state = get();
    const page = state.pageNumber || 1;
    const take = state.take || 6;

    set({ isLoading: true, axiosError: null });

    try {
      const res = await axiosInstance.get(
        `/product/all-whishList?page=${page}&take=${take}`
      );

      if (res.status >= 200 && res.status <= 204) {
        console.log(res.data);
        set({
          isLoading: false,
          axiosError: "",
          wishlistData: res.data.data,
          wishlistDataLength: res.data.productsDataLength,
        });
      }
    } catch (e) {
      set({
        isLoading: false,
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      });
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
          wishlistData: [...wishlistData, ...res.data.data], // Append new data
          wishlistDataLength: res.data.productsDataLength, // In case total changes
          pageNumber: nextPage, // ⬅️ Increment page
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

  // loadMoreWishList: async () => {
  //   const state = get();
  //   const { pageNumber, wishlistData, wishlistDataLength } = state;
  //   const alreadyLoaded = wishlistData.length;
  //   if (alreadyLoaded >= wishlistDataLength) return;

  //   await get().getAllWishlist();
  // },

  // initWishlistData: () => {
  //   const shopStore = useShopPageStore.getState();
  //   const allProducts = Object.values(shopStore.cachedImagesByPage).flat();
  //   const newWishlist = allProducts.filter((item) => item.wishlist === true);
  //   set({ wishlistData: newWishlist });
  // },

  clearProduct: () => set({ productById: null }),
  clearWishlist: () => set({ wishlistData: [], pageNumber: 1, take: 6 }),
}));
