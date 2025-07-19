// import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { CheckoutType } from "../components/__organism/checkout/Checkout";
import { CartItemType, useCartStore } from "./cart.store";


export interface ErrorResponse {
  message: string;
}

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   if (axios.isAxiosError(error)) {
//     const errorMessage = error.response?.data.message || "An error occurred";
//     return errorMessage;
//   }
//   const unexpectedError = "An unexpected error occurred";
//   return unexpectedError;
// };

export interface IUseCheckoutStore {
  isLoading: boolean;
  axiosError: string | null;
  formData: CheckoutType | null;

  subtotal: number;
  shippingCost: number;

  setSubtotalAndShipping: (
    data: CartItemType[],
    selectedShipping: { shippingOption: string; shippingCost: number } | null
  ) => void;

  setFormData: (data: CheckoutType) => void;
  submitPurchase: (formState: CheckoutType) => Promise<void>;
}

export const useCheckoutStore = create<IUseCheckoutStore>((set, get) => ({
  isLoading: false,
  axiosError: null,
  formData: null,
  subtotal: 0,
  shippingCost: 0,
 setSubtotalAndShipping: (arr, selectedShipping) => {
  const roundToTwo = (num: number) => Math.round(num * 100) / 100;

  const subTotal = arr.reduce((acc, item) => {
    const hasDiscount = typeof item.discount === "number" && item.discount > 0;
    const priceToUse = hasDiscount
      ? item.price - (item.price * item.discount) / 100
      : item.price;
    return acc + roundToTwo(priceToUse * item.purchasedQty);
  }, 0);

  let shippingCost = 0;

  if (selectedShipping) {
    const option = selectedShipping.shippingOption.toLowerCase();

    if (option === "pick up") {
      shippingCost = roundToTwo((subTotal * selectedShipping.shippingCost) / 100);
    } else {
      shippingCost = roundToTwo(selectedShipping.shippingCost);
    }
  }

  set({ subtotal: subTotal, shippingCost });
},

  setFormData: (data) => set({ formData: data }),

  submitPurchase: async (formState) => {
    const cartStore = useCartStore.getState();
    const state = get()

    console.log(formState, "formState from STORE");
    const newFormState = {
      ...formState,
      order: cartStore.cartData,
      shipping: state.shippingCost,
      subtotal: state.subtotal,
      total: state.shippingCost + state.subtotal
    };

    console.log(newFormState, "newFormState")
    set({ isLoading: true, axiosError: null });
  },
}));
