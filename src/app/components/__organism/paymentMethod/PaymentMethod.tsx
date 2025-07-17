"use client";
import { useShopStore } from "@/app/store/shop-page.store";

const PaymentMethod = () => {
  const { normalizeFirstChar } = useShopStore();
  return (
    <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10   gap-6 border border-[#CBCBCB] rounded-sm">
      <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
        Payment method
      </h1>

      <div className="w-full flex items-center justify-between border border-[#141718] py-[13px] px-4 rounded-[5px] font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px]">
        <div className="w-full flex items-center gap-3 p-1">
          <label className="w-[18px] h-[18px] rounded-full bg-white border border-[#141718] flex items-center justify-center relative cursor-pointer">
            <input
              type="checkbox"
              className="absolute w-full h-full opacity-0 cursor-pointer"
            />

            <div className="bg-[#141718] w-3 h-3 rounded-full pointer-events-none"></div>
          </label>
          <span>Pay by Card Credit</span>
        </div>
        <div>
          <div className="w-full flex flex-row items-center"></div>
        </div>
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
          <span>Paypal</span>
        </div>
        <div>
          <div className="w-full flex flex-row items-center"></div>
        </div>
      </div>

      <div className="w-full h-[1px] bg-[#CBCBCB]" />

      <div className="w-full flex flex-col gap-3 ">
        <label
          htmlFor=""
          className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
        >
          Card Number
        </label>
        <input
          type="number"
          className="px-4 py-[9px] border border-[#CBCBCB]"
          placeholder={normalizeFirstChar("Card Number")}
        />
      </div>



      <div className="w-full grid grid-cols-2 gap-2 md:gap-6 ">
        {/* <Input {...props} /> */}
        <div className="w-full flex flex-col gap-3 ">
          <label
            htmlFor=""
            className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
          >
            state
          </label>

          <input
            type="text"
            className="px-4 py-[9px] border border-[#CBCBCB]"
            placeholder={normalizeFirstChar("state")}
          />
        </div>

        <div className="w-full flex flex-col gap-3 ">
          <label
            htmlFor=""
            className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
          >
            CVC
          </label>
          <input
            type="text"
            className="px-4 py-[9px] border border-[#CBCBCB] "
            placeholder={normalizeFirstChar("CVC code")}
          />
        </div>
      </div>

    </div>
  );
};

export default PaymentMethod;

//   <div className="w-full flex items-center gap-3 p-1">
//     <label className="w-[18px] h-[18px] rounded-full bg-white border border-[#141718] flex items-center justify-center relative cursor-pointer">
//       <input
//         type="checkbox"
//         className="absolute w-full h-full opacity-0 cursor-pointer"
//       />

//       <div className="bg-[#141718] w-3 h-3 rounded-full pointer-events-none"></div>
//     </label>
//     <span>
//       {/* {normalizeFirstChar(item.shippingOption)} */}
//       Pay by Card Credit
//     </span>
//   </div>

//   <div className="w-full flex items-center gap-3 p-1">
//     <label className="w-[18px] h-[18px] rounded-full bg-white border border-[#141718] flex items-center justify-center relative cursor-pointer">
//       <input
//         type="checkbox"
//         className="absolute w-full h-full opacity-0 cursor-pointer"
//       />

//       <div className="bg-[#141718] w-3 h-3 rounded-full pointer-events-none"></div>
//     </label>
//     <span>
//       {/* {normalizeFirstChar(item.shippingOption)} */}
//       Paypal
//     </span>
//   </div>
