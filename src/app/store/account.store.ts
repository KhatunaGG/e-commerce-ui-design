import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MyAccountType } from "../components/__organism/account/Account";
import { useSignInStore } from "./sign-in.store";
import { axiosInstance } from "../libs/axiosInstance";
import { toast } from "react-toastify";

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
  avatar: string | null;
  setFormData: (formData: MyAccountType) => void;
  submitAccountSettings: (
    formState: Partial<MyAccountType>,
    accessToken: string
  ) => Promise<boolean>;
  handleFileChange: (file: File) => Promise<void>;
  getUsersAvatar: (id: string) => Promise<void>;
  clearAccountData: () => void;
}

export const useAccountStore = create<IUseAccountStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      axiosError: null,
      formData: null,
      avatar: null,

      setFormData: (data) => set({ formData: data }),
      submitAccountSettings: async (
        formState: Partial<MyAccountType>,
        accessToken: string
      ): Promise<boolean> => {
        const original = get().formData;

        if (!original) {
          set({ axiosError: "Original form data not found." });
          return false;
        }

        set({ isLoading: true, axiosError: null });

        const normalizeLower = (value?: string) =>
          value?.trim().toLowerCase() ?? "";

        const changedFields: Partial<MyAccountType> = {};
        const fieldsToCompare: (keyof MyAccountType)[] = [
          "accountName",
          "accountLastName",
          "displayName",
          "accountEmail",
        ];

        for (const key of fieldsToCompare) {
          const newVal = normalizeLower(formState[key]);
          const oldVal = normalizeLower(original[key]);
          if (newVal && newVal !== oldVal) {
            changedFields[key] = newVal;
          }
        }

        const passwordChanged = !!(
          formState.oldPassword?.trim() &&
          formState.newPassword?.trim() &&
          formState.confirmPassword?.trim() &&
          (formState.oldPassword !== original.oldPassword ||
            formState.newPassword !== original.newPassword ||
            formState.confirmPassword !== original.confirmPassword)
        );

        if (passwordChanged) {
          changedFields.oldPassword = formState.oldPassword;
          changedFields.newPassword = formState.newPassword;
          changedFields.confirmPassword = formState.confirmPassword;
        }

        if (Object.keys(changedFields).length === 0) {
          set({ isLoading: false });
          return false;
        }

        const mappedPayload: Record<string, string> = {};

        if (changedFields.accountName)
          mappedPayload.yourName = changedFields.accountName;
        if (changedFields.accountLastName)
          mappedPayload.lastName = changedFields.accountLastName;
        if (changedFields.displayName)
          mappedPayload.userName = changedFields.displayName;
        if (changedFields.accountEmail)
          mappedPayload.email = changedFields.accountEmail;
        if (passwordChanged) {
          mappedPayload.oldPassword = formState.oldPassword!;
          mappedPayload.newPassword = formState.newPassword!;
          mappedPayload.confirmPassword = formState.confirmPassword!;
        }

        try {
          const res = await axiosInstance.patch(`/auth/update`, mappedPayload, {
            headers: { Authorization: `Bearer ${accessToken}` },
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

            set({ isLoading: false });
            toast.success(
              "Your account settings have been updated successfully."
            );

            return true;
          }

          set({ isLoading: false });
          return false;
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
          return false;
        }
      },

      handleFileChange: async (file) => {
        const signInStore = useSignInStore.getState();
        const { accessToken } = signInStore;
        if (!file || !accessToken) return;

        if (!file.type.startsWith("image/")) {
          set({ axiosError: "Only image files are allowed." });
          return;
        }

        set({ isLoading: true, axiosError: null });
        try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await axiosInstance.patch(
            "auth/upload-avatar",
            formData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (res.status >= 200 && res.status <= 204) {
            await get().getUsersAvatar(accessToken);
            toast.success("Your profile picture was updated successfully.");
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
      },

      getUsersAvatar: async (accessToken: string) => {
        if (!accessToken) return;
        set({ isLoading: true, axiosError: null });
        try {
          const res = await axiosInstance.get("auth/get-image", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (res.status >= 200 && res.status < 300) {
            const base64Image = res.data.avatar;
            if (base64Image) {
              set({ avatar: base64Image });
            } else {
              set({ avatar: null });
            }
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
      },

      clearAccountData: () =>
        set({
          isLoading: false,
          axiosError: null,
          formData: null,
          avatar: null,
        }),
    }),
    {
      name: "account-storage",
      partialize: (state) => ({
        formData: state.formData,
        avatar: state.avatar,
      }),
    }
  )
);
