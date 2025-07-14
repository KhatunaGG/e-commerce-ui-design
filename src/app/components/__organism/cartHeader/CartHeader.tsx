export type CurtHeaderPropsType = {
  isActivePage: boolean;
};

const CartHeader = (
    // { isActivePage }: CurtHeaderPropsType

) => {

  return (
    <div className="w-full flex md:items-center justify-between gap-8">
      {["Shopping cart", " Checkout details", "Order complete"].map(
        (item, i) => {
          const isIndexOne = i === 1;
          const isIndexTwo = i === 2;
          const isZeroIndex = i === 0;
          return (
            <div
              key={i}
              className={`${
                isIndexOne
                  ? "  border-b-0 md:border-b md:border-b-[#141718]"
                  : "w-0 "
              } ${isZeroIndex && "flex-1"}
                  ${isIndexTwo && "hidden md:flex"}
                   bg-blue-200 flex items-center  gap-[17px]  pb-[26px] border-b border-b-[#141718]           md:flex-1`}
            >
              <div className="flex rounded-full bg-[#B1B5C3] items-center justify-center w-[42px] h-[42px]">
                {i + 1}
              </div>
              <p
                className={`${
                  (isIndexTwo || isIndexOne) && "hidden md:flex"
                } font-normal text-base leading-[26px]`}
              >
                {item}
              </p>
            </div>
          );
        }
      )}
    </div>
  );
};

export default CartHeader;
