const SuggestedLoading = () => {
  return (
    <div className="animate-pulse flex justify-between items-center w-full">
      <div className="flex space-x-2 items-center w-full">
        <div className="rounded-full bg-gray26 h-12 w-12"></div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-4 bg-gray26 w-2/3 rounded-lg"></div>
          <div className="h-4 bg-gray26 w-1/3 rounded-lg"></div>
        </div>
      </div>
      <div className="rounded bg-gray26 h-5 w-20"></div>
    </div>
  );
};

export default SuggestedLoading;
