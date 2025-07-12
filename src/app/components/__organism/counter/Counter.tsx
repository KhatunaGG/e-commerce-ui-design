// "use client";

// import { useCartStore } from "@/app/store/cart.store";
// import { Add, Minus } from "../../__atoms";

// const Counter = () => {
//   const { setSelectedQty, selectedQty } = useCartStore();
//   return (
//     <div className="w-[29.67%] bg-[#F5F5F5] py-4 px-4 flex items-center justify-center gap-3  md:gap-6 ">
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



"use client";
import { Add, Minus } from "../../__atoms";


export type CounterPropsType = {
  selectedQty: number;
  setSelectedQty: (qty: number) => void; 
};


const Counter = ({selectedQty, setSelectedQty}: CounterPropsType) => {

  return (
    <div className="w-[29.67%] bg-[#F5F5F5] py-4 px-4 flex items-center justify-center gap-3  md:gap-6 ">
      <button
        onClick={() => {
          if (selectedQty < 0) return;
          setSelectedQty(selectedQty - 1);
        }}
        className="w-[20px] h-[20px] cursor-pointer"
      >
        <Minus />
      </button>
      <p>{selectedQty > 0 ? selectedQty : 0}</p>
      <button
        onClick={() => setSelectedQty(selectedQty + 1)}
        className="w-[20px] h-[20px] cursor-pointer"
      >
        <Add />
      </button>
    </div>
  );
};

export default Counter;
