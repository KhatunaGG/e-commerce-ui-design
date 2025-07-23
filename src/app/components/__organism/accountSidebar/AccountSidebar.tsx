"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { Camera, ChevronLeft } from "../../__atoms";

function AccountSidebar() {
  const { normalizeFirstChar } = useShopStore();
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
            <button className="absolute bottom-0 right-0">
              <Camera />
            </button>
          </div>
          <h2 className="font-semibold text-[20px] text-black leading-[32px]">
            Sofia Havertz
          </h2>
        </div>
        <div className="w-full flex flex-col items-start gap-4">
          {["account", "address", "orders", "wishlist", "log out"].map(
            (item, i) => {
              return (
                <h3
                  key={i}
                  className="w-full py-2 text-base font-semibold leading-[26px] text-[#6C7275] "
                >
                  {normalizeFirstChar(item)}
                </h3>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountSidebar;
