// import React from "react";
// import {
//   CartItemType,
//   ShippingsType,
//   useCartStore,
// } from "@/app/store/cart.store";

// export type CostSummaryPropsType = {
//   cartData: CartItemType[];
//   selectedShipping?: ShippingsType | null;
//   isCheckoutPage?: boolean;
// };

// const CostSummary = ({
//   cartData,
//   selectedShipping,
//   isCheckoutPage,
// }: CostSummaryPropsType) => {
//   const { handleCheckout } = useCartStore();

//   console.log(selectedShipping, "selectedShipping");

//   const subtotal = cartData.reduce((acc, item) => {
//     const discountedPrice = item.price - (item.price * item.discount) / 100;
//     return acc + discountedPrice * item.purchasedQty;
//   }, 0);

//   const calculatedShippingCost = (() => {
//     if (!selectedShipping) return 0;

//     const option = selectedShipping.shippingOption.toLowerCase();

//     if (option === "pick up") {
//       return (subtotal * selectedShipping.shippingCost) / 100;
//     }

//     return selectedShipping.shippingCost;
//   })();

//   console.log({
//     subtotal,
//     calculatedShippingCost,
//     selectedShipping,
//   });

//   return (
//     <div className={`w-full flex flex-col gap-8`}>
//       <div className="w-full flex flex-col gap-4">
//         {isCheckoutPage && (
//           <div
//             className={`${
//               isCheckoutPage && " border-b border-b-[#CBCBCB] py-[13px] "
//             } flex items-center justify-between font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]`}
//           >
//             <p>Shipping</p>
//             <p>${calculatedShippingCost.toFixed(2)}</p>
//           </div>
//         )}

//         <div
//           className={`${
//             isCheckoutPage && " border-b border-b-[#CBCBCB] py-[13px] "
//           } flex items-center justify-between font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]`}
//         >
//           <p>Subtotal</p>
//           <p>${subtotal.toFixed(2)}</p>
//         </div>
//         <div className="py-[13px] flex items-center justify-between font-bold md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]">
//           <p>Total</p>
//           <p>${(subtotal + calculatedShippingCost).toFixed(2)}</p>
//         </div>
//       </div>
//       {!isCheckoutPage && (
//         <button
//           onClick={handleCheckout}
//           className="w-full py-[10px] flex items-center justify-center bg-[#141718] text-white font-medium text-[18px] leading-[32px] tracking-[-0.4px] rounded-xl hover:bg-gray-800 transition-colors duration-300 ease-in-out"
//         >
//           Checkout
//         </button>
//       )}
//     </div>
//   );
// };

// export default CostSummary;



"use client"
import React, { useEffect } from "react";
import {
  CartItemType,
  ShippingsType,
  useCartStore,
} from "@/app/store/cart.store";
import { useCheckoutStore } from "@/app/store/checkout.store"; // import your checkout store

export type CostSummaryPropsType = {
  cartData: CartItemType[];
  selectedShipping?: ShippingsType | null;
  isCheckoutPage?: boolean;
};

const CostSummary = ({
  cartData,
  selectedShipping,
  isCheckoutPage,
}: CostSummaryPropsType) => {
  const { handleCheckout } = useCartStore();
  const {
    subtotal,
    shippingCost,
    setSubtotalAndShipping,
  } = useCheckoutStore();

  useEffect(() => {
    setSubtotalAndShipping(cartData, selectedShipping || null);
  }, [cartData, selectedShipping, setSubtotalAndShipping]);

  return (
    <div className={`w-full flex flex-col gap-8`}>
      <div className="w-full flex flex-col gap-4">
        {isCheckoutPage && (
          <div
            className={`${
              isCheckoutPage && " border-b border-b-[#CBCBCB] py-[13px] "
            } flex items-center justify-between font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]`}
          >
            <p>Shipping</p>
            <p>${shippingCost.toFixed(2)}</p>
          </div>
        )}

        <div
          className={`${
            isCheckoutPage && " border-b border-b-[#CBCBCB] py-[13px] "
          } flex items-center justify-between font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]`}
        >
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <div className="py-[13px] flex items-center justify-between font-bold md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]">
          <p>Total</p>
          <p>${(subtotal + shippingCost).toFixed(2)}</p>
        </div>
      </div>

      {!isCheckoutPage && (
        <button
          onClick={handleCheckout}
          className="w-full py-[10px] flex items-center justify-center bg-[#141718] text-white font-medium text-[18px] leading-[32px] tracking-[-0.4px] rounded-xl hover:bg-gray-800 transition-colors duration-300 ease-in-out"
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default CostSummary;
