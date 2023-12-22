const PostDetailLoading = () => {
  return (
    <div className="w-full mb-8 z-10">
      <div className="animate-pulse flex space-x-2 items-center">
        <div className="rounded-full bg-gray26 h-11 w-11"></div>
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 bg-gray26 rounded w-32"></div>
          <div className="h-3 w-16 bg-gray26 rounded"></div>
        </div>
      </div>
      <div className="animate-pulse flex space-x-4 items-center h-[400px]  w-full  bg-gray26 mt-4 mb-6"></div>
    </div>
  );
};

export default PostDetailLoading;
