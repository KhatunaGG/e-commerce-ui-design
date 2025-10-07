// import Image from "next/image";
// import { MoreButton } from "../../__molecules";

// import Link from "next/link";
// import { IImageData } from "@/app/store/useHomePage.store.";

// const Articles = ({ images }: { images: IImageData[] }) => {
//   // const articlePage = useMemo(
//   //   () => images.filter((img) => img.componentUsage.includes("article")),
//   //   [images]
//   // );

//   if (!images.length) {
//     return null;
//   }

//   return (
//     <section className="w-full py-[58.5px] lg:py-20 md:px-[11.11%] px-[8.53%] flex flex-col gap-10">
//       <div className="w-full flex items-center justify-between">
//         <h2 className="text-[34px] md:text-[40px] font-medium tracking-[-0.6px] leading-[38px] md:tracking-[-0.4px] md:leading-[44px]">
//           Articles
//         </h2>
//         <Link href={"/blog"} >
//           <MoreButton styleClass="hidden md:flex" label="Reade More"  />
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
//         {images.map((item, i) => {
//           return (
//             <div key={i} className="flex flex-col gap-4 md:gap-6">
//               <div className="relative aspect-[4/3]">
//                 <Image
//                   src={item.presignedUrl || "/assets/article_1.png"}
//                   width={357}
//                   height={325}
//                   alt={item.imageName}
//                   className="w-full h-auto object-cover"
//                 />
//               </div>

//               <div className="w-full flex flex-col items-start gap-2">
//                 <p className="text-base font-semibold md:text-[20px] md:font-medium leading-[26px] md:leading-[28px]">
//                   {item.title ?? "Untitled Image"}
//                 </p>
//                 <Link href={"/blog"} className="w-full">
//                   <MoreButton styleClass="flex" label="Reade More" />
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default Articles;

"use client";
import Image from "next/image";
import { MoreButton } from "../../__molecules";
import Link from "next/link";
import { useBlogStore } from "@/app/store/blog.store";
import { useEffect } from "react";


export type ArticlesType = {
  blogId?: string;
}

const Articles = ({blogId}: ArticlesType) => {
  const blogsForArticle = useBlogStore((state) => state.blogsForArticle);
  const getFirstThreeBlogs = useBlogStore((state) => state.getFirstThreeBlogs);


  useEffect(() => {
    getFirstThreeBlogs();
  }, [getFirstThreeBlogs]);






  if (!blogsForArticle.length) return null;

  return (
    <section className="w-full py-[58.5px] lg:py-20 md:px-[11.11%] px-[8.53%] flex flex-col gap-10 ">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-[34px] md:text-[40px] font-medium tracking-[-0.6px] leading-[38px] md:tracking-[-0.4px] md:leading-[44px]">
          
          {blogId ? "You might also like" : "Articles"}
        </h2>
        <Link href={"/blog"}>
          <MoreButton styleClass="hidden md:flex" label="Reade More" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6   ">
        {blogsForArticle.map((blog, i) => {
          return (
            <div key={i} className="flex flex-col gap-4 md:gap-6">
              <Link
                href={"#"}
                className="relative w-[312px] h-[283px] md:w-[283px] md:h-[255px] lg:w-[387px] lg:h-[325px]"
              >
                <Image
                  src={blog.filePath || "/assets/blog_img1.png"}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-md shadow-xl"
                  sizes="(min-width: 768px) 312px, 283px"
                />
              </Link>

              <div className="w-full flex flex-col gap-2 items-stretch ">
                <p className="text-base font-semibold md:text-[20px] md:font-medium leading-[26px] md:leading-[28px] line-clamp-1">
                  {blog.title ?? "Untitled Image"}
                </p>
                <Link href={"/blog"} className="w-full">
                  <MoreButton styleClass="flex" label="Reade More" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Articles;
