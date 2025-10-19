"use client";
import { usePathname } from "next/navigation";
import { NavLink } from "../../__molecules";
import { useMenuStore } from "@/app/store/menu.store";

const PageMenu = () => {
  const path = usePathname();
  const { mobileMenu } = useMenuStore();
  const setMobileMenu = useMenuStore((state) => state.setMobileMenu);
  const handleLinkClick = () => setMobileMenu(false);

  return (
    <>
      {!mobileMenu && (
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
          <div className="hidden lg:flex">
            <NavLink href="/blog" isActive={path === "/blog"}>
              Our Blog
            </NavLink>
          </div>
        </div>
      )}
      {mobileMenu && (
        <div className="flex md:hidden flex-col gap-4 text-sm font-medium text-[#6C7275]">
          <NavLink href="/" isActive={path === "/"} onClick={handleLinkClick}>
            Home
          </NavLink>
          <NavLink
            href="/shop"
            isActive={path === "/shop"}
            onClick={handleLinkClick}
          >
            Shop
          </NavLink>
          <NavLink
            href="/wishlist"
            isActive={path === "/wishlist"}
            onClick={handleLinkClick}
          >
            Wishlist
          </NavLink>
          <NavLink
            href="/contact"
            isActive={path === "/contact"}
            onClick={handleLinkClick}
          >
            Contact Us
          </NavLink>
          <NavLink
            href="/blog"
            isActive={path === "/blog"}
            onClick={handleLinkClick}
          >
            Our Blog
          </NavLink>
        </div>
      )}
    </>
  );
};

export default PageMenu;
