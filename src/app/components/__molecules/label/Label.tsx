"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { StarRating } from "../../__organism";
import AddToCartButton from "../addToCartButton/AddToCartButton";
import WishlistButton from "../wishlistButton/WishlistButton";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/app/store/cart.store";


export type LabelPropsType = {
  productName: string;
  price: number;
  rating: number;
  discount: number;
  details: string | "";
  _id: string;
  newProduct?: boolean;
  wishlist?: boolean;
};

const Label = ({
  productName,
  rating,
  discount,
  price,
  details,
  _id,
}: LabelPropsType) => {
  const path = usePathname();
  const {
    sortByTwoVertically,
    sortByTwoHorizontally,
    normalizeFirstChar,
    calculateDiscount,
  } = useShopStore();
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  

  return (
    <div
      className={`${
        sortByTwoHorizontally ? "items-center justify-center px-4" : ""
      } w-full flex flex-col gap-2 lg:gap-4 `}
    >
      <div className="text-[#141718] w-full gap-1 flex flex-col items-start pt-1  md:pt-1">
        <StarRating
          rating={rating}
          totalRating={rating}
          readOnly={true}
          productId={_id}
        />

        <p className="text-sm md:text-base font-semibold leading-[16px] md:leading-[26px]">
          {normalizeFirstChar(productName)}
        </p>
        <div className="w-auto flex gap-2">
          <p className="text-sm font-semibold leading-[22px]">
            ${price && price.toFixed(2)}
          </p>
          <p className="SALE line-through text-[#6C7275] text-sm font-semibold leading-[22px]">
            {discount && discount > 0 ? calculateDiscount(price, discount) : ""}
          </p>
        </div>
      </div>

      {(sortByTwoVertically || sortByTwoHorizontally) && (
        <p
          className={`${
            path === "/" && "hidden"
          } text-[#6C7275] text-xs md:text-sm font-semibold leading-[12px]  md:leading-[22px] line-clamp-2  `}
        >
          {details ? details : ""}
        </p>
      )}

      {sortByTwoHorizontally && (
        <div
          className={`${
            path === "/" && "hidden"
          } w-full flex flex-col gap-2 md:gap-4`}
        >
          <AddToCartButton
            onClick={() => addProductToCart(_id)}
            // sortByTwoHorizontally={sortByTwoHorizontally}
          />
          <WishlistButton
          // wishlist={wishlist}
          />
        </div>
      )}
    </div>
  );
};

export default Label;
