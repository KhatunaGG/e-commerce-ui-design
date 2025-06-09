"use client";
import { useRouter } from "next/navigation";
import Hero from "../hero/Hero";
// import useManageImageStore from "@/app/store/manage-image.store";
import { useEffect } from "react";
import { useSignInStore } from "@/app/store/sign-in.store";
import { AnimateSpin } from "../../__molecules";

const Dashboard = () => {
  // const setPath = useManageImageStore((state) => state.setPath);
  // const { currentPath } = useManageImageStore();
  const { accessToken, initialize, isLoading } = useSignInStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading || !accessToken) {
    return <AnimateSpin />;
  }
  if (!accessToken) router.push("/sign-up");

  return (
    <section className="w-full">
      <div className="DASHBOARD w-full h-full">
        <Hero />
      </div>
    </section>
  );
};

export default Dashboard;
