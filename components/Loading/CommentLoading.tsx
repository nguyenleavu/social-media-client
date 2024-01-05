const CommentLoading = () => {
  return (
    <div className="w-full z-10 flex flex-col gap-5 px-2 py-2">
      <div className="animate-pulse flex items-center">
        <div className="rounded-full bg-grayA8 h-9 w-9"></div>
        <div className="flex flex-col gap-2 ml-2">
          <div className="h-9 bg-grayA8 w-32 rounded-lg"></div>
        </div>
      </div>

      <div className="animate-pulse flex items-center">
        <div className="rounded-full bg-grayA8 h-9 w-9"></div>
        <div className="flex flex-col gap-2 ml-2">
          <div className="animate-pulse h-9 bg-grayA8 w-64 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default CommentLoading;
