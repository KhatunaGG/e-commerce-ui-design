"use client"
import Image from "next/image";
import { AddToCartButton, Label } from "../../__molecules";
import { useCartStore } from "@/app/store/cart.store";
import { useEffect, useState } from "react";
import { useProductStore } from "@/app/store/product.store";

export type ProductPropsType = {
  sortByTwoHorizontally?: boolean;
  newProduct: boolean;
  discount: number;
  image?: string;
  productName: string;
  price: number;
  rating: number;
  details: string;
  _id: string;
  wishlist: boolean;
  params?: string;
};

const Product = ({
  sortByTwoHorizontally,
  newProduct,
  discount,
  image,
  productName,
  price,
  // rating,
  details,
  _id,
  params,
  wishlist,
}: ProductPropsType) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const getAverageRating = useProductStore((state) => state.getAverageRating);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchRating = async () => {
      const rating = await getAverageRating(_id);
      setAverageRating(rating || 0);
    };
    fetchRating();
  }, [_id, getAverageRating]);

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
          sizes="
    (min-width: 768px) 729px,
    100vw
  "
        />
        {!params && !sortByTwoHorizontally && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            className="w-full px-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          >
            <AddToCartButton onClick={() => addProductToCart(_id)} />
          </div>
        )}
      </div>
      {!params && (
        // <Label
        //   productName={productName}
        //   price={price}
        //      rating={ratings[item._id] || 0}
        //   discount={discount}
        //   details={details}
        //   _id={_id}
        //   newProduct={newProduct}
        //   wishlist={wishlist}
        // />
        <Label
          productName={productName}
          price={price}
          rating={averageRating}
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
