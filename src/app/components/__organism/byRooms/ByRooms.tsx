// "use client";
// import { IImageData } from "@/app/store/manage-image.store";
// import { useMemo } from "react";
// import Image from "next/image";

// const ByRooms = ({ images }: { images: IImageData[] }) => {
//   const byRoomsPages = useMemo(() => {
//     return images.filter((img) =>
//       img.componentUsage?.some((c) => c.toLowerCase() === "byroom")
//     );
//   }, [images]);

//   if (!byRoomsPages.length) {
//     return null;
//   }

//   return (
//     <section className="w-full mt-10 flex flex-col lg:flex-row gap-4 lg:gap-6">
//       {/* Main large image - left side */}
//       <div className="w-full lg:w-1/2">
//         <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
//           <Image
//             src={byRoomsPages[0]?.presignedUrl || "/assets/byRoom_1.png"}
//             alt="Main hero image"
//             fill
//             className="object-cover"
//             priority
//             sizes="(max-width: 1024px) 100vw, 50vw"
//           />
//         </div>
//       </div>

//       {/* Two stacked images - right side */}
//       <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-6 h-[400px] sm:h-[500px] lg:h-[600px]">
//         <div className="relative w-full flex-1 rounded-lg overflow-hidden">
//           <Image
//             src={byRoomsPages[1]?.presignedUrl || "/assets/byRoom_2.png"}
//             alt="Secondary image 1"
//             fill
//             className="object-cover"
//             priority
//             sizes="(max-width: 1024px) 100vw, 50vw"
//           />
//         </div>
        
//         <div className="relative w-full flex-1 rounded-lg overflow-hidden">
//           <Image
//             src={byRoomsPages[2]?.presignedUrl || "/assets/byRoom_3.png"}
//             alt="Secondary image 2"
//             fill
//             className="object-cover"
//             sizes="(max-width: 1024px) 100vw, 50vw"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ByRooms;




"use client";
import { IImageData } from "@/app/store/manage-image.store";
import { useMemo } from "react";
import Image from "next/image";

const ByRooms = ({ images }: { images: IImageData[] }) => {
  const byRoomsPages = useMemo(() => {
    return images.filter((img) =>
      img.componentUsage?.some((c) => c.toLowerCase() === "byroom")
    );
  }, [images]);

  if (!byRoomsPages.length) {
    return null;
  }

  return (
    <section className="w-full mt-10">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 lg:h-[600px]">
        {/* Main large image - left side */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full rounded-lg overflow-hidden">
            <Image
              src={byRoomsPages[0]?.presignedUrl || "/assets/byRoom_1.png"}
              alt="Main hero image"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Two stacked images - right side */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-6">
          <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:flex-1 rounded-lg overflow-hidden">
            <Image
              src={byRoomsPages[1]?.presignedUrl || "/assets/byRoom_2.png"}
              alt="Secondary image 1"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          
          <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:flex-1 rounded-lg overflow-hidden">
            <Image
              src={byRoomsPages[2]?.presignedUrl || "/assets/byRoom_3.png"}
              alt="Secondary image 2"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ByRooms;