import { MainImage, SignIn  } from "@/app/components/__organism";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-[51.11%] ">
        <MainImage />
      </div>
      <SignIn />
    </div>
  );
}