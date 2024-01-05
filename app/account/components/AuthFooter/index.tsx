import Link from "next/link";
import React from "react";

interface AuthFooterProps {
  typography: string;
  href: string;
  label: string;
}

const AuthFooter = ({ typography, href, label }: AuthFooterProps) => {
  return (
    <div className="w-96 flex flex-col items-center border border-gray-300 rounded px-10 py-5 mt-2 z-10 bg-white">
      <p className="text-sm">
        {typography}{" "}
        <Link href={href} className="text-primary font-medium">
          {label}
        </Link>
      </p>
    </div>
  );
};

export default AuthFooter;
