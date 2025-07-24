
import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { CheckoutType } from "../components/__organism/checkout/Checkout";
import { CartItemType, useCartStore } from "./cart.store";
import { useSignInStore } from "./sign-in.store";
import { axiosInstance } from "../libs/axiosInstance";
import { persist } from "zustand/middleware";

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

// export interface ICheckoutData {
//   formState: CheckoutType;
//   order: CartItemType[];
//   shipping: number;
//   shippingOption: string;
//   subtotal: number;
//   total: number;
// }

export type ICheckoutData = CheckoutType & {
  order: CartItemType[];
  shipping: number;
  shippingOption: string;
  subtotal: number;
  total: number;
  orderCode: string;
  createdAt?: string;
  // presignedUrl?: string;
  presignedUrls?: string[];
};

export interface IUseCheckoutStore {
  isLoading: boolean;
  axiosError: string | null;
  formData: CheckoutType | null;
  checkoutData: ICheckoutData | null;

  subtotal: number;
  shippingCost: number;
  shippingOption: string;
  generateOrderCode: () => string;
  setSubtotalAndShipping: (
    data: CartItemType[],
    selectedShipping: { shippingOption: string; shippingCost: number } | null
  ) => void;

  setFormData: (data: CheckoutType) => void;
  roundToTwo: (val: number) => number;
  submitPurchase: (formState: CheckoutType) => Promise<boolean>;
}

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
        const part1 = String(Math.floor(1000 + Math.random() * 9000)); // 4 digits
        const part2 = String(Math.floor(10000 + Math.random() * 90000)); // 5 digits
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

      submitPurchase: async (formState) => {
        const cartStore = useCartStore.getState();
        const signInStore = useSignInStore.getState();
        const state = get();
        const roundToTwo = get().roundToTwo;

        const presignedUrls = cartStore.cartData
          .map((item) => item.presignedUrl)
          .filter((url): url is string => Boolean(url));

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
          // total: state.shippingCost + state.subtotal,
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
    }),
    {
      name: "checkout-storage",
      partialize: (state) => ({
        checkoutData: state.checkoutData,
      }),
    }
  )
);