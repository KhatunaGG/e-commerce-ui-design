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

"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { SwipeLeft, SwipeRight } from "../../__atoms";

const Hero = () => {
  const images = [
    "/assets/swipe_1.png",
    "/assets/swipe_6.jpg",
    "/assets/swipe_2.jpg",
  ];

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [navigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    setNavigationReady(true);
  }, []);

  return (
    <div className="relative h-[304px] lg:h-[536px] rounded-lg overflow-hidden">
      {navigationReady && (
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          speed={900}
          className="rounded-lg h-full"
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item}
                alt={`slide-${index}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <button
        ref={prevRef}
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 bg-white bg-opacity-50 w-[38px] h-[38px] md:w-[48px] md:h-[48px] flex items-center justify-center rounded-full p-2 hover:bg-opacity-80 transition"
        aria-label="Previous Slide"
      >
        <SwipeLeft />
      </button>

      <button
        ref={nextRef}
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 bg-white bg-opacity-50 w-[38px] h-[38px] md:w-[48px] md:h-[48px] flex items-center justify-center rounded-full p-2 hover:bg-opacity-80 transition"
        aria-label="Next Slide"
      >
        <SwipeRight />
      </button>
    </div>
  );
};

export default Hero;
