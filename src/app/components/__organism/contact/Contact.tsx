// import React from "react";
// import { FieldErrors, UseFormRegister } from "react-hook-form";
// import { Input } from "../../__molecules";
// import { CheckoutType } from "../checkout/Checkout";

// export type ContactPropsType = {
//   register: UseFormRegister<CheckoutType>;
//   errors: FieldErrors<CheckoutType>;
//   isCheckoutPage: boolean;
// };

// function Contact({ register, errors, isCheckoutPage }: ContactPropsType) {
//   // const { normalizeFirstChar } = useShopStore();

//   return (
//     <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10   gap-6 border border-[#CBCBCB] rounded-sm">
//       <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
//         Contact Information
//       </h1>

//       <div className="w-full grid grid-cols-2 gap-2 md:gap-6">
//         <Input
//           register={register}
//           errors={errors}
//           fieldName="name"
//           isCheckoutPage={isCheckoutPage}
//         />
//         <Input
//           register={register}
//           errors={errors}
//           fieldName="lastName"
//           isCheckoutPage={isCheckoutPage}
//         />
//       </div>
//       <Input
//         register={register}
//         errors={errors}
//         fieldName="phoneNumber"
//         isCheckoutPage={isCheckoutPage}
//       />
//       <Input
//         register={register}
//         errors={errors}
//         fieldName={"yourEmail"}
//         isCheckoutPage={isCheckoutPage}
//       />
//     </div>
//   );
// }

// export default Contact;

"use client";
import React from "react";
import {
  Control,
  // Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Input, PhoneNumberInput } from "../../__molecules";
import { CheckoutType } from "../checkout/Checkout";

export type ContactPropsType = {
  register: UseFormRegister<CheckoutType>;
  errors: FieldErrors<CheckoutType>;
  isCheckoutPage: boolean;
  control: Control<CheckoutType>;
};

function Contact({
  register,
  errors,
  isCheckoutPage,
  control,
}: ContactPropsType) {
  return (
    <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10   gap-6 border border-[#CBCBCB] rounded-sm">
      <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
        Contact Information
      </h1>
      <div className="w-full grid grid-cols-2 gap-2 md:gap-6">
        <Input
          register={register}
          errors={errors}
          fieldName="name"
          isCheckoutPage={isCheckoutPage}
        />
        <Input
          register={register}
          errors={errors}
          fieldName="lastName"
          isCheckoutPage={isCheckoutPage}
        />
      </div>
      {/* <Input
        register={register}
        errors={errors}
        fieldName="phoneNumber"
        isCheckoutPage={isCheckoutPage}
      /> */}

      <PhoneNumberInput
        control={control}
        errors={errors}
        fieldName="phoneNumber"
        isMyAccountPage
      />

      {/* <div className="w-full flex flex-col gap-3">
        <label
          htmlFor="phoneNumber"
          className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
        >
          Phone Number
        </label>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <PhoneInput
              {...field}
              international
              defaultCountry="US"
              placeholder="Enter phone number"
              className="border border-[#CBCBCB] px-4 py-[9px] text-sm w-full"
            />
          )}
        />
        {errors.phoneNumber && (
          <span className="text-red-500 text-sm mt-1">
            {errors.phoneNumber.message}
          </span>
        )}
      </div> */}
      <Input
        register={register}
        errors={errors}
        fieldName={"yourEmail"}
        isCheckoutPage={isCheckoutPage}
      />
    </div>
  );
}

export default Contact;
