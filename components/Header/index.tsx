import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 left-0 right-0 sm:hidden h-12 bg-black w-full z-50">
      <Link
        href={ROUTES.HOME}
        className="flex justify-between items-center h-12 px-3 transition-all "
      >
        <h1 className="transition-all duration-500 text-2xl animate-fade-right">
          Social Media
        </h1>
      </Link>
    </div>
  );
};

export default Header;
