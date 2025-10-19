import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { axiosInstance } from "../libs/axiosInstance";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useHomePageStore } from "./useHomePage.store.";
import { useProductStore } from "./product.store";
import { useShopStore } from "./shop-page.store";
import { useAddressStore } from "./address.store";
import { useAccountStore } from "./account.store";
import { useQuestionStore } from "./question.store";
import { useReviewStore } from "./review.store";
import { useBlogStore } from "./blog.store";
import { useCartStore } from "./cart.store";
import { ErrorResponse, IUser, IUseSignInStore } from "../interfaces/interface";

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    toast.error(errorMessage);
    return errorMessage;
  }
  const unexpectedError = "An unexpected error occurred";
  toast.error(unexpectedError);
  return unexpectedError;
};

export const useSignInStore = create<IUseSignInStore>((set) => ({
  isLoading: false,
  axiosError: "",
  signInName: "",
  password: "",
  rememberMe: false,
  accessToken: null,
  currentUser: null,
  setAccessToken: (accessToken) => set({ accessToken }),
  setFormData: (signInName, password, rememberMe) =>
    set({ signInName, password, rememberMe }),

  signIn: async (formData) => {
    set({ isLoading: true, axiosError: "" });
    const isEmail = (value: string): boolean => /\S+@\S+\.\S+/.test(value);
    try {
      const { signInName, password, rememberMe } = formData;
      const data = isEmail(signInName)
        ? { email: signInName, password, rememberMe }
        : { userName: signInName, password, rememberMe };
      const res = await axiosInstance.post(`/auth/sign-in`, data);
      if (res.status >= 200 && res.status <= 204) {
        const { accessToken } = res.data;
        set({
          accessToken,
          signInName: "",
          password: "",
          rememberMe: false,
        });
        setCookie("accessToken", res.data.accessToken, { maxAge: 60 * 60 });
        return true;
      }
      return false;
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  initialize: async () => {
    const token = getCookie("accessToken");
    if (token && typeof token === "string") {
      set({ accessToken: token, isLoading: false });
      await useSignInStore.getState().getCurrentUser(token);
    } else {
      window.location.href = "/sign-up";
    }
  },

  getCurrentUser: async (accessToken: string | undefined) => {
    if (!accessToken) return;
    try {
      const res = await axiosInstance.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.status >= 200 && res.status <= 204) {
        const user: IUser = res.data;
        set({ currentUser: user });
      }
    } catch (e) {
      const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
      set({ axiosError: errorMessage });
    }
  },

  logout: () => {
    deleteCookie("accessToken");
    useBlogStore.getState().resetBlogs();
    useReviewStore.getState().resetReviewStore();
    useQuestionStore.getState().resetQuestionStore();
    useHomePageStore.getState().clearCache();
    useShopStore.getState().clearCache();
    useProductStore.getState().clearWishlist();
    useProductStore.setState({ cashedWishList: {} });
    useAddressStore.getState().clearAddressData();
    useAddressStore.getState().clearOrdersData();
    useAccountStore.getState().clearAccountData();
    useCartStore.getState().resetCartStore();
    localStorage.clear();
    set({ currentUser: null, accessToken: "" });
    window.location.href = "/";
  },
}));
