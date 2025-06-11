"use client";
import { useRouter } from "next/navigation";
import Hero from "../hero/Hero";
// import useManageImageStore from "@/app/store/manage-image.store";
import { useEffect } from "react";
import { useSignInStore } from "@/app/store/sign-in.store";
import { AnimateSpin, SubText } from "../../__molecules";
import ByRooms from "../byRooms/ByRooms";
import useManageImageStore from "@/app/store/manage-image.store";

const Dashboard = () => {
  const { accessToken, initialize, isLoading } = useSignInStore();
  const { imagesData } = useManageImageStore();
  const router = useRouter();

  console.log(imagesData, "imagesData");

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading || !accessToken) {
    return <AnimateSpin />;
  }
  if (!accessToken) router.push("/sign-up");

  return (
    <section className="w-full">
      <div className="w-full h-full">
        <Hero
          images={imagesData.filter((img) =>
            img.componentUsage.includes("hero")
          )}
        />
        <SubText />
        <ByRooms
          images={imagesData.filter((img) =>
            img.componentUsage.includes("byroom")
          )}
        />
      </div>
    </section>
  );
};

export default Dashboard;
