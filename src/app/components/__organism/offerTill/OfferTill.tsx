// import React from "react";

// export type OfferTillPropsType = {
//   till: string;
// };

// const OfferTill = ({ till }: OfferTillPropsType) => {
//   console.log(till, "till");
//   return (
//     <div className="border-t border-b border-t-[#e9e9ea] border-b-[#e9e9ea] py-6 flex flex-col gap-3">
//       <p className="w-full text-base font-normal leading-[26px]">
//         Offer expires in:
//       </p>
//       <div className="w-full flex items-center justify-start gap-4">
//         <div className="flex flex-col items-center">
//           <p className="text-[34px] font-medium leading-[38px] tracking-[-0,6px] text-[#141718] bg-[#F3F5F7] py-[11px] pl-[10px] pr-[9px]">
//             02
//           </p>
//           <p className="text-[#6C7275] text-sm font-normal leading-[20px]">
//             Days
//           </p>
//         </div>
//         <div className="flex flex-col items-center">
//           <p className="text-[34px] font-medium leading-[38px] tracking-[-0,6px] text-[#141718] bg-[#F3F5F7] py-[11px] pl-[10px] pr-[9px]">
//             12
//           </p>
//           <p className="text-[#6C7275] text-sm font-normal leading-[20px]">
//             Hours
//           </p>
//         </div>
//         <div className="flex flex-col items-center">
//           <p className="text-[34px] font-medium leading-[38px] tracking-[-0,6px] text-[#141718] bg-[#F3F5F7] py-[11px] pl-[10px] pr-[9px]">
//             45
//           </p>
//           <p className="text-[#6C7275] text-sm font-normal leading-[20px]">
//             Minutes
//           </p>
//         </div>
//         <div className="flex flex-col items-center">
//           <p className="text-[34px] font-medium leading-[38px] tracking-[-0,6px] text-[#141718] bg-[#F3F5F7] py-[11px] pl-[10px] pr-[9px]">
//             05
//           </p>
//           <p className="text-[#6C7275] text-sm font-normal leading-[20px]">
//             Seconds
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfferTill;


// "use client"
// import React, { useEffect, useState } from "react";

// export type OfferTillPropsType = {
//   till: string; // e.g., "2025-07-11T00:00:00.000Z"
// };

// const OfferTill = ({ till }: OfferTillPropsType) => {
//   const calculateTimeLeft = () => {
//     const difference = new Date(till).getTime() - new Date().getTime();
//     return {
//       days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
//       hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
//       minutes: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
//       seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
//     };
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     // ✅ Stop countdown on unmount
//     return () => clearInterval(timer);
//   }, [till]);

//   return (
//     <div className="border-t border-b border-t-[#e9e9ea] border-b-[#e9e9ea] py-6 flex flex-col gap-3">
//       <p className="w-full text-base font-normal leading-[26px]">
//         Offer expires in:
//       </p>
//       <div className="w-full flex items-center justify-start gap-4">
//         {["days", "hours", "minutes", "seconds"].map((unit) => (
//           <div key={unit} className="flex flex-col items-center">
//             <p className="text-[34px] font-medium leading-[38px] tracking-[-0.6px] text-[#141718] bg-[#F3F5F7] py-[11px] px-[10px]">
//               {String(timeLeft[unit as keyof typeof timeLeft]).padStart(2, "0")}
//             </p>
//             <p className="text-[#6C7275] text-sm font-normal leading-[20px] capitalize">
//               {unit}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OfferTill;


"use client"
import React, { useEffect, useState } from "react";

export type OfferTillPropsType = {
  till: string;
};

const OfferTill = ({ till }: OfferTillPropsType) => {
  const getTimeLeft = () => {
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
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    if (timeLeft.expired) return;

    const timer = setInterval(() => {
      const updatedTime = getTimeLeft();
      setTimeLeft(updatedTime);

      // Stop timer once expired
      if (updatedTime.expired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [till, timeLeft.expired,                     getTimeLeft]);

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
