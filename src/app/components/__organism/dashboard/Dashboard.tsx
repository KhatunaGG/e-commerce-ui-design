"use client";
import { useRouter } from "next/navigation";
import Hero from "../hero/Hero";
// import useManageImageStore from "@/app/store/manage-image.store";
import { useEffect } from "react";
import { useSignInStore } from "@/app/store/sign-in.store";
import { AnimateSpin, SubText } from "../../__molecules";
import ByRooms from "../byRooms/ByRooms";
import useManageImageStore from "@/app/store/manage-image.store";
import NewArrivals from "../newArrivals/NewArrivals";
import Info from "../info/Info";

const Dashboard = () => {
  const { accessToken, initialize, isLoading } = useSignInStore();
  const { imagesData } = useManageImageStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading || !accessToken) {
    return <AnimateSpin />;
  }
  if (!accessToken) router.push("/sign-up");

  return (
    <section className="w-full ">
      <div className="w-full h-full flex flex-col">
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
        <NewArrivals
          images={imagesData.filter((img) =>
            img.componentUsage.includes("newarrivals")
          )}
        />
        <Info />
      </div>
    </section>
  );
};

export default Dashboard;
