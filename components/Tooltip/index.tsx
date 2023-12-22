import classNames from "classnames";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  content: string | ReactNode;
  place?: "left" | "right";
}

const Tooltip = ({ children, content, place = "left" }: Props) => {
  return (
    <div>
      <div className="group relative w-max">
        {children}
        <div
          className={classNames(
            "pointer-events-none absolute block -bottom-9 w-max opacity-0 transition-opacity group-hover:opacity-100 px-1 text-sm text-grayA8 border border-grayA8 rounded bg-gray26 delay-500",
            place === "right" ? "right-0" : "left-0"
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
