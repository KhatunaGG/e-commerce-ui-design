"use client";
import Image from "next/image";
import { Logo } from "../../__atoms";
import { useHomePageStore } from "@/app/store/useHomePage.store.";

const MainImage = () => {
  const { imagesData } = useHomePageStore();

  return (
    <div className="relative w-full h-[430px] lg:min-h-screen">
      <Image
        src={imagesData[0]?.url || "/assets/main_image.png"}
        alt="Main hero image"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="absolute top-8 w-full flex items-center justify-center">
        <Logo />
      </div>
    </div>
  );
};

export default MainImage;
