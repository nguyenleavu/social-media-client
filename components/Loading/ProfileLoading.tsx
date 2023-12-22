const ProfileLoading = () => {
  return (
    <div className="w-content h-[200px] flex mb-11 items-center">
      <div className="w-1/3 flex items-center justify-center animate-pulse">
        <div className="rounded-full bg-gray26 h-[150px] w-[150px]"></div>
      </div>
      <div className="w-2/3 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-32 bg-gray26 rounded"></div>
          <div className="h-8 w-32 bg-gray26 rounded"></div>
          <div className="h-8 w-32 bg-gray26 rounded"></div>
        </div>
        <div className="flex items-center gap-6">
          <div className="h-6 w-24 bg-gray26 rounded"></div>
          <div className="h-6 w-24 bg-gray26 rounded"></div>
          <div className="h-6 w-24 bg-gray26 rounded"></div>
        </div>
        <div className="h-4 w-52 bg-gray26 rounded mt-4"></div>
        <div className="h-4 w-80 bg-gray26 rounded"></div>
      </div>
    </div>
  );
};

export default ProfileLoading;
