"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { useSignInStore } from "@/app/store/sign-in.store";
import Image from "next/image";

export type ReviewAvatar = {
  avatar: string;
};

const ReviewAvatar = ({ avatar }: ReviewAvatar) => {
  const { currentUser } = useSignInStore();
  const { normalizeFirstChar } = useShopStore();

  return (
    <div className="w-[72px] h-[72px] rounded-full border border-[#E8ECEF] relative">
      {avatar ? (
        <Image
          src={avatar}
          alt="User Avatar"
          fill
          className="object-cover z-10 absolute inset-0 w-20 h-20 rounded-full"
        />
      ) : (
        <span className="text-sm text-gray-500 w-full h-full flex items-center justify-center">
          {normalizeFirstChar(currentUser?.yourName || "").charAt(0)}{" "}
          {normalizeFirstChar(currentUser?.lastName || "").charAt(0)}
        </span>
      )}
    </div>
  );
};

export default ReviewAvatar;
