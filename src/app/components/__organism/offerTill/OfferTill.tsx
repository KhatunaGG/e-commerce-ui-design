import React from "react";

export type OfferTillPropsType = {
  till: string;
};

const OfferTill = ({ till }: OfferTillPropsType) => {
  console.log(till);
  return (
    <div className="border-t border-b border-t-[#e9e9ea] border-b-[#e9e9ea] py-6 flex flex-col gap-3">
      <p className="w-full text-base font-normal leading-[26px]">
        Offer expires in:
      </p>
      <div className="w-full flex items-center justify-start gap-4">
        <div className="flex flex-col items-center">
          <p className="text-[34px] font-medium leading-[38px] tracking-[-0,6px] text-[#141718] bg-[#F3F5F7] py-[11px] pl-[10px] pr-[9px]">
            02
          </p>
          <p className="text-[#6C7275] text-sm font-normal leading-[20px]">
            Days
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[34px] font-medium leading-[38px] tracking-[-0,6px] text-[#141718] bg-[#F3F5F7] py-[11px] pl-[10px] pr-[9px]">
            12
          </p>
          <p className="text-[#6C7275] text-sm font-normal leading-[20px]">
            Hours
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[34px] font-medium leading-[38px] tracking-[-0,6px] text-[#141718] bg-[#F3F5F7] py-[11px] pl-[10px] pr-[9px]">
            45
          </p>
          <p className="text-[#6C7275] text-sm font-normal leading-[20px]">
            Minutes
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[34px] font-medium leading-[38px] tracking-[-0,6px] text-[#141718] bg-[#F3F5F7] py-[11px] pl-[10px] pr-[9px]">
            05
          </p>
          <p className="text-[#6C7275] text-sm font-normal leading-[20px]">
            Seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfferTill;
