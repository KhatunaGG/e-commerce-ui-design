"use client";
import { PhoneNumberInputProps } from "@/app/interfaces/interface";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneNumberInput<T extends FieldValues>({
  control,
  errors,
  fieldName,
  isCheckoutPage,
  isMyAccountPage,
}: PhoneNumberInputProps<T>) {
  const labelText = "Phone Number";

  return (
    <div className="w-full flex flex-col gap-3 relative">
      <label
        htmlFor={String(fieldName)}
        className={`${
          isCheckoutPage || isMyAccountPage
            ? "text-xs font-bold leading-[12px] uppercase "
            : "text-base font-normal"
        } text-[#6C7275]`}
      >
        {labelText}
      </label>

      <Controller
        name={fieldName}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <PhoneInput
            international
            defaultCountry="US"
            value={value || ""}
            onChange={(val) => {
              console.log("Phone onChange:", val);
              if (!val) {
                onChange("");
              } else {
                const digitsOnly = val.replace(/[^\d]/g, "");
                if (digitsOnly.length <= 3) {
                  onChange("");
                } else {
                  onChange(val);
                }
              }
            }}
            inputRef={ref}
            placeholder="Enter phone number"
            className="border border-[#CBCBCB] px-4 py-[9px] text-sm w-full rounded-lg"
          />
        )}
      />
      {errors[fieldName] && (
        <span className="absolute bottom-[-18px] left-0 text-red-500 text-sm mt-1">
          {(errors[fieldName] as { message?: string })?.message}
        </span>
      )}
    </div>
  );
}
