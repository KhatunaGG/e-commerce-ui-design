import Image from "next/image";
import { Label } from "../../__molecules";

export type ProductPropsType = {
  presignedUrl: string;
  imageName: string;
  // new: boolean;
  // discount: number;
  // rate: number;
  // category: string[];
  // price: number;
  // colors: string[];
  // reviews: string;
  // inStock: number;
  // wishlist: boolean;
  // measurements: string;
  // details: string;
  // Packaging: string;
  // questions: string;
};

const Product = ({ presignedUrl, imageName }: ProductPropsType) => {
  return (
    <>
      <div className="w-full h-full  group">
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-[#141718] rounded-sm bg-white">
            new
          </div>
          <div className="py-1 px-[14px] text-xs font-bold leading-4 uppercase text-white rounded-sm bg-[#38CB89]">
            -50%
          </div>
        </div>
        <Image
          src={presignedUrl}
          alt={imageName}
          width={262}
          height={349}
          className="w-full h-auto object-cover"
        />
        <div className="w-full px-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <button className="w-full bg-[#141718] text-white rounded-lg py-[6.29px] lg:py-[9px] text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors">
            Add to cart
          </button>
        </div>
      </div>
      <Label />
    </>
  );
};

export default Product;
