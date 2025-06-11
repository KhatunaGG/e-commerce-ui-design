import { Nav } from "../components/__organism";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full min-h-screen">
      <div className="w-full  lg:px-[11.11%] px-[8.53%] md:px-[4.77%]">
        <Nav />
        {children}
      </div>
      <div className="w-full h-10 bg-black"></div>
    </section>
  );
}
