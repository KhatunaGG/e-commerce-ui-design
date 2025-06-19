import Image from "next/image";
import { MoreButton } from "../../__molecules";
import { IImageData } from "@/app/store/manage-image.store";
import Link from "next/link";

const Articles = ({ images }: { images: IImageData[] }) => {
  // const articlePage = useMemo(
  //   () => images.filter((img) => img.componentUsage.includes("article")),
  //   [images]
  // );

  if (!images.length) {
    return null;
  }

  return (
    <section className="w-full py-[58.5px] lg:py-20 md:px-[11.11%] px-[8.53%] flex flex-col gap-10">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-[34px] md:text-[40px] font-medium tracking-[-0.6px] leading-[38px] md:tracking-[-0.4px] md:leading-[44px]">
          Articles
        </h2>
        <Link href={""}>
          <MoreButton styleClass="hidden md:flex" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {images.map((item, i) => {
          return (
            <div key={i} className="flex flex-col gap-4 md:gap-6">
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.presignedUrl || "/assets/article_1.png"}
                  width={357}
                  height={325}
                  alt={item.imageName}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="w-full flex flex-col items-start gap-2">
                <p className="text-base font-semibold md:text-[20px] md:font-medium leading-[26px] md:leading-[28px]">
                  {item.title ?? "Untitled Image"}
                </p>
                <Link href={""}>
                  <MoreButton styleClass="flex" />
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
