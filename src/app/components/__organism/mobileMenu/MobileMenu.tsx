"use client";
import Link from "next/link";
import { Close, Search, User } from "../../__atoms";
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
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
