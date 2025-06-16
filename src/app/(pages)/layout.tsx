import { Footer, Nav } from "../components/__organism";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full min-h-screen">
      {/* <div className="w-full md:px-[11.11%] px-[8.53%]  "> */}
      <div className="w-full  ">
        <Nav />
        {children}
      </div>
      <Footer />
      {/* <div className="w-full h-10 bg-black"></div> */}
    </section>
  );
}
