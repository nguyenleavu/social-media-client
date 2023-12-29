import { map } from "lodash";

const ExploreLoading = () => {
  return (
    <div className="w-full flex justify-center mb-1">
      <div className="max-w-[975px] w-full grid grid-cols-3 grid-flow-row-dense gap-1">
        {map(Array(6).fill(0), (_, index) => (
          <div key={index} className="relative pt-[100%] block">
            <div className="absolute animate-pulse bg-gray26 left-0 top-0 w-full h-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreLoading;
