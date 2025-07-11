"use client";
import FilterOptions from "../filterOptions/FilterOptions";
import Product from "../product/Product";
import { AnimateSpin, ShowMoreButton } from "../../__molecules";
import Link from "next/link";
import { useShopStore } from "@/app/store/shop-page.store";

const Products = () => {
  const {
    sortedByFour,
    sortByTwoVertically,
    sortByTwoHorizontally,
    isLoading,
    // productsData,
  } = useShopStore();

  const { productsData } = useShopStore();

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
          {Array.isArray(productsData) &&
            productsData.length > 0 &&
            productsData.map((product) => (
              <Link key={product._id} href={`/shop/${product._id}`}>
                <div
                  className={`${
                    sortByTwoHorizontally ? "flex-row" : "flex-col"
                  } flex w-full h-auto cursor-pointer`}
                >
                  <Product
                    newProduct={product.new}
                    discount={product.discount}
                    image={product.presignedUrl}
                    productName={product.productName}
                    sortByTwoHorizontally={sortByTwoHorizontally}
                    price={product.price}
                    rate={product.rate}
                    details={product.details}
                    _id={product._id}
                    wishlist={product.wishlist}
                  />
                </div>
              </Link>
            ))}
        </section>
      </div>

      <div className="w-ful flex items-center justify-center">
        <ShowMoreButton />
      </div>
    </section>
  );
};

export default Products;
