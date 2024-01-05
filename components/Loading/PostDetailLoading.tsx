import classNames from "classnames";

const PostDetailLoading = ({ smallSize }: { smallSize: boolean }) => {
  return (
    <div
      className={classNames(
        smallSize
          ? "h-[500px] md:h-[45vw] max-h-[65vh] max-w-[1100px]"
          : "h-[800px] md:h-[60vw] max-h-[95vh] max-w-[1300px]"
      )}
    >
      <div className="flex items-center h-full w-full">
        <div className="animate-pulse bg-grayA8 hidden md:flex items-center justify-center h-full flex-1">
          <div className="w-[40vw] h-full"></div>
        </div>
        <div className="animate-pulse w-[450px] md:w-[40vw] lg:w-[30vw] max-w-[450px] h-full bg-gray26 overflow-hidden flex flex-col justify-between"></div>
      </div>
    </div>
  );
};

export default PostDetailLoading;
