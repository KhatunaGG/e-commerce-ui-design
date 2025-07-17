"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { ChevronLeft } from "../../__atoms";
import CartHeader from "../cartHeader/CartHeader";
import { useSignInStore } from "@/app/store/sign-in.store";
import Contact from "../contact/Contact";
import ShippingAddress from "../shippingAddress/ShippingAddress";
import PaymentMethod from "../paymentMethod/PaymentMethod";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/app/store/cart.store";
import CartItem from "../cartItem/CartItem";
import Coupons from "../coupons/Coupons";
import CostSummary from "../costSummary/CostSummary";

const Checkout = () => {
  const { accessToken, initialize } = useSignInStore();
  const path = usePathname();
  const isCheckoutPage = path.includes("/checkout-page");
  const { cartData, selectedShipping } = useCartStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!accessToken) return null;

  return (
    <form className="w-full h-foll min-h-screen flex flex-col items-center justify-center py-20 gap-6 ">
      <div className="w-full  md:w-[84.73%] lg:w-[77.77%] flex flex-col  gap-10 lg:gap-20">
        <Link
          className="w-full lg:hidden flex items-center gap-1"
          href={"/shop"}
        >
          <ChevronLeft />
          <h2> Back</h2>
        </Link>

        <CartHeader />
        <div className="w-full flex flex-col lg:flex-row items-start justify-start  gap-6 lg:gap-[64px] ">
          <div className="w-full lg:w-[53.12%] flex flex-col gap-6">
            <Contact />
            <ShippingAddress />
            <PaymentMethod />
          </div>

          <div className="ORDERSUMMARY w-full lg:flex-1 flex flex-col gap-4 py-4 px-6 border border-[#CBCBCB] rounded-sm">
            <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
              Order summary
            </h1>
            {cartData.length > 0 &&
              cartData.map((item, i) => {
                const isLastItem = i === cartData.length - 1;
                const isFirstItem = i === 0;
                return (
                  <CartItem
                    key={i}
                    isCheckoutPage={isCheckoutPage}
                    isLastItem={isLastItem}
                    isFirstItem={isFirstItem}
                    {...item}
                  />
                );
              })}

            <Coupons isCheckoutPage={isCheckoutPage} />
            <CostSummary
              cartData={cartData}
              isCheckoutPage={isCheckoutPage}
              selectedShipping={selectedShipping}
            />
          </div>
        </div>
      </div>
      <div className="w-full md:w-[84.73%] lg:w-[77.77%]  flex items-center justify-center md:items-start md:justify-start ">
        <button className="py-3 w-full lg:w-[53.5%] text-white text-base font-medium leading-[28px] tracking-[-0.4px] bg-[#141718] rounded-[8px] hover:bg-gray-800 transition-colors duration-300 ease-in-out ">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default Checkout;
