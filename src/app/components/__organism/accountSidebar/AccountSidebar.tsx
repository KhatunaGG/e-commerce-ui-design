"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { Camera, ChevronLeft } from "../../__atoms";
import { accountLinks } from "@/app/commons/data";
import Link from "next/link";
import { useSignInStore } from "@/app/store/sign-in.store";
import { usePathname } from "next/navigation";

function AccountSidebar() {
  const { normalizeFirstChar } = useShopStore();
  const { logout } = useSignInStore();
  const pathname = usePathname();

  const getLinkPath = (item: string) =>
    `/account-page${item === "account" ? "" : `/${item}`}`;

  return (
    <div className="w-full  flex flex-col  items-center lg:gap-[79px] gap-4">
      <div className="w-full flex lg:hidden items-center justify-start gap-1 ">
        <div className="w-auto h-auto flex items-center justify-center pt-[6px]">
          <ChevronLeft />
        </div>
        <p>Back</p>
      </div>

      <div className="w-full flex flex-col md:flex-row lg:flex-col gap-10   py-10 px-4 bg-[#F3F5F7] rounded-lg">
        <div className="w-full flex flex-col items-center justify-center gap-[6px]">
          <div className="w-20 h-20 rounded-full flex items-center justify-center border border-black/40 relative">
            image
            <button className="absolute bottom-0 right-0 cursor-pointer">
              <Camera />
            </button>
          </div>
          <h2 className="font-semibold text-[20px] text-black leading-[32px]">
            Sofia Havertz
          </h2>
        </div>
        <div className="w-full flex flex-col items-start gap-4">
          {accountLinks.map((item, i) => {
            const label = normalizeFirstChar(item);
            const isLogout = item === "logout";
            const linkPath = getLinkPath(item);
            const isActive = pathname === linkPath;

            const baseStyles =
              "w-full py-2 text-base leading-[26px] cursor-pointer transition";
            const activeStyles = "font-bold border-b border-black text-black";
            const inactiveStyles =
              "font-semibold text-[#6C7275] hover:text-black";

            if (isLogout) {
              return (
                <button
                  key={i}
                  onClick={logout}
                  className={`${baseStyles} ${inactiveStyles} text-left`}
                >
                  {label}
                </button>
              );
            }

            return (
              <Link
                key={i}
                href={linkPath}
                className={`${baseStyles} ${
                  isActive ? activeStyles : inactiveStyles
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AccountSidebar;
