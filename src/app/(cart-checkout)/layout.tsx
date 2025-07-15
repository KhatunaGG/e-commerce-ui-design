import { Footer, Nav } from "../components/__organism";



export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-fit ">
      <div className="w-full relative">
        <Nav />
        {children}
      </div>
      <Footer />
    </section>
  );
}
