import { map } from "lodash";

const ExploreLoading = () => {
  return (
    <div className="w-full flex justify-center mb-1">
      <div className="w-content grid grid-cols-3 gap-1">
        {map(Array(6).fill(0), (_, index) => (
          <div
            key={index}
            className="animate-pulse h-[300px] w-full  bg-gray26"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ExploreLoading;
