import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="bg-white inset-0 flex items-center justify-center h-screen w-screen">
      <Image
        src="/images/loading/loading.gif"
        alt="my gif"
        height={2000}
        width={2000}
        className="h-28 w-20"
        blurDataURL="/images/loading/loading.gif"
      />
    </div>
  );
};

export default Loading;
