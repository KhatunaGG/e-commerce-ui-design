import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../libs/axiosInstance";
import { useSignInStore } from "./sign-in.store";
import { ICheckoutData } from "./checkout.store";

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
  purchasesData: ICheckoutData[];
  setEditAddressId: (id: string | null) => void;
  setAddressType: (addressType: string | null) => void;
  getAllShippingAddresses: () => Promise<void>;
  clearAddressData: () => void;
  submitEditAddress: (formData: AddressDataType) => Promise<boolean>;
  getAllOrders: () => Promise<void>;
  getOrderStatus: (createdAt?: string) => string;
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
      purchasesData: [],
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

      getAllOrders: async () => {
        set({ isLoading: true, axiosError: null });
        const signInStore = useSignInStore.getState();
        try {
          const res = await axiosInstance.get("/purchase", {
            headers: { Authorization: `Bearer ${signInStore.accessToken}` },
          });
          if (res.status >= 200 && res.status <= 204) {
            console.log(res.data, "res.data");
            set({
              purchasesData: res.data,
              isLoading: false,
              axiosError: null,
            });
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
      },
      getOrderStatus: (createdAt?: string): string => {
        if (!createdAt) return "";

        const createdDate = new Date(createdAt);
        const now = new Date(); 
        const diffInMin = now.getTime() - createdDate.getTime();
        const diffDays = diffInMin / (1000 * 60 * 60 * 24);
        return diffDays >= 3 ? "Delivered" : "Processing";
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
