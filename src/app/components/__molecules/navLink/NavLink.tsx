// import Link from "next/link";
// import React from "react";

// interface NavLinkProps {
//   href: string;
//   children: React.ReactNode;
// }

// const NavLink = ({ href, children }: NavLinkProps) => {
//   return (
//     <Link href={href}>
//       <p className="cursor-pointer transform hover:transition-transform duration-300 ease-in-out hover:scale-105">
//         {children}
//       </p>
//     </Link>
//   );
// };

// export default NavLink;



import Link from "next/link";
import React from "react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
};

const NavLink = ({ href, children, isActive }: NavLinkProps) => {
  const baseClass = "transition-colors";
  const activeClass = isActive ? "font-bold text-black" : "text-[#6C7275]";

  return (
    <Link href={href} className={`${baseClass} ${activeClass} cursor-pointer transform hover:transition-transform duration-300 ease-in-out hover:scale-105`}>
      {children}
    </Link>
  );
};

export default NavLink;
