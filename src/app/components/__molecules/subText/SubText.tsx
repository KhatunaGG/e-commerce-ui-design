// const SubText = () => {
//   return (
//     <section className="w-full flex flex-col gap-4 md:gap-6 lg:flex-row md:items-center justify-baseline lg:gap-0    mt-8      bg-green-200         md:px-[11.11%] px-[8.53%] ">
//       <h1 className="lg:w-[57.41%] text-[40px] leading-[44px] tracking-[-0.4px] lg:text-[72px] text-[#141718] font-medium lg:leading-[76px] lg:tracking-[-2px]">
//         Simply Unique/ Simply Better.
//       </h1>
//       <div className="flex-1 flex items-center justify-center">
//         <h2 className="font-normal text-base text-[#6C7275] md:px-6">
//           <b>3legant</b> is a gift & decorations store based in HCMC, Vietnam.
//           Est since 2019.{" "}
//         </h2>
//       </div>
//     </section>
//   );
// };

// export default SubText;

















export type SubTextPropsType = {
  isWishlistPage?: boolean;
};

const SubText = ({ isWishlistPage }: SubTextPropsType) => {
  return (
    <section
      className={`
        ${isWishlistPage
          ? "inline-flex flex-col items-start  mt-0"
          : "flex w-full lg:flex-row md:items-center md:px-[11.11%] px-[8.53%]  mt-8 "}
        gap-4 md:gap-6 justify-baseline lg:gap-0
      `}
    >
      <h1
        className={`
          ${isWishlistPage
            ? "text-2xl md:text-3xl leading-[24px] tracking-[-0.6px] lg:leading-[76px] lg:tracking-[-2px]"
            : "text-[40px] lg:text-[72px]"}
          text-[#141718] font-medium
        `}
      >
        Simply Unique/ Simply Better.
      </h1>

      <div
        className={`${
          isWishlistPage ? "flex items-center justify-center" : "flex items-center justify-center"
        }`}
      >
        <h2
          className={`${
            isWishlistPage ? "text-sm px-0" : "text-base md:px-6"
          } font-normal text-[#6C7275]`}
        >
          <b>3legant</b> is a gift & decorations store based in HCMC, Vietnam.
          Est since 2019.
        </h2>
      </div>
    </section>
  );
};

export default SubText;
