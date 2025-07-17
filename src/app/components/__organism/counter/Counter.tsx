// "use client";
// import { Add, Minus } from "../../__atoms";
// import { ShowMoreButton } from "../../__molecules";

// export type CounterPropsType = {
//   selectedQty: number;
//   setSelectedQty: (qty: number) => void;
//   show?: boolean;
//   id: string;
// };

// const Counter = ({ selectedQty, setSelectedQty, show, id }: CounterPropsType) => {

//   return (
//     // <div className="w-[29.67%]  py-4 px-4 flex items-center justify-center gap-3  md:gap-6 ">
//     <div
//       className={`${
//         show
//           ? "rounded-[4px] border border-black/20"
//           : "w-[29.67%] rounded-none border-0"
//       }   py-4 px-4 flex items-center justify-center gap-3  md:gap-6 bg-[#F5F5F5]`}
//     >
//       <button
//         onClick={() => {
//           if (selectedQty < 0) return;
//           setSelectedQty(selectedQty - 1);
//         }}
//         className="w-[20px] h-[20px] cursor-pointer"
//       >
//         <Minus />
//       </button>
//       <p>{selectedQty > 0 ? selectedQty : 0}</p>
//       <button
//         onClick={() => setSelectedQty(selectedQty + 1)}
//         className="w-[20px] h-[20px] cursor-pointer"
//       >
//         <Add />
//       </button>
//     </div>
//   );
// };

// export default Counter;

// "use client";
// import { Add, Minus } from "../../__atoms";

// export type CounterPropsType = {
//   id: string;
//   color?: string | null;
//   quantity: number;
//   onChange: (qty: number) => void;
//   show?: boolean;
//   isCartPage?: boolean
// };

// const Counter = ({ show, quantity, onChange }: CounterPropsType) => {
//   return (
//     // <div className="w-[29.67%]  py-4 px-4 flex items-center justify-center gap-3  md:gap-6 ">
//     <div
//       className={`${
//         show
//           ? "rounded-[4px] border border-black/20"
//           : "w-[29.67%] rounded-none border-0"
//       }   py-4 px-4 flex items-center justify-center gap-3  md:gap-6 bg-[#F5F5F5]`}
//     >
//       <button
//         onClick={() => onChange(quantity - 1)}
//         className="w-[20px] h-[20px] cursor-pointer"
//       >
//         <Minus />
//       </button>
//       <p>{quantity}</p>
//       <button
//         onClick={() => onChange(quantity + 1)}
//         className="w-[20px] h-[20px] cursor-pointer"
//       >
//         <Add />
//       </button>
//     </div>
//   );
// };

// export default Counter;

"use client";
import { Add, Minus } from "../../__atoms";

export type CounterPropsType = {
  id: string;
  color?: string | null;
  quantity: number;
  onChange: (qty: number) => void;
  show?: boolean;
  isCartPage?: boolean;
  isCheckoutPage?: boolean;
};

const Counter = ({
  show,
  quantity,
  onChange,
  isCartPage,
  isCheckoutPage
}: CounterPropsType) => {

    const handleChange = (newQty: number) => {
    if (!isCartPage && !isCheckoutPage) {
      onChange(newQty);
    }
  };


  return (
    <div
      className={`${
        show || isCartPage
          ? "rounded-[4px] border border-black/20"
          : "w-[29.67%] rounded-none border-0"
      }  ${
        isCartPage ? "py-[11px] px-2" : "py-4 px-4"
      }    flex items-center justify-center gap-3  md:gap-6 bg-[#F5F5F5]`}
    >
      <button
        // onClick={() => onChange(quantity - 1)}
        onClick={() => handleChange(quantity - 1)}
        className={`${
          isCartPage ? " w-4 h-4" : " w-[20px] h-[20px]"
        } cursor-pointer`}
      >
        <Minus />
      </button>
      <p className="text-xs font-semibold">{quantity}</p>
      <button
        // onClick={() => onChange(quantity + 1)}
        onClick={() => handleChange(quantity + 1)}
        className={`${
          isCartPage ? " w-4 h-4" : " w-[20px] h-[20px]"
        } cursor-pointer`}
      >
        <Add />
      </button>
    </div>
  );
};

export default Counter;
