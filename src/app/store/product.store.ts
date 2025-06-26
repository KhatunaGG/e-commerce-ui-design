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
  setSelectedColor: (selectedColor: string) => void;
  getProductById: (id: string) => Promise<void>;
  clearProduct: () => void;
  getProductColor: (color: string) => void;
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

export const useProductStore = create<IUseProductStore>((set) => ({
  productById: null,
  isLoading: false,
  axiosError: null,
  selectedColor: "",
  activeTab: "Additional Info",

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
  clearProduct: () => set({ productById: null }),
}));
