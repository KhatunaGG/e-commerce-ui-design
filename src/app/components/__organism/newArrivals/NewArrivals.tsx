// "use client";
// import useManageImageStore, {
//   IImageData,
// } from "@/app/store/manage-image.store";
// import { ArrowRight } from "../../__atoms";
// import { useMemo } from "react";
// import Image from "next/image";

// const NewArrivals = ({ images }: { images: IImageData[] }) => {
//   const newArrivalsPages = useMemo(() => {
//     return images.filter((img) =>
//       img.componentUsage?.some((c) => c.toLowerCase() === "newarrivals")
//     );
//   }, [images]);

//   if (!newArrivalsPages.length) {
//     return null;
//   }

//   return (
//     <section className="w-full mt-8 lg:mt-[48px] flex flex-col items-center ">
//       <div className="w-full flex items-end justify-between">
//         <div className="w-[8ch]">
//           <h2 className="text-[34px] md:text-[40px] font-medium tracking-[-0.6px] leading-[38px] md:tracking-[-0.4px] md:leading-[44px]">
//             New Arrivals
//           </h2>
//         </div>

//         <div className="hidden md:flex items-center gap-2">
//           <p className="text-[#141718] text-base font-medium leading-[28px] tracking-[-0.4px]">
//             More Products
//           </p>
//           <span className="w-[20px] h-[20px] mt-[2px]">
//             <ArrowRight />
//           </span>
//         </div>
//       </div>

//       {/* <div className="w-full py-10 lg:py-[48px]  relative bg-red-300">
//         <div className="absolute top-10 lg:top-[48px]  left-0 w-screen z-10 bg-green-200 flex gap-4 md:gap-6">
//           {newArrivalsPages.map(({ presignedUrl, imageName }, index) => (
//             <div key={index} className="relative w-full  w-[] md:w-[262px] h-[308px] md:h-[349px] ">
//               <Image
//                 src={presignedUrl}
//                 alt={imageName}
//                 fill
//                 style={{ objectFit: "cover" }}
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 priority={index === 0}
//               />
//             </div>
//           ))}
//         </div>
//       </div> */}
//       <div className="w-full pt-[40px] pb-[40px] md:pt-[48px] md:pb-[48px] relative bg-red-300 h-[388px] md:h-[445px]">
//         <div className="absolute top-[40px] md:top-[48px] left-0 w-screen z-10 bg-green-200 flex gap-4 md:gap-6">
//           {newArrivalsPages.map(({ presignedUrl, imageName }, index) => (
//             <div
//               key={index}
//               className="relative w-full md:w-[262px] h-[308px] md:h-[349px]"
//             >
//               <Image
//                 src={presignedUrl}
//                 alt={imageName}
//                 fill
//                 style={{ objectFit: "cover" }}
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 priority={index === 0}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;

// "use client";
// import useManageImageStore, {
//   IImageData,
// } from "@/app/store/manage-image.store";
// import { ArrowRight } from "../../__atoms";
// import { useMemo } from "react";
// import Image from "next/image";
// import React, { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/scrollbar";
// // import './styles.css';
// import { Scrollbar } from "swiper/modules";

// const NewArrivals = ({ images }: { images: IImageData[] }) => {
//   const newArrivalsPages = useMemo(() => {
//     return images.filter((img) =>
//       img.componentUsage?.some((c) => c.toLowerCase() === "newarrivals")
//     );
//   }, [images]);

//   if (!newArrivalsPages.length) {
//     return null;
//   }

//   return (
//     <section className="w-full mt-8 lg:mt-[48px] flex flex-col items-center ">
//       <div className="w-full flex items-end justify-between">
//         <div className="w-[8ch]">
//           <h2 className="text-[34px] md:text-[40px] font-medium tracking-[-0.6px] leading-[38px] md:tracking-[-0.4px] md:leading-[44px]">
//             New Arrivals
//           </h2>
//         </div>

//         <div className="hidden md:flex items-center gap-2">
//           <p className="text-[#141718] text-base font-medium leading-[28px] tracking-[-0.4px]">
//             More Products
//           </p>
//           <span className="w-[20px] h-[20px] mt-[2px]">
//             <ArrowRight />
//           </span>
//         </div>
//       </div>

//       <Swiper
//         modules={[Scrollbar]}
//         scrollbar={{ el: ".swiper-scrollbar", draggable: true }}
//         slidesPerView={4.5}
//         loop={newArrivalsPages.length > 4}
//         className="w-full pt-[40px] pb-[40px] md:pt-[48px] md:pb-[48px] relative bg-red-300 h-[388px] md:h-[445px]"
//       >
//         <div className="absolute top-[40px] md:top-[48px] left-0 w-screen z-10 bg-green-200 flex gap-4 md:gap-6">
//           {newArrivalsPages.map(({ presignedUrl, imageName }, index) => (
//             <div
//               key={index}
//               className="relative w-full md:w-[262px] h-[308px] md:h-[349px]"
//             >
//               <Image
//                 src={presignedUrl}
//                 alt={imageName}
//                 fill
//                 style={{ objectFit: "cover" }}
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                 priority={index === 0}
//               />
//             </div>
//           ))}
//         </div>
//       </Swiper>
//       {/* <div className="swiper-scrollbar absolute bottom-0 left-0 w-full h-[4px] bg-gray-200 z-20" /> */}
//       <div className="swiper-scrollbar absolute bottom-0 left-0 w-full h-[4px] bg-gray-300 rounded-full z-20">
//         <div className="swiper-scrollbar-drag bg-black h-full rounded-full"></div>
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;

// "use client";
// import useManageImageStore, {
//   IImageData,
// } from "@/app/store/manage-image.store";
// import { ArrowRight } from "../../__atoms";
// import { useMemo } from "react";
// import Image from "next/image";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/scrollbar";
// import { Scrollbar } from "swiper/modules";

// const NewArrivals = ({ images }: { images: IImageData[] }) => {
//   const newArrivalsPages = useMemo(() => {
//     return images.filter((img) =>
//       img.componentUsage?.some((c) => c.toLowerCase() === "newarrivals")
//     );
//   }, [images]);

//   if (!newArrivalsPages.length) {
//     return null;
//   }

//   return (
//     <section className="w-full mt-8 lg:mt-[48px] bg-green-300">
//       <div className="max-w-screen-xl mx-auto  flex flex-col gap-6">
//         {/* Info (Header) */}
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//           <h2 className="text-[34px] md:text-[40px] font-medium tracking-[-0.6px] leading-[38px] md:tracking-[-0.4px] md:leading-[44px]">
//             New Arrivals
//           </h2>

//           {/* Footer (More Products) */}
//           <div className="flex items-center gap-2">
//             <p className="text-[#141718] text-base font-medium leading-[28px] tracking-[-0.4px]">
//               More Products
//             </p>
//             <span className="w-[20px] h-[20px] mt-[2px]">
//               <ArrowRight />
//             </span>
//           </div>
//         </div>

//         {/* Swiper + Scrollbar wrapper */}
//         <div className="relative">
//           {/* Swiper - aligned with left edge, overflows right */}
//           <div className="absolute left-0 w-[100vw] bg-red-300 h-[388px] md:h-[445px] overflow-visible">
//             <Swiper
//               modules={[Scrollbar]}
//               scrollbar={{ el: ".custom-scrollbar", draggable: true }}
//               slidesPerView={1.3}
//               spaceBetween={16}
//             //   breakpoints={{
//             //     768: { slidesPerView: 2.5, spaceBetween: 24 },
//             //     1024: { slidesPerView: 4.5, spaceBetween: 24 },
//             //   }}
//               breakpoints={{
//     375: { slidesPerView: 1.5, spaceBetween: 16 },   // sm
//     768: { slidesPerView: 2.5, spaceBetween: 24 },   // md
//     1024: { slidesPerView: 5.5, spaceBetween: 24 },  // lg
//   }}
//               loop
//               className="w-full h-full"
//             >
//               {newArrivalsPages.map(({ presignedUrl, imageName }, index) => (
//                 <SwiperSlide key={index} className="!w-auto">
//                   <div className="relative w-full md:w-[262px] h-[308px] md:h-[349px]">
//                     <Image
//                       src={presignedUrl}
//                       alt={imageName}
//                       fill
//                       style={{ objectFit: "cover" }}
//                         sizes="(max-width: 640px) 80vw, (max-width: 768px) 40vw, 262px"
//                       priority={index === 0}
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>

//           {/* Scrollbar at bottom of container (not inside Swiper) */}
//           <div className="custom-scrollbar mt-[388px] md:mt-[445px] h-[4px] bg-gray-300 rounded-full relative z-10">
//             <div className="swiper-scrollbar-drag bg-black h-full rounded-full"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;

//OK
// "use client";
// import { IImageData } from "@/app/store/manage-image.store";
// import { ArrowRight } from "../../__atoms";
// import { useMemo } from "react";
// import Image from "next/image";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/scrollbar";
// import { Scrollbar } from "swiper/modules";
// import Link from "next/link";

// const NewArrivals = ({ images }: { images: IImageData[] }) => {
//   const newArrivalsPages = useMemo(() => {
//     return images.filter((img) =>
//       img.componentUsage?.some((c) => c.toLowerCase() === "newarrivals")
//     );
//   }, [images]);

//   if (!newArrivalsPages.length) {
//     return null;
//   }

//   return (
//     <section className="w-full mt-8 lg:mt-[48px] ">
//       <div className="max-w-screen-xl mx-auto flex flex-col gap-6 ">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//             <Link href={""}>

//           <h2 className="w-[8ch] text-[34px] md:text-[40px] font-medium tracking-[-0.6px] leading-[38px] md:tracking-[-0.4px] md:leading-[44px]">
//             New Arrivals
//           </h2>
//             </Link>
//           <div className="flex items-center gap-2">
//             <p className="text-[#141718] text-base font-medium leading-[28px] tracking-[-0.4px]">
//               More Products
//             </p>
//             <span className="w-[20px] h-[20px] mt-[2px]">
//               <ArrowRight />
//             </span>
//           </div>
//         </div>

//         <div className="relative ">
//           <div
//             className="absolute left-0 h-[388px] md:h-[445px] overflow-hidden"
//             style={{ width: "100vw" }}
//           >
//             <Swiper
//               modules={[Scrollbar]}
//               scrollbar={{ el: ".custom-scrollbar", draggable: true }}
//               slidesPerView={1.4}
//               spaceBetween={16}
//               breakpoints={{
//                 375: { slidesPerView: 1.5, spaceBetween: 16 },
//                 640: { slidesPerView: 2, spaceBetween: 16 },
//                 768: { slidesPerView: 2.5, spaceBetween: 24 },
//                 1024: { slidesPerView: 4, spaceBetween: 24 },
//                 1280: { slidesPerView: 5, spaceBetween: 24 },
//               }}
//               loop
//               className="w-full h-full"
//             >
//               {newArrivalsPages.map(({ presignedUrl, imageName }, index) => (
//                 <SwiperSlide key={index}>
//                   <div className=" relative w-full h-[308px] md:h-[349px] min-w-[200px] ">
//                     <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//                         <div className="py-1 px-[14px] font-base font-bold leading-4 uppercase text-[#141718] rounded-sm bg-white">new</div>
//                         <div className="py-1 px-[14px] font-base font-bold leading-4 uppercase text-white rounded-sm bg-[#38CB89]">-50%</div>
//                     </div>
//                     <Image
//                       src={presignedUrl}
//                       alt={imageName}
//                       fill
//                       className="object-cover rounded-lg"
//                       sizes="(max-width: 375px) 60vw, (max-width: 640px) 45vw, (max-width: 768px) 35vw, (max-width: 1024px) 25vw, 20vw"
//                       priority={index < 2}
//                       onError={(e) => {
//                         console.error(
//                           "Image failed to load:",
//                           imageName,
//                           presignedUrl
//                         );
//                       }}
//                     />
//                     <div className="w-full px-4 absolute bottom-4">
//                         <button className="w-full bg-[#141718] text-white rounded-lg py-[6.29px] lg:py-[9px] text-base font-medium leading-[28px] tracking-[-0.4px]">Add to cart</button>
//                     </div>
//                     <div className="DIV_1 text-[#141718] w-full absolute -bottom-21 flex flex-col items-start">
//                         <div>S T A R S</div>
//                         <p className="text-base font-semibold leading-[26px]">Loveseat</p>
//                         <div className="w-auto flex gap-1">
//                             <p className="[#6C7275] text-sm font-semibold leading-[22px]">$199.00</p>
//                             <p className="line-through text-[#6C7275] text-sm font-semibold leading-[22px]">$400.00</p>
//                         </div>
//                     </div>

//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//           <div className="DIV_2 custom-scrollbar mt-[388px] md:mt-[445px] h-[4px] bg-gray-300 rounded-full relative z-10 max-w-full">
//             <div className="swiper-scrollbar-drag bg-black h-full rounded-full"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewArrivals;

//mt-[430px] md:mt-[485px]

"use client";
import { IImageData } from "@/app/store/manage-image.store";
import { useMemo, useRef } from "react";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import Link from "next/link";
import { Label, MoreButton } from "../../__molecules";

const NewArrivals = ({ images }: { images: IImageData[] }) => {
  const swiperRef = useRef<SwiperRef | null>(null);

  const newArrivalsPages = useMemo(() => {
    return images.filter((img) =>
      img.componentUsage?.some((c) => c.toLowerCase() === "newarrivals")
    );
  }, [images]);

  const handleMoreProducts = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  if (!newArrivalsPages.length) {
    return null;
  }

  return (
    <section className="w-full mt-8 lg:mt-[48px]">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-6 ">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <Link href={""}>
            <h2 className="w-[8ch] text-[34px] md:text-[40px] font-medium tracking-[-0.6px] leading-[38px] md:tracking-[-0.4px] md:leading-[44px]">
              New Arrivals
            </h2>
          </Link>
          <MoreButton
            handleMoreProducts={handleMoreProducts}
            styleClass="hidden md:flex"
          />
        </div>

        <div className="relative">
          <div
            className="absolute left-0 h-[398px] md:h-[445px] overflow-hidden"
            style={{ width: "100vw" }}
          >
            <Swiper
              ref={swiperRef}
              modules={[Scrollbar]}
              scrollbar={{ el: ".custom-scrollbar", draggable: true }}
              slidesPerView={1.4}
              spaceBetween={16}
              breakpoints={{
                375: { slidesPerView: 1.5, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                768: { slidesPerView: 2.5, spaceBetween: 24 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
                1280: { slidesPerView: 5, spaceBetween: 24 },
              }}
              loop
              className="w-full h-full"
            >
              {newArrivalsPages.map(({ presignedUrl, imageName }, index) => (
                <SwiperSlide key={index}>
                  <div className="relative  h-[308px] md:h-[349px] min-w-[200px]">
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-[#141718] rounded-sm bg-white">
                        new
                      </div>
                      <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-white rounded-sm bg-[#38CB89]">
                        -50%
                      </div>
                    </div>
                    <Image
                      src={presignedUrl}
                      alt={imageName}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 375px) 60vw, (max-width: 640px) 45vw, (max-width: 768px) 35vw, (max-width: 1024px) 25vw, 20vw"
                      priority={index < 2}
                    />
                    <div className="w-full px-4 absolute bottom-4">
                      <button className="w-full bg-[#141718] text-white rounded-lg py-[6.29px] lg:py-[9px] text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors">
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <Label />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="custom-scrollbar mt-[410px] md:mt-[475px] h-[4px] bg-gray-300 rounded-full relative z-10 max-w-full">
            <div className="swiper-scrollbar-drag bg-black h-full rounded-full"></div>
          </div>
        </div>
      </div>

      <MoreButton
        handleMoreProducts={handleMoreProducts}
        styleClass="flex md:hidden mt-6"
      />
    </section>
  );
};

export default NewArrivals;
