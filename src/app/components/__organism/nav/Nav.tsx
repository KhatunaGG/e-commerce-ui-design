"use client";
import { Bag, Burger, Logo, Search, User } from "../../__atoms";
import { useCartStore } from "@/app/store/cart.store";
import Link from "next/link";
import MobileMenu from "../mobileMenu/MobileMenu";
import PageMenu from "../pageMenu/PageMenu";
import { useMenuStore } from "@/app/store/menu.store";

const Nav = () => {
  const handleShowNavbar = useCartStore((state) => state.handleShowNavbar);
  const cartDataLength = useCartStore((state) => state.cartDataLength);
  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  const mobileMenu = useMenuStore((state) => state.mobileMenu);
  const setMobileMenu = useMenuStore((state) => state.setMobileMenu);

  return (
    <>
      {mobileMenu && (
        <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      )}
      <nav className="w-full flex items-center justify-between py-[18px] md:px-[11.11%] px-[8.53%] relative ">
        <div className="flex items-center gap-1">
          <div
            onClick={toggleMenu}
            className="w-6 h-6 flex items-center justify-center mb-[3px] md:mb-0 md:hidden"
          >
            <Burger />
          </div>
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
        <PageMenu />
        <div className="flex items-center gap-[16px]">
          <Search hidden={true} />
          <Link href={"/account-page"}>
            <User />
          </Link>
          <Link href={"/cart-page"}>
            <Bag />
          </Link>
          <div
            onClick={handleShowNavbar}
            className="relative w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold cursor-pointer"
          >
            {cartDataLength}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
