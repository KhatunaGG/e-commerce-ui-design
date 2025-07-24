import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MyAccountType } from "../components/__organism/account/Account";
// import { useSignInStore } from "./sign-in.store";

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

export interface IUseAccountStore {
  isLoading: boolean;
  axiosError: string | null;
  formData: MyAccountType | null;

  setFormData: (formData: MyAccountType) => void;
//   submitAccountSettings: (data: MyAccountType) => Promise<boolean>;
}

export const useAccountStore = create<IUseAccountStore>()(
  persist(
    (set) => ({
      isLoading: false,
      axiosError: null,
      formData: null,

      setFormData: (data) => set({ formData: data }),

      submitAccountSettings: async (data: MyAccountType) => {
        // const signInStore = useSignInStore();
        console.log(data, "data from account store")
        // const state = get()
   

        try {
          // set({isLoading: true, axiosError: null})
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
      },
    }),
    {
      name: "account-storage",
      partialize: (state) => ({
        formData: state.formData,
      }),
    }
  )
);
