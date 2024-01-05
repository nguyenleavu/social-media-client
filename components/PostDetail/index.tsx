import React, { useEffect, useState } from "react";
import Media from "./Media";
import Comments from "./Comment";
import { useLikeMutation } from "@/apis/post/useLikeMutation";
import { useUnlikeMutation } from "@/apis/post/useUnlikeMutation";
import { usePostQuery } from "@/apis/post/usePostQuery";
import { PostType } from "@/types/post.types";
import { User } from "@/types/user.types";
import PostDetailLoading from "../Loading/PostDetailLoading";
import classNames from "classnames";

interface Props {
  id: string;
  smallSize?: boolean;
}

const PostDetail = ({ id, smallSize = false }: Props) => {
  const [liked, setLiked] = useState<boolean>(false);

  const { mutate: likePost } = useLikeMutation();
  const { mutate: unlikePost } = useUnlikeMutation();
  const { data, isLoading } = usePostQuery(id);
  const post = data?.data.data as PostType;

  const handleLiked = () => {
    if (liked) return;
    likePost(post._id);
    setLiked(true);
  };

  const onToggleLike = () => {
    if (liked) {
      unlikePost(post._id);
    } else {
      likePost(post._id);
    }
    setLiked((prev) => !prev);
  };

  useEffect(() => {
    setLiked((data?.data.data?.isLiked as boolean) || false);
  }, [data?.data.data?.isLiked]);
  return (
    <>
      {isLoading && <PostDetailLoading smallSize={smallSize} />}
      {!isLoading && (
        <div
          className={classNames(
            "animate-fade duration-700",
            smallSize
              ? "h-[500px] md:h-[45vw] max-h-[65vh] max-w-[1100px]"
              : "h-[800px] md:h-[60vw] max-h-[95vh] max-w-[1300px]"
          )}
        >
          <div className="flex items-center h-full">
            <Media
              handleLiked={handleLiked}
              post={data?.data.data as PostType}
            />
            <Comments
              liked={liked}
              onToggleLike={onToggleLike}
              id={post._id as string}
              user={post.user as User}
              post={data?.data.data as PostType}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
