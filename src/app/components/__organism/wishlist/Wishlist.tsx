"use client";
import { ShowMoreButton, SubText } from "../../__molecules";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useProductStore } from "@/app/store/product.store";
import Product from "../product/Product";
import Link from "next/link";

const Wishlist = () => {
  const path = usePathname();
  const isWishlistPage = path.includes("wishlist");
  const { wishlistData, getAllWishlist, clearWishlist } = useProductStore();

  useEffect(() => {
    getAllWishlist();
  }, []);  //getAllWishlist ??????????

  useEffect(() => {
    return () => {
      clearWishlist();
    };
  }, [clearWishlist]);

  return (
    <section className="w-full min-h-screen md:px-[11.11%] px-[8.53%] py-8 flex flex-col items-start gap-10">
      {/* <div className="w-full h-full flex flex-col items-stretch lg:flex-row lg:items-start lg:justify-between md:gap-8 md:items-center md:justify-center">
        <div className="w-full border border-red-300 rounded-2xl">
          <SubText isWishlistPage={isWishlistPage} />
        </div>
        <div className="flex flex-col items-center md:flex-row gap-8     bg-red-200">
          {wishlistData.slice(0, 2).map((item, i) => (
            <Link
              className=" flex items-start justify-between md:flex-row "
              key={i}
              href={`/shop/${item._id}`}
            >
              <div className=" flex items-center justify-center flex-col w-[262px] h-[349px]">
                <Product
                  discount={item.discount}
                  productName={item.productName}
                  price={item.price}
                  rate={0}
                  details={item.details}
                  _id={item._id}
                  newProduct={item.new}
                  image={item.presignedUrl}
                  wishlist={item.wishlist}
                />
              </div>
            </Link>
          ))}
        </div>
      </div> */}

      <div className="w-full flex flex-col lg:flex-row items-stretch gap-8">
        <div className="lg:w-1/2 border border-[#b2b8bb80] rounded-2xl p-4 shadow-[0_4px_15px_rgba(0,0,0,0.25)] flex items-center justify-center">
          <SubText isWishlistPage={isWishlistPage} />
        </div>
        <div className="lg:w-1/2 flex flex-col items-center md:flex-row gap-8">
          {Array.isArray(wishlistData) &&
            wishlistData.slice(0, 2).map((item, i) => (
              <Link
                className="flex items-start justify-between md:flex-row"
                key={i}
                href={`/shop/${item._id}`}
              >
                <div className="flex items-center justify-center flex-col w-[262px] h-[349px]">
                  <Product
                    discount={item.discount}
                    productName={item.productName}
                    price={item.price}
                    rate={0}
                    details={item.details}
                    _id={item._id}
                    newProduct={item.new}
                    image={item.presignedUrl}
                    wishlist={item.wishlist}
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div className="w-full grid justify-items-center  md:grid-cols-2 lg:grid-cols-4 md:space-y-4  ">
        {Array.isArray(wishlistData) &&
          wishlistData.slice(2, wishlistData.length).map((item, i) => (
            <Link
              className="flex-1 flex items-start gap-6 "
              key={i}
              href={`/shop/${item._id}`}
            >
              <div className="flex items-center justify-center flex-col w-[262px] h-[349px] ">
                <Product
                  discount={item.discount}
                  productName={item.productName}
                  price={item.price}
                  rate={0}
                  details={item.details}
                  _id={item._id}
                  newProduct={item.new}
                  image={item.presignedUrl}
                  wishlist={item.wishlist}
                />
              </div>
            </Link>
          ))}
      </div>

      <div className="w-full p-6 flex items-center justify-center">
        {" "}
        <ShowMoreButton isWishlistPage={isWishlistPage} />
      </div>
    </section>
  );
};

export default Wishlist;
