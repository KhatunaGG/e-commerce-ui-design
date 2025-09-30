"use client";
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
};

const BlogListItem = ({
  title,
  filePath,
//   authorFName,
//   authorLName,
//   articles,
//   authorId,
  _id,
  createdAt,
}: BlogListItemProps) => {
  return (
    <Link href={""} key={_id} className="w-full flex items-center flex-col gap-6">
      <div className="relative w-[312px] h-[283px] md:w-[387px] md:h-[325px] bg-green-200">
        <Image
          src={filePath || "/assets/blog_img1.png"}
          alt={title}
          fill
          className="object-cover rounded-md shadow-xl"
          sizes="(min-width: 768px) 387px, 312px"
        />



        
      </div>

      <div className="w-full items-start flex flex-col gap-2 bg-blue-300">
        <h2 className="font-medium text-base leading-[26px] text-[#23262F] lg:text-[20px] lg:leading-[28px]">
          {title}
        </h2>
        <p className="font-normal text-xs leading-[20px] text-[#6C7275]">
          {createdAt}
        </p>
      </div>
    </Link>
  );
};

export default BlogListItem;
