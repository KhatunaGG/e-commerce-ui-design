// import { Footer, Join, Nav } from "../components/__organism";

// export default function MainLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="w-full min-h-screen">
//       {/* <div className="w-full md:px-[11.11%] px-[8.53%]  "> */}
//       <div className="w-full relative ">
//         <Nav />
//         {children}
//       </div>
//           <Join />
//       <Footer />
//       {/* <div className="w-full h-10 bg-black"></div> */}
//     </section>
//   );
// }



import { Footer, Join, Nav, Navbar } from "../components/__organism";

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
      <Join />
      <Footer />
    </section>
  );
}
