import { useCommentsInfiniteQuery } from "@/apis/post/useCommentQuery";
import { PostType } from "@/types/post.types";
import { isEmpty, map } from "lodash";
import { useEffect, useRef, useState } from "react";
import UserComment from "../PostDetail/UserComment";
import CommentLoading from "../Loading/CommentLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import CreateComment from "../PostDetail/CreateComment";
import useInViewport from "@/hooks/useInViewport";

interface Props {
  id: string;
}

const Comments = ({ id }: Props) => {
  const [change, setChange] = useState(false);
  const { data, isPending, fetchNextPage, isFetchingNextPage } =
    useCommentsInfiniteQuery(id, change);

  const ref = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(ref);

  useEffect(() => {
    if (inViewport) {
      fetchNextPage();
    }
  }, [fetchNextPage, inViewport]);

  const handleChange = () => {
    setChange(!change);
  };

  const comments = map(data?.pages, (comments, index) => {
    if (isEmpty(comments.data) && !isPending) {
      return (
        <div
          className="p-10 h-full flex flex-col items-center justify-center"
          key={index}
        >
          <p className="font-semibold text-2xl">No comments yet.</p>
          <p className="text-sm">Start the conversation.</p>
        </div>
      );
    }
    return map(comments.data, (comment: PostType) => (
      <UserComment key={comment._id} data={comment} />
    ));
  });
  return (
    <div className="bg-gray26 h-[700px] w-[400px] rounded-lg flex flex-col justify-between px-2">
      <h4 className="font-semibold text-lg py-3 border-b border-grayF14">
        Comments
      </h4>
      {isPending && <CommentLoading />}
      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden px-2 pt-4 py-2 flex flex-col gap-4 no-scrollbar">
        {comments}
        <div ref={ref}>{isFetchingNextPage && <CommentLoading />}</div>
      </div>
      <CreateComment id={id} handleChange={handleChange} />
    </div>
  );
};

export default Comments;
