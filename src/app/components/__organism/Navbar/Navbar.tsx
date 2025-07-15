"use client";
import { useEffect } from "react";
import { useCartStore } from "@/app/store/cart.store";
import { Close } from "../../__atoms";
import CartItem from "../cartItem/CartItem";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  const showNavbar = useCartStore((state) => state.showNavbar);
  const handleShowNavbar = useCartStore((state) => state.handleShowNavbar);
  const handleSelectColor = useCartStore((state) => state.handleSelectColor);
  const { cartData, setShow, show } = useCartStore();
  const hasToSelectColor = cartData.some((item) => item.color === null);



  useEffect(() => {
    if (showNavbar && cartData.length === 0) {
       toast.info("Your cart is currently empty.");
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
                  const isNotSelected = item.color === null;
                  const isLastItem = i === cartData.length - 1;
                  const isFirstItem = i === 0;
                  return (
                    <CartItem
                      isLastItem={isLastItem}
                      isFirstItem={isFirstItem}
                      {...item}
                      key={i}
                      show={show}
                      isNotSelected={isNotSelected}
                      handleSelectColor={handleSelectColor}
                    />
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
              <button
                onClick={() => {
                  if (hasToSelectColor) {
                    toast.error(
                      "Please select color for all items before proceeding."
                    );
                  } else {
                    setShow(!show);
                    router.push("/cart-page");
                  }
                }}
                className="font-semibold text-sm leading-[22px] cursor-pointer"
              >
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
