import { useLikeMutation } from "@/apis/post/useLikeMutation";
import { useUnlikeMutation } from "@/apis/post/useUnlikeMutation";
import CommentLoading from "@/components/Loading/CommentLoading";
import { PostType } from "@/types/post.types";
import { User } from "@/types/user.types";
import classNames from "classnames";
import { isEmpty } from "lodash";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Content from "../Post/Content";

const UserComment = ({ data }: { data: PostType }) => {
  const [liked, setLiked] = useState<boolean>(data.isLiked);
  const [likes, setLikes] = useState<number>(data.likes);

  const { mutate: likePost } = useLikeMutation();
  const { mutate: unlikePost } = useUnlikeMutation();

  const handleLiked = () => {
    if (liked) {
      unlikePost(data._id);
      setLiked(false);
    } else {
      likePost(data._id);
      setLiked(true);
    }
  };

  useEffect(() => {
    if (!data.isLiked) {
      if (liked) {
        setLikes(data.likes + 1);
      }
      if (!liked) {
        setLikes(data.likes);
      }
    }

    if (data.isLiked) {
      if (liked) {
        setLikes(data.likes);
      }

      if (!liked) {
        setLikes(data.likes - 1);
      }
    }
  }, [liked, data.likes, data.isLiked]);

  if (!data) return <CommentLoading />;
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex w-full">
        <Link href={`/${data.user.username}`} className="block h-9 w-9 mt-1">
          <Image
            src={data.user.avatar}
            alt={data.user.username}
            width={2000}
            height={2000}
            className="rounded-full"
          />
        </Link>
        <div className="flex-1">
          <div className="ml-1 rounded-2xl px-1 flex justify-between w-full items-start">
            <div className="flex flex-col pr-2">
              <Link
                href={`/${data.user.username}`}
                className="font-semibold text-sm w-fit"
              >
                {data.user.username}
              </Link>
              <Content content={data.content} className="text-sm z-10" />
            </div>

            <button
              className="px-1 rounded-lg flex items-center mt-3"
              onClick={handleLiked}
            >
              {!liked && <i className="fa-light fa-heart text-sm"></i>}
              {liked && (
                <i className="fa-solid fa-heart text-red-600 text-sm animate-jump"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="ml-12 w-fit flex items-center gap-3">
        <span className="text-xs text-grayA8 ">
          {moment(new Date(data.created_at)).fromNow()}
        </span>
        {!!likes && <span className="text-xs  text-grayA8">{likes} likes</span>}
      </div>
    </div>
  );
};

export default UserComment;
