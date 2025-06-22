// "use client";
// import { usePathname } from "next/navigation";
// import { useEffect, useMemo } from "react";
// import { AnimateSpin, SubText } from "../../__molecules";
// import Hero from "../hero/Hero";
// import ByRooms from "../byRooms/ByRooms";
// import NewArrivals from "../newArrivals/NewArrivals";
// import Info from "../info/Info";
// import SaleOffer from "../saleOffer/SaleOffer";
// import Articles from "../articles/Articles";
// import { useHomePageStore } from "@/app/store/useHomePage.store.";

// const Dashboard = () => {
//   const { isLoading, getCurrentPage, imagesData  } =
//     useHomePageStore();
//   const path = usePathname();

//   const page = useMemo(
//     () => path?.split("/").filter(Boolean).pop() || "home",
//     [path]
//   );

//   useEffect(() => {
//     getCurrentPage(page);
//       return () => {
//       useHomePageStore.getState().clearImagesData();
//   };
//   }, [page, getCurrentPage]);

//   const heroImages = useMemo(() => {
//     const filtered =
//       imagesData.filter((img) => img.componentUsage?.includes("hero")) || [];
//     return filtered;
//   }, [imagesData]);

//   const byRoomImages = useMemo(() => {
//     const filtered =
//       imagesData.filter((img) => img.componentUsage?.includes("byroom")) || [];
//     return filtered;
//   }, [imagesData]);

//   const newArrivalsImages = useMemo(() => {
//     const filtered =
//       imagesData.filter((img) => img.componentUsage?.includes("newarrivals")) ||
//       [];
//     return filtered;
//   }, [imagesData]);

//   const saleOfferImages = useMemo(() => {
//     const filtered =
//       imagesData.filter((img) => img.componentUsage?.includes("saleoffer")) ||
//       [];
//     return filtered;
//   }, [imagesData]);

//   const articleImages = useMemo(() => {
//     const filtered =
//       imagesData.filter((img) => img.componentUsage?.includes("article")) || [];
//     return filtered;
//   }, [imagesData]);

//   if (isLoading) {
//     return <AnimateSpin />;
//   }


//   return (
//     <section className="w-full">
//       <div className="w-full h-full flex flex-col">
//         <Hero images={heroImages} />
//         <SubText />
//         <ByRooms images={byRoomImages} />
//         <NewArrivals images={newArrivalsImages} />
//         <Info />
//         <SaleOffer images={saleOfferImages} />
//         <Articles images={articleImages} />
//       </div>
//     </section>
//   );
// };

// export default Dashboard;




"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useCallback } from "react";
import { AnimateSpin, SubText } from "../../__molecules";
import Hero from "../hero/Hero";
import ByRooms from "../byRooms/ByRooms";
import NewArrivals from "../newArrivals/NewArrivals";
import Info from "../info/Info";
import SaleOffer from "../saleOffer/SaleOffer";
import Articles from "../articles/Articles";
import { useHomePageStore } from "@/app/store/useHomePage.store.";


const Dashboard = () => {
  const { 
    isLoading, 
    setCurrentPage, 
    imagesData,
    clearCurrentPageData,
    axiosError 
  } = useHomePageStore();
  
  const path = usePathname();

  const page = useMemo(
    () => path?.split("/").filter(Boolean).pop() || "home",
    [path]
  );

  // Memoize the page change handler to prevent unnecessary re-renders
  const handlePageChange = useCallback(async () => {
    await setCurrentPage(page);
  }, [page, setCurrentPage]);

  useEffect(() => {
    handlePageChange();
    return () => {
      clearCurrentPageData();
    };
  }, [handlePageChange, clearCurrentPageData]);

  const heroImages = useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData)) return [];
    return imagesData.filter(img => 
      img.componentUsage?.includes("hero")
    );
  }, [imagesData]);

  const byRoomImages = useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData)) return [];
    return imagesData.filter(img => 
      img.componentUsage?.includes("byroom")
    );
  }, [imagesData]);

  const newArrivalsImages = useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData)) return [];
    return imagesData.filter(img => 
      img.componentUsage?.includes("newarrivals")
    );
  }, [imagesData]);

  const saleOfferImages = useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData)) return [];
    return imagesData.filter(img => 
      img.componentUsage?.includes("saleoffer")
    );
  }, [imagesData]);

  const articleImages = useMemo(() => {
    if (!imagesData || !Array.isArray(imagesData)) return [];
    return imagesData.filter(img => 
      img.componentUsage?.includes("article")
    );
  }, [imagesData]);

  if (isLoading) {
    return <AnimateSpin />;
  }

  if (axiosError) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p className="text-red-500">Error: {axiosError}</p>
      </div>
    );
  }

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