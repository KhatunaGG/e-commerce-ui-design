// "use client";
// import { usePathname } from "next/navigation";

// export type CurtHeaderPropsType = {
//   isActivePage: boolean;
// };

// const CartHeader = () =>
//   // { isActivePage }: CurtHeaderPropsType
//   {
//     const path = usePathname();
//     const isCartPage = path.includes("cart-page");
//     console.log(isCartPage, "isCartPage");

//     return (
//       <div className="w-full flex md:items-center justify-between gap-8">
//         {["Shopping cart", " Checkout details", "Order complete"].map(
//           (item, i) => {
//             const isIndexOne = i === 1;
//             const isIndexTwo = i === 2;
//             const isZeroIndex = i === 0;
//             return (
//               <div
//                 key={i}
//                 className={`${
//                   isIndexOne
//                     ? "  border-b-0 md:border-b md:border-b-[#141718]"
//                     : "w-0 "
//                 } ${isZeroIndex && "flex-1"}
//                   ${isIndexTwo && "hidden md:flex"}
//                    bg-blue-200 flex items-center  gap-[17px]  pb-[26px] border-b border-b-[#141718]           md:flex-1`}
//               >
//                 <div className="flex rounded-full bg-[#B1B5C3] items-center justify-center w-[42px] h-[42px]">
//                   {i + 1}
//                 </div>
//                 <p
//                   className={`${
//                     (isIndexTwo || isIndexOne) && "hidden md:flex"
//                   } font-normal text-base leading-[26px]`}
//                 >
//                   {item}
//                 </p>
//               </div>
//             );
//           }
//         )}
//       </div>
//     );
//   };

// export default CartHeader;


"use client";
import { usePathname } from "next/navigation";

export type CurtHeaderPropsType = {
  isCartPage?: boolean;
};

const CartHeader = () => {
  const path = usePathname();
  const isCartPage = path.includes("cart-page");
  const isCheckoutPage = path.includes("checkout-page");
  // const isCompletePage = path.includes("complete-page");

  return (
    <div className="w-full flex flex-col items-center gap-6 lg:gap-10">
      <h1 className="text-[40px] lg:text-[54px] font-medium leading-[44px] tracking-[-0.4px] lg:leading-[5f8px] lg:tracking-[-1px] text-black">
        {isCartPage ? "Cart" : "Check Out"}
      </h1>

      <div className="w-full flex md:items-center justify-between gap-8">
        {["Shopping cart", "Checkout details", "Order complete"].map(
          (item, i) => {
            const isZeroIndex = i === 0;
            const isIndexOne = i === 1;
            const isIndexTwo = i === 2;

            const wrapperClass = (() => {
              if (isCartPage) {
                if (isZeroIndex) return "flex-1";
                if (isIndexOne) return "w-fit md:flex-1";
                if (isIndexTwo) return "hidden md:flex md:flex-1";
              }
              if (isCheckoutPage) {
                if (isZeroIndex) return "hidden md:flex md:flex-1";
                if (isIndexOne) return "flex-1";
                if (isIndexTwo) return "w-fit md:flex-1";
              }

              return "flex-1";
            })();

            const borderClass =
              isZeroIndex && isCartPage
                ? "border-b-2 border-b-[#141718]"
                : isZeroIndex && isCheckoutPage
                ? "border-b-2 border-b-[#45B26B]"
                : isIndexOne && isCheckoutPage
                ? "border-b-2 border-b-[#141718]"
                : "border-b-0";

            const badgeColor =
              isZeroIndex && isCartPage
                ? "bg-black"
                : isZeroIndex && isCheckoutPage
                ? "bg-[#45B26B]"
                : isIndexOne && isCheckoutPage
                ? "bg-black"
                : "bg-[#B1B5C3]";

            const Color =
              isZeroIndex && isCartPage
                ? "text-black font-bold"
                : isZeroIndex && isCheckoutPage
                ? "text-[#45B26B] font-bold"
                : isIndexOne && isCheckoutPage
                ? "text-black font-bold "
                : "text-black";

            // const labelClass =
            //   isIndexOne  || isIndexTwo ? "hidden md:flex bg-yellow-100" : "";
            const labelClass =
              (isIndexOne && isCartPage) || (isIndexTwo && isCheckoutPage)
                ? "hidden md:flex bg-yellow-100"
                : "";

            return (
              <div
                key={i}
                className={`${wrapperClass} ${borderClass} bg-blue-200 flex items-center gap-[17px] pb-[26px]`}
              >
                <div
                  className={`${badgeColor} flex rounded-full items-center justify-center w-[42px] h-[42px] text-white`}
                >
                  {i + 1}
                </div>
                <p
                  className={`${labelClass} ${Color}  text-base leading-[26px]`}
                >
                  {item}
                </p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default CartHeader;

// ${isCartPage && isZeroIndex && "bg-black"}
// ${isZeroIndex && isCheckoutPage && "bg-[#45B26B]"}
