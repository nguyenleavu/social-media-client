"use client";

import { profileTabs } from "@/constants/content";
import classNames from "classnames";
import { map } from "lodash";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Content = ({ params }: { params: { username: string } }) => {
  const pathname = usePathname();
  const path = pathname.split(params.username)[1];

  return (
    <div className="border-t border-gray26 w-content">
      <ul className="flex items-center gap-14 justify-center">
        {map(profileTabs, (tab) => {
          const selected = path === tab.slug;
          return (
            <li key={tab.id}>
              <Link
                href={`/${params.username}${tab.slug}`}
                className={classNames(
                  "flex items-center uppercase text-grayA8 outline-none h-[52px] text-xs tracking-widest font-semibold transition-all",
                  selected && "text-zinc-50 border-t border-white"
                )}
              >
                <i className={tab.icon}></i>
                <span className="ml-2">{tab.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Content;
