import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { MailType } from "../components/__organism/emailForm/EmailForm";
import { axiosInstance } from "../libs/axiosInstance";

export interface ErrorResponse {
  message: string;
}

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message || "An error occurred";
  }
  return "An unexpected error occurred";
};

export interface IUseMenuStore {
  isLoading: boolean;
  axiosError: string | null;
  mobileMenu: boolean;
  setMobileMenu: (val: boolean) => void;
  toggleMenu: () => void;
  sendEmail: (FormData: MailType, accessToken: string) => Promise<boolean>;
}

export const useMenuStore = create<IUseMenuStore>((set, get) => ({
  isLoading: false,
  axiosError: null,
  mobileMenu: false,
  setMobileMenu: (val) => set({ mobileMenu: val }),
  toggleMenu: () => set({ mobileMenu: !get().mobileMenu }),
  sendEmail: async (FormData: MailType, accessToken: string) => {
    set({ isLoading: true, axiosError: null });
    try {
      const res = await axiosInstance.post(`/auth/contact`, FormData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status >= 200 && res.status <= 204) {
        set({ isLoading: false });
        return true;
      }
    } catch (e) {
      set({
        isLoading: false,
        axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      });
      return false;
    }
    return false;
  },
}));
