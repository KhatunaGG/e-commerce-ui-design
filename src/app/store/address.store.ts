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
    return error.response?.data.message || "An error occurred";
  }
  return "An unexpected error occurred";
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
  _id: string;
};

export interface IUseAddressStore {
  isLoading: boolean;
  axiosError: string | null;
  editAddress: boolean;
  editAddressId: string | null;
  addressType: string | null;
  addressData: AddressDataType[];
  setEditAddressId: (id: string | null) => void;
  setAddressType: (addressType: string | null) => void;
  getAllShippingAddresses: () => Promise<void>;
  clearAddressData: () => void;
  submitEditAddress: (formData: AddressDataType) => Promise<boolean>;
}

export const useAddressStore = create<IUseAddressStore>()(
  persist(
    (set, get) => ({
      editAddress: false,
      editAddressId: null,
      addressType: null,
      isLoading: false,
      axiosError: null,
      addressData: [],
      clearAddressData: () => set({ addressData: [] }),
      setAddressType: (addressType) => set({ addressType }),
      setEditAddressId: (id) => set({ editAddressId: id }),
      getAllShippingAddresses: async () => {
        if (get().addressData.length > 0) return;

        const signInStore = useSignInStore.getState();
        try {
          set({ isLoading: true, axiosError: null });
          const res = await axiosInstance.get("/address", {
            headers: { Authorization: `Bearer ${signInStore.accessToken}` },
          });

          if (res.status >= 200 && res.status <= 204) {
            set({ addressData: res.data, isLoading: false, axiosError: null });
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
      },

      submitEditAddress: async (formData: AddressDataType) => {
        console.log(formData, "formData from STORE");

        const signInStore = useSignInStore.getState();

        try {
          set({ isLoading: true, axiosError: null });
          const res = await axiosInstance.patch(
            `address/${formData._id}`,
            formData,
            {
              headers: { Authorization: `Bearer ${signInStore.accessToken}` },
            }
          );

          if (res.status >= 200 && res.status <= 204) {
            set({ addressData: [] });
            await get().getAllShippingAddresses(); 
            set({ editAddressId: null });
            return true;
          } else {
            set({ isLoading: false });
            return false;
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
          return false;
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
