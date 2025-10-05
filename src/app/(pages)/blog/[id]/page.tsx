import { UserBlogItems } from "@/app/components/__organism";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function page({ params }: PageProps) {
  const { id } = await params;
  return (
    <section>
      <UserBlogItems params={id} />
    </section>
  );
}
