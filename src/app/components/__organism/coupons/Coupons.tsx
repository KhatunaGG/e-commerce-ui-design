import React from "react";
import { Coupon } from "../../__atoms";
import { CouponsPropsType } from "@/app/interfaces/interface";

const Coupons = ({ isCheckoutPage }: CouponsPropsType) => {
  return (
    <div
      className={`${
        isCheckoutPage ? "items-center w-full" : "md:w-full lg:w-[65.94%]"
      }  flex-col gap-4`}
    >
      <div className={`${isCheckoutPage && "hidden"} flex flex-col gap-[7px]`}>
        <h2>Have a coupon?</h2>
        <p>Add your code for an instant cart discount</p>
      </div>

      <div
        className={`${
          isCheckoutPage
            ? "gap-3  py-3 w-full"
            : "gap-2 md:w-1/2  border border-[#6C7275] py-3 px-4"
        }    flex items-center justify-between `}
      >
        <div className={`${isCheckoutPage && "hidden"} w-fit`}>
          <Coupon />
        </div>
        <input
          type="text"
          placeholder="Coupon Code"
          className={`${
            isCheckoutPage &&
            "w-full border border-[#CBCBCB] rounded-[6px] px-4 py-[13px]"
          } outline-none w-auto md:md:w-full`}
        />
        <button className={`${isCheckoutPage && "hidden"} w-fit`}>Apply</button>
        <button
          className={`${
            !isCheckoutPage && "hidden"
          } text-white w-fit text-base font-medium leading-[28px] tracking-[-0.4px] py-[13px] px-[26px] bg-[#141718] rounded-[8px] hover:bg-gray-800 transition-colors duration-300 ease-in-out `}
        >
          Apply
        </button>
      </div>

      <div
        className={`${
          !isCheckoutPage && "hidden"
        } w-full flex justify-between items-center `}
      >
        <div className="flex items-center gap-2">
          <Coupon />
          <p className="text-base font-normal leading-[26px] text-[#141718]">
            JenkateMW
          </p>
        </div>
        <p className=" text-base font-semibold leading-[26px] text-[#38CB89]">
          -$25.00 [Remove]
        </p>
      </div>
    </div>
  );
};

export default Coupons;
