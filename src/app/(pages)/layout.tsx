import { Footer, Nav, Navbar } from "../components/__organism";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full ">
      <div className="w-full relative ">
        <Navbar />
        <Nav />
        {children}
      </div>
      {/* <Join /> */}
      <Footer />
    </section>
  );
}
