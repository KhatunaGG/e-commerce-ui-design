import React from "react";

const Label = () => {
  return (
    <div className="text-[#141718] w-full mt-4 flex flex-col items-start ">
      <div className="text-sm text-yellow-500 mb-1">★★★★★</div>
      <p className="text-base font-semibold leading-[26px] mb-1">Loveseat</p>
      <div className="w-auto flex gap-2">
        <p className="text-sm font-semibold leading-[22px]">$199.00</p>
        <p className="line-through text-[#6C7275] text-sm font-semibold leading-[22px]">
          $400.00
        </p>
      </div>
    </div>
  );
};

export default Label;
