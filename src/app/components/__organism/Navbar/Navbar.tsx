// "use client";
// import { useCartStore } from "@/app/store/cart.store";
// import { useEffect } from "react";

// function Navbar() {
//   const showNavbar = useCartStore((state) => state.showNavbar);

//   useEffect(() => {
//     if (showNavbar) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [showNavbar]);

//   return (
//     <>
//       {showNavbar && (
//         <div className="w-full h-screen absolute z-20 inset-0 flex items-start justify-end bg-black/20">
//           <div className="min-w-[28.68%] h-screen bg-green-400">
//             <h2>Cart</h2>
//             <div className="body"></div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;

"use client";
import { useEffect } from "react";
import { useCartStore } from "@/app/store/cart.store";
import { Add, Close, Minus } from "../../__atoms";

function Navbar() {
  const showNavbar = useCartStore((state) => state.showNavbar);
  const handleShowNavbar = useCartStore((state) => state.handleShowNavbar);

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
      <div className="min-w-[91.46%] md:min-w-[53.77%] lg:min-w-[28.68%] h-full bg-white flex flex-col items-start justify-start py-10 px-6 gap-2 md:gap-4">
        <div className="w-full flex items-center justify-between">
          <h2 className="font-normal text-[28px] leading-[34px] tracking-[-0.6px] ">
            Cart
          </h2>
          <button className="cursor-pointer" onClick={handleShowNavbar}>
            <Close />
          </button>
        </div>

        <div className="w-full h-full flex flex-col items-start justify-between">
          <div className="w-full flex flex-col items-start  ">
            <div className="w-full flex flex-col items-start gap-4 md:gap-6 ">
              <div className="w-full flex items-start gap-2 md:gap-4 py-4 md:py-6 border-y border-y-black/20">
                <div className="w-[23.32%] md:w[19.37%] h-full bg-yellow-100"></div>

                <div className="flex-1 flex flex-col items-start gap-2">
                  <p className="text-xs md:text-sm font-semibold leading-[22px] text-[#141718] ">
                    Tray Table
                  </p>
                  <p className="text-xs font-normal leading-[20px] text-black/60">
                    Color: <span>Black</span>
                  </p>
                  <div className="border border-black/20 rounded-[4px] bg-[#F5F5F5] py-4 px-4 flex items-center justify-center gap-3  md:gap-6 ">
                    <button className="w-[20px] h-[20px] cursor-pointer">
                      <Minus />
                    </button>
                    <p>1</p>
                    <button className="w-[20px] h-[20px] cursor-pointer">
                      <Add />
                    </button>
                  </div>
                </div>

                <div className="h-full font-semibold w-[22.32%] md:w-[21%] flex flex-col items-start gap-2 bg-blue-300">
                  <p className="text-xs md:text-sm leading-[22px]">$19.00</p>
                  <Close />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center bg-red-200 ">
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
