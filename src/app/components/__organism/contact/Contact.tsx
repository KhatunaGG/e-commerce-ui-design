"use client";
import { useShopStore } from "@/app/store/shop-page.store";


const Contact = () => {
  const { normalizeFirstChar } = useShopStore();
  return (
    <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10   gap-6 border border-[#CBCBCB] rounded-sm">
      <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
        Contact Information
      </h1>

      <div className="w-full grid grid-cols-2 gap-2 md:gap-6 ">
        {/* <Input {...props} /> */}
        <div className="w-full flex flex-col gap-3 ">
          <label
            htmlFor=""
            className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
          >
            fist Name
          </label>

          <input
            type="text"
            className="px-4 py-[9px] border border-[#CBCBCB]"
            placeholder={normalizeFirstChar("fist Name")}
          />
        </div>

        <div className="w-full flex flex-col gap-3 ">
          <label
            htmlFor=""
            className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
          >
            Last name
          </label>
          <input
            type="text"
            className="px-4 py-[9px] border border-[#CBCBCB] "
            placeholder={normalizeFirstChar("Last name")}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 ">
        <label
          htmlFor=""
          className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
        >
          Phone number
        </label>
        <input
          type="text"
          className="px-4 py-[9px] border border-[#CBCBCB]"
          placeholder={normalizeFirstChar("Phone number")}
        />
      </div>

      <div className="w-full flex flex-col gap-3 ">
        <label
          htmlFor=""
          className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
        >Your Email</label>
        <input
          type="text"
          className="px-4 py-[9px] border border-[#CBCBCB]"
          placeholder={normalizeFirstChar("Your Email")}
        />
      </div>
    </div>
  );
};

export default Contact;
