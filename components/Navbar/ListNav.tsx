import { navigates } from "@/constants/navbar";
import { useAppSelector } from "@/redux/hook";
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
  const user = useAppSelector((state) => state.profile.user);
  return (
    <div className="bg-black flex items-center sm:block justify-between w-full gap-2">
      <>
        {map(
          navigates({
            href: `/${user?.username}`,
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
                className={`p-3 flex w-full items-center justify-center sm:justify-start my-2 rounded-lg hover:bg-grayActive transition-all ${
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
                  className={`p-3 flex w-full items-center justify-center sm:justify-start my-2 rounded-lg hover:bg-grayActive transition-all ${
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
