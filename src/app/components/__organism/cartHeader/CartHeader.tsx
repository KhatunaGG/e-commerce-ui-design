// "use client";
// import { usePathname } from "next/navigation";

// export type CurtHeaderPropsType = {
//   isCartPage?: boolean;
// };

// const CartHeader = () => {
//   const path = usePathname();
//   const isCartPage = path.includes("cart-page");
//   const isCheckoutPage = path.includes("checkout-page");
//   // const isCompletePage = path.includes("complete-page");

//   return (
//     <div className="w-full flex flex-col items-center gap-6 lg:gap-10">
//       <h1 className="text-[40px] lg:text-[54px] font-medium leading-[44px] tracking-[-0.4px] lg:leading-[5f8px] lg:tracking-[-1px] text-black">
//         {isCartPage ? "Cart" : "Check Out"}
//       </h1>

//       <div className="w-full flex md:items-center justify-between gap-8">
//         {["Shopping cart", "Checkout details", "Order complete"].map(
//           (item, i) => {
//             const isZeroIndex = i === 0;
//             const isIndexOne = i === 1;
//             const isIndexTwo = i === 2;

//             const wrapperClass = (() => {
//               if (isCartPage) {
//                 if (isZeroIndex) return "flex-1";
//                 if (isIndexOne) return "w-fit md:flex-1";
//                 if (isIndexTwo) return "hidden md:flex md:flex-1";
//               }
//               if (isCheckoutPage) {
//                 if (isZeroIndex) return "hidden md:flex md:flex-1";
//                 if (isIndexOne) return "flex-1";
//                 if (isIndexTwo) return "w-fit md:flex-1";
//               }

//               return "flex-1";
//             })();

//             const borderClass =
//               isZeroIndex && isCartPage
//                 ? "border-b-2 border-b-[#141718]"
//                 : isZeroIndex && isCheckoutPage
//                 ? "border-b-2 border-b-[#45B26B]"
//                 : isIndexOne && isCheckoutPage
//                 ? "border-b-2 border-b-[#141718]"
//                 : "border-b-0";

//             const badgeColor =
//               isZeroIndex && isCartPage
//                 ? "bg-black"
//                 : isZeroIndex && isCheckoutPage
//                 ? "bg-[#45B26B]"
//                 : isIndexOne && isCheckoutPage
//                 ? "bg-black"
//                 : "bg-[#B1B5C3]";

//             const Color =
//               isZeroIndex && isCartPage
//                 ? "text-black font-bold"
//                 : isZeroIndex && isCheckoutPage
//                 ? "text-[#45B26B] font-bold"
//                 : isIndexOne && isCheckoutPage
//                 ? "text-black font-bold "
//                 : "text-black";

//             // const labelClass =
//             //   isIndexOne  || isIndexTwo ? "hidden md:flex bg-yellow-100" : "";
//             const labelClass =
//               (isIndexOne && isCartPage) || (isIndexTwo && isCheckoutPage)
//                 ? "hidden md:flex "
//                 : "";

//             return (
//               <div
//                 key={i}
//                 className={`${wrapperClass} ${borderClass}  flex items-center gap-[17px] pb-[26px] `}
//               >
//                 <div
//                   className={`${badgeColor} flex rounded-full items-center justify-center w-[42px] h-[42px] text-white`}
//                 >
//                   {i + 1}
//                 </div>
//                 <p
//                   className={`${labelClass} ${Color}  text-base leading-[26px]`}
//                 >
//                   {item}
//                 </p>
//               </div>
//             );
//           }
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartHeader;

// // ${isCartPage && isZeroIndex && "bg-black"}
// // ${isZeroIndex && isCheckoutPage && "bg-[#45B26B]"}

"use client";
import { usePathname } from "next/navigation";

// export type CurtHeaderPropsType = {
//   isCartPage?: boolean;
//   isCompletePage?: boolean;
// };

const CartHeader = () => {
  const path = usePathname();
  const isCartPage = path.includes("cart-page");
  const isCheckoutPage = path.includes("checkout-page");
  const isCompletePage = path.includes("complete-page");

  return (
    <div className="w-full flex flex-col items-center gap-6 lg:gap-10">
      <h1 className="text-[40px] lg:text-[54px] font-medium leading-[44px] tracking-[-0.4px] lg:leading-[5f8px] lg:tracking-[-1px] text-black">
        {/* {isCartPage ? "Cart" : "Check Out"} */}
        {isCartPage ? "Cart" : isCompletePage ? "Complete!" : "Check Out"}
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
              if (isCompletePage) {
                if (isZeroIndex) return "hidden md:flex md:flex-1";
                 if (isIndexOne) return "hidden md:flex md:flex-1";
                if (isIndexTwo) return "flex-1";
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
                : isZeroIndex && isCompletePage
                ? "border-b-2 border-b-[#45B26B]"
                : isIndexOne && isCompletePage
                ? "border-b-2 border-b-[#45B26B]"
                : isIndexTwo && isCompletePage
                ? "border-b-2 border-b-[#141718] mr-[56px]"
                : "border-b-0";

            const badgeColor =
              isZeroIndex && isCartPage
                ? "bg-black"
                : isZeroIndex && isCheckoutPage
                ? "bg-[#45B26B]"
                : isIndexOne && isCheckoutPage
                ? "bg-black"
                : isZeroIndex && isCompletePage
                ? "bg-[#45B26B]"
                : isIndexOne && isCompletePage
                ? "bg-[#45B26B]"
                : isIndexTwo && isCompletePage
                ? "bg-black"
                : "bg-[#B1B5C3]";

            const Color =
              isZeroIndex && isCartPage
                ? "text-black font-bold"
                : isZeroIndex && isCheckoutPage
                ? "text-[#45B26B] font-bold"
                : isIndexOne && isCheckoutPage
                ? "text-black font-bold "
                : isZeroIndex && isCompletePage
                ? "text-[#45B26B] font-bold"
                : isIndexOne && isCompletePage
                ? "text-[#45B26B] font-bold"
                : isIndexTwo && isCompletePage
                ? "text-black font-bold "
                : "text-black";

            // const labelClass =
            //   isIndexOne  || isIndexTwo ? "hidden md:flex bg-yellow-100" : "";
            const labelClass =
              (isIndexOne && isCartPage) || (isIndexTwo && isCheckoutPage)
                ? "hidden md:flex "
                : "";

            return (
              <div
                key={i}
                className={`${wrapperClass} ${borderClass}  flex items-center gap-[17px] pb-[26px] `}
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
