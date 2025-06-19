// "use client";
// import React, { useEffect } from "react";
// import Banner from "../banner/Banner";
// import Filter from "../filter/Filter";
// import Products from "../products/Products";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import useManageImageStore from "@/app/store/manage-image.store";
// import { AnimateSpin } from "../../__molecules";
// import { useRouter } from "next/navigation";

// const Shop = () => {
//   const { accessToken, initialize, isLoading } = useSignInStore();
//   const { fetchImagesByPage, clearImages, imagesData } = useManageImageStore();
//   const router = useRouter();

//   useEffect(() => {
//     initialize();
//   }, []);

//   useEffect(() => {
//     if (accessToken) {
//       fetchImagesByPage("shop");
//     }
//     return () => {
//       clearImages();
//     };
//   }, [accessToken]);

//   if (!accessToken) return <AnimateSpin />;

//   return (
//     <section className="w-full min-h-screen ">
//       <Banner />
//       <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col md:flex-row items-center justify-start bg-green-200 pt-[60px] pb-[100px]">
//         <Filter />

//       </div>
//     </section>
//   );
// };

// export default Shop;

// "use client";
// import React, { useEffect, useCallback } from "react";
// import Banner from "../banner/Banner";
// import Filter from "../filter/Filter";
// import Products from "../products/Products";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import useManageImageStore from "@/app/store/manage-image.store";
// import { AnimateSpin } from "../../__molecules";
// import { useRouter } from "next/navigation";

// const Shop = () => {
//   const { accessToken, initialize, isLoading } = useSignInStore();
//   const { fetchImagesByPage, clearImages, imagesData } = useManageImageStore();
//   const router = useRouter();

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   // Memoize the fetch function
//   const fetchShopImages = useCallback(() => {
//     if (accessToken) {
//       fetchImagesByPage("shop");
//     }
//   }, [accessToken, fetchImagesByPage]);

//   useEffect(() => {
//     fetchShopImages();

//     // Cleanup function
//     return () => {
//       clearImages();
//     };
//   }, [fetchShopImages, clearImages]);

//   if (isLoading) {
//     return <AnimateSpin />;
//   }

//   if (!accessToken) {
//     router.push("/sign-up");
//     return <AnimateSpin />;
//   }

//   return (
//     <section className="w-full min-h-screen">
//       <Banner />
//       <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col md:flex-row items-center justify-start bg-green-200 pt-[60px] pb-[100px]">
//         <Filter />
//         {/* {imagesData.length > 0 && <Products images={imagesData} />} */}
//       </div>
//     </section>
//   );
// };

// export default Shop;

"use client";
import {  usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSignInStore } from "@/app/store/sign-in.store";
import useManageImageStore from "@/app/store/manage-image.store";
import { AnimateSpin } from "../../__molecules";
import Banner from "../banner/Banner";
import FilterSection from "../filterSection/FilterSection";
import Products from "../products/Products";


const Shop = () => {
  const { accessToken, initialize, isLoading } = useSignInStore();
  const {  cleanup, imagesData  } =
    useManageImageStore();
  const pathname = usePathname();
  const initialized = useRef(false);
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  useEffect(() => {
    setMounted(true);
    cleanup();
    initialized.current = false;

    return () => {
      cleanup();
      initialized.current = false;
    };
  }, [pathname]);

  useEffect(() => {
    if (mounted) {
      initialize();
    }
  }, [initialize, mounted]);

  if (isLoading) return <AnimateSpin />;
  if (!accessToken) return null;

  return (
    <section className="w-full min-h-screen">
      <Banner />
      <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col md:flex-row items-start justify-start pt-[60px] pb-[100px] gap-6">
        <FilterSection />
        {imagesData.length > 0 && <Products />}
      </div>
    </section>
  );
};

export default Shop;
