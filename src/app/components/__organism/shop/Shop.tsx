// "use client";
// import { usePathname } from "next/navigation";
// import { useEffect, useMemo,  useState } from "react";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import useManageImageStore from "@/app/store/manage-image.store";
// import { AnimateSpin } from "../../__molecules";
// import Banner from "../banner/Banner";
// import FilterSection from "../filterSection/FilterSection";
// import Products from "../products/Products";

// const Shop = () => {
//   const {  isLoading } = useSignInStore();
//   const {  imagesData, currentPage, fetchImagesByPage } =
//     useManageImageStore();
//   const pathname = usePathname();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   // useEffect(() => {
//   //   setMounted(true);
//   //   cleanup();
//   //   initialized.current = false;

//   //   return () => {
//   //     cleanup();
//   //     initialized.current = false;
//   //   };
//   // }, [pathname]);

//   useEffect(() => {
//     if (mounted) {
//       const page = pathname?.split("/").pop() || "default";
//       if (page && page !== currentPage) {
//         fetchImagesByPage(page);
//       }
//     }
//   }, [mounted, pathname, fetchImagesByPage, currentPage]);

//   // useEffect(() => {
//   //   if (mounted) {
//   //     initialize();
//   //   }
//   // }, [initialize, mounted]);

//   const bannerImages = useMemo(
//     () =>
//       imagesData.filter((img) => img.componentUsage?.includes("banner")) || [],
//     [imagesData]
//   );

//   if (isLoading) return <AnimateSpin />;
//   // if (!accessToken) return null;

//   return (
//     <section className="w-full min-h-screen">
//       <Banner images={bannerImages} />
//       <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col md:flex-row items-start justify-start pt-[60px] pb-[100px] gap-6">
//         <FilterSection />
//         {imagesData.length > 0 && <Products />}
//       </div>
//     </section>
//   );
// };

// export default Shop;

"use client";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";
import useManageImageStore from "@/app/store/manage-image.store";
import { AnimateSpin } from "../../__molecules";
import Banner from "../banner/Banner";
import FilterSection from "../filterSection/FilterSection";
import Products from "../products/Products";
import { useProductsFilterStore } from "@/app/store/products.filter.store";

const Shop = () => {
  const {
    imagesData,
    currentPage,
    fetchImagesByPage,
    isLoading,

    cleanupImages,
  } = useManageImageStore();
  const pathName = usePathname();
  // const [mounted, setMounted] = useState(false);
  const { getAllProducts, productsData, cleanupProducts } =
    useProductsFilterStore();

  const { sortedByFour, sortByTwoVertically, sortByTwoHorizontally } =
    useProductsFilterStore();
  const isResorted =
    sortedByFour || sortByTwoVertically || sortByTwoHorizontally;

  const page = useMemo(
    () => pathName?.split("/").pop() || "default",
    [pathName]
  );
  console.log(productsData, "productsData");

  useEffect(() => {
    if (page && page !== currentPage) {
      fetchImagesByPage(page);
      getAllProducts();
    }
  }, [page, currentPage,                                   fetchImagesByPage, getAllProducts]);

  useEffect(() => {
    return () => {
      cleanupProducts();
      cleanupImages();
    };
  }, []);

  const bannerImages = useMemo(
    () =>
      imagesData.filter((img) => img.componentUsage?.includes("banner")) || [],
    [imagesData]
  );

  if (isLoading) return <AnimateSpin />;

  return (
    <section className="w-full min-h-screen">
      <Banner images={bannerImages} />
      <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col md:flex-row items-start justify-start pt-10 pb-[100px] gap-6">
        {!isResorted && <FilterSection />}
        {imagesData.length > 0 && <Products />}
      </div>
    </section>
  );
};

export default Shop;
