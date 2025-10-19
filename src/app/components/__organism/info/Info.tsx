import { labels } from "@/app/commons/data";
import React from "react";
import { Car, Money, Phone, Lock } from "../../__atoms";

const iconMap: Record<string, React.FC> = {
  car: Car,
  money: Money,
  lock: Lock,
  phone: Phone,
};

const Info = () => {
  return (
    <section className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-12 md:px-[11.11%] px-[8.53%] ">
      {labels.map((label, i) => {
        const Icon = iconMap[label.iconName];
        return (
          <div
            key={i}
            className="flex flex-col items-start  bg-[#F3F5F7] p-4 md:p-8 h-full gap-4"
          >
            {Icon && <Icon />}
            <div className="w-full flex flex-col items-start ">
              <h2 className="text-sm font-semibold leading-[22px] md:text-[20px] md:font-medium md:leading-[28px] text-[#141718]">
                {label.name}
              </h2>
              <div className="text-sm font-normal leading-[22px]">
                {label.subText}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Info;
