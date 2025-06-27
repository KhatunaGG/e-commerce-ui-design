import {
  ProductsDataType,
  useShopPageStore,
} from "@/app/store/useShopPage.store";
import Image from "next/image";
import Product from "../product/Product";
import StarRating from "../starRating/StarRating";
import OfferTill from "../offerTill/OfferTill";
import ColorSection from "../colorSection/ColorSection";
import { Add, Minus } from "../../__atoms";
import { AddToCartButton, WishlistButton } from "../../__molecules";

export type DetailsSectionPropsType = {
  productById: ProductsDataType;
  params: string;
};

const DetailsSection = ({ productById, params }: DetailsSectionPropsType) => {
  const { calculateDiscount } = useShopPageStore();
  console.log(productById, "productById");
  return (
    <div className="w-full h-full flex flex-col gap-4 lg:flex-row lg:gap-[64px]">
      <div className="w-full lg:flex-1">
        <div className="flex flex-col  gap-[23px]">
          <div className="DIV1 w-full lg:flex-1">
            <Product
              newProduct={productById.new}
              discount={productById.discount}
              image={productById.presignedUrl}
              productName={productById.productName}
              price={productById.price}
              rate={productById.rate}
              details={productById.details}
              _id={productById._id}
              params={params}
            />
          </div>

          <div className="DIV1  hidden w-full lg:flex-1 lg:grid grid-cols-3 gap-2 ">
            {[...Array(3)].map((_, idx) => (
              <div className="relative min-w-[167px] min-h-[167px]" key={idx}>
                <Image
                  src={productById.presignedUrl || "/assets/new_1.png"}
                  alt={`Product thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:flex-1 flex flex-col">
        <div className="w-full flex flex-col gap-4 pb-6">
          <div className="flex items-center justify-start gap-[10px]">
            <StarRating _id={""} rate={0} />
            <p className="font-xs font-normal leading-[20px] text-[#141718]">
              <span>{11}</span>Reviews
            </p>
          </div>
          <h1 className="text-[#141718] text-[40px] font-medium leading-[44px] tracking-[-0.4px]">
            {productById.productName}
          </h1>

          <p className="text-[#6C7275] text-base  font-semibold leading-[22px] ">
            {productById.details}
          </p>
          <div className="w-auto flex gap-2">
            <p className="text-[28px] font-semibold leading-[22px]">
              ${productById.price.toFixed(2)}
            </p>
            <p className="SALE line-through text-[#6C7275] text-[20px] font-semibold leading-[22px]">
              {/* {discount && discount > 0 ? calculateDiscount(price, discount) : ""} */}
              {productById.discount > 0
                ? calculateDiscount(productById.price, productById.discount)
                : ""}
            </p>
          </div>
        </div>

        <OfferTill till={productById.discountTill} />

        <div className="py-6 flex lex-col gap-6">
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="text-base font-semibold leading-[26px] text-[#6C7275]">
              Measurements
            </p>
            <p className="text-[20px] font-normal leading-[32px] text-black">
              {productById.measurements}
            </p>
          </div>
        </div>

        <ColorSection colors={productById.colors} />

        <div className="w-full py-8  border-b  border-b-[#e9e9ea] flex flex-col gap-6">
          <div className="w-full flex items-center justify-center gap-2 md:gap-6">
            <div className="w-[29.67%] bg-[#F5F5F5] py-4 px-4 flex items-center justify-center gap-3  md:gap-6 ">
              <button className="w-[20px] h-[20px]">
                <Minus />
              </button>
              <p>1</p>
              <button className="w-[20px] h-[20px]">
                <Add />
              </button>
            </div>
            <WishlistButton params={params} />
          </div>
          <AddToCartButton />
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;
