"use client";
import { useCartStore } from "@/app/store/cart.store";
import { ChevronRight } from "../../__atoms";
import { useShopStore } from "@/app/store/shop-page.store";


export type ColorSectionPropsType = {
  colors: string[];
  setSelectedColor: (color: string | null) => void;
  selectedColor: string | null;
};

const ColorSection = ({
  colors,
  setSelectedColor,
  selectedColor,
}: ColorSectionPropsType) => {
  const { normalizeFirstChar } = useShopStore();
  const { show, setShow } = useCartStore();


  
  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="w-full flex flex-col items-start justify-start gap-2">
        <div
          onClick={() => {
            setShow(!show);
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
                onClick={() => setSelectedColor(c)}
                className={`${
                  selectedColor === c && "border-4 border-[#6C7275]"
                } w-10 h-10 border `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSection;
