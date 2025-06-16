// import Link from "next/link";
// import React from "react";
// import { Logo } from "../../__atoms";

// const Nav = () => {
//   return (
//     <div className=" w-full flex items-center justify-between  py-[18px]">
//       <Logo />
//       <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[#6C7275] ">
//         <Link href={""}>
//           <p>Home</p>
//         </Link>
//         <Link href={""}>
//           <p>Shop</p>
//         </Link>
//         <Link href={""}>
//           <p>Product</p>
//         </Link>
//         <Link href={""}>
//           <p>Contact Us</p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Nav;

import React from "react";
import { Bag, Burger, Logo, Search, User } from "../../__atoms";
import { NavLink } from "../../__molecules";
// import MobileMenu from "../mobilemenu/MobileMenu";

const Nav = () => {
  return (
    <>
      {/* <MobileMenu /> */}
      <section className="w-full flex items-center justify-between py-[18px]              md:px-[11.11%] px-[8.53%] ">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center mb-[3px] md:mb-0 md:hidden">
            <Burger />
          </div>
          <Logo />
        </div>
        <div className="hidden md:flex items-center md:gap-6 lg:gap-10 text-sm font-medium text-[#6C7275]">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/product">Product</NavLink>
          <NavLink href="/contact">Contact Us</NavLink>
        </div>

        <div className="flex items-center gap-[16px]">
          <Search hidden={true} />
          <User />
          <Bag />
          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
            1
          </div>
        </div>
      </section>
    </>
  );
};

export default Nav;
