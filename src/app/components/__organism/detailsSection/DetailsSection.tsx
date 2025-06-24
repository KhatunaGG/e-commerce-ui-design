import { ProductsDataType } from "@/app/store/useShopPage.store";
import Image from "next/image";

export type DetailsSectionPropsType = {
  productById: ProductsDataType;
};

const DetailsSection = ({ productById }: DetailsSectionPropsType) => {
  console.log(productById, "productById");
  return (
    <div className="w-full h-full flex flex-col gap-4 lg:flex-row lg:gap-[64px]">
      <div className="w-full lg:flex-1">
        <div className="flex flex-col lg:gap-[23px]">
          <div className="relative">
            <Image
              src={productById.presignedUrl || '"/assets/new_1.png"'}
              alt={"Product image"}
              width={548}
              height={729}
              className="object-cover"
            />
          </div>
          <div className="hidden w-full lg:grid grid-cols-3 gap-2 ">
            {[...Array(3)].map((_, idx) => (
              <div className="relative w-[167px] h-[167px]" key={idx}>
                <div className="w-12 h-12 rounded-full absolute bottom-0 right-0  z-10 bg-red-400"></div>
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

      <div className="w-full lg:flex-1"></div>
    </div>
  );
};

export default DetailsSection;


