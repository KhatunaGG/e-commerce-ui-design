import Image from "next/image";
import { ChevronRight } from "../../__atoms";
import { IImageData } from "@/app/store/manage-image.store";

export type ImagesPropsTypes = {
  images: IImageData[];
};

const Banner = ({ images }: ImagesPropsTypes) => {
 const hasValidImage = images && images.length > 0 && images[0];

  const title = hasValidImage ? images[0].title?.split("/")[0] : "Shop Page";
  const subText = hasValidImage ? images[0].title?.split("/")[1] : "Let’s design the place you always imagined.";

  return (
    <section className="w-full md:px-[11.11%] px-[8.53%]">
      <div className="w-full  relative ">
        <Image
          src={images[0]?.presignedUrl || "/assets/product_banner.png"}
          alt={images[0]?.imageName || "Banner image"}
          width={1120}
          height={392}
          sizes="(max-width: 767px) 311px, 100vw"
          className="object-cover shadow-xl w-[311px] h-[308px] md:w-full md:h-auto"
        />
        <div className="w-full h-full absolute inset-0 flex flex-col items-center justify-center gap-4 lg:gap-6">
          <div className="w-fill h-fit flex  items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <p className="text-sm text-[#605F5F] font-medium leading-[24px]">
                Home
              </p>
              <div className="w-auto h-fit flex items-center justify-center pt-1">
                <ChevronRight />
              </div>
            </div>

            <p className="text-sm text-[#605F5F] font-medium leading-[24px]">
              Shop
            </p>
          </div>

          <h1 className="font-medium text-[40px] text-[#121212] leading-[44px] md:text-[54px] md:leading-[58px] tracking-[-0.4px] md:tracking-[-1px]">
            {title}
          </h1>
          <p className="text-base md:text-[20px] font-normal leading-[26px] md:leading-[32px] text-[#121212] px-4 md:px-0 text-center">
            {subText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
