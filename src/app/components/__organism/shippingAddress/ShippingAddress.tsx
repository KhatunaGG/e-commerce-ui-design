// "use client";
// import { useMemo, useState } from "react";
// import Select, { SingleValue } from "react-select";
// import countryList, { CountryType } from "react-select-country-list";
// import { Input } from "../../__molecules";
// import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
// import { CheckoutType } from "../checkout/Checkout";

// export type ShippingAddressPropsType = {
//   register: UseFormRegister<CheckoutType>;
//   errors: FieldErrors<CheckoutType>;
//   setValue: UseFormSetValue<CheckoutType>;
//   isCheckoutPage?: boolean;
// };

// export type CountryType = {
//   value: string;
//   label: string;
// };

// const ShippingAddress = ({
//   register,
//   errors,
//   setValue,
//   isCheckoutPage,
// }: ShippingAddressPropsType) => {
//   // const { normalizeFirstChar } = useShopStore();
//   const [selectedCountry, setSelectedCountry] =
//     useState<SingleValue<CountryType>>(null);

//   const options = useMemo(() => countryList().getData(), []);

//   const changeHandler = (val: SingleValue<CountryType>) => {
//     setSelectedCountry(val);

//     if (val) {
//       setValue("country", val.label);
//       setValue("state", val.value);
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10 gap-6 border border-[#CBCBCB] rounded-sm">
//       <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
//         Shipping Address
//       </h1>

//       <Input
//         register={register}
//         errors={errors}
//         fieldName="streetAddress"
//         isCheckoutPage={isCheckoutPage}
//       />

//       <div className="w-full">
//         <label className=" mb-2 block uppercase text-xs font-bold leading-[20px] text-[#6C7275]">
//           Country
//         </label>
//         <Select
//           options={options}
//           value={selectedCountry}
//           onChange={changeHandler}
//           className="w-full"
//           placeholder="Select a country"
//           styles={{
//             control: (base, state) => ({
//               ...base,
//               minHeight: "43.6px",
//               width: "100%",
//               height: "43.6px",
//               border: state.isFocused
//                 ? "1px solid #CBCBCB"
//                 : "1px solid #CBCBCB",
//               borderBottom: "1px solid #E8ECEF",
//               boxShadow: "none",
//               padding: "0 0.5rem",
//               backgroundColor: "transparent",
//               "&:hover": {
//                 borderColor: "#CBCBCB",
//               },
//             }),
//             valueContainer: (base) => ({
//               ...base,
//               padding: "0",
//             }),
//             indicatorsContainer: (base) => ({
//               ...base,
//               height: "36px",
//             }),
//             input: (base) => ({
//               ...base,
//               margin: "0",
//               padding: "0",
//             }),
//           }}
//         />
//         {errors.country && (
//           <span className="text-red-500 text-sm mt-1">
//             {errors.country.message}
//           </span>
//         )}
//       </div>

//       <Input
//         register={register}
//         errors={errors}
//         fieldName="townCity"
//         isCheckoutPage={isCheckoutPage}
//       />

//       <div className="w-full grid grid-cols-2 gap-2 md:gap-6">
//         <Input
//           register={register}
//           errors={errors}
//           fieldName="state"
//           isCheckoutPage={isCheckoutPage}
//         />
//         <Input
//           register={register}
//           errors={errors}
//           fieldName="zipCode"
//           isCheckoutPage={isCheckoutPage}
//         />
//       </div>

//       <div className="w-full flex items-center gap-3">
//         <input
//           type="checkbox"
//           id="differentBilling"
//           {...register("differentBilling")}
//         />
//         <label
//           htmlFor="differentBilling"
//           className="text-xs font-normal leading-[20px] text-[#6C7275]"
//         >
//           Use a different billing address (optional)
//         </label>
//       </div>
//     </div>
//   );
// };

// export default ShippingAddress;

// ✅ Update imports
"use client"
import { useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
// import countryList, {
//   CountryType as CountryDataType,
// } from "react-select-country-list";
import countryList, {
  CountryType 
} from "react-select-country-list";
import { Input } from "../../__molecules";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

// ✅ Make ShippingAddress generic
export type ShippingAddressPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  isCheckoutPage?: boolean;
  isMyAccountPage?: boolean;
  addressType?: string | null;
};

export type CountryType = {
  value: string;
  label: string;
};

const ShippingAddress = <T extends FieldValues>({
  register,
  errors,
  setValue,
  isCheckoutPage,
  isMyAccountPage,
  addressType
}: ShippingAddressPropsType<T>) => {
  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryType>>(null);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (val: SingleValue<CountryType>) => {
    setSelectedCountry(val);

    // if (val) {
    //   setValue("country" as Path<T>, val.label);
    //   setValue("state" as Path<T>, val.value);
    // }

    if (val) {
      setValue("country" as Path<T>, val.label as PathValue<T, Path<T>>);
      setValue("state" as Path<T>, val.value as PathValue<T, Path<T>>);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10 gap-6 border border-[#CBCBCB] rounded-sm">
      <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
      
        {addressType === "billing" ? "Billing Address" : "Shipping Address"}
      </h1>

      <Input
        register={register}
        errors={errors}
        fieldName={"streetAddress" as Path<T>}
        isCheckoutPage={isCheckoutPage}
        isMyAccountPage={isMyAccountPage}
      />

      <div className="w-full">
        <label className="mb-2 block uppercase text-xs font-bold leading-[20px] text-[#6C7275]">
          Country
        </label>
        <Select
          options={options}
          value={selectedCountry}
          onChange={changeHandler}
          className="w-full"
          placeholder="Select a country"
          styles={{
            control: (base,
              //  state
              ) => ({
              ...base,
              minHeight: "43.6px",
              border: "1px solid #CBCBCB",
              borderBottom: "1px solid #E8ECEF",
              boxShadow: "none",
              padding: "0 0.5rem",
              backgroundColor: "transparent",
              "&:hover": {
                borderColor: "#CBCBCB",
              },
            }),
            valueContainer: (base) => ({ ...base, padding: "0" }),
            indicatorsContainer: (base) => ({ ...base, height: "36px" }),
            input: (base) => ({ ...base, margin: "0", padding: "0" }),
          }}
        />
        {errors.country && (
          <span className="text-red-500 text-sm mt-1">
            {errors.country.message as string}
          </span>
        )}
      </div>

      <Input
        register={register}
        errors={errors}
        fieldName={"townCity" as Path<T>}
        isCheckoutPage={isCheckoutPage}
        isMyAccountPage={isMyAccountPage}
      />

      <div className="w-full grid grid-cols-2 gap-2 md:gap-6">
        <Input
          register={register}
          errors={errors}
          fieldName={"state" as Path<T>}
          isCheckoutPage={isCheckoutPage}
          isMyAccountPage={isMyAccountPage}
        />
        <Input
          register={register}
          errors={errors}
          fieldName={"zipCode" as Path<T>}
          isCheckoutPage={isCheckoutPage}
          isMyAccountPage={isMyAccountPage}
        />
      </div>

      <div className="w-full flex items-center gap-3">
        <input
          type="checkbox"
          id="differentBilling"
          {...register("differentBilling" as Path<T>)}
        />
        <label
          htmlFor="differentBilling"
          className="text-xs font-normal leading-[20px] text-[#6C7275]"
        >
          Use a different billing address (optional)
        </label>
      </div>
    </div>
  );
};

export default ShippingAddress;
