"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { ChevronRight } from "../../__atoms";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import SaleOffer from "../saleOffer/SaleOffer";
import { useHomePageStore } from "@/app/store/useHomePage.store.";
import { AnimateSpin } from "../../__molecules";
import { contacts } from "@/app/commons/data";
import { Store, Call, Mail } from "../../__atoms";
import EmailForm from "../emailForm/EmailForm";

const iconMap: Record<string, React.FC> = {
  store: Store,
  call: Call,
  mail: Mail,
};

const ContactUs = () => {
  const pathName = usePathname();
  const page = useMemo(() => {
    const parts = pathName?.split("/") || [];
    return parts[1] || "default";
  }, [pathName]);



  const { normalizeFirstChar } = useShopStore();
  const { getAllImages, cachedImagesByPage, isLoading, axiosError } =
    useHomePageStore();

  useEffect(() => {
    getAllImages("home");
  }, [getAllImages]);

  const saleOfferImages = useMemo(() => {
    const homeImages = cachedImagesByPage["home"] || [];

    if (!Array.isArray(homeImages)) return [];

    return homeImages.filter((img) =>
      img.componentUsage?.some((usage) => usage.toLowerCase() === "saleoffer")
    );
  }, [cachedImagesByPage]);

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <AnimateSpin />
      </div>
    );
  }

  if (axiosError) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-red-500">Error: {axiosError}</p>
      </div>
    );
  }

  return (
    <section className="w-full md:px-[11.11%] px-[8.53%] flex flex-col pt-8 md:pt-6 pb-10 gap-12 md:gap-10">
      <div className="w-full flex flex-col gap-12 md:gap-10">
        <div className="flex items-center gap-4 text-sm font-medium leading-[24px]">
          <ChevronRight />
          <span>Home</span>
          <ChevronRight />
          <span>{normalizeFirstChar(page)} Us</span>
        </div>
        <div className="flex flex-col items-start gap-6 lg:max-w-[834px]">
          <h1 className="font-medium text-[28px] leading-[34px] tracking-[-0.6px]  md:text-[54px] md:leading-[58px] md:tracking-[-1px] text-[#141718]">
            We believe in sustainable decor. We&rsquo;re passionate about life
            at home.
          </h1>
          <p className="text-[#141718] text-base leading-[26px] font-normal">
            Our features timeless furniture, with natural fabrics, curved lines,
            plenty of mirrors and classic design, which can be incorporated into
            any decor project. The pieces enchant for their sobriety, to last
            for generations, faithful to the shapes of each period, with a touch
            of the present
          </p>
        </div>
      </div>

      {saleOfferImages.length > 0 && (
        <div className="w-full">
          <SaleOffer images={saleOfferImages} page={page} />
        </div>
      )}

      <div className="w-full flex flex-col gap-10">
        <h1 className="text-[34px] w-full text-center font-medium leading-[38px] tracking-[-0.6px] text-[#141718] lg:text-[40px] lg:leading-11 lg:tracking-[-0.4px]">
          Contact Us
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {contacts.map((contact) => {
            const Icon = iconMap[contact.iconName];

            return (
              <div
                key={`${contact.segment}-${contact.iconName}`}
                className="flex flex-col items-center text-center py-6 px-4 bg-[#F3F5F7] rounded-md justify-start"
              >
                <div className="h-10 flex items-center justify-center mb-4">
                  {Icon && <Icon />}
                </div>

                <h2 className="text-lg font-semibold mb-2">
                  {contact.segment}
                </h2>

                <div className="text-sm text-[#6C7275] flex flex-col gap-1">
                  {contact.street && (
                    <>
                      <span>
                        <span>{contact.street}</span>
                        {contact.city}, {contact.zip}
                      </span>
                      <p>{contact.country}</p>
                    </>
                  )}

                  {contact.tel && <p>{contact.tel}</p>}
                  {contact.mail && <p>{contact.mail}</p>}
                </div>
              </div>
            );
          })}
        </div>

        <EmailForm />


      </div>
    </section>
  );
};

export default ContactUs;
