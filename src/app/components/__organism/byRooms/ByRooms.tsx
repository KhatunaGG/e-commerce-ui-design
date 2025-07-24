"use client";
import Image from "next/image";
import { ArrowRight } from "../../__atoms";
import Link from "next/link";
import { IImageData } from "@/app/store/useHomePage.store.";

const ByRooms = ({ images }: { images: IImageData[] }) => {

  if (!images.length) {
    return null;
  }

  return (
    <section className="w-full mt-10           md:px-[11.11%] px-[8.53%] ">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:h-[600px]">

        <div className="w-full lg:w-1/2">
          <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full rounded-lg overflow-hidden">
            <Image
              src={images[0]?.presignedUrl || "/assets/byRoom_1.png"}
              alt="Main hero image"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <Link href={""} className="w-full">
              <div className="w-full absolute top-8 left-8 lg:top-[48px] lg:left-[48px] flex flex-col gap-2 lg:gap-3">
                <h2 className="font-medium text-[28px] md:text-[34px] tracking-[-0.6px] leading-[36px] md:leading-[38px] text-[#141718]">
                  Living Room
                </h2>

                <div className="w-full lg:w-[18.24%] h-auto flex flex-col items-start">
                  <div className="w-auto flex items-center gap-2">
                    <p className="text-sm md:text-base font-medium text-[#141718] leading-[24px] md:leading-[28px] lg:tracking-[-0.4px]">
                      Shop Now
                    </p>
                    <span className="relative top-[2px]">
                      <ArrowRight />
                    </span>
                  </div>
                  <div className="w-[29.55%] md:w-[14.55%] lg:w-full bg-[#141718] h-[1px]" />
                </div>
              </div>
            </Link>
          </div>
        </div>


        <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-6">
          <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:flex-1 rounded-lg overflow-hidden">
            <Image
              src={images[1]?.presignedUrl || "/assets/byRoom_2.png"}
              alt="Secondary image 1"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <Link href={""} className="w-full">
              <div className="w-full absolute bottom-8 left-8 md:bottom-[48px] lg:left-[48px] flex flex-col gap-2 lg:gap-3">
                <h2 className="font-medium text-[28px] md:text-[34px] tracking-[-0.6px] leading-[36px] md:leading-[38px] text-[#141718]">
                  Bedroom
                </h2>

                <div className="w-full lg:w-[18.24%] h-auto flex flex-col items-start">
                  <div className="w-auto flex items-center gap-2">
                    <p className="text-sm md:text-base font-medium text-[#141718] leading-[24px] md:leading-[28px] lg:tracking-[-0.4px]">
                      Shop Now
                    </p>
                    <span className="relative top-[2px]">
                      <ArrowRight />
                    </span>
                  </div>
                  <div className="w-[29.55%] md:w-[14.55%] lg:w-full bg-[#141718] h-[1px]" />
                </div>
              </div>
            </Link>
          </div>

          <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:flex-1 rounded-lg overflow-hidden">
            <Image
              src={images[2]?.presignedUrl || "/assets/byRoom_3.png"}
              alt="Secondary image 2"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <Link href={""} className="w-full">
              <div className="w-full absolute bottom-8 left-8 md:bottom-[48px] lg:left-[48px] flex flex-col gap-2 lg:gap-3">
                <h2 className="font-medium text-[28px] md:text-[34px] tracking-[-0.6px] leading-[36px] md:leading-[38px] text-[#141718]">
                  Kitchen
                </h2>

                <div className="w-full lg:w-[18.24%] h-auto flex flex-col items-start">
                  <div className="w-auto flex items-center gap-2">
                    <p className="text-sm md:text-base font-medium text-[#141718] leading-[24px] md:leading-[28px] lg:tracking-[-0.4px]">
                      Shop Now
                    </p>
                    <span className="relative top-[2px]">
                      <ArrowRight />
                    </span>
                  </div>
                  <div className="w-[29.55%] md:w-[14.55%] lg:w-full bg-[#141718] h-[1px]" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ByRooms;



