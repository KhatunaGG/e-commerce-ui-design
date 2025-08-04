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
  const { cartData } = useCartStore();

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

        <CartHeader />

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
            // subtotal={cartData.reduce((acc, item) => {
            //   const discountedPrice =
            //     item.price - (item.price * item.discount) / 100;
            //   return acc + discountedPrice * item.purchasedQty;
            // }, 0)}
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
