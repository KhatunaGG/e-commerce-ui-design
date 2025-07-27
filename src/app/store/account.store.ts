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

      // submitAccountSettings: async (
      //   formState: Partial<MyAccountType>,
      //   accessToken: string
      // ) => {
      //   const originalData = get().formData;

      //   if (!originalData) {
      //     set({ axiosError: "Original data not set." });
      //     return;
      //   }

      //   set({ isLoading: true, axiosError: null });

      //   const normalizeLower = (value?: string) =>
      //     value?.trim().toLowerCase() ?? "";

      //   const normalizedForm: Partial<MyAccountType> = {
      //     accountName: normalizeLower(formState.accountName),
      //     accountLastName: normalizeLower(formState.accountLastName),
      //     displayName: normalizeLower(formState.displayName),
      //     accountEmail: normalizeLower(formState.accountEmail),
      //   };

      //   const changedFields: Partial<MyAccountType> = {};

      //   for (const key of Object.keys(
      //     normalizedForm
      //   ) as (keyof MyAccountType)[]) {
      //     const newVal = normalizedForm[key];
      //     const originalVal = normalizeLower(originalData[key]);
      //     if (newVal && newVal !== originalVal) {
      //       changedFields[key] = newVal;
      //     }
      //   }

      //   const passwordFieldsPresent =
      //     formState.oldPassword &&
      //     formState.newPassword &&
      //     formState.confirmPassword &&
      //     formState.newPassword === formState.confirmPassword;

      //   if (passwordFieldsPresent) {
      //     changedFields.oldPassword = formState.oldPassword;
      //     changedFields.newPassword = formState.newPassword;
      //     changedFields.confirmPassword = formState.confirmPassword;
      //   }

      //   // Nothing changed?
      //   if (Object.keys(changedFields).length === 0) {
      //     set({ isLoading: false });
      //     return;
      //   }

      //   // Map to backend fields
      //   const mappedPayload = {
      //     ...(changedFields.accountName && {
      //       yourName: changedFields.accountName,
      //     }),
      //     ...(changedFields.accountLastName && {
      //       lastName: changedFields.accountLastName,
      //     }),
      //     ...(changedFields.displayName && {
      //       userName: changedFields.displayName,
      //     }),
      //     ...(changedFields.accountEmail && {
      //       email: changedFields.accountEmail,
      //     }),
      //     ...(passwordFieldsPresent && {
      //       oldPassword: formState.oldPassword,
      //       newPassword: formState.newPassword,
      //       confirmPassword: formState.confirmPassword,
      //     }),
      //   };
      //   console.log(mappedPayload, "mappedPayload")

      //   try {
      //     const res = await axiosInstance.patch(`/auth/update`, mappedPayload, {
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //       },
      //     });

      //     if (res.status >= 200 && res.status <= 204) {
      //       const { initialize } = useSignInStore.getState();
      //       await initialize();

      //       set({
      //         formData: {
      //           accountName: res.data.yourName ?? "",
      //           accountLastName: res.data.lastName ?? "",
      //           displayName: res.data.userName ?? "",
      //           accountEmail: res.data.email ?? "",
      //           oldPassword: "",
      //           newPassword: "",
      //           confirmPassword: "",
      //         },
      //       });
      //     }

      //     set({ isLoading: false });
      //   } catch (e) {
      //     set({
      //       isLoading: false,
      //       axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      //     });
      //   }
      // },

      submitAccountSettings: async (
        formState: Partial<MyAccountType>,
        accessToken: string
      ) => {
        const original = get().formData;

        if (!original) {
          set({ axiosError: "Original form data not found." });
          return;
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
        const passwordChanged =
          formState.oldPassword?.trim() &&
          formState.newPassword?.trim() &&
          formState.confirmPassword?.trim() &&
          (formState.oldPassword !== original.oldPassword ||
            formState.newPassword !== original.newPassword ||
            formState.confirmPassword !== original.confirmPassword);

        if (passwordChanged) {
          changedFields.oldPassword = formState.oldPassword;
          changedFields.newPassword = formState.newPassword;
          changedFields.confirmPassword = formState.confirmPassword;
        }
        if (Object.keys(changedFields).length === 0) {
          set({ isLoading: false });
          return;
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

        console.log(mappedPayload, "mappedPayload");

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
