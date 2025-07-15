import React from "react";
import { Coupon } from "../../__atoms";

const Coupons = () => {
  return (
    <div className="COUPON md:w-full  lg:flex lg:w-[65.94%] flex-col gap-4">
      <div className="flex flex-col gap-[7px]">
        <h2>Have a coupon?</h2>
        <p>Add your code for an instant cart discount</p>
      </div>

      <div className="w-full md:w-1/2  border border-[#6C7275] py-3 px-4 flex items-center justify-between gap-2">
        <div className="w-fit">
          <Coupon />
        </div>
        <input type="text" className="outline-none w-auto md:md:w-full" />
        <p className="w-fit">Apply</p>
      </div>
    </div>
  );
};

export default Coupons;
