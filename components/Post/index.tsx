import { useLikeMutation } from "@/apis/post/useLikeMutation";
import { useUnlikeMutation } from "@/apis/post/useUnlikeMutation";
import { PostType } from "@/types/post.types";
import { isEmpty } from "lodash";
import { MutableRefObject, useEffect, useState } from "react";
import Action from "./Action";
import Content from "./Content";
import HeaderPost from "./HeaderPost";
import Media from "./Media";
import classNames from "classnames";
import ViewAllComments from "./ViewAllComments";

interface Props {
  data: PostType;
  fullWidth?: boolean;
  viewAllComments?: boolean;
  muted: boolean;
  handleMuted: () => void;
}

const Post = ({
  data,
  fullWidth = false,
  viewAllComments = false,
  handleMuted,
  muted,
}: Props) => {
  const [liked, setLiked] = useState<boolean>(false);

  const { mutate: likePost } = useLikeMutation();
  const { mutate: unlikePost } = useUnlikeMutation();

  const handleLike = () => {
    if (liked) return;
    likePost(data._id);
    setLiked(true);
  };

  const onToggleLike = () => {
    if (liked) {
      unlikePost(data._id);
    } else {
      likePost(data._id);
    }
    setLiked((prev) => !prev);
  };

  useEffect(() => {
    setLiked(data.isLiked);
  }, [data.isLiked]);

  if (isEmpty(data)) return;

  return (
    <div
      className={classNames(
        "w-full pb-2 mb-10 border-b border-gray26",
        !fullWidth && "md:w-[560px]"
      )}
    >
      <HeaderPost
        data={data.user}
        createAt={data.created_at}
        audience={data.audience}
      />
      <Media
        media={data.medias[0]}
        handleLike={handleLike}
        muted={muted}
        handleMuted={handleMuted}
      />
      <Action data={data} liked={liked} onToggleLike={onToggleLike} />
      <Content content={data.content} />
      {viewAllComments && (
        <ViewAllComments commentCount={data.comment_count} id={data._id} />
      )}
    </div>
  );
};

export default Post;
