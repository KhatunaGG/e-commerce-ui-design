import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href}>
      <p className="cursor-pointer transform hover:transition-transform duration-300 ease-in-out hover:scale-105">
        {children}
      </p>
    </Link>
  );
};

export default NavLink;
