// import Image from "next/image";
// import { Logo } from "../../__atoms";

// const MainImage = () => {
//   return (
//     <div className="relative w-full h-full">
//       <Image
//         src="/assets/main_image.png"
//         alt="Main hero image"
//         fill
//         style={{ objectFit: "cover" }}
//         priority
//       />
//       <div className="absolute top-8 w-full flex items-center justify-center">
//         <Logo />
//       </div>
//     </div>
//   );
// };

// export default MainImage;

// import Image from "next/image";
// import { Logo } from "../../__atoms";

// const MainImage = () => {
//   return (
//     <div className="relative w-full h-full">
//       <Image
//         src="/assets/main_image.png"
//         alt="Main hero image"
//         fill
//         style={{ objectFit: "cover" }}
//         priority
//       />
//       <div className="absolute top-8 w-full flex items-center justify-center">
//         <Logo />
//       </div>
//     </div>
//   );
// };

// export default MainImage;

"use client";
import Image from "next/image";
import { Logo } from "../../__atoms";
import useManageImageStore from "@/app/store/manage-image.store";
import { useEffect } from "react";

const MainImage = () => {
  const { imagesData, fetchImagesByPage, currentPath } = useManageImageStore();

  useEffect(() => {
    fetchImagesByPage(currentPath);
  }, [fetchImagesByPage,     currentPath]);

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
