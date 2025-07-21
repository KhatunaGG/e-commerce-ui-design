"use client";
import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CheckoutType } from "../checkout/Checkout";

// type CardFormProps = {
//   name: string;
//   lastName: string;
//   normalizeFirstChar: (str: string) => string;
// };

type CardFormProps = {
  name: string;
  lastName: string;
  normalizeFirstChar: (str: string) => string;
  register: UseFormRegister<CheckoutType>;
  errors: FieldErrors<CheckoutType>;
};

const CardForm = ({
  name,
  lastName,
  register,
  errors,
  normalizeFirstChar,
}: CardFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focused, setFocused] = useState<
    "number" | "expiry" | "cvc" | undefined
  >();

  // Custom card number formatting
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Handle card number change
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    const cleanValue = formatted.replace(/\s/g, "");
    if (cleanValue.length <= 16) {
      setCardNumber(cleanValue);
    }
  };

  // Custom expiry formatting
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  // Handle expiry change
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.replace("/", "").length <= 4) {
      setExpiry(formatted);
    }
  };

  // Handle CVC change - limit to 4 digits
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4); // Only digits, max 4
    setCvc(value);
  };

  return (
    <>
      <Cards
        number={cardNumber}
        expiry={expiry}
        cvc={cvc}
        name={`${name} ${lastName}`.trim()}
        focused={focused}
      />

      {/* Card Number */}
      <div className="w-full flex flex-col gap-3">
        <label className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]">
          Card Number
        </label>
        <input
          type="text"
          value={formatCardNumber(cardNumber)}
          onChange={handleCardNumberChange}
          onFocus={() => setFocused("number")}
          onBlur={() => setFocused(undefined)}
          placeholder={normalizeFirstChar("Card Number")}
          className="px-4 py-[9px] border border-[#CBCBCB] rounded focus:outline-none focus:border-[#141718]"
          autoComplete="cc-number"
          maxLength={19} // 16 digits + 3 spaces
        />
      </div>

      {/* Expiration Date + CVC */}
      <div className="w-full grid grid-cols-2 gap-2 md:gap-6">
        {/* Expiration Date */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]">
            Expiration Date
          </label>
          <input
            type="text"
            {...register("expirationDate", {
              onChange: (e) => {
                handleExpiryChange(e);
              },
            })}
            value={expiry}
            placeholder="MM/YY"
            className="px-4 py-[9px] border border-[#CBCBCB] rounded focus:outline-none focus:border-[#141718]"
            autoComplete="cc-exp"
            maxLength={5}
            onFocus={() => setFocused("expiry")}
            onBlur={() => setFocused(undefined)}
          />
          {errors.expirationDate && (
            <span className="text-red-500 text-sm mt-1">
              {errors.expirationDate.message}
            </span>
          )}
        </div>

        {/* CVC */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]">
            CVC
          </label>
          <input
            type="text"
            {...register("CVC", {
              onChange: (e) => {
                handleCvcChange(e);
              },
            })}
            value={cvc}
            placeholder="CVC"
            className="px-4 py-[9px] border border-[#CBCBCB] rounded focus:outline-none focus:border-[#141718]"
            maxLength={4}
            autoComplete="cc-csc"
            onFocus={() => setFocused("cvc")}
            onBlur={() => setFocused(undefined)}
          />
          {errors.CVC && (
            <span className="text-red-500 text-sm mt-1">
              {errors.CVC.message}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CardForm;
