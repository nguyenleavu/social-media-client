const FollowMore = () => {
  return (
    <div className="md:w-[560px] mb-10 border-b border-gray26 flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4 ">
        <i className="fa-thin fa-circle-check text-6xl text-primary"></i>
        <p className="text-2xl font-medium">{`You're all caught up`}</p>
        <p className="text-grayA8">{`You've seen all new posts, please follow to see more`}</p>
      </div>
    </div>
  );
};

export default FollowMore;
