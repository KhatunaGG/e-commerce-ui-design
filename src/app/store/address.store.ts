import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../libs/axiosInstance";
import { useSignInStore } from "./sign-in.store";
import {
  AddressDataType,
  ErrorResponse,
  IUseAddressStore,
} from "../interfaces/interface";

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message || "An error occurred";
  }
  return "An unexpected error occurred";
};

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
      page: 1,
      take: 5,
      ordersTotalCount: 0,
      purchasesDataByPage: {},
      isOpen: false,
      selectedLabel: "Account",
      setSelectedLabel: (selectedLabel) => set({ selectedLabel }),
      setIsOpen: (isOpen) => set({ isOpen }),
      setPage: async (page: number) => {
        set({ page });
        await get().getAllOrders();
      },
      clearAddressData: () => set({ addressData: [] }),
      clearOrdersData: () =>
        set({
          purchasesDataByPage: {},
          ordersTotalCount: 0,
          page: 1,
          isLoading: false,
          axiosError: null,
        }),
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
        const { page, purchasesDataByPage } = get();
        if (purchasesDataByPage[page]) return;
        set({ isLoading: true, axiosError: null });
        const signInStore = useSignInStore.getState();
        try {
          const res = await axiosInstance.get(
            `/purchase?page=${get().page}&take=${get().take}`,
            {
              headers: { Authorization: `Bearer ${signInStore.accessToken}` },
            }
          );
          if (res.status >= 200 && res.status <= 204) {
            set({
              purchasesDataByPage: {
                ...purchasesDataByPage,
                [page]: res.data.orders,
              },
              isLoading: false,
              axiosError: null,
              ordersTotalCount: res.data.ordersTotalLength,
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
        purchasesDataByPage: state.purchasesDataByPage,
        page: state.page,
        take: state.take,
        ordersTotalCount: state.ordersTotalCount,
      }),
    }
  )
);
