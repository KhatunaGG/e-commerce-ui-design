"use client";

import { useProductStore } from "@/app/store/product.store";
import { useEffect } from "react";
import { AddToCartButton, AnimateSpin, ShowMoreButton } from "../../__molecules";
import { useSignInStore } from "@/app/store/sign-in.store";
import { Close } from "../../__atoms";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/app/store/cart.store";

const AccountWishlist = () => {
  const path = usePathname();
  const isAccountWishlistPage = path.includes("/account-page/wishlists");
  const { accessToken, initialize } = useSignInStore();
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const {
    getAllWishlist,
    // loadMoreWishList,
    wishlistData,
    isLoading,
    // wishlistDataLength,
  } = useProductStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    getAllWishlist("1");
  }, []);

  console.log(wishlistData, "wishlistData from ACCOUNT");

  // const handleLoadMore = () => {
  //   loadMoreWishList();
  // };

  if (isLoading && wishlistData.length === 0) {
    return <AnimateSpin />;
  }

  if (!accessToken) return null;

  return (
    <div className="w-full h-full  px-8  pb-20 lg:px-[72px] flex flex-col  gap-10 ">
      <h2 className="font-semibold text-[20px] leading-[32px] text-black">
        Your Wishlist
      </h2>

      <div className="w-full h-full flex flex-col gap-2 pb-2 ">
        <div className="WISHLISTHEADER w-full flex items-center justify-between border-b border-b-[#E8ECEF]">
          {/* <div className="flex-1  bg-green-200">Product</div> */}
          <div className="w-full md:w-[50%] ">Product</div>
          <div className="hidden md:flex flex-1 ">Price</div>
          <div className="hidden md:flex flex-1 ">Action</div>
        </div>

        <div className="WISHLISTITEM-container flex flex-col">
          <div className="WISHLISTITEM w-full flex flex-col items-center">
            {wishlistData.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex w-full items-center flex-col md:flex-row gap-4 md:gap-0   py-4 md:py-6 border-b border-b-[#E8ECEF] "
                >
                  <div className="w-full md:w-[50%] flex gap-[10px] items-center">
                    <div className="w-fit flex items-center ">
                      <Close />
                    </div>
                    <Link
                  href={`/shop/${item._id}`} className="flex items-center gap-[10px]">
                      <div
                        className={` w-[23.32%] md:w-[19.37%]  h-full  lg:h-full `}
                      >
                        {item.presignedUrl ? (
                          <Image
                            src={item.presignedUrl}
                            alt={item.productName}
                            width={80}
                            height={96}
                            className="object-cover w-full h-full"
                            unoptimized
                            priority={isAccountWishlistPage}
                            // onError={(e) => {
                            //   (e.currentTarget as HTMLImageElement).src =
                            //     "/images/fallback.jpg";
                            // }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* <div className="flex items-center ">{item.presignedUrl}</div> */}
                      <div className="lex flex-col items-center gap-2">
                        <p>{item.productName}</p>
                        <p>{item.color ?? ""}</p>
                        <div className="md:hidden flex flex-1">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="hidden md:flex flex-1">
                    ${item.price.toFixed()}
                  </div>

                  {/* <button
                    className={`
      w-full md:flex-1 bg-[#141718] mx-[6px] text-white rounded-lg py-[8px] md:py-[6.29px] lg:py-[9px] text-sm md:text-base font-medium leading-[28px] tracking-[-0.4px] hover:bg-gray-800 transition-colors duration-300`}
                  >
                    Add to cart
                  </button> */}

                  <AddToCartButton
                    params={item._id}
                    onClick={() => addProductToCart(item._id)}
                    isAccountWishlistPage={isAccountWishlistPage}
                  />
                </div>
              );
            })}
          </div>

          <div className="w-full p-6 flex items-center justify-center">
            {" "}
            <ShowMoreButton isAccountWishlistPage={isAccountWishlistPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountWishlist;
