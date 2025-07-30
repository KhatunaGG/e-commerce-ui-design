"use client";
import { Edit } from "../../__atoms";
import AddressForm from "../addressForm/AddressForm";

const Addresses = () => {

  return (
    <div className="w-full  h-full   lg:px-[72px] pb-10  lg;pr-[72px] flex flex-col gap-[19px]">
      <h2 className="font-semibold text-[20px] leading-[32px] text-black">
        Address
      </h2>

      <div className="w-full   grid grid-cols-1 md:grid-cols-2 gap-[23px] md:gap-4 lg:gap-10">
        <div className=" flex flex-col p-4 gap-2 border border-[#6C7275] rounded-lg">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-semibold text-base leading-[26px] text-black">
              Billing Address
            </h3>
            <button className="flex items-center gap-1 cursor-pointer group ">
              <div>
                <Edit />
              </div>
              <div className="font-semibold text-base leading-[26px] text-[#6C7275] group-hover:text-blue-800 transition-colors duration-300 ease-in-out">
                Edit
              </div>
            </button>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="font-normal text-sm leading-[22px] text-black">
              Ann Smith
            </p>
            <p className="font-normal text-sm leading-[22px] text-black">
              (+1) 234 567 890
            </p>
            <p className="font-normal text-sm leading-[22px] text-black  break-words">
              345 Long Island, NewYork, United States
            </p>
          </div>
        </div>
        <div className=" flex flex-col p-4 gap-2 border border-[#6C7275] rounded-lg">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-semibold text-base leading-[26px] text-black">
              Shipping Address
            </h3>
            <button className="flex items-center gap-1 cursor-pointer group">
              <div>
                <Edit />
              </div>
              <div className="font-semibold text-base leading-[26px] text-[#6C7275] group-hover:text-blue-800 transition-colors duration-300 ease-in-out">
                Edit
              </div>
            </button>
          </div>
          <div className="w-full flex flex-col gap-1">
            <p className="font-normal text-sm leading-[22px] text-black">
              Ann Smith
            </p>
            <p className="font-normal text-sm leading-[22px] text-black">
              (+1) 234 567 890
            </p>
            <p className="Address font-normal text-sm leading-[22px] text-black  break-words">
              345 Long Island, NewYork, United States
            </p>
          </div>
        </div>
      </div>

      <AddressForm />
    </div>
  );
};

export default Addresses;
