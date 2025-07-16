"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { ChevronLeft } from "../../__atoms";
import CartHeader from "../cartHeader/CartHeader";
import { useSignInStore } from "@/app/store/sign-in.store";

const Checkout = () => {
  const { accessToken,
    //  currentUser, 
     initialize } = useSignInStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!accessToken) return null;

  return (
    <div className="w-full h-foll min-h-screen flex flex-col items-center justify-center py-20">
      <div className="w-full  md:w-[84.73%] lg:w-[77.77%] flex flex-col  gap-10 lg:gap-20">
        <Link
          className="w-full lg:hidden flex items-center gap-1"
          href={"/shop"}
        >
          <ChevronLeft />
          <h2> Back</h2>
        </Link>

        <CartHeader />
      </div>
    </div>
  );
};

export default Checkout;
