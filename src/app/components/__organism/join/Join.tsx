// import Image from "next/image";
// import { Email } from "../../__atoms";

// const Join = () => {
//   return (
//     <section className="w-full">
//       <div className="w-full relative h-[360px] bg-[#F2F4F6]  lg:bg-none px-[31.5px] py-[95px] lg:py-0 lg:px-0  ">
//         <Image
//           src={"/assets/join.png"}
//           alt={""}
//           className="object-cover  hidden lg:flex"
//           fill
//           priority
//           sizes="(max-width: 1024px) 100vw, 50vw"
//         />
//         <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-auto lg:bg-none px-[31.5px] py-[95px] lg:py-0 lg:px-0 text-center ">
//           <div className="flex flex-col gap-8">
//             <div className="flex flex-col gap-2">

//             <h2 className="text-[28px] md:text-[40px] font-medium leading-[34px] tracking-[-0.6px] md:leading-11 md:tracking-[-0.4px] text-[#141718]">
//               Join Our Newsletter
//             </h2>
//             <p className="text-[18px] font-normal leading-[30px] text-[#141718]">
//               Sign up for deals, new products and promotions
//             </p>
//             </div>


//           <form className="flex flex-col gap-3 ">
//             <div className="w-full relative">
//               <div className="w-full flex items-center gap-2">
//                 <Email />
//                 <input type="email" placeholder="Email address" className="outline-none" />
//               <p className="absolute right-0 top-0">Signup</p>
//               </div>
//             </div>

//             <div className="w-full h-[1px] bg-[#6C727580] " />
//           </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Join;





"use client"
import Image from "next/image";
import { Email } from "../../__atoms";

const Join = () => {
  return (
    <section className="w-full bg-red-300">
      <div className="w-full relative h-[360px] bg-[#F2F4F6]  lg:bg-none px-[31.5px] py-[95px] lg:py-0 lg:px-0  ">
        <Image
          src={"/assets/join.png"}
          alt={""}
          className="object-cover  hidden lg:flex"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-auto lg:bg-none px-[31.5px] py-[95px] lg:py-0 lg:px-0 text-center ">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">

            <h2 className="text-[28px] md:text-[40px] font-medium leading-[34px] tracking-[-0.6px] md:leading-11 md:tracking-[-0.4px] text-[#141718]">
              Join Our Newsletter
            </h2>
            <p className="text-[18px] font-normal leading-[30px] text-[#141718]">
              Sign up for deals, new products and promotions
            </p>
            </div>

          <form className="flex flex-col gap-3 ">
            <div className="w-full relative">
              <div className="w-full flex items-center gap-2">
                <Email />
                <input type="email" placeholder="Email address" className="outline-none" />
              <p className="absolute right-0 top-0">Signup</p>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#6C727580] " />
          </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;


