"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { SwipeLeft, SwipeRight } from "../../__atoms";
import { AnimateSpin } from "../../__molecules";
import { useHomePageStore } from "@/app/store/useHomePage.store.";
import { IImageData } from "@/app/interfaces/interface";

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
