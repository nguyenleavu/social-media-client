import { ROUTES } from "@/constants/routes";
import Link from "next/link";

const LogoNav = () => {
  return (
    <Link
      href={ROUTES.HOME}
      className="hidden sm:flex justify-between items-center h-12 mt-2 mb-12 px-3 transition-all "
    >
      <h1 className="transition-all duration-500 text-3xl hidden lg:block animate-fade-right">
        Social Media
      </h1>
      <h1 className="transition-all duration-500 text-2xl lg:hidden animate-fade">
        <i className="fa-regular fa-tv-retro"></i>
      </h1>
    </Link>
  );
};

export default LogoNav;
