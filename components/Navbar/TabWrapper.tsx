import { ReactNode } from "react";

interface TabWrapperProps {
  open: boolean;
  children: ReactNode;
}

const TabWrapper = ({ open, children }: TabWrapperProps) => {
  return (
    <div
      className={`absolute top-0 right-0 bottom-0 w-[370px] bg-black rounded-r-2xl border-x border-gray26 transition-all duration-500 z-10 ${
        open ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="h-full">{children}</div>
    </div>
  );
};

export default TabWrapper;
