const CheckEmail = () => {
  return (
    <div className="md:w-[560px] mb-10 border-b border-gray26 flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4 ">
        <i className="fa-thin fa-circle-xmark text-6xl text-red-700"></i>
        <p className="text-2xl font-medium">Sorry!, Unverified user</p>
        <p>Please check your email to see more posts</p>
      </div>
    </div>
  );
};

export default CheckEmail;
