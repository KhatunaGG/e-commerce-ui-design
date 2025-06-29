// import Image from "next/image";
// import { Label } from "../../__molecules";

// export type ProductPropsType = {
//   sortByTwoHorizontally?: boolean;
//   newProduct?: boolean;
//   discount: number;
//   image?: string;
//   productName: string;
//   price: number;
//   rate: number;
//   details: string;
//   _id: string;
//   // presignedUrl?: string
//   // imageName?: string

//   params?: string;
// };

// const Product = ({
//   sortByTwoHorizontally,
//   newProduct,
//   discount,
//   image,
//   productName,
//   price,
//   rate,
//   details,
//   _id,
//   params,
// }: // presignedUrl,
// // imageName
// ProductPropsType) => {
//   return (
//     <>
//       <div className="PRODUCT w-full h-[349px] relative group ">
//         <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//           {newProduct && (
//             <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-[#141718] rounded-sm bg-white">
//               New
//             </div>
//           )}
//           {discount && discount > 0 ? (
//             <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-white rounded-sm bg-[#38CB89]">
//               -{discount}%
//             </div>
//           ) : (
//             ""
//           )}
//         </div>
//         <Image
//           src={image || "/assets/new_1.png"}
//           alt={productName || "Product image"}
//           width={262}
//           height={349}
//           className="w-full h-full object-cover"
//         />
//         {!params && (

//         <div className="w-full px-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
//           <button
//             className={`${
//               sortByTwoHorizontally ? "opacity-0" : "opacity-100"
//             } w-full bg-[#141718] text-white rounded-lg py-[6.29px] lg:py-[9px] text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors`}
//           >
//             Add to cart
//           </button>
//         </div>
//         )}
//       </div>
//       {!params && (
//         <Label
//           productName={productName}
//           price={price}
//           rate={rate}
//           discount={discount}
//           details={details}
//           _id={_id}
//         />
//       )}
//     </>
//   );
// };

// export default Product;

import Image from "next/image";
import { AddToCartButton, Label } from "../../__molecules";

export type ProductPropsType = {
  sortByTwoHorizontally?: boolean;
  newProduct: boolean;
  discount: number;
  image?: string;
  productName: string;
  price: number;
  rate: number;
  details: string;
  _id: string;
  wishlist: boolean;
  // presignedUrl?: string
  // imageName?: string

  params?: string;
};

const Product = ({
  sortByTwoHorizontally,
  newProduct,
  discount,
  image,
  productName,
  price,
  rate,
  details,
  _id,
  params,
  wishlist

}: // presignedUrl,
// imageName
ProductPropsType) => {

  return (
    <>
      <div
        className={`PRODUCT w-full relative group ${
          params ? "h-[414px] md:h-[729px]" : "h-[203px] md:h-[349px]"
        }`}
      >
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {newProduct && (
            <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-[#141718] rounded-sm bg-white">
              New
            </div>
          )}
          {discount && discount > 0 ? (
            <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-white rounded-sm bg-[#38CB89]">
              -{discount}%
            </div>
          ) : (
            ""
          )}
        </div>
        <Image
          src={image || "/assets/new_1.png"}
          alt={productName}
          fill
          className="object-cover"
        />
        {(!params && !sortByTwoHorizontally) && (
          <div className="w-full px-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            <AddToCartButton  sortByTwoHorizontally={sortByTwoHorizontally} />
          </div>
        )}
      </div>
      {!params && (
        <Label
          productName={productName}
          price={price}
          rate={rate}
          discount={discount}
          details={details}
          _id={_id}
          newProduct={newProduct}
          wishlist={wishlist}
        />
      )}
    </>
  );
};

export default Product;
