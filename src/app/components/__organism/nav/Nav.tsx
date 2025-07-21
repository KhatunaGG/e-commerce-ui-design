"use client";
import { usePathname } from "next/navigation";
import { Bag, Burger, Logo, Search, User } from "../../__atoms";
import { NavLink } from "../../__molecules";
import { useCartStore } from "@/app/store/cart.store";

const Nav = () => {
  const path = usePathname();
  const handleShowNavbar = useCartStore((state) => state.handleShowNavbar);
  // const cartDataLength = useCartStore((state) => state.cartData.length);
  const cartDataLength = useCartStore((state) => state.cartDataLength);

  return (
    <>
      <section className="w-full flex items-center justify-between py-[18px] md:px-[11.11%] px-[8.53%]">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center mb-[3px] md:mb-0 md:hidden">
            <Burger />
          </div>
          <Logo />
        </div>

        <div className="hidden md:flex items-center md:gap-6 lg:gap-10 text-sm font-medium text-[#6C7275]">
          <NavLink href="/" isActive={path === "/"}>
            Home
          </NavLink>
          <NavLink href="/shop" isActive={path === "/shop"}>
            Shop
          </NavLink>
          <NavLink href="/wishlist" isActive={path === "/wishlist"}>
            Wishlist
          </NavLink>
          <NavLink href="/contact" isActive={path === "/contact"}>
            Contact Us
          </NavLink>
        </div>

        <div className="flex items-center gap-[16px]">
          <Search hidden={true} />
          <User />
          <Bag />
          <div
            onClick={handleShowNavbar}
            className="relative w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold cursor-pointer"
          >
            {cartDataLength}
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;
