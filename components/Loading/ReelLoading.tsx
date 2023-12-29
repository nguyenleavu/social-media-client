import { map } from "lodash";

const ReelLoading = () => {
  return (
    <div className="w-[550px] relative mt-4 snap-center flex items-center">
      <div className="animate-pulse w-[480px] min-h-[850px] bg-gray26 rounded h-[850px]"></div>
      <div className="animate-pulse h-full flex flex-col justify-end ml-3 gap-8">
        {map(Array(5).fill(0), (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-full bg-gray26 h-11 w-11"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ReelLoading;
