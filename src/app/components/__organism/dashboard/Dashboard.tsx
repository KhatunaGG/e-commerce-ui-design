// "use client";
// import { useRouter } from "next/navigation";
// import Hero from "../hero/Hero";
// import { useEffect } from "react";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { AnimateSpin, SubText } from "../../__molecules";
// import ByRooms from "../byRooms/ByRooms";
// import useManageImageStore from "@/app/store/manage-image.store";
// import NewArrivals from "../newArrivals/NewArrivals";
// import Info from "../info/Info";
// import SaleOffer from "../saleOffer/SaleOffer";
// import Articles from "../articles/Articles";

// const Dashboard = () => {
//   const { accessToken, initialize, isLoading } = useSignInStore();
//   const { imagesData, fetchImagesByPage, clearImages } = useManageImageStore();
//   const router = useRouter();

//   useEffect(() => {
//     initialize();
//   }, [initialize]);

//   useEffect(() => {
//   fetchImagesByPage("home");
//   return () => {
//     clearImages();
//   };
// }, []);

//   if (isLoading || !accessToken) {
//     return <AnimateSpin />;
//   }
//   if (!accessToken) router.push("/sign-up");

//   return (
//     <section className="w-full        ">
//       <div className="w-full h-full flex flex-col">
//         <Hero
//           images={imagesData.filter((img) =>
//             img.componentUsage.includes("hero")
//           )}
//         />
//         <SubText />
//         <ByRooms
//           images={imagesData.filter((img) =>
//             img.componentUsage.includes("byroom")
//           )}
//         />
//         <NewArrivals
//           images={imagesData.filter((img) =>
//             img.componentUsage.includes("newarrivals")
//           )}
//         />
//         <Info />
//         <SaleOffer images={imagesData.filter((img) =>
//         img.componentUsage.includes("saleoffer"))} />
//         <Articles images={imagesData.filter((img) =>
//           img.componentUsage.includes("article")
//         )} />
//       </div>
//     </section>
//   );
// };

// export default Dashboard;

"use client";
import {  usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSignInStore } from "@/app/store/sign-in.store";
import useManageImageStore from "@/app/store/manage-image.store";
import { AnimateSpin, SubText } from "../../__molecules";
import Hero from "../hero/Hero";
import ByRooms from "../byRooms/ByRooms";
import NewArrivals from "../newArrivals/NewArrivals";
import Info from "../info/Info";
import SaleOffer from "../saleOffer/SaleOffer";
import Articles from "../articles/Articles";

const Dashboard = () => {
  const { initialize, isLoading } = useSignInStore();
  const { imagesData, cleanup } = useManageImageStore();
  const pathname = usePathname();
  const initialized = useRef(false);
  const [mounted, setMounted] = useState(false);


  // useEffect(() => {
  //   setMounted(true);
  //   cleanup();
  //   initialized.current = false;
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

  // useEffect(() => {
  //   return () => {
  //     cleanup();
  //     initialized.current = false;
  //   };
  // }, [cleanup]);

  const heroImages = useMemo(
    () =>
      imagesData.filter((img) => img.componentUsage?.includes("hero")) || [],
    [imagesData]
  );

  const byRoomImages = useMemo(
    () =>
      imagesData.filter((img) => img.componentUsage?.includes("byroom")) || [],
    [imagesData]
  );

  const newArrivalsImages = useMemo(
    () =>
      imagesData.filter((img) => img.componentUsage?.includes("newarrivals")) ||
      [],
    [imagesData]
  );

  const saleOfferImages = useMemo(
    () =>
      imagesData.filter((img) => img.componentUsage?.includes("saleoffer")) ||
      [],
    [imagesData]
  );

  const articleImages = useMemo(
    () =>
      imagesData.filter((img) => img.componentUsage?.includes("article")) || [],
    [imagesData]
  );

  if (isLoading) return <AnimateSpin />;
  // if (!accessToken) return null;

  return (
    <section className="w-full">
      <div className="w-full h-full flex flex-col">
        <Hero images={heroImages} />
        <SubText />
        <ByRooms images={byRoomImages} />
        <NewArrivals images={newArrivalsImages} />
        <Info />
        <SaleOffer images={saleOfferImages} />
        <Articles images={articleImages} />
      </div>
    </section>
  );
};
export default Dashboard;
