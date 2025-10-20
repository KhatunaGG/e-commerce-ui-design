"use client";
import Link from "next/link";
import {
  Close,
  Facebook,
  Instagram,
  Search,
  User,
  Youtube,
} from "../../__atoms";
import PageMenu from "../pageMenu/PageMenu";
import { MobileMenuProps } from "@/app/interfaces/interface";

const MobileMenu = ({ mobileMenu, setMobileMenu }: MobileMenuProps) => {
  if (!mobileMenu) return null;

  return (
    <div className=" fixed inset-0 bg-black/50 top-0 min-h w-full h-auto z-50 flex items-start justify-center md:hidden">
      <div className="mt-[15%] w-[80%] bg-white rounded-xl px-4 py-6 shadow-2xl">
        <div className="flex items-center justify-end ">
          <Close mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
        </div>
        <PageMenu />
        <div className="w-full flex flex-col items-start justify-end mt-6">
          <div className="w-full flex flex-col  gap-2 relative">
            <input
              type="text"
              className="w-full border border-[#f1f1f1] outline-none py-2 px-2 rounded-lg"
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <Search hidden={false} />
            </div>
          </div>
          <Link
            onClick={() => setMobileMenu(false)}
            className="w-full flex items-center justify-start gap-8 pt-8"
            href={"/account-page"}
          >
            <User mobileMenu={mobileMenu} />
            <p>My Account</p>
          </Link>

          <div className="bg-[#f1f1f1] h-[1px] w-full my-4"></div>

          <div className="w-full flex flex-col gap-3 px-8 lg:px-0 bg-[#f1f1f1] rounded-xl py-2">
            <h1 className="text-xl font-medium text-[#141718]">Sign Up</h1>
            <p className="text-[#6C7275] text-base font-semibold">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="text-[#38CB89] cursor-pointer inline-block transform hover:underline transition-transform duration-300 ease-in-out hover:scale-105"
              >
                Sign in
              </Link>
            </p>
          </div>
          <div className="w-full flex items-center justify-end gap-4 mt-4">
            <Instagram color="black" />
            <Facebook color="black" />
            <Youtube color="black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
