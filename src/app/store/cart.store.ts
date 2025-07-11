// import axios, { AxiosError } from "axios";
// import { create } from "zustand";
// import { ProductsDataType, useShopStore } from "./shop-page.store";
// import { useProductStore } from "./product.store";
// // import { useShopPageStore } from "./useShopPage.store";

// export interface ErrorResponse {
//   message: string;
// }

// const handleApiError = (error: AxiosError<ErrorResponse>): string => {
//   if (axios.isAxiosError(error)) {
//     const errorMessage = error.response?.data.message || "An error occurred";
//     return errorMessage;
//   }
//   const unexpectedError = "An unexpected error occurred";
//   return unexpectedError;
// };

// export type CartItemType = {
//   productName: string;
//   filePath: string | "";
//   new: boolean;
//   discount: number;
//   price: number;
//   color: string[];
//   stock: number;
//   wishlist: boolean;
//   discountTill: string;
//   _id: string;
//   purchasedQty: number;
// };

// export interface IUseCartStore {
//   isLoading: boolean;
//   axiosError: string | null;
//   showNavbar: boolean;
//   cartData: CartItemType[];
//   cartDataLength: number;
//   handleShowNavbar: () => void;
//   addProductToCart: (id: string) => void;
// }

// export const useCartStore = create<IUseCartStore>((set, get) => ({

//   isLoading: false,
//   axiosError: null,
//   showNavbar: false,
//   cartData: [],
//   cartDataLength: 0,

//   handleShowNavbar: () => set((state) => ({ showNavbar: !state.showNavbar })),

//   addProductToCart: async (id: string) => {
//     console.log(id, "id from store");
//     const shopStore = useShopStore.getState();
//     let product: ProductsDataType | undefined;

//     product = shopStore.productsData.find((item) => item._id === id);

//     if (!product) {
//       const cachedShop = shopStore.cachedProductsData.shop || [];
//       product = cachedShop.find((item) => item._id === id);
//     }

//     if (!product) {
//       try {
//         const { getProductById } = useProductStore.getState();
//         await getProductById(id);
//         product = useProductStore.getState().productById || undefined;
//       } catch (e) {
//         set({
//           isLoading: false,
//           axiosError: handleApiError(e as AxiosError<ErrorResponse>),
//         });
//         return;
//       }
//     }

//     if (!product) {
//       console.warn("Product not found:", id);
//       return;
//     }

//     const cartItem: CartItemType = {
//       productName: product.productName,
//       filePath: product.filePath || "",
//       new: product.new,
//       discount: product.discount,
//       price: product.price,
//       color: product.colors,
//       stock: product.stock,
//       wishlist: product.wishlist,
//       discountTill: product.discountTill,
//       _id: product._id,
//       purchasedQty: 1,
//     };

//     set((state) => {
//       const existingItemIndex = state.cartData.findIndex(
//         (item) => item._id === id
//       );

//       if (existingItemIndex > -1) {
//         const updatedCart = [...state.cartData];
//         updatedCart[existingItemIndex] = {
//           ...updatedCart[existingItemIndex],
//           purchasedQty: updatedCart[existingItemIndex].purchasedQty + 1,
//         };

//         return {
//           cartData: updatedCart,
//           cartDataLength: state.cartDataLength,
//           isLoading: false,
//           axiosError: null,
//         };
//       } else {
//         return {
//           cartData: [...state.cartData, cartItem],
//           cartDataLength: state.cartDataLength + 1,
//           isLoading: false,
//           axiosError: null,
//         };
//       }
//     });

//     console.log(get().cartData, "cartData");
//   },

// }));

import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductsDataType, useShopStore } from "./shop-page.store";
import { useProductStore } from "./product.store";

export interface ErrorResponse {
  message: string;
}

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data.message || "An error occurred";
  }
  return "An unexpected error occurred";
};

export type CartItemType = {
  productName: string;
  filePath: string | "";
  new: boolean;
  discount: number;
  price: number;
  colors: string[];
  color: string | null;
  stock: number;
  wishlist: boolean;
  discountTill: string;
  _id: string;
  purchasedQty: number;
  presignedUrl: string | "";
};

export interface IUseCartStore {
  isLoading: boolean;
  axiosError: string | null;
  showNavbar: boolean;
  cartData: CartItemType[];
  cartDataLength: number;

  selectedQty: number;
  selectedColor: string | null;
  setSelectedQty: (qty: number) => void;
  setSelectedColor: (color: string | null) => void;

  handleShowNavbar: () => void;
  addProductToCart: (id: string, color?: string | null, qty?: number) => void;
}

export const useCartStore = create<IUseCartStore>()(
  persist(
    (set) => ({
      isLoading: false,
      axiosError: null,
      showNavbar: false,
      cartData: [],
      cartDataLength: 0,

      selectedQty: 0,
      selectedColor: null,

      setSelectedQty: (qty: number) =>
        // set(() => ({ selectedQty: Math.max(1, qty) })),
        set(() => ({ selectedQty: Math.max(0, qty) })),

      setSelectedColor: (color: string | null) =>
        set(() => ({ selectedColor: color })),

      handleShowNavbar: () =>
        set((state) => ({ showNavbar: !state.showNavbar })),

      addProductToCart: async (id: string,  color?: string | null,   qty: number = 1) => {
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
        // console.log("Adding to cart with presignedUrl:", product.presignedUrl);

        const cartItem: CartItemType = {
          productName: product.productName,
          filePath: product.filePath || "",
          new: product.new,
          discount: product.discount,
          price: product.price,
          // color: get().selectedColor ? get().selectedColor : "Please select color",
          color: color ??  "Please select a color",
          stock: product.stock,
          wishlist: product.wishlist,
          discountTill: product.discountTill,
          _id: product._id,
          // purchasedQty: 1,
          colors: product.colors,
          purchasedQty: qty,
          presignedUrl: product.presignedUrl || "",
        };

        set((state) => {
          const existingItemIndex = state.cartData.findIndex(
            (item) => item._id === id
          );

          if (existingItemIndex > -1) {
            const updatedCart = [...state.cartData];
            updatedCart[existingItemIndex] = {
              ...updatedCart[existingItemIndex],
              purchasedQty: updatedCart[existingItemIndex].purchasedQty + 1,
            };

            return {
              cartData: updatedCart,
              cartDataLength: updatedCart.length,
              isLoading: false,
              axiosError: null,
            };
          }

          console.log(cartItem, "cartItem from ADDTOCART function");

          return {
            cartData: [...state.cartData, cartItem],
            cartDataLength: state.cartDataLength + 1,
            isLoading: false,
            axiosError: null,
          };
        });
      },


    }),
    {
      name: "cartData-store",
      partialize: (state) => ({
        cartData: state.cartData,
        cartDataLength: state.cartDataLength,
      }),
    }
  )
);
