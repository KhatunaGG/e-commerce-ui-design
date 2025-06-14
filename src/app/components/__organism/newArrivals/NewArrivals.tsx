// "use client";
// import { IImageData } from "@/app/store/manage-image.store";
// import { useMemo, useRef } from "react";
// import Image from "next/image";
// import React from "react";
// import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/scrollbar";
// import { Scrollbar } from "swiper/modules";
// import Link from "next/link";
// import { Label, MoreButton } from "../../__molecules";

// const NewArrivals = ({ images }: { images: IImageData[] }) => {
//   const swiperRef = useRef<SwiperRef | null>(null);

//   const newArrivalsPages = useMemo(() => {
//     return images.filter((img) =>
//       img.componentUsage?.some((c) => c.toLowerCase() === "newarrivals")
//     );
//   }, [images]);

//   const handleMoreProducts = () => {
//     if (swiperRef.current && swiperRef.current.swiper) {
//       swiperRef.current.swiper.slideNext();
//     }
//   };

//   if (!newArrivalsPages.length) {
//     return null;
//   }

//   return (
//     <section className="w-full mt-8 lg:mt-[48px] md:px-[11.11%] px-[8.53%]">
//       <div className="max-w-screen-xl mx-auto flex flex-col gap-6 ">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
//           <Link href={""}>
//             <h2 className="w-[8ch] text-[34px] md:text-[40px] font-medium tracking-[-0.6px] leading-[38px] md:tracking-[-0.4px] md:leading-[44px]">
//               New Arrivals
//             </h2>
//           </Link>
//           <MoreButton
//             handleMoreProducts={handleMoreProducts}
//             styleClass="hidden md:flex"
//           />
//         </div>

//         <div className="relative">
//           <div
//             className="absolute left-0 h-[398px] md:h-[445px] overflow-hidden "
//             style={{ width: "100vw" }}
//           >
//             <Swiper
//               ref={swiperRef}
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
//                   <div className="relative  h-[308px] md:h-[349px] min-w-[200px] ">
//                     <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//                       <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-[#141718] rounded-sm bg-white">
//                         new
//                       </div>
//                       <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-white rounded-sm bg-[#38CB89]">
//                         -50%
//                       </div>
//                     </div>
//                     <Image
//                       src={presignedUrl}
//                       alt={imageName}
//                       fill
//                       className="object-cover rounded-lg"
//                       sizes="(max-width: 375px) 60vw, (max-width: 640px) 45vw, (max-width: 768px) 35vw, (max-width: 1024px) 25vw, 20vw"
//                       priority={index < 2}
//                     />
//                     <div className="w-full px-4 absolute bottom-4">
//                       <button className="w-full bg-[#141718] text-white rounded-lg py-[6.29px] lg:py-[9px] text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors">
//                         Add to cart
//                       </button>
//                     </div>
//                   </div>
//                   <Label />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//           <div className="custom-scrollbar mt-[410px] md:mt-[475px] h-[4px] bg-gray-300 rounded-full relative z-10 max-w-full">
//             <div className="swiper-scrollbar-drag bg-black h-full rounded-full"></div>
//           </div>
//         </div>
//       </div>
//       <MoreButton
//         handleMoreProducts={handleMoreProducts}
//         styleClass="flex md:hidden mt-6"
//       />
//     </section>
//   );
// };

// export default NewArrivals;




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
    <section className="w-full mt-8 lg:mt-[48px] md:px-[11.11%] px-[8.53%]">
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
            className="absolute left-0 h-[398px] md:h-[445px] overflow-hidden "
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


                  <div className="relative  h-[308px] md:h-[349px] min-w-[200px] group">
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

                    <div className="w-full px-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
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
