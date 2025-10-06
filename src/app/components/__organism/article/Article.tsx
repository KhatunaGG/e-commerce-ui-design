"use client";
import Image from "next/image";
import { useReviewStore } from "@/app/store/review.store";
import { useShopStore } from "@/app/store/shop-page.store";
import { User } from "../../__atoms";
import Calendar from "../../__atoms/calendar/Calendar";

export type ArticleProps = {
  articleTitle: string;
  context: string;
  filePath: string[];
  blogOwenName: string;
  blogOwnerLastName: string;
  createdAt: string;
  blogId: string;
};

const Article = ({
  articleTitle,
  context,
  filePath,
  blogOwenName,
  blogOwnerLastName,
  createdAt,
  blogId,
}: ArticleProps) => {
  const { formatDate } = useReviewStore();
  const { normalizeFirstChar } = useShopStore();
  const articleBlogImage = filePath[0];


  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 mt-[36px] lg:mt-[48px] bg-violet-200">
      <p className="uppercase font-bold text-sm leading-[12px]">article</p>
      <h1 className="text-[28px] leading-[34px] lg:text-[54px] lg:leading-[58px] font-medium lg:max-w-[834px]">{normalizeFirstChar(articleTitle)}</h1>



      <div className="flex flex-col gap-4 md:flex-row items-start justify-between md:justify-start  md:gap-6">

        <div className="w-1/2 flex items-center gap-[6px] md:w-auto">
          <span className="w-fit">
            <User blogId={blogId} style={"#6C7275"} />
          </span>
          <h2 className="flex  text-wrap font-normal text-base leading-[26px] text-[#6C7275]">
            {normalizeFirstChar(blogOwenName)}{" "}
            {normalizeFirstChar(blogOwnerLastName)}
          </h2> 
        </div>
        <div className="w-1/2 flex items-center gap-[6px] md:w-auto ">
          <span>
            <Calendar />
          </span>
          <h2 className="text-base leading-[26px] text-[#6C7275]">{formatDate(createdAt)}</h2>
        </div>

      </div>











      <div className="w-full relative">
        <Image
          alt={articleTitle || "Banner image"}
          src={articleBlogImage || "/assets/product_banner.png"}
          width={1120}
          height={392}
          sizes="(max-width: 767px) 311px, 100vw"
          className="object-cover shadow-xl w-[311px] h-[308px] md:w-full md:h-auto"
          priority
        />
      </div>
      <p>{" "}{context}</p>
      <div className="w-full flex items-center justify-center flex-col md:flex-row gap-6">
        {filePath.slice(1).map((img, i) => {
          return (
            <div
              key={`${i}-${articleTitle}`}
              className="relative w-[312px] h-[200px] "
            >
              <Image
                src={img || "/assets/blog_img1.png"}
                alt="Blog image"
                fill
                className="object-cover rounded-md shadow-xl"
                sizes="(min-width: 768px) 312px, 283px"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Article;
