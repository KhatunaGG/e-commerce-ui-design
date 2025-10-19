"use client";
import { useAddressStore } from "@/app/store/address.store";
import { useShopStore } from "@/app/store/shop-page.store";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Down } from "../../__atoms";
import { RouterButtonPropsType } from "@/app/interfaces/interface";

const RouterButton = ({ accountLinks }: RouterButtonPropsType) => {
  const router = useRouter();
  const { normalizeFirstChar } = useShopStore();
  const { logout } = useSignInStore();
  const { isOpen, setIsOpen, setSelectedLabel, selectedLabel } =
    useAddressStore();

  const handleSelect = useCallback(
    (value: string) => {
      setIsOpen(false);
      if (value === "logout") {
        logout();
      } else {
        const path =
          value === "account" ? "/account-page" : `/account-page/${value}`;
        router.push(path);
      }
      const label = normalizeFirstChar(value);
      setSelectedLabel(label);
    },
    [logout, router, normalizeFirstChar, setIsOpen, setSelectedLabel]
  );

  return (
    <div className="w-full relative">
      <div
        className="w-full py-[14px] px-4 border border-gray-300 rounded-lg bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel || "Select option"}
      </div>
      <div
        className={`absolute top-1/2 right-4 transform -translate-y-1/2 transition-transform duration-300 pointer-events-none ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      >
        <Down />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-20 mt-2 py-2 px-4 flex flex-col gap-2 rounded-lg bg-white shadow-2xl">
          {accountLinks.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSelect(item)}
              className="w-full text-left py-2 px-2 hover:bg-gray-100 rounded"
            >
              {normalizeFirstChar(item)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RouterButton;
