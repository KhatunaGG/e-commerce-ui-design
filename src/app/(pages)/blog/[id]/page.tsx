import { UserBlogItems } from "@/app/components/__organism";
import { PageProps } from "@/app/interfaces/interface";

export default async function page({ params }: PageProps) {
  const { id } = await params;
  return (
    <section>
      <UserBlogItems params={id} />
    </section>
  );
}
