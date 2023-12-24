const Loading = () => {
  return (
    <div className="rounded-md p-3 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4 items-center">
        <div className="rounded-full bg-gray26 h-11 w-11"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray26 rounded"></div>
          <div className="h-4 w-2/3 bg-gray26 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
