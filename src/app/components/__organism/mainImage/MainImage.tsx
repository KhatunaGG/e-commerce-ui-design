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
import { useHomePageStore } from "@/app/store/useHomePage.store.";


const MainImage = () => {
  const { imagesData } = useHomePageStore();

  // useEffect(() => {
  //   fetchImagesByPage(currentPath, "mainImage");
  // }, [fetchImagesByPage,     currentPath]);

  // console.log(imagesData, "imagesData from MainImage")

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
