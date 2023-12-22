import { ROUTES } from "@/constants/routes";
import Link from "next/link";

const SuggestTitle = () => {
  return (
    <div className="flex items-center justify-between px-4">
      <span className="text-[#abababab] font-semibold text-sm">
        Suggested for you
      </span>
      <Link
        href={ROUTES.EXPLORE_PEOPLE}
        className="text-white font-medium text-xs hover:text-[#abababab] transition-all"
      >
        See all
      </Link>
    </div>
  );
};

export default SuggestTitle;
