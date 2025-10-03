"use client";
import { useEffect, useRef } from "react";
import React from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Scrollbar } from "swiper/modules";
import Link from "next/link";
import { Label, MoreButton } from "../../__molecules";
import Image from "next/image";
import { ProductsDataType } from "@/app/store/shop-page.store";
import { useProductStore } from "@/app/store/product.store";

const NewArrivals = ({ images }: { images: ProductsDataType[] }) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const { getAverageRating, averageRatings } = useProductStore();

  useEffect(() => {
    const fetchRatings = async () => {
      for (const item of images) {
        await getAverageRating(item._id);
      }
    };

    fetchRatings();
  }, [images, getAverageRating]);

  const handleMoreProducts = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  if (!images.length) {
    return null;
  }

  return (
    <section className="w-full mt-8 lg:mt-[48px]">
      <div className="w-full flex flex-col gap-10 lg:gap-12 ">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4  md:px-[11.11%] px-[8.53%] ">
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
        <div className="ml-[8.53%] md:ml-[11.11%] max-w-screen flex flex-col gap-12 lg:gap-[52px]">
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
            loop={true}
            className="w-full h-full"
          >
            {images.map((item, i) => {
              return (
                <SwiperSlide className="" key={i}>
                  <div className="w-full h-full relative group">
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-[#141718] rounded-sm bg-white">
                        new
                      </div>
                      <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-white rounded-sm bg-[#38CB89]">
                        -{item.discount}%
                      </div>
                    </div>
                    <Image
                      src={item.presignedUrl || ""}
                      alt={item.productName || "Product"}
                      width={262}
                      height={349}
                      className="w-full h-auto object-cover"
                    />
                    <div className="w-full px-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                      <button className="w-full bg-[#141718] text-white rounded-lg py-[6.29px] lg:py-[9px] text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors">
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <Label
                    productName={item.productName}
                    price={item.price}
                    // rating={ratings[item._id] || 0}
                    // rating={averageRatings[item._id] || 0}
                    rating={averageRatings[item._id] ?? 0}
                    discount={item.discount}
                    details={item.details}
                    _id={item._id}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="custom-scrollbar  h-[4px] bg-gray-300 rounded-full  mr-[8.53%] lg:mr-[11.11%] ">
            <div className="swiper-scrollbar-drag bg-black h-full rounded-full "></div>
          </div>
        </div>
      </div>

      <MoreButton
        handleMoreProducts={handleMoreProducts}
        styleClass="flex md:hidden mt-6"
        label="More Products"
      />
    </section>
  );
};

export default NewArrivals;
