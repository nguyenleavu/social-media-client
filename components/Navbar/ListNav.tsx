import { navigates } from "@/constants/navbar";
import { map } from "lodash";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ListNavProps {
  addTabNotification: () => void;
  addTabSearch: () => void;
  openModal: () => void;
}

const ListNav = ({
  addTabSearch,
  addTabNotification,
  openModal,
}: ListNavProps) => {
  const pathName = usePathname();

  return (
    <div className="bg-black">
      <>
        {map(
          navigates({
            href: "/profile",
            addTabSearch,
            addTabNotification,
            openModal,
          }),
          ({ id, title, href, onClick, icon }) => {
            const isActive = pathName === href;

            return href ? (
              <Link
                key={id}
                href={href}
                className={`p-3 flex w-full items-center my-2 rounded-lg hover:bg-grayActive transition-all ${
                  isActive && "bg-grayActive"
                }`}
              >
                <i className={`${icon} text-2xl`}></i>
                <span
                  className={`pl-4 hidden lg:block text-[15px] animate-fade-left ${
                    isActive && "font-semibold"
                  } `}
                >
                  {title}
                </span>
              </Link>
            ) : (
              onClick && (
                <button
                  key={id}
                  onClick={onClick}
                  className={`p-3 flex w-full items-center my-2 rounded-lg hover:bg-grayActive transition-all ${
                    isActive && "bg-[#1a1a1a]"
                  }`}
                >
                  <i className={`${icon} text-2xl`}></i>
                  <span
                    className={`pl-4 hidden lg:block text-[15px] animate-fade-left ${
                      isActive && "font-semibold"
                    } `}
                  >
                    {title}
                  </span>
                </button>
              )
            );
          }
        )}
      </>
    </div>
  );
};

export default ListNav;
