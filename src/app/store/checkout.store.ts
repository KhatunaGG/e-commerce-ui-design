import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { useCartStore } from "./cart.store";
import { useSignInStore } from "./sign-in.store";
import { axiosInstance } from "../libs/axiosInstance";
import { persist } from "zustand/middleware";
import { useShopStore } from "./shop-page.store";
import {
  ErrorResponse,
  ICheckoutData,
  IUseCheckoutStore,
} from "../interfaces/interface";

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    return errorMessage;
  }
  const unexpectedError = "An unexpected error occurred";
  return unexpectedError;
};

export const useCheckoutStore = create<IUseCheckoutStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      axiosError: null,
      formData: null,
      subtotal: 0,
      shippingCost: 0,
      shippingOption: "",
      checkoutData: null,

      generateOrderCode: (): string => {
        const part1 = String(Math.floor(1000 + Math.random() * 9000));
        const part2 = String(Math.floor(10000 + Math.random() * 90000));
        return `#${part1}_${part2}`;
      },

      roundToTwo: (val: number) => Math.round(val * 100) / 100,
      setSubtotalAndShipping: (arr, selectedShipping) => {
        const roundToTwo = (val: number): number => Math.round(val * 100) / 100;

        const subTotal = arr.reduce((acc, item) => {
          const hasDiscount =
            typeof item.discount === "number" && item.discount > 0;
          const priceToUse = hasDiscount
            ? item.price - (item.price * item.discount) / 100
            : item.price;
          return acc + roundToTwo(priceToUse * item.purchasedQty);
        }, 0);

        let shippingCost = 0;
        let shippingOption = "";

        if (selectedShipping) {
          shippingOption = selectedShipping.shippingOption.toLowerCase();

          if (shippingOption === "pick up") {
            shippingCost = roundToTwo(
              (subTotal * selectedShipping.shippingCost) / 100
            );
          } else {
            shippingCost = roundToTwo(selectedShipping.shippingCost);
          }
        }

        set({ subtotal: subTotal, shippingCost, shippingOption });
      },

      setFormData: (data) => set({ formData: data }),

      submitAddress: async (addressForm: {
        streetAddress: string;
        townCity: string;
        country: string;
        state: string;
        zipCode: string;
        phoneNumber: string;
        differentBilling?: boolean;
        type: string;
      }) => {
        try {
          const { accessToken } = useSignInStore.getState();
          const res = await axiosInstance.post(
            "/address/create-address",
            addressForm,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          if (res.status >= 200 && res.status <= 204) {
            return true;
          }
          return false;
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
          return false;
        }
      },

      normalizeZipCode: (str?: string): string => {
        if (!str || typeof str !== "string") return "";
        return str.trim().toUpperCase();
      },

      submitPurchase: async (formState) => {
        const cartStore = useCartStore.getState();
        const signInStore = useSignInStore.getState();
        const { normalizeFirstChar } = useShopStore.getState();
        const { normalizeZipCode } = get();
        const state = get();
        const roundToTwo = get().roundToTwo;

        const presignedUrls = cartStore.cartData
          .map((item) => item.presignedUrl)
          .filter((url): url is string => Boolean(url));

        const addressFormState = {
          streetAddress: normalizeFirstChar(formState.streetAddress),
          townCity: normalizeFirstChar(formState.townCity),
          country: normalizeFirstChar(formState.country),
          state: normalizeFirstChar(formState.state),
          phoneNumber: normalizeFirstChar(formState.phoneNumber),
          zipCode: normalizeZipCode(formState.zipCode),
          differentBilling: formState.differentBilling,
          type: "shipping",
        };

        await get().submitAddress(addressFormState);

        const cleanedOrder = cartStore.cartData.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars 
          ({ presignedUrl, colors, ...rest }) => rest
        );

        const newFormState: ICheckoutData = {
          ...formState,
          order: cleanedOrder,
          shipping: state.shippingCost,
          shippingOption: state.shippingOption,
          subtotal: state.subtotal,
          orderCode: get().generateOrderCode(),
          total: roundToTwo(state.shippingCost + state.subtotal),
        };

        const localCheckoutData: ICheckoutData = {
          ...newFormState,
          createdAt: new Date().toISOString(),
          presignedUrls: presignedUrls.length ? presignedUrls : [],
        };
        set({ isLoading: true, axiosError: null });
        try {
          const res = await axiosInstance.post("/purchase", newFormState, {
            headers: { Authorization: `Bearer ${signInStore.accessToken}` },
          });
          if (res.status >= 200 && res.status <= 204) {
            set({ checkoutData: localCheckoutData });
            set({
              isLoading: false,
              axiosError: "",
            });
            console.log(state.checkoutData, " state.checkoutData");
            return true;
          }
        } catch (e) {
          set({
            isLoading: false,
            axiosError: handleApiError(e as AxiosError<ErrorResponse>),
          });
        }
        return false;
      },

      formatDate: (data?: string) => {
        if (!data) return "";
        return new Date(data).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    }),
    {
      name: "checkout-storage",
      partialize: (state) => ({
        checkoutData: state.checkoutData,
      }),
    }
  )
);
