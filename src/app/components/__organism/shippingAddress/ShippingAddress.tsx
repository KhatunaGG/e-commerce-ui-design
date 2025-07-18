// "use client";
// import { useShopStore } from "@/app/store/shop-page.store";
// import { useMemo, useState } from "react";
// import Select, { SingleValue } from "react-select";
// import countryList from "react-select-country-list";

// import { CountryType } from "react-select-country-list";
// import { Input } from "../../__molecules";
// import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
// import { CheckoutType } from "../checkout/Checkout";

// export type CountryOptionType = {
//   value: string;
//   label: string;
// };

// export type ShippingAddressPropsType = {
//   register: UseFormRegister<CheckoutType>;
//   errors: FieldErrors<CheckoutType>;
//   setValue: UseFormSetValue<CheckoutType>;
// };

// const ShippingAddress = ({
//   register,
//   errors,
//   setValue,
// }: ShippingAddressPropsType) => {
//   const { normalizeFirstChar } = useShopStore();
//   const [selectedCountry, setSelectedCountry] =
//     useState<SingleValue<CountryOptionType>>(null);

//   const options = useMemo(() => countryList().getData(), []);

//   const changeHandler = (val: SingleValue<CountryOptionType>) => {
//     setSelectedCountry(val);
//     // Update the form value when country changes
//     if (val) {
//       setValue("country", val.value);
//     }
//   };

//   return (
//     <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10  b gap-6 border border-[#CBCBCB] rounded-sm">
//       <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
//         Shipping Address
//       </h1>
//       <Input register={register} errors={errors} fieldName="streetAddress" />
//       {/* <Input register={register} errors={errors} fieldName="country" /> */}

//       <Select
//         options={options}
//         value={selectedCountry}
//         onChange={changeHandler}
//         className="w-full"
//         styles={{
//           control: (base) => ({
//             ...base,
//             minHeight: "43.6px",
//             width: "100%",
//             height: "43.6px",
//             border: "1px solid #CBCBCB",
//             boxShadow: "none",
//             padding: "0 0.5rem",
//             "&:hover": {
//               borderColor: "#CBCBCB",
//             },
//           }),
//           valueContainer: (base) => ({
//             ...base,
//             padding: "0",
//           }),
//           indicatorsContainer: (base) => ({
//             ...base,
//             height: "36px",
//           }),
//           input: (base) => ({
//             ...base,
//             margin: "0",
//             padding: "0",
//           }),
//         }}
//       />

//       <Input register={register} errors={errors} fieldName="townCity" />

//       <div className="w-full grid grid-cols-2 gap-2 md:gap-6 ">
//         <Input register={register} errors={errors} fieldName="state" />

//         <Input register={register} errors={errors} fieldName="zipCode" />
//       </div>
//       <div className="w-full flex items-center gap-3">
//         {/* <Checkbox /> */}
//         <input type="checkbox" name="" id="" />
//         <label
//           htmlFor=""
//           className="text-xs font-normal leading-[20px] text-[#6C7275]"
//         >
//           Use a different billing address (optional)
//         </label>
//       </div>
//     </div>
//   );
// };

// export default ShippingAddress;

"use client";
// import { useShopStore } from "@/app/store/shop-page.store";
import { useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
import countryList, { CountryType } from "react-select-country-list";
import { Input } from "../../__molecules";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { CheckoutType } from "../checkout/Checkout";

export type ShippingAddressPropsType = {
  register: UseFormRegister<CheckoutType>;
  errors: FieldErrors<CheckoutType>;
  setValue: UseFormSetValue<CheckoutType>;
};

export type CountryType = {
  value: string;
  label: string;
};

const ShippingAddress = ({
  register,
  errors,
  setValue,
}: ShippingAddressPropsType) => {
  // const { normalizeFirstChar } = useShopStore();
  const [selectedCountry, setSelectedCountry] =
    useState<SingleValue<CountryType>>(null);

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (val: SingleValue<CountryType>) => {
    setSelectedCountry(val);
    if (val) {
      setValue("country", val.value);
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10 gap-6 border border-[#CBCBCB] rounded-sm">
      <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
        Shipping Address
      </h1>

      <Input register={register} errors={errors} fieldName="streetAddress" />

      <div className="w-full">
        <label className="text-[#6C7275] text-base font-normal mb-2 block">
          Country
        </label>
        <Select
          options={options}
          value={selectedCountry}
          onChange={changeHandler}
          className="w-full"
          placeholder="Select a country"
          styles={{
            control: (base, state) => ({
              ...base,
              minHeight: "43.6px",
              width: "100%",
              height: "43.6px",
              border: state.isFocused
                ? "1px solid #CBCBCB"
                : "1px solid #CBCBCB",
              borderBottom: "1px solid #E8ECEF",
              boxShadow: "none",
              padding: "0 0.5rem",
              backgroundColor: "transparent",
              "&:hover": {
                borderColor: "#CBCBCB",
              },
            }),
            valueContainer: (base) => ({
              ...base,
              padding: "0",
            }),
            indicatorsContainer: (base) => ({
              ...base,
              height: "36px",
            }),
            input: (base) => ({
              ...base,
              margin: "0",
              padding: "0",
            }),
          }}
        />
        {errors.country && (
          <span className="text-red-500 text-sm mt-1">
            {errors.country.message}
          </span>
        )}
      </div>

      <Input register={register} errors={errors} fieldName="townCity" />

      <div className="w-full grid grid-cols-2 gap-2 md:gap-6">
        <Input register={register} errors={errors} fieldName="state" />
        <Input register={register} errors={errors} fieldName="zipCode" />
      </div>

      <div className="w-full flex items-center gap-3">
        <input type="checkbox" name="differentBilling" id="differentBilling" />
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
