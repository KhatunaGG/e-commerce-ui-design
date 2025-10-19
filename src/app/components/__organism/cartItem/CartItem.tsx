"use client";
import { useCartStore } from "@/app/store/cart.store";
import { useShopStore } from "@/app/store/shop-page.store";
import Image from "next/image";
import Counter from "../counter/Counter";
import { Close } from "../../__atoms";
import { CartItemPropsType } from "@/app/interfaces/interface";

const CartItem = ({
  isFirstItem,
  isLastItem,
  isCartPage,
  isNotSelected,
  handleSelectColor,
  isCheckoutPage,
  ...item
}: CartItemPropsType) => {
  const { _id, productName, price, purchasedQty, color, presignedUrl, colors } =
    item;
  const { updateCartQty, deleteProductFromCart } = useCartStore();
  const { normalizeFirstChar } = useShopStore();

  return (
    <div
      className={`${isLastItem && "border-b-0"} ${isFirstItem && "border-t-0"} 
      ${isCheckoutPage && isLastItem ? "border-b border-b-black/20" : ""} 
      w-full flex items-start gap-2 md:gap-4 py-4 md:py-6  border-t border-t-black/20 border-b border-b-black/20`}
    >
      <div className={` w-[23.32%] md:w-[19.37%]  h-full  lg:h-full `}>
        {presignedUrl ? (
          <Image
            src={presignedUrl}
            alt={productName}
            width={80}
            height={96}
            className="object-cover w-full h-full"
            unoptimized
            priority={isCartPage}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div
        className={`${
          isCartPage && "md:h-[169px] lg:items-center lg:w-[32.65%]"
        } flex-1 h-full flex lg:flex-row items-start gap-2 md:gap-0 md:justify-between   relative group `}
      >
        <div
          className={`${
            isCartPage ? "lg:w-[32.65%] flex-1" : "flex-1"
          }   h-full flex flex-col items-start gap-2 md:gap-0 md:justify-between`}
        >
          <p className="text-xs md:text-sm font-semibold leading-[22px] text-[#141718]">
            {productName}
          </p>
          <p className="text-xs font-normal leading-[20px] text-black/60 cursor-pointer">
            Color:{" "}
            <span className={`${isNotSelected && "text-red-600"} `}>
              {color === null
                ? " Please select color"
                : normalizeFirstChar(color)}
            </span>
          </p>
          {isNotSelected && (
            <div
              className="absolute top-6 left-1/2 -translate-x-1/2 md:left-[40%] md:translate-x-0 bg-white min-w-[120px] z-20 rounded-lg p-2 shadow-lg flex flex-col items-start gap-1
            opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition duration-300 ease-in-out"
            >
              {colors && colors.length > 0
                ? colors?.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectColor?.(_id, c)}
                      className="cursor-pointer text-sm text-black/70  p-1 rounded"
                    >
                      {normalizeFirstChar ? normalizeFirstChar(c) : c}
                    </button>
                  ))
                : ""}
            </div>
          )}

          <button
            onClick={() => deleteProductFromCart(_id, color)}
            className={`${
              isCartPage ? "lg:flex hidden " : "hidden"
            } group cursor-pointer w-[20px] h-[20px] rounded-[4px] flex items-center justify-center
            transition-all duration-300 ease-in-out text-[#343839] hover:text-red-600 hover:scale-105`}
          >
            <Close />
          </button>

          <div className={`${isCartPage && "lg:hidden"}`}>
            <Counter
              id={_id}
              color={color}
              quantity={purchasedQty}
              onChange={(newQty: number) => updateCartQty(_id, color, newQty)}
              isCartPage={isCartPage}
              show={true}
              isCheckoutPage={isCheckoutPage}
            />
          </div>
        </div>
      </div>

      <div
        className={`${
          isCartPage &&
          "lg:w-[51.14%] lg:flex-row lg:items-center lg:justify-between lg:text-center"
        } h-full font-semibold w-[22.32%] md:w-[21%] flex flex-col items-start gap-2 `}
      >
        <div className={`${isCartPage ? "lg:flex hidden" : "hidden"} `}>
          <Counter
            id={item._id}
            color={item.color}
            quantity={item.purchasedQty}
            onChange={(newQty: number) => updateCartQty(_id, color, newQty)}
            isCartPage={isCartPage}
            show={true}
          />
        </div>
        <p className="text-xs md:text-sm leading-[22px] lg:w-full">
          ${(price * purchasedQty).toFixed(2)}
        </p>
        <button
          onClick={() => deleteProductFromCart(_id, color)}
          className={`${
            isCartPage && "lg:hidden"
          } group cursor-pointer w-[20px] h-[20px] rounded-[4px] flex items-center justify-center
            transition-all duration-300 ease-in-out text-[#343839] hover:text-red-600 hover:scale-105`}
        >
          <Close />
        </button>

        <p
          className={`${
            isCartPage ? "lg:flex lg:justify-end hidden" : "hidden"
          }  lg:w-full`}
        >
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
