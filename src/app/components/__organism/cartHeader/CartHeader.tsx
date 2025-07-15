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
  isActivePage: boolean;
};

//after colors
const CartHeader = () => {
  const path = usePathname();
  const isCartPage = path.includes("cart-page");
  const isCheckoutPage = path.includes("checkout-page");
  const isCompletePage = path.includes("complete-page");

  const steps = ["Shopping cart", "Checkout details", "Order complete"];

  return (
    <div className="w-full flex md:items-center justify-between gap-8">
      {steps.map((step, i) => {
        const isActive =
          (i === 0 && isCartPage) ||
          (i === 1 && isCheckoutPage) ||
          (i === 2 && isCompletePage);

        return (
          <div
            key={i}
            className={`
              flex items-center gap-[17px] pb-[26px] border-b bg-green-300               md:flex-1
              ${i === 1 ? "border-b-0 md:border-b" : ""}
              ${i === 2 ? "hidden md:flex" : ""}
              ${
                isActive
                  ? "md:flex-1 font-bold  border-b-[#141718]"
                  : "md:flex-1 font-normal  border-transparent"
              }
            `}
          >
            <div
              className={`
                flex items-center justify-center rounded-full w-[42px] h-[42px]
                ${
                  isActive
                    ? "bg-[#23262F] text-white"
                    : "bg-[#B1B5C3] text-black"
                }
              `}
            >
              {i + 1}
            </div>
            <p
              className={`
                text-base leading-[26px] 
                ${i > 0 ? "hidden md:flex" : "flex"}
              `}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CartHeader;
