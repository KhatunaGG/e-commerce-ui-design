import { ProductDetails } from "@/app/components/__organism";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <ProductDetails params={id} />
    </>
  );
}
