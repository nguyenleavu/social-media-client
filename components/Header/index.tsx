import { ROUTES } from "@/constants/routes";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <div
      className={classNames(
        "fixed top-0 left-0 right-0 sm:hidden h-12 bg-black w-full z-50",
        pathname === ROUTES.REELS && "hidden"
      )}
    >
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
