"use client";

import Feeds from "./Feeds";
import Header from "./Header";

const NewFeeds = () => {
  return (
    <div className="w-full md:w-[630px] flex flex-col items-center mt-4 px-3">
      <Header />
      <Feeds />
    </div>
  );
};

export default NewFeeds;
