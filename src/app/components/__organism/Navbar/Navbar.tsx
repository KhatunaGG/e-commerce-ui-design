"use client";
import { useEffect } from "react";
import { useCartStore } from "@/app/store/cart.store";
import { Add, Close, Minus } from "../../__atoms";
import Image from "next/image";
import { useShopStore } from "@/app/store/shop-page.store";

function Navbar() {
  const showNavbar = useCartStore((state) => state.showNavbar);
  const handleShowNavbar = useCartStore((state) => state.handleShowNavbar);
  const handleSelectColor = useCartStore((state) => state.handleSelectColor);
  const { cartData } = useCartStore();
  const { normalizeFirstChar } = useShopStore();

  console.log(cartData, "cartData");
  // console.log(cartDataLength, "cartDataLength");
  // console.log("Rendering image:", cartData.forEach(item => item.filePath));

  useEffect(() => {
    if (showNavbar && cartData.length === 0) {
    }
  }, [showNavbar, cartData]);

  useEffect(() => {
    if (showNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showNavbar]);

  if (!showNavbar) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/20 ">
      <div className=" min-w-[91.46%] max-w-[91.46%] md:min-w-[53.77%] lg:min-w-[28.68%] h-full bg-white flex flex-col items-start justify-start py-10 px-6 gap-2 md:gap-4">
        <div className="w-full flex items-center justify-between">
          <h2 className="font-normal text-[28px] leading-[34px] tracking-[-0.6px] ">
            Cart
          </h2>
          <button className="cursor-pointer" onClick={handleShowNavbar}>
            <Close />
          </button>
        </div>

        <div className="w-full h-full flex flex-col items-start justify-between ">
          <div className="w-full flex flex-col items-start  overflow-y-scroll">
            <div className="w-full flex flex-col items-start gap-4 md:gap-6 ">
              {cartData.length > 0 ? (
                cartData.map((item, i) => {
                  // const isNotSelected = item.color === "Please select color";
                  const isNotSelected = item.color === null;
                  const isLastItem = i === cartData.length - 1;
                  const isFirstItem = i === 0;
                  return (
                    <div
                      key={i}
                      className={`${isLastItem && "border-b-0"} ${
                        isFirstItem && "border-t-0"
                      } w-full flex items-start gap-2 md:gap-4 py-4 md:py-6 border-t border-t-black/20 border-b border-b-black/20`}
                    >
                      <div className="w-[23.32%] md:w-[19.37%] h-full bg-yellow-100">
                        {item.presignedUrl ? (
                          <Image
                            src={item.presignedUrl}
                            alt={item.productName}
                            width={80}
                            height={96}
                            className="object-cover w-full h-full"
                            unoptimized
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "/images/fallback.jpg";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col items-start gap-2  relative group">
                        <p className="text-xs md:text-sm font-semibold leading-[22px] text-[#141718]">
                          {item.productName}
                        </p>
                        <p className="text-xs font-normal leading-[20px] text-black/60 cursor-pointer">
                          Color:{" "}
                          <span
                            className={`${isNotSelected && "text-red-600"} `}
                          >
                           {item.color === null ? " Please select color" : normalizeFirstChar(item.color)}
                          </span>
                        </p>
                        {isNotSelected && (
                          <div
                            className="absolute top-6 left-1/2 -translate-x-1/2 md:left-[40%] md:translate-x-0 bg-white min-w-[120px] z-20 rounded-lg p-2 shadow-lg flex flex-col items-start gap-1
                                       opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition duration-300 ease-in-out"
                          >
                            {item.colors && item.colors.length > 0 ? (
                              item.colors.map((c, i) => (
                                <button
                                  key={i}
                                  onClick={() => handleSelectColor(item._id, c)}
                                  className="cursor-pointer text-sm text-black/70  p-1 rounded"
                                >
                     
                                {normalizeFirstChar ? normalizeFirstChar(c) : c}
                                </button>
                              ))
                            ) : (
                              <p>No colors found</p>
                            )}
                          </div>
                        )}
                            
                        <div className="border border-black/20 rounded-[4px] bg-[#F5F5F5] py-4 px-4 flex items-center justify-center gap-3 md:gap-6">
                          <button className="w-[20px] h-[20px] cursor-pointer">
                            <Minus />
                          </button>
                          <p>{item.purchasedQty}</p>
                          <button className="w-[20px] h-[20px] cursor-pointer">
                            <Add />
                          </button>
                        </div>
                      </div>

                      <div className="h-full font-semibold w-[22.32%] md:w-[21%] flex flex-col items-start gap-2">
                        <p className="text-xs md:text-sm leading-[22px]">
                          ${(item.price * item.purchasedQty).toFixed(2)}
                        </p>
                        <Close />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full h-auto flex items-center justify-center text-red-600 font-medium ">
                  No Products in cart
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex items-center justify-center  pb-10">
            <div className="flex flex-col gap-1">
              <button className="font-semibold text-sm leading-[22px]">
                View Cart
              </button>
              <div className="w-full h-[2px] bg-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
