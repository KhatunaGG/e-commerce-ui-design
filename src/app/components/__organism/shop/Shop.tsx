"use client";

import useManageImageStore from "@/app/store/manage-image.store";

const Shop = () => {
  const currentPath = useManageImageStore((state) => state.currentPath);
  console.log(currentPath, "currentPath");
  return <div>Shop</div>;
};

export default Shop;
