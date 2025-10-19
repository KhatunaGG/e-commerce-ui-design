import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShopStore } from "./shop-page.store";
import { useProductStore } from "./product.store";
import { toast } from "react-toastify";
import { useSignInStore } from "./sign-in.store";
import {
  CartItemType,
  ErrorResponse,
  IUseCartStore,
  ProductsDataType,
} from "../interfaces/interface";

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message || "An error occurred";
  }
  return "An unexpected error occurred";
};

export const useCartStore = create<IUseCartStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      axiosError: null,
      showNavbar: false,
      cartData: [],
      cartDataLength: 0,
      selectedQty: 0,
      selectedColor: null,
      show: false,
      selectedShipping: null,
      setShow: (show: boolean) => {
        set({ show });
      },
      setSelectedShipping: (shipping) => set({ selectedShipping: shipping }),
      handleSelectColor: (id, color) => {
        set({ selectedColor: color });
        if (color) {
          const state = get();
          const existingIndex = state.cartData.findIndex(
            (item) => item._id === id && item.color === null
          );
          if (existingIndex === -1) return;
          if (existingIndex !== -1) {
            const existingItem = state.cartData[existingIndex];
            const updatedItem = {
              ...existingItem,
              color,
            };
            const itemsToMerge = state.cartData.filter(
              (item, index) =>
                item._id === id &&
                item.color === color &&
                index !== existingIndex
            );
            const totalMergedQty =
              itemsToMerge.reduce(
                (acc, item) => acc + (item.purchasedQty || 0),
                0
              ) + (existingItem.purchasedQty || 0);
            const filteredCart = state.cartData.filter(
              (item) =>
                !(
                  item._id === id &&
                  (item.color === null || item.color === color)
                )
            );
            const mergedItem = {
              ...updatedItem,
              purchasedQty: totalMergedQty,
            };
            set({
              cartData: [...filteredCart, mergedItem],
            });
          }
        }
      },

      setSelectedQty: (qty: number) =>
        set(() => ({ selectedQty: Math.max(0, qty) })),

      setSelectedColor: (color: string | null) =>
        set(() => ({ selectedColor: color })),

      handleShowNavbar: () =>
        set((state) => ({ showNavbar: !state.showNavbar })),
      updateCartQty: (id: string, color: string | null, newQty: number) => {
        set((state) => {
          const updatedCart = state.cartData.map((item) => {
            if (item._id === id && item.color === color) {
              return {
                ...item,
                purchasedQty: Math.max(1, newQty),
              };
            }
            return item;
          });
          return {
            cartData: updatedCart,
          };
        });
      },

      addProductToCart: async (
        id: string,
        color?: string | null,
        qty: number = 1
      ) => {
        const shopStore = useShopStore.getState();
        let product: ProductsDataType | undefined =
          shopStore.productsData.find((item) => item._id === id) ??
          shopStore.cachedProductsData.shop?.find((item) => item._id === id);
        if (!product) {
          try {
            const { getProductById } = useProductStore.getState();
            await getProductById(id);
            product = useProductStore.getState().productById || undefined;
          } catch (e) {
            set({
              isLoading: false,
              axiosError: handleApiError(e as AxiosError<ErrorResponse>),
            });
            return;
          }
        }
        if (!product) {
          console.warn("Product not found:", id);
          return;
        }
        if (product.stock < qty) {
          set({
            isLoading: false,
            axiosError: "Not enough stock available",
          });
          toast.error(get().axiosError);
          return;
        }

        const cartItem: CartItemType = {
          productName: product.productName,
          filePath: product.filePath || "",
          new: product.new,
          discount: product.discount,
          price: product.price,
          color: color ?? null,
          stock: product.stock,
          wishlist: product.wishlist,
          discountTill: product.discountTill,
          _id: product._id,
          colors: product.colors,
          purchasedQty: qty,
          presignedUrl: product.presignedUrl || "",
        };

        set((state) => {
          const existingItemIndex = state.cartData.findIndex(
            (item) => item._id === id && item.color === color
          );

          if (existingItemIndex > -1) {
            const existingItem = state.cartData[existingItemIndex];

            if (existingItem.purchasedQty + qty > product!.stock) {
              set({
                isLoading: false,
                axiosError: "Cannot add more than available stock",
              });
              toast.error(get().axiosError);
              return state;
            }

            const updatedCart = [...state.cartData];
            updatedCart[existingItemIndex] = {
              ...existingItem,
              purchasedQty: existingItem.purchasedQty + qty,
            };

            return {
              cartData: updatedCart,
              cartDataLength: updatedCart.length,
              selectedColor: null,
              selectedQty: 0,
              isLoading: false,
              axiosError: null,
            };
          }
          return {
            cartData: [...state.cartData, cartItem],
            cartDataLength: state.cartDataLength + 1,
            selectedColor: null,
            selectedQty: 0,
            isLoading: false,
            axiosError: null,
          };
        });
      },

      deleteProductFromCart: (id: string, color: string | null) => {
        const state = get();
        const copiedCart = [...state.cartData];
        const indexToRemove = copiedCart.findIndex(
          (item) => item._id === id && item.color === color
        );
        if (indexToRemove === -1) return;
        copiedCart.splice(indexToRemove, 1);
        set({
          cartData: copiedCart,
          cartDataLength: copiedCart.length,
        });
      },

      handleCheckout: async () => {
        const state = get();
        const signInStore = useSignInStore.getState();
        set({ isLoading: true, axiosError: null });
        await signInStore.initialize();

        if (state.cartData.length === 0) {
          toast.error("Cart is empty. Please add items before checking out.");
          return;
        }
        if (state.selectedShipping === null) {
          toast.error("Please select a shipping option.");
          return;
        }
        window.location.href = "/checkout-page";
      },
      resetCartStore: () => {
        set({
          cartData: [],
          cartDataLength: 0,
          selectedShipping: null,
          selectedColor: null,
          selectedQty: 0,
        });
        useCartStore.persist.clearStorage();
      },
    }),

    {
      name: "cartData-store",
      partialize: (state) => ({
        cartData: state.cartData,
        cartDataLength: state.cartDataLength,
        selectedShipping: state.selectedShipping,
      }),
    }
  )
);
