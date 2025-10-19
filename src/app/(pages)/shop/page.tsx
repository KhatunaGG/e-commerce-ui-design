import { AnimateSpin } from "@/app/components/__molecules";
import Shop from "@/app/components/__organism/shop/Shop";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<AnimateSpin />}>
      <Shop />
    </Suspense>
  );
}
