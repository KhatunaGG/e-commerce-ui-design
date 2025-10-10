// "use client";
// import { useShopStore } from "@/app/store/shop-page.store";
// import { ChevronRight } from "../../__atoms";
// import { usePathname } from "next/navigation";
// import { useEffect, useMemo } from "react";
// import SaleOffer from "../saleOffer/SaleOffer";
// import { useHomePageStore } from "@/app/store/useHomePage.store.";

// const ContactUs = () => {
//   const pathName = usePathname();
//   const page = useMemo(() => {
//     const parts = pathName?.split("/") || [];
//     return parts[1] || "default";
//   }, [pathName]);
//   const { normalizeFirstChar } = useShopStore();
//   const {
//     setCurrentPage,
//     imagesData,
//     cachedImagesByPage,
//     isLoading,
//     axiosError,
//   } = useHomePageStore();

//   useEffect(() => {
//     if (!page) return;
//     const isAlreadyCached = cachedImagesByPage[page]?.length > 0;
//     console.log("Contact Page Cache Exists:", isAlreadyCached);
//     console.log("Cached Data for Contact Page:", cachedImagesByPage[page]);

//     if (!isAlreadyCached) {
//       setCurrentPage(page);
//     }
//   }, [page, setCurrentPage, cachedImagesByPage]);

//   const saleOfferImages = useMemo(() => {
//     if (!imagesData || !Array.isArray(imagesData)) return [];
//     return imagesData.filter((img) =>
//       img.componentUsage?.includes("saleoffer")
//     );
//   }, [imagesData]);

//   console.log("saleOfferImages:", saleOfferImages);

//   return (
//     <section className="w-full md:px-[11.11%] px-[8.53%] flex flex-col pt-8 md:pt-6 pb-10 gap-12 md:gap-10">
//       <div className="w-full flex flex-col gap-12 md:gap-10">
//         <div className="flex items-center gap-4 text-sm font-medium leading-[24px]">
//           <ChevronRight />
//           <span>Home</span>
//           <ChevronRight />
//           <span>{normalizeFirstChar(page)} Us</span>
//         </div>
//         <div className="flex flex-col items-start gap-6 lg:max-w-[834px]">
//           <h1 className="font-medium text-[28px] leading-[34px] tracking-[-0.6px]  md:text-[54px] md:leading-[58px] md:tracking-[-1px] text-[#141718]  ">
//             We believe in sustainable decor. We’re passionate about life at
//             home.
//           </h1>
//           <p className="text-[#141718] text-base leading-[26px] font-normal">
//             Our features timeless furniture, with natural fabrics, curved lines,
//             plenty of mirrors and classic design, which can be incorporated into
//             any decor project. The pieces enchant for their sobriety, to last
//             for generations, faithful to the shapes of each period, with a touch
//             of the present
//           </p>
//         </div>
//       </div>

//       <div className="IMage w-full bg-green-300">
//         <h1>111111111111111</h1>
//         <SaleOffer images={saleOfferImages} />
//       </div>
//       <div className="MAP"></div>
//     </section>
//   );
// };

// export default ContactUs;













"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { ChevronRight } from "../../__atoms";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import SaleOffer from "../saleOffer/SaleOffer";
import { useHomePageStore } from "@/app/store/useHomePage.store.";
import { AnimateSpin } from "../../__molecules";

const ContactUs = () => {
  const pathName = usePathname();
  const page = useMemo(() => {
    const parts = pathName?.split("/") || [];
    return parts[1] || "default";
  }, [pathName]);
  
  const { normalizeFirstChar } = useShopStore();
  const {
    getAllImages,
    cachedImagesByPage,
    isLoading,
    axiosError,
  } = useHomePageStore();

  useEffect(() => {
    // Load home page images for the SaleOffer component
    getAllImages("home");
  }, [getAllImages]);

  // Get sale offer images from home page
  const saleOfferImages = useMemo(() => {
    const homeImages = cachedImagesByPage["home"] || [];
    
    if (!Array.isArray(homeImages)) return [];
    
    return homeImages.filter((img) =>
      img.componentUsage?.some(usage => 
        usage.toLowerCase() === "saleoffer"
      )
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
            We believe in sustainable decor. We&rsquo;re passionate about life at home.
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
      
      <div className="MAP"></div>
    </section>
  );
};

export default ContactUs;