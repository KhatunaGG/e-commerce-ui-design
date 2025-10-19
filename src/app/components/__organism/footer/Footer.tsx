"use client";
import { usePathname } from "next/navigation";
import { Facebook, Instagram, Logo, Youtube } from "../../__atoms";
import { NavLink } from "../../__molecules";
import Join from "../join/Join";
import Info from "../info/Info";

const Footer = () => {
  const path = usePathname();

  return (
    <div className="w-full ">
      {path == "/contact" ? (
        <div className="w-full py-4 bg-[#F3F5F7]">
          <Info />
        </div>
      ) : (
        <Join />
      )}

      <div className="w-full bg-[#141718]  md:px-[11.11%] px-[8.53%] py-12  md:pt-20 md:pb-[32px] flex flex-col ">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 md:gap-10">
          <div className="flex flex-col lg:flex-row items-center gap-[33px] lg:gap-8">
            <Logo color={"white"} />
            <div className="w-[1px] self-stretch  bg-[#6C7275] hidden lg:flex"></div>
            <p className="text-sm font-normal leading-[22px] text-[#E8ECEF]">
              Gift & Decoration Store
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center md:gap-6 lg:gap-10 text-sm font-normal text-[#FEFEFE]">
            <NavLink href="/" isActive={path === "/"} variant="footer">
              Home
            </NavLink>
            <NavLink href="/shop" isActive={path === "/shop"} variant="footer">
              Shop
            </NavLink>
            <NavLink
              href="/wishlist"
              isActive={path === "/wishlist"}
              variant="footer"
            >
              Wishlist
            </NavLink>
            <NavLink href="/blog" isActive={path === "/blog"} variant="footer">
              Blog
            </NavLink>
            <NavLink
              href="/contact"
              isActive={path === "/contact"}
              variant="footer"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
        <div className="w-full bg-[#6C7275] h-[1px] self-stretch mt-10 md:mt-[48px] mb-6 md:mb-4" />
        <div className=" w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-0">
          <div className="flex flex-col lg:flex-row items-center gap-[28px] order-2 lg:order-1 ">
            <p className="text-xs font-normal leading-[20px] text-[#E8ECEF] order-2 lg:order-1">
              Copyright © 2023 3legant. All rights reserved
            </p>
            <div className="flex items-center gap-[28px] order-1 lg:order-2">
              <p className="text-[#E8ECEF] text-xs font-semibold">
                Privacy Policy
              </p>
              <p className="text-[#E8ECEF] text-xs font-semibold">
                Terms of Use
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 order-1 lg:order-2">
            <Instagram />
            <Facebook />
            <Youtube />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
