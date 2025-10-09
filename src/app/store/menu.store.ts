// import axios, { AxiosError } from "axios";
import { create } from "zustand";

// export interface ErrorResponse {
//   message: string;
// }

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   if (axios.isAxiosError(error)) {
//     return error.response?.data.message || "An error occurred";
//   }
//   return "An unexpected error occurred";
// };

export interface IUseMenuStore {
  isLoading: boolean;
  axiosError: string | null;
  mobileMenu: boolean;
  setMobileMenu: (val: boolean) => void;
  toggleMenu: () => void;
}

export const useMenuStore = create<IUseMenuStore>((set, get) => ({
  isLoading: false,
  axiosError: null,
  mobileMenu: false,
  setMobileMenu: (val) => set({ mobileMenu: val }),
  toggleMenu: () => set({ mobileMenu: !get().mobileMenu }),
}));