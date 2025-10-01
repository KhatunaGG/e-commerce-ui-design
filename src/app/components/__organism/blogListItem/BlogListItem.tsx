// "use client";
// import Image from "next/image";
// import Link from "next/link";

// export type BlogListItemProps = {
//   title: string;
//   filePath: string;
//   authorFName: "";
//   authorLName: "";
//   articles: [];
//   authorId: "";
//   _id: string;
//   createdAt: string;

//   sortByTwoHorizontally: boolean;
// };

// const BlogListItem = ({
//   title,
//   filePath,
// //   authorFName,
// //   authorLName,
// //   articles,
// //   authorId,
//   _id,
//   createdAt,
// }: BlogListItemProps) => {
//   return (
//     <Link href={""} key={_id} className="w-full flex items-center flex-col gap-6">
//       <div className="relative w-[312px] h-[283px] md:w-[387px] md:h-[325px] bg-green-200">
//         <Image
//           src={filePath || "/assets/blog_img1.png"}
//           alt={title}
//           fill
//           className="object-cover rounded-md shadow-xl"
//           sizes="(min-width: 768px) 387px, 312px"
//         />

//       </div>

//       <div className="w-full items-start flex flex-col gap-2 bg-blue-300">
//         <h2 className="font-medium text-base leading-[26px] text-[#23262F] lg:text-[20px] lg:leading-[28px]">
//           {title}
//         </h2>
//         <p className="font-normal text-xs leading-[20px] text-[#6C7275]">
//           {createdAt}
//         </p>
//       </div>
//     </Link>
//   );
// };

// export default BlogListItem;

"use client";
import { useReviewStore } from "@/app/store/review.store";
import Image from "next/image";
import Link from "next/link";

export type BlogListItemProps = {
  title: string;
  filePath: string;
  authorFName: "";
  authorLName: "";
  articles: [];
  authorId: "";
  _id: string;
  createdAt: string;

  sortByTwoHorizontally: boolean;
};

const BlogListItem = ({
  title,
  filePath,
  sortByTwoHorizontally,
  //   authorFName,
  //   authorLName,
  //   articles,
  //   authorId,
  _id,
  createdAt,
}: BlogListItemProps) => {
   const { formatDate } = useReviewStore();
  return (
    <Link
      href={""}
      key={_id}
      className={`${
        sortByTwoHorizontally
          ? "flex-row  md:items-center md:justify-center"
          : "flex-col"
      } w-full flex items-center flex-col gap-6`}
    >
      <div className="relative w-[312px] h-[283px] md:w-[283px] md:h-[255px] lg:w-[387px] lg:h-[325px]">
        <Image
          src={filePath || "/assets/blog_img1.png"}
          alt={title}
          fill
          className="object-cover rounded-md shadow-xl"
          sizes="(min-width: 768px) 312px, 283px"
        />
      </div>

      <div
        className={`${
          sortByTwoHorizontally ? "w-[30%]" : "w-full"
        }  items-start flex flex-col gap-2`}
      >
        <h2
          className={`${
            sortByTwoHorizontally && "text-sm"
          } font-medium text-base leading-[26px] text-[#23262F] lg:text-[20px] lg:leading-[28px]`}
        >
          {title}
        </h2>
        <p className="font-normal text-xs leading-[20px] text-[#6C7275]">
          {formatDate(createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default BlogListItem;
