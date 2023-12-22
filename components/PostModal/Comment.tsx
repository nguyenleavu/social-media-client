import { useCommentsInfiniteQuery } from "@/apis/post/useCommentQuery";
import CommentLoading from "@/components/Loading/CommentLoading";
import { PostType } from "@/types/post.types";
import { isEmpty, map } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import UserComment from "./UserComment";

interface Props {
  id: string;
}

const Comments = ({ id }: Props) => {
  const { data, isPending, fetchNextPage, hasNextPage } =
    useCommentsInfiniteQuery(id);

  const comments = map(data?.pages, (comments, index) => {
    if (isEmpty(comments.data) && !isPending) {
      return (
        <div className="p-10" key={index}>
          <p className="font-semibold text-2xl">No comments yet.</p>
          <p className="text-base">Start the conversation.</p>
        </div>
      );
    }
    return map(comments.data, (comment: PostType) => (
      <UserComment key={comment._id} data={comment} />
    ));
  });

  return (
    <div>
      {isPending && <CommentLoading />}

      <InfiniteScroll
        dataLength={comments.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<CommentLoading />}
      >
        {comments}
      </InfiniteScroll>
    </div>
  );
};

export default Comments;
