// 'use client'; // ✅ Important: makes this a client component

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";

// const Hero = () => {
//   const images = ["/assets/swipe_1.png", "/assets/swipe_6.jpg", "/assets/swipe_2.jpg"];

//   return (
//     <Swiper
//       modules={[Navigation]}
//       navigation={true}
//       className="rounded-lg overflow-hidden  max-h-[536px]"
//     >
//       {images.map((item, index) => (
//         <SwiperSlide key={index}>
//           <img
//             src={item}
//             alt={`slide-${index}`}
//             className="w-full h-auto object-cover"
//           />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default Hero;

// "use client";
// import React, { useRef, useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { SwipeLeft, SwipeRight } from "../../__atoms";
// import useManageImageStore from "@/app/store/manage-image.store";
// import { AnimateSpin } from "../../__molecules";

// const Hero = () => {
//   const { imagesData, loading, error, fetchImages } = useManageImageStore();
//   console.log(imagesData, "ImageData");

//   useEffect(() => {
//     fetchImages();
//   }, [fetchImages]);

//   // const images = [
//   //   "/assets/swipe_1.png",
//   //   "/assets/swipe_3.jpg",
//   //   "/assets/swipe_2.jpg",
//   // ];

//   const prevRef = useRef<HTMLButtonElement>(null);
//   const nextRef = useRef<HTMLButtonElement>(null);
//   const [isMounts, setIsMounts] = useState(false);

//   useEffect(() => {
//     setIsMounts(true);
//   }, []);

//   if (loading) return (
//     <div className=" w-full h-auto flex items-center justify-center">
//       <AnimateSpin />
//     </div>
//   );

//   return (
//     <div className="relative h-[304px] lg:h-[536px] rounded-lg overflow-hidden">
//       {isMounts && (
//         <Swiper
//           modules={[Navigation, Autoplay]}
//           loop={true}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           navigation={{
//             prevEl: prevRef.current,
//             nextEl: nextRef.current,
//           }}
//           speed={900}
//           className="rounded-lg h-full"
//         >
//           {imagesData.map(({ url, imageName }, index) => (
//             <SwiperSlide key={index}>
//               <img
//                 src={url}
//                 alt={imageName}
//                 className="w-full h-full object-cover"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//       <button
//         ref={prevRef}
//         className="absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-white bg-opacity-50 w-[38px] h-[38px] md:w-[48px] md:h-[48px] flex items-center justify-center rounded-full p-2 hover:bg-opacity-80 transition"
//         aria-label="Previous Slide"
//       >
//         <SwipeLeft />
//       </button>

//       <button
//         ref={nextRef}
//         className="absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white bg-opacity-50 w-[38px] h-[38px] md:w-[48px] md:h-[48px] flex items-center justify-center rounded-full p-2 hover:bg-opacity-80 transition"
//         aria-label="Next Slide"
//       >
//         <SwipeRight />
//       </button>
//     </div>
//   );
// };

// export default Hero;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import { SwipeLeft, SwipeRight } from "../../__atoms";
// import useManageImageStore from "@/app/store/manage-image.store";
// import { AnimateSpin } from "../../__molecules";

// const Hero = () => {
//   const { imagesData, loading, fetchImages } = useManageImageStore();
//   const [isMounts, setIsMounts] = useState(false);

//   useEffect(() => {
//     fetchImages();
//   }, [fetchImages]);

//   useEffect(() => {
//     setIsMounts(true);
//   }, []);

//   if (loading) return (
//     <div className=" w-full h-full flex items-center justify-center">
//       <AnimateSpin />
//     </div>
//   );

//   return (
//     <div className="relative h-[304px] lg:h-[536px] rounded-lg overflow-hidden shadow-2xl">
//       {isMounts && (
//         <Swiper
//           modules={[Navigation, Autoplay]}
//           loop={true}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           navigation={{
//             prevEl: '.custom-prev',
//             nextEl: '.custom-next',
//           }}
//           speed={900}
//           className="rounded-lg h-full"
//         >
//           {imagesData.map(({ url, imageName }, index) => (
//             <SwiperSlide key={index}>
//               <img
//                 src={url}
//                 alt={imageName}
//                 className="w-full h-full object-cover"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//       <button
//         className="custom-prev cursor-pointer absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-white bg-opacity-50 w-[38px] h-[38px] md:w-[48px] md:h-[48px] flex items-center justify-center rounded-full p-2 hover:bg-opacity-80 transition"
//         aria-label="Previous Slide"
//       >
//         <SwipeLeft />
//       </button>

//       <button
//         className="custom-next cursor-pointer absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white bg-opacity-50 w-[38px] h-[38px] md:w-[48px] md:h-[48px] flex items-center justify-center rounded-full p-2 hover:bg-opacity-80 transition"
//         aria-label="Next Slide"
//       >
//         <SwipeRight />
//       </button>
//     </div>
//   );
// };

// export default Hero;

"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { SwipeLeft, SwipeRight } from "../../__atoms";
// import useHomePAgeStore, {
//   IImageData,
// } from "@/app/store/manage-image.store";
import { AnimateSpin } from "../../__molecules";
import { IImageData, useHomePageStore } from "@/app/store/useHomePage.store.";


const Hero = ({ images }: { images: IImageData[] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading } = useHomePageStore();



  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!images.length) return null;

  if (isLoading)
    return (
      <div className=" w-full h-full lg:max-h-[536px] flex items-center justify-center">
        <AnimateSpin />
      </div>
    );

  return (
    <div className="w-full md:px-[11.11%] px-[8.53%] ">
      <div className="relative h-[304px] lg:h-[536px] rounded-lg overflow-hidden        ">
        {isMounted && (
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={1}
            loop={images.length > 1}
            // loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            speed={900}
            className="rounded-lg h-full"
          >
            {images.map(({ presignedUrl, imageName }, index) => (
              
              <SwiperSlide key={index} className="relative shadow-xl">
                <Image
                  src={presignedUrl}
                  // src={"/assets/swipe_5.png"}
                  alt={imageName}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <button
          className="custom-prev cursor-pointer absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-white bg-opacity-50 w-[38px] h-[38px] md:w-[48px] md:h-[48px] flex items-center justify-center rounded-full p-2 hover:bg-opacity-80 transition      "
          aria-label="Previous Slide"
        >
          <SwipeLeft />
        </button>

        <button
          className="custom-next cursor-pointer absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white bg-opacity-50 w-[38px] h-[38px] md:w-[48px] md:h-[48px] flex items-center justify-center rounded-full p-2 hover:bg-opacity-80 transition"
          aria-label="Next Slide"
        >
          <SwipeRight />
        </button>
      </div>
    </div>
  );
};

export default Hero;

