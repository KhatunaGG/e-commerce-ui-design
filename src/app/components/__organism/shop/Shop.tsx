// "use client";
// import { usePathname } from "next/navigation";
// import { useEffect, useMemo } from "react";
// import useManageImageStore from "@/app/store/manage-image.store";
// import { AnimateSpin } from "../../__molecules";
// import Banner from "../banner/Banner";
// import FilterSection from "../filterSection/FilterSection";
// import Products from "../products/Products";
// import { useProductsFilterStore } from "@/app/store/products.filter.store";

// const Shop = () => {
//   const {
//     imagesData,
//     currentPage,
//     fetchImagesByPage,
//     isLoading,

//     cleanupImages,
//   } = useManageImageStore();
//   const pathName = usePathname();
//   // const [mounted, setMounted] = useState(false);
//   const { getAllProducts, productsData, cleanupProducts } =
//     useProductsFilterStore();

//   const { sortedByFour, sortByTwoVertically, sortByTwoHorizontally } =
//     useProductsFilterStore();
//   const isResorted =
//     sortedByFour || sortByTwoVertically || sortByTwoHorizontally;

//   const page = useMemo(
//     () => pathName?.split("/").pop() || "default",
//     [pathName]
//   );
//   console.log(productsData, "productsData");

//   useEffect(() => {
//     if (page && page !== currentPage) {
//       fetchImagesByPage(page);
//       getAllProducts();
//     }
//   }, [page, currentPage,                                   fetchImagesByPage, getAllProducts]);

//   useEffect(() => {
//     return () => {
//       cleanupProducts();
//       cleanupImages();
//     };
//   }, []);

//   const bannerImages = useMemo(
//     () =>
//       imagesData.filter((img) => img.componentUsage?.includes("banner")) || [],
//     [imagesData]
//   );

//   if (isLoading) return <AnimateSpin />;

//   return (
//     <section className="w-full min-h-screen">
//       <Banner images={bannerImages} />
//       <div className="w-full md:px-[11.11%] px-[8.53%] flex flex-col md:flex-row items-start justify-start pt-10 pb-[100px] gap-6">
//         {!isResorted && <FilterSection />}
//         {imagesData.length > 0 && <Products />}
//       </div>
//     </section>
//   );
// };

// export default Shop;

"use client";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import { AnimateSpin } from "../../__molecules";
import Banner from "../banner/Banner";
import FilterSection from "../filterSection/FilterSection";
import Products from "../products/Products";
import { useHomePageStore } from "@/app/store/useHomePage.store.";
import { useShopPageStore } from "@/app/store/useShopPage.store";

const Shop = () => {
  const {
    imagesData,
    currentPage: shopCurrentPage,
    isLoading,
    getAllImages,
    clearCurrentPageData: clearHomePageData,
    setCurrentPage,
  } = useHomePageStore();
  const pathName = usePathname();

  const { getAllProducts, clearCurrentPageData: clearShopPageData } =
    useShopPageStore();

  const page = useMemo(
    () => pathName?.split("/").pop() || "default",
    [pathName]
  );

  const handlePageChange = useCallback(async () => {
    await setCurrentPage(page);
  }, [page, setCurrentPage]);

  useEffect(() => {
    if (page && page !== shopCurrentPage) {
      getAllImages(page);
      getAllProducts(page);
    }
  }, [page, shopCurrentPage, getAllImages, getAllProducts]);

  useEffect(() => {
    handlePageChange();
    return () => {
      clearShopPageData();
      clearHomePageData();
    };
  }, [handlePageChange, clearHomePageData, clearShopPageData]);

  const { sortedByFour, sortByTwoVertically, sortByTwoHorizontally } =
    useShopPageStore();
  const isResorted =
    sortedByFour || sortByTwoVertically || sortByTwoHorizontally;

  // useEffect(() => {
  //   return () => {
  //     clearHomePageData();
  //     clearShopPageData();
  //   };
  // }, []);

  useEffect(() => {
    handlePageChange();
    return () => {
      clearHomePageData();
      clearShopPageData();
    };
  }, [handlePageChange, clearHomePageData, clearShopPageData]);

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
