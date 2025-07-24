import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MyAccountType } from "../components/__organism/account/Account";
import { useSignInStore } from "./sign-in.store";
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

export interface IUseAccountStore {
  isLoading: boolean;
  axiosError: string | null;
  formData: MyAccountType | null;

  setFormData: (formData: MyAccountType) => void;
  submitAccountSettings: (
    formState: Partial<MyAccountType>,
    accessToken: string
  ) => Promise<void>;
}

export const useAccountStore = create<IUseAccountStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      axiosError: null,
      formData: null,

      setFormData: (data) => set({ formData: data }),

      submitAccountSettings: async (
        formState: Partial<MyAccountType>,
        accessToken: string
      ) => {

        
        const originalData = get().formData;

        if (!originalData) {
          set({ axiosError: "Original data not set." });
          return;
        }

        set({ isLoading: true, axiosError: null });
        const changedData: Partial<MyAccountType> = Object.fromEntries(
          Object.entries(formState).filter(([key, value]) => {
            const changed = value !== originalData[key as keyof MyAccountType];
            return changed;
          })

       
        );

        if (Object.keys(changedData).length === 0) {
          set({ isLoading: false });
          return;
        }

        const mappedPayload: Record<string, unknown> = {};
        if (changedData.accountName)
          mappedPayload.yourName = changedData.accountName;
        if (changedData.accountLastName !== undefined)
          mappedPayload.lastName = changedData.accountLastName;
        if (changedData.displayName)
          mappedPayload.userName = changedData.displayName;
        if (changedData.accountEmail)
          mappedPayload.email = changedData.accountEmail;
        if (changedData.newPassword)
          mappedPayload.password = changedData.newPassword;

        try {
          const res = await axiosInstance.patch(`/auth/update`, mappedPayload, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (res.status >= 200 && res.status <= 204) {
            const { initialize } = useSignInStore.getState();
            await initialize();

            set({
              formData: {
                accountName: res.data.yourName ?? "",
                accountLastName: res.data.lastName ?? "",
                displayName: res.data.userName ?? "",
                accountEmail: res.data.email ?? "",
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              },
            });
          }
          set({ isLoading: false });
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
