import { NavLinkProps } from "@/app/interfaces/interface";
import Link from "next/link";

const NavLink = ({
  href,
  children,
  isActive,
  onClick,
  variant,
}: NavLinkProps) => {
  const baseClass = "transition-colors";

  const activeClass =
    variant === "footer"
      ? isActive
        ? "text-white font-semibold"
        : "text-[#FEFEFE]"
      : isActive
      ? "font-bold text-black"
      : "text-[#6C7275]";

  return (
    <Link
      href={href}
      className={`${baseClass} ${activeClass} cursor-pointer transform hover:transition-transform duration-300 ease-in-out hover:scale-105 `}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
