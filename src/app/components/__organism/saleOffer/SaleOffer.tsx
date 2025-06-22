// import React, { useMemo } from "react";
// import Image from "next/image";
// import { IImageData } from "@/app/store/manage-image.store";
// import { ArrowRight } from "../../__atoms";
// import Link from "next/link";

// const SaleOffer = ({ images }: { images: IImageData[] }) => {
//   const saleOfferPages = useMemo(() => {
//     return images.filter((img) =>
//       img.componentUsage?.some((c) => c.toLowerCase() === "saleoffer")
//     );
//   }, [images]);

//   if (!saleOfferPages.length) {
//     return null;
//   }

//   console.log(saleOfferPages, "saleOfferPages");
//   return (
//     <section className="w-full bg-[#F3F5F7] flex flex-col lg:flex-row ">
//       <div className="flex-1 relative min-h-[532px]">
//         <Image
//           src={saleOfferPages[0].presignedUrl}
//           alt="Sale offer image"
//           className="object-cover"
//           fill
//           priority
//           sizes="(max-width: 1024px) 100vw, 50vw"
//         />
//       </div>
//       <div className="w-full lg:flex-1 px-[72px] lg:px-0 lg:pl-[72px] lg:pt-[140px] flex flex-col items-center justify-center  lg:items-start    bg-red-400">
//         <div className="flex-1 w-auto  flex flex-col items-start gap-4  text-[#377DFF]     ">
//           <h3 className=" text-base font-bold leading-4 uppercase">
//             SALE UP TO 35% OFF
//           </h3>{" "}
//           <h2 className=" text-[34px] font-medium leading-[38px] tracking-[-0.6px] text-[#141718] lg:text-[40px] lg:leading-11 lg:tracking-[-0.4px]">
//             HUNDREDS of <br /> New lower prices!
//           </h2>
//           <p className="text-[#141718] text-[20px] font-normal leading-[32px]">
//             It’s more affordable than ever to give every <br /> room in your
//             home a stylish makeover
//           </p>
//         </div>

//         <Link className="w-ful flex items-center lg:items-start mt-6 gap-1" href={""}>
//           <button className="text-base font-medium leading-[28px] tracking-[-0.4px]">Show Now</button>
//           <div className="w-auto h-fit pt-[6px]">
//           <ArrowRight />
//           </div>

//         </Link>
//       </div>
//     </section>
//   );
// };

// export default SaleOffer;

import React from "react";
import Image from "next/image";
import { ArrowRight } from "../../__atoms";
import Link from "next/link";
import { IImageData } from "@/app/store/useHomePage.store.";

const SaleOffer = ({ images }: { images: IImageData[] }) => {
  // const saleOfferPages = useMemo(() => {
  //   return images.filter((img) =>
  //     img.componentUsage?.some((c) => c.toLowerCase() === "saleoffer")
  //   );
  // }, [images]);

  if (!images.length) {
    return null;
  }


  return (
    <section className="w-full bg-[#F3F5F7] flex flex-col lg:flex-row ">
      <div className="flex-1 relative min-h-[532px]">
        <Image
          src={images[0].presignedUrl}
          alt="Sale offer image"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="w-full lg:flex-1 py-[58.5px] px-8 lg:px-0 lg:py-0 lg:pl-[72px] lg:pt-[140px]">
        <div className="flex-1 w-auto flex flex-col items-start gap-4  text-[#377DFF]">
          <h3 className=" text-base font-bold leading-4 uppercase">
            SALE UP TO 35% OFF
          </h3>{" "}
          <h2 className=" text-[34px] font-medium leading-[38px] tracking-[-0.6px] text-[#141718] lg:text-[40px] lg:leading-11 lg:tracking-[-0.4px]">
            HUNDREDS of <br /> New lower prices!
          </h2>
          <p className="text-[#141718] text-[20px] font-normal leading-[32px]">
            It’s more affordable than ever to give every <br /> room in your
            home a stylish makeover
          </p>
        </div>

        <Link className="w-ful flex items-start mt-6 gap-1 " href={""}>
          <button className="text-base font-medium leading-[28px] tracking-[-0.4px] cursor-pointer">
            Shop Now
          </button>
          <div className="w-auto h-fit pt-[6px]">
            <ArrowRight />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default SaleOffer;
