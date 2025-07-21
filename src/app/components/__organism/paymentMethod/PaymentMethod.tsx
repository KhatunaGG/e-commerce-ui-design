"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { CheckoutType } from "../checkout/Checkout";
import { Input } from "../../__molecules";

export type PaymentMethodPropsType = {
  register: UseFormRegister<CheckoutType>;
  errors: FieldErrors<CheckoutType>;
  isCheckoutPage?: boolean;
  watch: UseFormWatch<CheckoutType>;
};

const PaymentMethod = ({
  register,
  errors,
  isCheckoutPage,
  watch,
}: PaymentMethodPropsType) => {
  const { normalizeFirstChar } = useShopStore();
  const selectedMethod = watch("paymentMethod");

  console.log(selectedMethod, "selectedMethod")

  return (
    <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10   gap-6 border border-[#CBCBCB] rounded-sm">
      <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
        Payment method
      </h1>

      <div className="w-full flex flex-col gap-4 md:gap-6 relative">
        <div className="w-full flex items-center justify-between border border-[#141718] py-[13px] px-4 rounded-[5px] font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px] relative">
          <div className="w-full flex items-center gap-3 p-1">
            <label className="w-[18px] h-[18px] rounded-full bg-white border border-[#141718] flex items-center justify-center relative cursor-pointer">
              <input
                type="radio"
                id="Card Credit"
                 value="Credit Card"
                {...register("paymentMethod")}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />

              {selectedMethod === "Credit Card" && (
                <div className="bg-[#141718] w-3 h-3 rounded-full pointer-events-none"></div>
              )}
            </label>
            <span>Pay by Card Credit</span>
          </div>

          <div>
            <div className="w-full flex flex-row items-center"></div>
          </div>
        </div>

        <div className="w-full flex items-center justify-between border border-[#141718] py-[13px] px-4 rounded-[5px] font-normal md:font-semibold text-sm md:text-base leading-[22px] md:leading-[26px] relative">
          <div className="w-full flex items-center gap-3 p-1">
            <label className="w-[18px] h-[18px] rounded-full bg-white border border-[#141718] flex items-center justify-center relative cursor-pointer">
              <input
                type="radio"
                id="Paypal"
                value="Paypal"
                {...register("paymentMethod")}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
              {selectedMethod === "Paypal" && (
                <div className="bg-[#141718] w-3 h-3 rounded-full pointer-events-none"></div>
              )}
            </label>
            <span>Paypal</span>
          </div>
          <div>
            <div className="w-full flex flex-row items-center"></div>
          </div>
        </div>
        {errors.paymentMethod && (
          <span className="text-red-500 text-sm mt-1 w-full absolute bottom-[70px] left-0">
            {errors.paymentMethod.message}
          </span>
        )}
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
        <Input
          register={register}
          errors={errors}
          fieldName="expirationDate"
          isCheckoutPage={isCheckoutPage}
        />
        <Input
          register={register}
          errors={errors}
          fieldName="CVC"
          isCheckoutPage={isCheckoutPage}
        />
      </div>
    </div>
  );
};

export default PaymentMethod;
