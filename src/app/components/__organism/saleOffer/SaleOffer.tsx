import Image from "next/image";
import { ArrowRight } from "../../__atoms";
import Link from "next/link";
import { SaleOfferProps } from "@/app/interfaces/interface";

const SaleOffer = ({ images, page }: SaleOfferProps) => {
  if (!images.length) {
    return null;
  }

  return (
    <section className="w-full bg-[#F3F5F7] flex flex-col lg:flex-row gap-[72px]">
      <div className="w-full lg:flex-1 relative min-h-[532px]">
        <Image
          src={images[0].presignedUrl}
          alt="Sale offer image"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className={` w-full lg:flex-1 flex items-center justify-center`}>
        <div className="w-full flex flex-col md:items-start px-4 lg:px-0 pb-[63.5px] gap-6">
          <div className="flex-1 w-auto flex flex-col items-start gap-4  text-[#377DFF]">
            <h3
              className={`${
                page ? "hidden" : "flex"
              }  text-base font-bold leading-4 uppercase`}
            >
              SALE UP TO 35% OFF
            </h3>{" "}
            <h2 className="text-[34px] font-medium leading-[38px] tracking-[-0.6px] text-[#141718] lg:text-[40px] lg:leading-11 lg:tracking-[-0.4px]">
              {page ? (
                <span className="block">About Us</span>
              ) : (
                <>
                  <span className="block">HUNDREDS of</span>
                  <span className="block">New lower prices!</span>
                </>
              )}
            </h2>
            <p className="text-[#141718] text-[20px] font-normal leading-[32px]">
              {page ? (
                <>
                  <span className="block">
                    3legant is a gift & decorations store based in HCMC,{" "}
                  </span>
                  <span className="block">Vietnam. Est since 2019.</span>
                  <span className="block">
                    Our customer service is always prepared to support you
                  </span>
                  <span className="block"> 24/7</span>
                </>
              ) : (
                <>
                  <span className="block">
                    It’s more affordable than ever to give every
                  </span>
                  <span className="block">
                    room in your home a stylish makeover{" "}
                  </span>
                </>
              )}
            </p>
          </div>
          <Link className="w-ful flex items-start  gap-1 " href={"/shop"}>
            <button className="text-base font-medium leading-[28px] tracking-[-0.4px] cursor-pointer">
              Shop Now
            </button>
            <div className="w-auto h-fit pt-[6px]">
              <ArrowRight />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SaleOffer;
