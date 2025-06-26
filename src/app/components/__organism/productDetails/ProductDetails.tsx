"use client";
import { useProductStore } from "@/app/store/product.store";
import { useEffect } from "react";
import { AnimateSpin } from "../../__molecules";
import { ChevronRight } from "../../__atoms";
import { usePathname } from "next/navigation";
import { useShopPageStore } from "@/app/store/useShopPage.store";
import DetailsSection from "../detailsSection/DetailsSection";
import Tabs from "../tabs/Tabs";

export type ProductDetailsPropsType = {
  params: string;
};

const ProductDetails = ({ params }: ProductDetailsPropsType) => {
  const { getProductById, clearProduct, productById } = useProductStore();
  const { normalizeFirstChar } = useShopPageStore();
  const path = usePathname();
  const segments = path?.split("/").filter(Boolean) || [];
  const pageSegment = segments[0] || "";

  useEffect(() => {
    getProductById(params);
    return () => {
      clearProduct();
    };
  }, [params, getProductById, clearProduct]);

  if (!productById) return <AnimateSpin />;

  return (
    <section className="w-full min-h-screen md:px-[11.11%] px-[8.53%]  flex flex-col pb-10 lg:pb-[67px]">
      <div className="w-full flex flex-col">
        <div className="w-fill h-fit flex  items-center justify-start gap-4 py-4">
          <div className="flex items-center gap-1">
            <p className="text-sm text-[#605F5F] font-medium leading-[24px]">
              {normalizeFirstChar(pageSegment)}
            </p>
            <div className="w-auto h-fit flex items-center justify-center pt-1">
              <ChevronRight />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="text-sm text-[#605F5F] font-medium leading-[24px] flex flex-wrap items-center">
              {productById.category.map((c, i) => (
                <span key={i}>
                  {normalizeFirstChar(c)}
                  {i < productById.category.length - 1 && (
                    <span className="px-1">/</span>
                  )}
                </span>
              ))}
            </div>
            <div className="w-auto h-fit flex items-center justify-center pt-1">
              <ChevronRight />
            </div>
          </div>

          <p className="text-sm text-[#605F5F] font-medium leading-[24px]">
            {params && "Product"}
          </p>
        </div>

        <DetailsSection productById={productById} params={params} />
      </div>
      <Tabs productName={productById.productName} params={params} />
    </section>
  );
};

export default ProductDetails;
