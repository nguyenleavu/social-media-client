import { useCommentsInfiniteQuery } from "@/apis/post/useCommentQuery";
import CommentLoading from "@/components/Loading/CommentLoading";
import { SizesAvatar, TypeAvatar } from "@/constants/enum";
import useInViewport from "@/hooks/useInViewport";
import { PostType } from "@/types/post.types";
import { User } from "@/types/user.types";
import { isEmpty, map } from "lodash";
import { useEffect, useRef, useState } from "react";
import Avatar from "../Avatar";
import Action from "./Action";
import CreateComment from "./CreateComment";
import UserComment from "./UserComment";

interface Props {
  id: string;
  user: User;
  post: PostType;
  liked: boolean;
  onToggleLike: () => void;
}

const Comments = ({ id, user, post, liked, onToggleLike }: Props) => {
  const [change, setChange] = useState(false);
  const { data, isPending, fetchNextPage, isFetchingNextPage } =
    useCommentsInfiniteQuery(id, change);
  const ref = useRef<HTMLDivElement>(null);
  const inViewport = useInViewport(ref);

  const handleChange = () => {
    setChange(!change);
  };

  useEffect(() => {
    if (inViewport) {
      fetchNextPage();
    }
  }, [fetchNextPage, inViewport]);

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
    <div className="w-screen sm:w-[450px] md:w-[40vw] lg:w-[30vw] max-w-[450px] h-screen sm:h-full bg-gray26 overflow-hidden flex flex-col justify-between">
      <div className="py-4 px-2 border-b border-grayF14">
        <Avatar
          name={user.username}
          size={SizesAvatar.Small}
          src={user.avatar}
          type={TypeAvatar.Normal}
        />
      </div>
      {isPending && <CommentLoading />}
      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden px-2 pt-4 py-2 flex flex-col gap-4 no-scrollbar">
        {comments}
        <div ref={ref}>{isFetchingNextPage && <CommentLoading />}</div>
      </div>
      <div>
        <Action liked={liked} onToggleLike={onToggleLike} post={post} />
        <CreateComment id={id} handleChange={handleChange} />
      </div>
    </div>
  );
};

export default Comments;
