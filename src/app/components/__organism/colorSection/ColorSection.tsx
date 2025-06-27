"use client";
import { useShopPageStore } from "@/app/store/useShopPage.store";
import { ChevronRight } from "../../__atoms";
import { useProductStore } from "@/app/store/product.store";
import { useState } from "react";

export type ColorSectionPropsType = {
  colors: string[];
};

const ColorSection = ({ colors }: ColorSectionPropsType) => {
  const { getProductColor, selectedColor, setSelectedColor } =
    useProductStore();
  const { normalizeFirstChar } = useShopPageStore();
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <div
          onClick={() => {
            setShow(!show);
            setSelectedColor("");
          }}
          className="w-full flex items-center gap-4"
        >
          <p className="text-base font-semibold leading-[26px] text-[#6C7275] hover:text-gray-800 transition-colors duration-300 cursor-pointer ">
            Choose Color
          </p>
          <div className="pt-[2px]">
            <ChevronRight width="24px" height="24px" />
          </div>
        </div>

        <div
          className={`${
            show ? "opacity-100" : "opacity-0"
          }  w-full items-center justify-start space-y-2 lg:space-y-4 `}
        >
          <p className="text-black text-[20px] font-normal leading-[32px]">
            {selectedColor ? (
              normalizeFirstChar(selectedColor)
            ) : (
              <span>&nbsp;</span>
            )}
          </p>
          <div className="flex gap-4">
            {colors.map((c, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: c.replace(/\s+/g, ""),
                  cursor: "pointer",
                }}
                onClick={() => getProductColor(c)}
                className={`${selectedColor === c && "border-4 border-[#6C7275]"} w-10 h-10 border `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSection;
