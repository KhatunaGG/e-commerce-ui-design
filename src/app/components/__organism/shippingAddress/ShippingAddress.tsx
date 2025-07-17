// "use client";

// import { useShopStore } from "@/app/store/shop-page.store";

// const ShippingAddress = () => {
//   const { normalizeFirstChar } = useShopStore();
//   return (
//     <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10  b gap-6 border border-[#CBCBCB] rounded-sm">
//       <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
//         Shipping Address
//       </h1>

//       <div className="w-full flex flex-col gap-3 ">
//         <label
//           htmlFor=""
//           className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
//         >
//           Street Address *
//         </label>
//         <input
//           type="text"
//           className="px-4 py-[9px] border border-[#CBCBCB]"
//           placeholder={normalizeFirstChar("Street Address")}
//         />
//       </div>

//       <div>Country</div>

//       <div className="w-full flex flex-col gap-3 ">
//         <label
//           htmlFor=""
//           className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
//         >
//           Town / City
//         </label>
//         <input
//           type="text"
//           className="px-4 py-[9px] border border-[#CBCBCB]"
//           placeholder={normalizeFirstChar("Town / City")}
//         />
//       </div>

//       <div className="w-full grid grid-cols-2 gap-2 md:gap-6 ">
//         {/* <Input {...props} /> */}
//         <div className="w-full flex flex-col gap-3 ">
//           <label
//             htmlFor=""
//             className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
//           >
//             State
//           </label>

//           <input
//             type="text"
//             className="px-4 py-[9px] border border-[#CBCBCB]"
//             placeholder={normalizeFirstChar("State")}
//           />
//         </div>

//         <div className="w-full flex flex-col gap-3 ">
//           <label
//             htmlFor=""
//             className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
//           >
//             Zip Code
//           </label>
//           <input
//             type="text"
//             className="px-4 py-[9px] border border-[#CBCBCB] "
//             placeholder={normalizeFirstChar("Zip Code")}
//           />
//         </div>
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

import { useShopStore } from "@/app/store/shop-page.store";
import { useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
import countryList from "react-select-country-list";

import { CountryType } from "react-select-country-list";

export type CountryType = {
  value: string;
  label: string;
};

const ShippingAddress = () => {
  const { normalizeFirstChar } = useShopStore();
  const [value, setValue] = useState<SingleValue<CountryType>>(null);

  // const [selectedCountry, setSelectedCountry] =
  //   useState<SingleValue<{ value: string; label: string }>>(null);

  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (val: SingleValue<CountryType>) => {
    setValue(val);
  };
  return (
    <div className="w-full flex flex-col items-center px-4 py-6 md:px-6 md:py-10  b gap-6 border border-[#CBCBCB] rounded-sm">
      <h1 className="w-full text-base font-semibold leading-[26px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
        Shipping Address
      </h1>

      <div className="w-full flex flex-col gap-3 ">
        <label
          htmlFor=""
          className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
        >
          Street Address *
        </label>
        <input
          type="text"
          className="px-4 py-[9px] border border-[#CBCBCB]"
          placeholder={normalizeFirstChar("Street Address")}
        />
      </div>

      {/* <Select
        options={options}
        value={value}
        onChange={changeHandler}
        className="w-full py-[10px] outline-none"
      /> */}


      <Select
        options={options}
        value={value}
        onChange={changeHandler}
        className="w-full"
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "43.6px",
            width: "100%",
            height: "43.6px",
            border: "1px solid #CBCBCB",
            boxShadow: "none",
            padding: "0 0.5rem", 
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











      <div className="w-full flex flex-col gap-3 ">
        <label
          htmlFor=""
          className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
        >
          Town / City
        </label>
        <input
          type="text"
          className="px-4 py-[9px] border border-[#CBCBCB]"
          placeholder={normalizeFirstChar("Town / City")}
        />
      </div>

      <div className="w-full grid grid-cols-2 gap-2 md:gap-6 ">
        {/* <Input {...props} /> */}
        <div className="w-full flex flex-col gap-3 ">
          <label
            htmlFor=""
            className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
          >
            State
          </label>

          <input
            type="text"
            className="px-4 py-[9px] border border-[#CBCBCB]"
            placeholder={normalizeFirstChar("State")}
          />
        </div>

        <div className="w-full flex flex-col gap-3 ">
          <label
            htmlFor=""
            className="text-xs font-bold leading-[12px] uppercase text-[#6C7275]"
          >
            Zip Code
          </label>
          <input
            type="text"
            className="px-4 py-[9px] border border-[#CBCBCB] "
            placeholder={normalizeFirstChar("Zip Code")}
          />
        </div>
      </div>
      <div className="w-full flex items-center gap-3">
        {/* <Checkbox /> */}
        <input type="checkbox" name="" id="" />
        <label
          htmlFor=""
          className="text-xs font-normal leading-[20px] text-[#6C7275]"
        >
          Use a different billing address (optional)
        </label>
      </div>
    </div>
  );
};

export default ShippingAddress;
