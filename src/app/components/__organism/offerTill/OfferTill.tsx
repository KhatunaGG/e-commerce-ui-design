"use client";
import { OfferTillPropsType } from "@/app/interfaces/interface";
import React, { useEffect, useState, useCallback } from "react";

const OfferTill = ({ till }: OfferTillPropsType) => {
  const getTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const target = new Date(till).getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        expired: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return {
      expired: false,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [till]);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    if (timeLeft.expired) return;
    const timer = setInterval(() => {
      const updatedTime = getTimeLeft();
      setTimeLeft(updatedTime);
      if (updatedTime.expired) {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [getTimeLeft, timeLeft.expired]);

  return (
    <div className="border-t border-b border-t-[#e9e9ea] border-b-[#e9e9ea] py-6 flex flex-col gap-3">
      <p className="w-full text-base font-normal leading-[26px]">
        {timeLeft.expired ? "Offer has expired" : "Offer expires in:"}
      </p>
      <div className="w-full flex items-center justify-start gap-4">
        {["days", "hours", "minutes", "seconds"].map((unit) => (
          <div key={unit} className="flex flex-col items-center">
            <p className="text-[34px] font-medium leading-[38px] tracking-[-0.6px] text-[#141718] bg-[#F3F5F7] py-[11px] px-[10px]">
              {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, "0")}
            </p>
            <p className="text-[#6C7275] text-sm font-normal leading-[20px] capitalize">
              {unit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferTill;
