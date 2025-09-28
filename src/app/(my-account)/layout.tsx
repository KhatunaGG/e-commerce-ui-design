import { AccountSidebar, Footer, Nav } from "../components/__organism";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="w-full h-full ">
        <Nav />

        <div className="w-full h-full min-h-screen flex justify-center px-[8.53%] md:px-[11.11%]">
          <div className="w-full   flex flex-col items-center justify-center gap-10  py-10 lg:py-20">
            <h1 className="w-full  flex items-center justify-center text-[40px] lg:text-[54px] tracking-[-0.4px] font-medium leading-[44px]  lg:leading-[58px] lg:tracking-[-1px] text-black">
              My Account
            </h1>

            <div className="w-full flex items-start flex-col lg:flex-row justify-between gap-10 lg:gap-0">
              <div className=" w-full lg:w-[23.39%]">
                <AccountSidebar />
              </div>
              <div className=" w-full lg:w-[76.69%]"> {children}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
