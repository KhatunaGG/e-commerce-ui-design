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

// FIXED DASHBOARD COMPONENT

// "use client";
// import { usePathname } from "next/navigation";
// import { useEffect, useMemo } from "react";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import useManageImageStore from "@/app/store/manage-image.store";
// import { AnimateSpin, SubText } from "../../__molecules";
// import Hero from "../hero/Hero";
// import ByRooms from "../byRooms/ByRooms";
// import NewArrivals from "../newArrivals/NewArrivals";
// import Info from "../info/Info";
// import SaleOffer from "../saleOffer/SaleOffer";
// import Articles from "../articles/Articles";

// const Dashboard = () => {
//   const { isLoading } = useSignInStore();
//   const {
//     imagesData,
//     isLoading: storeIsLoading,
//     currentPage,
//     currentPath,
//     axiosError
//   } = useManageImageStore();

//   const pathName = usePathname();

//   const page = useMemo(
//     () => pathName?.split("/").pop() || "",
//     [pathName]
//   );

//   useEffect(() => {

//     // Always fetch if we don't have the right page data
//     if (page && (currentPage !== page || imagesData.length === 0)) {
//       console.log(">>> Fetching data for page:", page);

//       // First set the path if it's different
//       if (pathName !== currentPath) {
//         console.log(">>> Setting new path:", pathName);
//         useManageImageStore.getState().setPath(pathName || "");
//       }

//       // Then fetch the images
//       console.log(">>> Calling fetchImagesByPage for:", page);
//       useManageImageStore.getState().fetchImagesByPage(page);
//     } else {
//       console.log(">>> No fetch needed. Current page matches or no page defined");
//     }
//   }, [pathName, page]); // Simplified dependencies

//   useEffect(() => {
//     return () => {
//       console.log(">>> Dashboard unmounting, cleaning up");
//       useManageImageStore.getState().cleanupImages();
//     };
//   }, []);

//   const heroImages = useMemo(
//     () => {
//       const filtered = imagesData.filter((img) => img.componentUsage?.includes("hero")) || [];
//       console.log("heroImages count:", filtered.length);
//       return filtered;
//     },
//     [imagesData]
//   );

//   const byRoomImages = useMemo(
//     () => {
//       const filtered = imagesData.filter((img) => img.componentUsage?.includes("byroom")) || [];
//       console.log("byRoomImages count:", filtered.length);
//       return filtered;
//     },
//     [imagesData]
//   );

//   const newArrivalsImages = useMemo(
//     () => {
//       const filtered = imagesData.filter((img) => img.componentUsage?.includes("newarrivals")) || [];
//       console.log("newArrivalsImages count:", filtered.length);
//       return filtered;
//     },
//     [imagesData]
//   );

//   const saleOfferImages = useMemo(
//     () => {
//       const filtered = imagesData.filter((img) => img.componentUsage?.includes("saleoffer")) || [];
//       console.log("saleOfferImages count:", filtered.length);
//       return filtered;
//     },
//     [imagesData]
//   );

//   const articleImages = useMemo(
//     () => {
//       const filtered = imagesData.filter((img) => img.componentUsage?.includes("article")) || [];
//       console.log("articleImages count:", filtered.length);
//       return filtered;
//     },
//     [imagesData]
//   );

//   if (isLoading ) {
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
import { useEffect, useMemo } from "react";
import { AnimateSpin, SubText } from "../../__molecules";
import Hero from "../hero/Hero";
import ByRooms from "../byRooms/ByRooms";
import NewArrivals from "../newArrivals/NewArrivals";
import Info from "../info/Info";
import SaleOffer from "../saleOffer/SaleOffer";
import Articles from "../articles/Articles";
import { useHomePageStore } from "@/app/store/useHomePage.store.";

const Dashboard = () => {
  const { isLoading, getCurrentPage, imagesData  } =
    useHomePageStore();
  const path = usePathname();

  const page = useMemo(
    () => path?.split("/").filter(Boolean).pop() || "home",
    [path]
  );

  useEffect(() => {
    getCurrentPage(page);
      return () => {

      useHomePageStore.getState().clearImagesData();
  };
  }, [page, getCurrentPage]);

  const heroImages = useMemo(() => {
    const filtered =
      imagesData.filter((img) => img.componentUsage?.includes("hero")) || [];
    return filtered;
  }, [imagesData]);

  const byRoomImages = useMemo(() => {
    const filtered =
      imagesData.filter((img) => img.componentUsage?.includes("byroom")) || [];
    return filtered;
  }, [imagesData]);

  const newArrivalsImages = useMemo(() => {
    const filtered =
      imagesData.filter((img) => img.componentUsage?.includes("newarrivals")) ||
      [];
    return filtered;
  }, [imagesData]);

  const saleOfferImages = useMemo(() => {
    const filtered =
      imagesData.filter((img) => img.componentUsage?.includes("saleoffer")) ||
      [];
    return filtered;
  }, [imagesData]);

  const articleImages = useMemo(() => {
    const filtered =
      imagesData.filter((img) => img.componentUsage?.includes("article")) || [];
    return filtered;
  }, [imagesData]);

  if (isLoading) {
    return <AnimateSpin />;
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
