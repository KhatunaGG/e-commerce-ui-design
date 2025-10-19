"use client";
import { useProductStore } from "@/app/store/product.store";
import { useEffect } from "react";
import {
  AddToCartButton,
  AnimateSpin,
  ShowMoreButton,
} from "../../__molecules";
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
  const { getAllWishlist, wishlistData, isLoading } = useProductStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    getAllWishlist("1");
  }, []);

  const handleRemoveFromWishlist = async (id: string) => {
    const { cashedWishList, wishlistData, updateProduct } =
      useProductStore.getState();
    const updatedWishlistData = wishlistData.filter((p) => p._id !== id);

    const updatedCache = Object.fromEntries(
      Object.entries(cashedWishList).map(([page, products]) => [
        page,
        products.filter((p) => p._id !== id),
      ])
    );
    useProductStore.setState({
      wishlistData: updatedWishlistData,
      cashedWishList: updatedCache,
    });
    await updateProduct(id, false);
  };

  if (isLoading && wishlistData.length === 0) {
    return <AnimateSpin />;
  }

  if (!accessToken) return null;

  return (
    <div className="w-full h-full  px-8 lg:px-[72px] flex flex-col  gap-10 ">
      <h2 className="font-semibold text-[20px] leading-[32px] text-black">
        Your Wishlist
      </h2>

      <div className="w-full h-full flex flex-col gap-2 pb-2 ">
        <div className="w-full flex items-center justify-between border-b border-b-[#E8ECEF]">
          <div className="w-full md:w-[50%] ">Product</div>
          <div className="hidden md:flex flex-1 ">Price</div>
          <div className="hidden md:flex flex-1 ">Action</div>
        </div>

        <div className="flex flex-col">
          <div className=" w-full flex flex-col items-center">
            {wishlistData.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex w-full items-center flex-col md:flex-row gap-4 md:gap-0   py-4 md:py-6 border-b border-b-[#E8ECEF] "
                >
                  <div className="w-full md:w-[50%] flex gap-[10px] items-center">
                    <div
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="w-fit flex items-center "
                    >
                      <Close />
                    </div>
                    <Link
                      href={`/shop/${item._id}`}
                      className="flex items-center gap-[10px]"
                    >
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
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>
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
                    ${item.price.toFixed(2)}
                  </div>
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
