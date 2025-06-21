// "use client";
// import Image from "next/image";
// import { Label } from "../../__molecules";
// import FilterOptions from "../filterOptions/FilterOptions";
// import { useProductsFilterStore } from "@/app/store/products.filter.store";

// const Products = () => {
//   const {
//     sortedByFour,
//     sortByTwoVertically,
//     sortByTwoHorizontally,
//     // setsSortedByFour,
//     // setSortByTwoVertically,
//     // setSortByTwoHorizontally,
//   } = useProductsFilterStore();

//   return (
//     <section className="w-full lg:flex-1 flex flex-col gap-8 md:gap-10">
//       <FilterOptions />

//       <section className="w-full  grid grid-cols-1  lg:grid-cols-3 h-full gap-y-4 gap-x-2 md:gap-y-6 md:gap-x-6">
//         <div className="flex flex-col w-full h-auto ">
//           <div className="PRODUCT w-full h-[349px] relative group">
//             <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//               <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-[#141718] rounded-sm bg-white">
//                 new
//               </div>
//               <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-white rounded-sm bg-[#38CB89]">
//                 -50%
//               </div>
//             </div>
//             <Image
//               src={"/assets/new_1.png"}
//               alt={"product img"}
//               width={262}
//               height={349}
//               className="w-full h-full object-cover"
//             />
//             <div className="w-full px-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
//               <button className="w-full bg-[#141718] text-white rounded-lg py-[6.29px] lg:py-[9px] text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors">
//                 Add to cart
//               </button>
//             </div>
//           </div>
//           <Label />
//         </div>

//         <div className="flex flex-col w-full h-auto">
//           <div className="PRODUCT w-full h-[349px] relative group">
//             <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//               <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-[#141718] rounded-sm bg-white">
//                 new
//               </div>
//               <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-white rounded-sm bg-[#38CB89]">
//                 -50%
//               </div>
//             </div>
//             <Image
//               src={"/assets/product_6.png"}
//               alt={"product img"}
//               width={262}
//               height={349}
//               className="w-full h-full object-cover "
//             />
//             <div className="w-full px-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
//               <button className="w-full bg-[#141718] text-white rounded-lg py-[6.29px] lg:py-[9px] text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors">
//                 Add to cart
//               </button>
//             </div>
//           </div>
//           <Label />
//         </div>

//         <div className="flex flex-col w-full h-auto">
//           <div className="PRODUCT w-full h-[349px] relative group">
//             <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//               <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-[#141718] rounded-sm bg-white">
//                 new
//               </div>
//               <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-white rounded-sm bg-[#38CB89]">
//                 -50%
//               </div>
//             </div>
//             <Image
//               src={"/assets/product_11.png"}
//               alt={"product img"}
//               width={262}
//               height={349}
//               className="w-full h-full object-cover "
//             />
//             <div className="w-full px-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
//               <button className="w-full bg-[#141718] text-white rounded-lg py-[6.29px] lg:py-[9px] text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors">
//                 Add to cart
//               </button>
//             </div>
//           </div>
//           <Label />
//         </div>
//       </section>
//     </section>
//   );
// };

// export default Products;

"use client";
import FilterOptions from "../filterOptions/FilterOptions";
import { useProductsFilterStore } from "@/app/store/products.filter.store";
import Product from "../product/Product";
import { AnimateSpin } from "../../__molecules";

const Products = () => {
  const { isLoading } = useProductsFilterStore();
  const { sortedByFour, sortByTwoVertically, sortByTwoHorizontally } =
    useProductsFilterStore();
  const { productsData } = useProductsFilterStore();

  // const resortedStyles = sortedByFour
  //   ? "grid-cols-2  lg:grid-cols-4"
  //   : sortByTwoVertically
  //   ? "grid-cols-1  lg:grid-cols-2"
  //   : sortByTwoHorizontally
  //   ? "grid-cols-1  lg:grid-cols-2"
  //   : "grid-cols-1  lg:grid-cols-3";

  const resortedStyles = sortedByFour
    ? "grid-cols-2  lg:grid-cols-4"
    : sortByTwoVertically
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    : sortByTwoHorizontally
    ? "grid-cols-1  lg:grid-cols-2"
    : "grid-cols-1  lg:grid-cols-3";

  if (isLoading) return <AnimateSpin />;

  return (
    <section className="w-full flex flex-col gap-10 lg:gap-20 ">
      <div className="w-full lg:flex-1 flex flex-col gap-8 md:gap-10">
        <FilterOptions />
        <section
          className={`
          ${resortedStyles} 
        w-full  grid  h-full gap-y-4 gap-x-2 md:gap-y-6 md:gap-x-6`}
        >
          {productsData.length > 0 &&
            productsData.map((product, i) => (
              <div
                key={i}
                className={`${
                  sortByTwoHorizontally ? "flex-row" : "flex-col"
                } flex  w-full h-auto `}
              >
                <Product
                  newProduct={product.new}
                  discount={product.discount}
                  image={product.presignedUrl}
                  productName={product.productName}
                  sortByTwoHorizontally={sortByTwoHorizontally}
                  price={product.price}
                  rate={product.rate}
                />
              </div>
            ))}
        </section>
      </div>
      <div className="w-ful flex items-center justify-center">
        <button className="text-base font-medium leading-[28px] tracking-[-0.4px] text-[#141718] py-[6px] px-10 rounded-[80px] border border-[#141718]">
          Show more
        </button>
      </div>
    </section>
  );
};

export default Products;
