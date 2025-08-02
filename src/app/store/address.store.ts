import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../libs/axiosInstance";
import { useSignInStore } from "./sign-in.store";

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

export type AddressDataType = {
  streetAddress: string;
  townCity: string;
  country: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  differentBilling?: boolean;
  type: string;
  _id?: string;
};

export interface IUseAddressStore {
  isLoading: boolean;
  axiosError: string | null;
  editAddress: boolean;
  addressType: string | null;
  addressData: AddressDataType[];
  setEditAddress: (editAddress: boolean) => void;
  setAddressType: (addressType: string) => void;
  getAllShippingAddresses: () => Promise<void>;
  clearAddressData: () => void;
}

export const useAddressStore = create<IUseAddressStore>()(
  persist(
    (set, get) => ({
      editAddress: false,
      addressType: "",
      isLoading: false,
      axiosError: "",
      addressData: [],
      clearAddressData: () => set({ addressData: [] }),
      setAddressType: (addressType) => set({ addressType }),
      setEditAddress: (editAddress: boolean) => set({ editAddress }),
      getAllShippingAddresses: async () => {
        const addressData = get().addressData;
        if (addressData && addressData.length > 0) {
          return;
        }
        const signInStore = useSignInStore.getState();
        try {
          set({ isLoading: true, axiosError: null });
          const res = await axiosInstance.get("/address", {
            headers: { Authorization: `Bearer ${signInStore.accessToken}` },
          });
          if (res.status >= 200 && res.status <= 204) {
            console.log(res.data, "res.data");
            set({ addressData: res.data });
          }
          console.log(get().addressData, "addressData");
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
      },
    }),

    {
      name: "address-storage",
      partialize: (state) => ({
        addressData: state.addressData,
      }),
    }
  )
);
