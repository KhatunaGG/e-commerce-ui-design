"use client";
import { useProductStore } from "@/app/store/product.store";
import { ChevronDown } from "../../__atoms";
import { useShopPageStore } from "@/app/store/useShopPage.store";
import Reviews from "../reviews/Reviews";


export type TapsPropsType = {
  params: string;
  productName: string
}

export default function Tabs({productName, params}: TapsPropsType) {
  const { activeTab, setActiveTab } = useProductStore();
  const { normalizeFirstChar } = useShopPageStore();
  console.log(activeTab, "activeTab");
  return (
    <section className="w-full  py-10 flex flex-col gap-10 md:gap-12 ">
      <div className="hidden w-full md:flex gap-20">
        {["additional info", "questions", "reviews"].map((item, i) => {
          const count = item === "questions" || item === "reviews";
          return (
            <button
              key={i}
              onClick={() => setActiveTab(item)}
              className={`${
                activeTab === item ? "font-bold" : "font-medium"
              } flex flex-col gap-1 text-[18px]  leading-[32px] tracking-[-0.4px] text-[#807E7E] `}
            >
              <div className="w-full">
                {normalizeFirstChar(item)}
                {count && <span> (11)</span>}
              </div>
              {activeTab == item && (
                <span className="w-full h-[2px] bg-black"></span>
              )}
            </button>
          );
        })}
      </div>

      <div className="w-full flex flex-col ga-2 md:hidden">
        {["additional info", "questions", "reviews"].map((item, i) => {
          const count = item === "questions" || item === "reviews";
          return (
            <div
              key={i}
              className="w-full flex items-center justify-between p-1 border-b border-b-[#6C7275]"
            >
              <button
                onClick={() => setActiveTab(item)}
                className={`${
                  activeTab === item && "font-bold"
                } text-[18px] font-medium leading-[32px] tracking-[-0.4px] text-[#807E7E] `}
              >
                {normalizeFirstChar(item)}
                {count && <span> (11)</span>}
              </button>
              <div
                className={`${
                  activeTab === item ? "rotate-180" : "rotate-0"
                } transform duration-300 w-auto  `}
              >
                <ChevronDown />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "1rem" }} className="w-ful ">
        {activeTab === "additional info" && (
          <div className="w-full h-full">Additional Info.</div>
        )}

        {activeTab === "questions" && <div>This is Questions content.</div>}

        {activeTab === "reviews" && (
          <div className="w-full h-full">
            <Reviews productName={productName} params={params} />
          </div>
        )}
      </div>
    </section>
  );
}
