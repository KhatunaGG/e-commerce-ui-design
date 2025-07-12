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
import { toast } from "react-toastify";

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
  show: boolean;

  selectedQty: number;
  selectedColor: string | null;
  setShow: (show: boolean) => void;
  setSelectedQty: (qty: number) => void;
  setSelectedColor: (color: string | null) => void;

  handleShowNavbar: () => void;
  addProductToCart: (id: string, color?: string | null, qty?: number) => void;
  handleSelectColor: (id: string, color: string) => void;

  updateCartQty: (id: string, color: string | null, newQty: number) => void;
  deleteProductFromCart: (id: string, color: string | null) => void;
}

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

      setShow: (show: boolean) => {
        set({ show });
      },
      // handleSelectColor: (id, color) => {
      //   set({ selectedColor: color });

      //   if (color) {
      //     const state = get();
      //     const existingIndex = state.cartData.findIndex(
      //       (item) => item._id === id && item.color === null
      //     );

      //     if (existingIndex !== -1) {
      //       const existingItem = state.cartData[existingIndex];
      //       const updatedItem = {
      //         ...existingItem,
      //         color,
      //       };

      //       const updatedCart = [...state.cartData];
      //       updatedCart[existingIndex] = updatedItem;

      //       set({
      //         cartData: updatedCart,
      //       });
      //     }
      //   }
      // },

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

      // addProductToCart: async (
      //   id: string,
      //   color?: string | null,
      //   qty: number = 1
      // ) => {
      //   const shopStore = useShopStore.getState();
      //   let product: ProductsDataType | undefined =
      //     shopStore.productsData.find((item) => item._id === id) ??
      //     shopStore.cachedProductsData.shop?.find((item) => item._id === id);

      //   if (!product) {
      //     try {
      //       const { getProductById } = useProductStore.getState();
      //       await getProductById(id);
      //       product = useProductStore.getState().productById || undefined;
      //     } catch (e) {
      //       set({
      //         isLoading: false,
      //         axiosError: handleApiError(e as AxiosError<ErrorResponse>),
      //       });
      //       return;
      //     }
      //   }

      //   if (!product) {
      //     console.warn("Product not found:", id);
      //     return;
      //   }
      //   // console.log("Adding to cart with presignedUrl:", product.presignedUrl);

      //   const cartItem: CartItemType = {
      //     productName: product.productName,
      //     filePath: product.filePath || "",
      //     new: product.new,
      //     discount: product.discount,
      //     price: product.price,
      //     // color: get().selectedColor ? get().selectedColor : "Please select color",
      //     // color: color ?? "Please select a color",
      //     color: color ?? null,
      //     stock: product.stock,
      //     wishlist: product.wishlist,
      //     discountTill: product.discountTill,
      //     _id: product._id,
      //     // purchasedQty: 1,
      //     colors: product.colors,
      //     purchasedQty: qty,
      //     presignedUrl: product.presignedUrl || "",
      //   };

      //   set((state) => {
      //     const existingItemIndex = state.cartData.findIndex(
      //       (item) => item._id === id && item.color === color && item.stock > 0
      //     );

      //     if (existingItemIndex > -1) {
      //       const updatedCart = [...state.cartData];
      //       updatedCart[existingItemIndex] = {
      //         ...updatedCart[existingItemIndex],
      //         purchasedQty: updatedCart[existingItemIndex].purchasedQty + 1,
      //         color: updatedCart[existingItemIndex].color, ///??????????????????????
      //       };

      //       return {
      //         cartData: updatedCart,
      //         cartDataLength: updatedCart.length,
      //         selectedColor: null,
      //         selectedQty: 0,
      //         isLoading: false,
      //         axiosError: null,
      //       };
      //     }

      //     return {
      //       cartData: [...state.cartData, cartItem],
      //       cartDataLength: state.cartDataLength + 1,
      //       selectedColor: null,
      //       selectedQty: 0,
      //       isLoading: false,
      //       axiosError: null,
      //     };
      //     console.log(cartItem, "cartItem from ADDTOCART function");
      //   });
      // },

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

        // if (product.colors.length > 0 && !color) {
        //   set({
        //     isLoading: false,
        //     axiosError: "Please select a color before adding to cart",
        //   });
        //   toast.error(get().axiosError);
        // }

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
