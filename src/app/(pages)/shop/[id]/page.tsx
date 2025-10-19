import { ProductDetails } from "@/app/components/__organism";
import { PageProps } from "@/app/interfaces/interface";

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <ProductDetails params={id} />
    </>
  );
}
