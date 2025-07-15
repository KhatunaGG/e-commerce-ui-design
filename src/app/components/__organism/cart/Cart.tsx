// import React from "react";
// import { ChevronLeft } from "../../__atoms";
// import Link from "next/link";

// const Cart = () => {
//   return (
//     <div className="w-full h-foll min-h-screen flex items-center justify-center lg:py-20">
//       <div className="bg-red-200 w-full  md:w-[84.73%] lg:w-[77.77%] flex flex-col  gap-10 lg:gap-20">
//         <Link
//           className="w-full lg:hidden flex items-center gap-1"
//           href={"/shop"}
//         >
//           <ChevronLeft />
//           <h2> Back</h2>
//         </Link>

//         <div className="w-full flex flex-col items-center gap-6 lg:gap-10">
//           <h1 className="text-[40px] lg:text-[54px] font-medium leading-[44px] tracking-[-0.4px] lg:leading-[5f8px] lg:tracking-[-1px] text-black">
//             Cart
//           </h1>
//           <div className="w-full flex md:items-center justify-between gap-8">
//             <div className="flex-1 bg-blue-200 flex items-center  gap-[17px]  pb-[26px] border-b border-b-[#141718]">
//               <div className="flex rounded-full bg-[#B1B5C3] items-center justify-center w-[42px] h-[42px]">
//                 1
//               </div>
//               <p className="font-normal text-base ">Shopping cart</p>
//             </div>

//             <div className="w-[13.46%] md:flex-1 bg-yellow-200 flex items-center  gap-[17px]  pb-[26px] border-b-0 md:border-b md:border-b-[#141718]">
//               <div className="flex rounded-full bg-[#B1B5C3] items-center justify-center w-[42px] h-[42px]">
//                 2
//               </div>
//               <p className="hidden md:flex font-normal text-base ">
//                 Checkout details
//               </p>
//             </div>

//             <div className="hidden md:flex-1  bg-violet-200 md:flex items-center  gap-[17px]  pb-[26px] border-b border-b-[#141718]">
//               <div className="flex rounded-full bg-[#B1B5C3] items-center justify-center w-[42px] h-[42px]">
//                 3
//               </div>
//               <p className="hidden md:flex font-normal text-base ">
//                 Order complete
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

"use client";
import { ChevronLeft } from "../../__atoms";
import Link from "next/link";
import { useCartStore } from "@/app/store/cart.store";
import { usePathname } from "next/navigation";
import CartItem from "../cartItem/CartItem";
import CartHeader from "../cartHeader/CartHeader";
import CartSummary from "../cartSummary/CartSummary";
import Coupons from "../coupons/Coupons";

const Cart = () => {
  const path = usePathname();
  const isCartPage = path.includes("/cart-page");
  // const isActivePage = path === "/cart-page"
  const { cartData } = useCartStore();

  console.log(cartData);

  return (
    <div className="w-full h-foll min-h-screen flex flex-col items-center justify-center py-20">
      <div className="w-full  md:w-[84.73%] lg:w-[77.77%] flex flex-col  gap-10 lg:gap-20">
        <Link
          className="w-full lg:hidden flex items-center gap-1"
          href={"/shop"}
        >
          <ChevronLeft />
          <h2> Back</h2>
        </Link>

        <div className="w-full flex flex-col items-center gap-6 lg:gap-10">
          <h1 className="text-[40px] lg:text-[54px] font-medium leading-[44px] tracking-[-0.4px] lg:leading-[5f8px] lg:tracking-[-1px] text-black">
            Cart
          </h1>

          <CartHeader
          //  isActivePage={isActivePage}
          />
        </div>

        <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-[64px]">
          <div className="w-full flex lg:hidden ">
            <Coupons />
          </div>

          <div className="w-full lg:w-[57.41%] flex flex-col">
            <div className="w-full pb-6 border-b border-b-[#6C7275] flex text-base font-semibold leading-[26px]">
              <p className="flex-1">Product</p>
              <div className="hidden flex-1 lg:flex items-center justify-between ">
                <p>Quantity</p>
                <p>Price</p>
                <p>Subtotal</p>
              </div>
            </div>
            {cartData.map((item, i) => {
              const isLastItem = i === cartData.length - 1;
              const isFirstItem = i === 0;
              return (
                <CartItem
                  isLastItem={isLastItem}
                  isFirstItem={isFirstItem}
                  isCartPage={isCartPage}
                  {...item}
                  key={i}
                />
              );
            })}
          </div>

          <div className="w-full lg:flex-1">
            <CartSummary
              subtotal={cartData.reduce((acc, item) => {
                const discountedPrice =
                  item.price - (item.price * item.discount) / 100;
                return acc + discountedPrice * item.purchasedQty;
              }, 0)}
            />
          </div>
        </div>
        <div className="hidden lg:flex">
          <Coupons />
        </div>
      </div>
    </div>
  );
};

export default Cart;
