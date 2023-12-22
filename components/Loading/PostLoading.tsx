import { map } from "lodash";

const PostLoading = () => {
  return (
    <>
      {map(Array(2).fill(0), (_, index) => (
        <div className="w-full md:w-[560px] mb-8" key={index}>
          <div className="animate-pulse flex space-x-2 items-center">
            <div className="rounded-full bg-gray26 h-9 w-9"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 bg-gray26 rounded w-32"></div>
              <div className="h-3 w-16 bg-gray26 rounded"></div>
            </div>
          </div>
          <div className="animate-pulse flex space-x-4 items-center h-[360px]  w-[560px]  bg-gray26 mt-4 mb-6"></div>
        </div>
      ))}
    </>
  );
};

export default PostLoading;
