"use client";
import {
  Bag,
  Close,
  Facebook,
  Heart,
  Instagram,
  Logo,
  Youtube,
} from "../../__atoms";
import { NavLink, SearchInput } from "../../__molecules";

const Menu = () => {
  return (
    <section className="absolute top-0 left-0 right-0 z-20 w-full md:hidden min-h-screen  bg-white p-6 flex flex-col items-center gap-4">
      <div className="w-full flex items-center justify-between">
        <Logo width={"70px"} height={"24px"} />
        <Close />
      </div>

      <form className="w-full h-fit flex flex-col items-center justify-between min-h-[calc(100vh-72px)]">
        <div className="flex flex-col w-full gap-4">
          <SearchInput />
          <div className="w-full flex flex-col gap-4 ">
            <NavLink href="/">
              <span className="text-sm font-medium leading-[24px] uppercase flex items-start">
                Home
              </span>
            </NavLink>
            <NavLink href="/shop">
              <span className="text-sm font-medium leading-[24px] uppercase flex items-start">
                Shop
              </span>
            </NavLink>
            <NavLink href="/product">
              {" "}
              <span className="text-sm font-medium leading-[24px] uppercase flex items-start">
                Product
              </span>
            </NavLink>
            <NavLink href="/contact">
              <span className="text-sm font-medium leading-[24px] uppercase flex items-start">
                Contact Us
              </span>
            </NavLink>
          </div>
        </div>

        <div className="w-full flex flex-col gap-[19.33px]">
          <div className="w-full flex flex-col gap-2">
            {["Cart", "Wishlist"].map((item, i) => {
              return (
                <div
                  key={i}
                  className="w-full py-[2px] flex items-center justify-between border-b border-b-[#E8ECEF]"
                >
                  <h2 className="text-[18px] font-medium leading-[32px] tracking-[-0.4px] text-[#6C7275]">
                    {item}
                  </h2>
                  <div className="flex items-center gap-[5px]">
                    {item === "Cart" ? <Bag /> : <Heart />}
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-fill bg-[#141718] rounded-md py-[10px] text-white text-[18px] font-medium leading-[32px] tracking-[-0.4px]">
            Sign In
          </button>

          <div className="w-full flex items-start gap-6">
            <Instagram color={"black"} />
            <Facebook color={"black"} />
            <Youtube color={"black"} />
          </div>
        </div>
      </form>
    </section>
  );
};

export default Menu;

