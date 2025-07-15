"use client";
import { shippings } from "@/app/commons/data";
import { useCartStore } from "@/app/store/cart.store";
import { useShopStore } from "@/app/store/shop-page.store";
import Link from "next/link";
import React from "react";

export type CartSummaryPropsType = {
  subtotal: number;
};

export type ShippingsType = {
  shippingCost: number;
  shippingOption: string;
};

const CartSummary = ({ subtotal }: CartSummaryPropsType) => {
  const { normalizeFirstChar } = useShopStore();
  const { setSelectedShipping, selectedShipping } = useCartStore();

  const calculatedShippingCost = selectedShipping
    ? selectedShipping.shippingOption.toLowerCase() === "pick up"
      ? subtotal * (selectedShipping.shippingCost / 100)
      : selectedShipping.shippingCost
    : 0;

  return (
    <div className="w-full p-6 flex flex-col gap-4 border border-[#141718] rounded-lg ">
      <h1 className="text-[20px] font-medium leading-[28px] text-[#141718]">
        Cart summary
      </h1>

      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col gap-3 ">
          {shippings.map((item, i) => {
            const isPercentage =
              item.shippingOption.toLowerCase() === "pick up";
            // const shippingCost = isPercentage
            //   ? subtotal * (item.shippingCost / 100)
            //   : item.shippingCost;
            return (
              <div
                key={i}
                className="w-full flex items-center justify-between border border-[#141718] py-[13px] px-4 rounded-[5px] font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]"
              >
                <div className="w-full flex items-center gap-3 p-1">
                  <label className="w-[18px] h-[18px] rounded-full bg-white border border-[#141718] flex items-center justify-center relative cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        selectedShipping?.shippingOption === item.shippingOption
                      }
                      onChange={() => setSelectedShipping(item)}
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                    />
                    {selectedShipping?.shippingOption ===
                      item.shippingOption && (
                      <div className="bg-[#141718] w-3 h-3 rounded-full pointer-events-none"></div>
                    )}
                  </label>
                  <span>{normalizeFirstChar(item.shippingOption)}</span>
                </div>
                <div>
                  <div className="w-full flex flex-row items-center">
                    {isPercentage ? <span>%</span> : <span>$</span>}{" "}
                    {item.shippingCost.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full flex flex-col gap-8">
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between  font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between font-bold  md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]">
              <p>Total</p>${(subtotal + calculatedShippingCost).toFixed(2)}
            </div>
          </div>
          <Link href={""} className="w-full">
            <button className="w-full py-[10px] flex items-center justify-center bg-[#141718] text-white font-medium text-[18px] leading-[32px] tracking-[-0.4px] rounded-xl hover:bg-gray-800 transition-colors duration-300 ease-in-out">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;

{
  /* <div className="w-full flex items-center justify-between border border-[#141718] py-[13px] px-4 rounded-[5px] font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]">
            <div className="w-full flex items-center gap-3 p-1">
              <label className="w-[18px] h-[18px] rounded-full bg-white border border-[#141718] flex items-center justify-center relative cursor-pointer">
                <input
                  type="checkbox"
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div className="bg-[#141718] w-3 h-3 rounded-full pointer-events-none"></div>
              </label>
              <span>Free shipping</span>
            </div>
            <p>$0.00</p>
          </div> */
}

{
  /* <div className="w-full flex items-center justify-between border border-[#141718] py-[13px] px-4 rounded-[5px] font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]">
            <div className="w-full flex items-center gap-3 p-1">
              <label className="w-[18px] h-[18px] rounded-full bg-white border border-[#141718] flex items-center justify-center relative cursor-pointer">
                <input
                  type="checkbox"
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div className="bg-[#141718] w-3 h-3 rounded-full pointer-events-none"></div>
              </label>
              <span>Express shipping</span>
            </div>
            <p>+$15.00</p>
          </div>

          <div className="w-full flex items-center justify-between border border-[#141718] py-[13px] px-4 rounded-[5px] font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]">
            <div className="w-full flex items-center gap-3 p-1">
              <label className="w-[18px] h-[18px] rounded-full bg-white border border-[#141718] flex items-center justify-center relative cursor-pointer">
                <input
                  type="checkbox"
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                <div className="bg-[#141718] w-3 h-3 rounded-full pointer-events-none"></div>
              </label>
              <span>Pick Up</span>
            </div>
            <p>%21.00</p>
          </div> */
}
