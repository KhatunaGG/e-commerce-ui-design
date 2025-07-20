import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { CheckoutType } from "../components/__organism/checkout/Checkout";
import { CartItemType, useCartStore } from "./cart.store";
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

export interface IUseCheckoutStore {
  isLoading: boolean;
  axiosError: string | null;
  formData: CheckoutType | null;

  subtotal: number;
  shippingCost: number;
  shippingOption: string;

  setSubtotalAndShipping: (
    data: CartItemType[],
    selectedShipping: { shippingOption: string; shippingCost: number } | null
  ) => void;

  setFormData: (data: CheckoutType) => void;
  submitPurchase: (formState: CheckoutType) => Promise<boolean>;
}

export const useCheckoutStore = create<IUseCheckoutStore>((set, get) => ({
  isLoading: false,
  axiosError: null,
  formData: null,
  subtotal: 0,
  shippingCost: 0,
  shippingOption: "",

  setSubtotalAndShipping: (arr, selectedShipping) => {
    const roundToTwo = (num: number) => Math.round(num * 100) / 100;

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

    const cleanedOrder = cartStore.cartData.map(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars   
      ({ presignedUrl, colors, ...rest }) => rest
    );

    const newFormState = {
      ...formState,
      order: cleanedOrder,
      shipping: state.shippingCost,
      shippingOption: state.shippingOption,
      subtotal: state.subtotal,
      total: state.shippingCost + state.subtotal,
    };
    set({ isLoading: true, axiosError: null });
    try {
      const res = await axiosInstance.post("/purchase", newFormState, {
        headers: { Authorization: `Bearer ${signInStore.accessToken}` },
      });
      if (res.status >= 200 && res.status <= 204) {
        useCartStore.setState({
          cartData: [],
          cartDataLength: 0,
          selectedShipping: null,
        });
        set({
          isLoading: false,
          axiosError: "",
        });

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
}));
