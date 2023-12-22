const CommentLoading = () => {
  return (
    <div className="w-full mb-8 z-10 flex flex-col gap-5">
      <div className="animate-pulse flex space-x-2">
        <div className="rounded-full bg-gray26 h-10 w-10"></div>
        <div className="h-16 bg-gray26 w-32 rounded-2xl"></div>
      </div>
      <div className="animate-pulse flex space-x-2">
        <div className="rounded-full bg-gray26 h-10 w-10"></div>
        <div className="h-16 bg-gray26 w-56 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default CommentLoading;
