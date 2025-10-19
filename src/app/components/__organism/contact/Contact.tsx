"use client";
import React from "react";
import { Input, PhoneNumberInput } from "../../__molecules";
import { ContactPropsType } from "@/app/interfaces/interface";

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
      <PhoneNumberInput
        control={control}
        errors={errors}
        fieldName="phoneNumber"
        isMyAccountPage
      />
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
