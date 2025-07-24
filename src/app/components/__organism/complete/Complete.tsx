"use client";
// import { usePathname } from "next/navigation";
import { ChevronLeft } from "../../__atoms";
import CartHeader from "../cartHeader/CartHeader";
import Link from "next/link";
import { useCheckoutStore } from "@/app/store/checkout.store";
import { useEffect } from "react";
import { useCartStore } from "@/app/store/cart.store";
import Image from "next/image";

const Complete = () => {
  const { checkoutData } = useCheckoutStore();
  console.log(checkoutData, "checkoutData");

  useEffect(() => {
    useCartStore.getState().resetCartStore();
    return () => {
      localStorage.removeItem("checkout-storage");
    };
  }, []);

  const formattedDate = checkoutData?.createdAt
    ? new Date(checkoutData.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const slicedPresignedUrl = checkoutData?.presignedUrls?.slice(0, 3) ?? [];


  return (
    <div className=" h-full flex flex-col items-center justify-center min-h-[calc(100vh-61px)]  py-20 gap-10 md:gap-20 rounded-lg">
      <div className="w-full flex flex-col items-center justify-center gap-10 lg:gap-20 md:w-[84.73%] lg:w-[57.55%]">
        <Link
          className="w-full lg:hidden flex items-center gap-1"
          href={"/shop"}
        >
          <ChevronLeft />
          <h2>Back</h2>
        </Link>

        <CartHeader />
      </div>

      <div className="w-full md:w-[64.73%] lg:w-[38.86%] flex flex-col items-center justify-center p-4 gap-10 md:px-20 md:py-[95px] shadow-[0_4px_15px_rgba(0,0,0,0.25)]">
        <div className="w-full flex flex-col   md:items-center md:justify-center gap-4">
          <p className="text-base  font-semibold leading-[26px] text-[#6C7275] md:text-[28px] md:font-medium md:leading-[34px]">
            Thank you! 🎉
          </p>
          <h1 className="w-full  text-[#23262F] font-medium text-[34px] leading-[38px] tracking-[-0.6px] md:text-[40px] md:leading-[44px] md:tracking-[-0.4px] md:text-center">
            Your order has been received
          </h1>
        </div>

        {/* <div className="grid grid-cols-3 gap-4 md:gap-10 relative "> */}
        <div className="flex items-center justify-center gap-4 md:gap-10 relative  bg-green-300">
          {slicedPresignedUrl.map((item, i) => {
            return (
              <div key={i} className="">
                <Image
                  src={item}
                  alt={"image"}
                  width={80}
                  height={96}
                  className="object-cover w-full h-full"
                  unoptimized
                  priority
                />
              </div>
            );
          })}
        </div>

        <div className="w-full flex flex-col gap-4 md:gap-8 ">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center md:gap-8 ">
            <div className=" flex flex-col gap-2 md:gap-[20px] ">
              <p className="text-sm font-semibold leading-[22px] text-[#6C7275]">
                Order code:
              </p>
              <p className="md:hidden pb-4 border-b border-b-[#E8ECEF] md:pb-0 md:border-0 text-sm font-semibold leading-[22px] text-[#141718]">
                {checkoutData?.orderCode}
              </p>
              <p className="text-sm font-semibold leading-[22px] text-[#6C7275]">
                Date:
              </p>
              <p className="md:hidden pb-4 border-b border-b-[#E8ECEF] md:pb-0 md:border-0 text-sm font-semibold leading-[22px] text-[#141718]">
                {formattedDate}
              </p>
              <p className="text-sm font-semibold leading-[22px] text-[#6C7275]">
                Total:
              </p>
              <p className="md:hidden pb-4 border-b border-b-[#E8ECEF] md:pb-0 md:border-0 text-sm font-semibold leading-[22px] text-[#141718]">
                ${checkoutData?.total}
              </p>
              <p className="text-sm font-semibold leading-[22px] text-[#6C7275]">
                Payment method:
              </p>
              <p className="md:hidden pb-4 border-b border-b-[#E8ECEF] md:pb-0 md:border-0 text-sm font-semibold leading-[22px] text-[#141718]">
                {checkoutData?.shippingOption}
              </p>
            </div>

            <div className="hidden md:flex flex-col gap-2 md:gap-[20px] ">
              <p className="text-sm font-semibold leading-[22px] text-[#141718]">
                {checkoutData?.orderCode}
              </p>
              <p className="text-sm font-semibold leading-[22px] text-[#141718]">
                {formattedDate}
              </p>
              <p className="text-sm font-semibold leading-[22px] text-[#141718]">
                ${checkoutData?.total}
              </p>
              <p className="text-sm font-semibold leading-[22px] text-[#141718]">
                Credit Card
              </p>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center px-4 md:px-[50px] lg::px-[112.5px] ">
          <button className="w-full bg-[#141718] rounded-[80px] md:px-10 text-white py-3 text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors duration-300 ease-in-out">
            Purchase history
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complete;
