import React from "react";

const Divider = () => {
  return (
    <div className="flex items-center w-full my-3 relative">
      <div className="w-full h-[1px] bg-gray-400"></div>
      <span className="absolute bg-white left-1/2 -translate-x-1/2 w-16 text-sm font-semibold text-gray-400 flex items-center justify-center">
        OR
      </span>
    </div>
  );
};

export default Divider;
