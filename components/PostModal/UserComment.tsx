import { useLikeMutation } from "@/apis/post/useLikeMutation";
import { useUnlikeMutation } from "@/apis/post/useUnlikeMutation";
import CommentLoading from "@/components/Loading/CommentLoading";
import { PostType } from "@/types/post.types";
import classNames from "classnames";
import { isEmpty } from "lodash";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const UserComment = ({ data }: { data: PostType }) => {
  const [liked, setLiked] = useState<boolean>(data.isLiked);

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

  if (!data) return <CommentLoading />;
  return (
    <div className="flex flex-col gap-1 mb-4">
      <div className="flex">
        <Link href={`/${data.user.username}`} className="block h-10 w-10 mt-1">
          <Image
            src={data.user.avatar}
            alt={data.user.username}
            width={2000}
            height={2000}
            className="rounded-full"
          />
        </Link>
        <div className="flex-1 ">
          <div className="bg-gray26 py-1 ml-1 rounded-2xl px-3 w-fit  flex flex-col items-start relative">
            <Link
              href={`/${data.user.username}`}
              className="font-semibold text-sm w-fit"
            >
              {data.user.username}
            </Link>
            <p className="flex justify-start my-1 text-start">{data.content}</p>
            {data.likes > 0 && (
              <div className="absolute right-0 -bottom-2 bg-gray26 px-1 rounded-lg flex items-center gap-1">
                <i className="fa-solid fa-heart text-red-600 text-base"></i>
                {data.likes > 1 && (
                  <span className="text-xs mb-1 font-medium">{data.likes}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {!isEmpty(data.medias[0]) && (
        <div className="relative h-[210px] rounded-lg ml-12 mt-1">
          <Image
            src={data.medias[0].url}
            alt={data.medias[0].url}
            width={2000}
            height={2000}
            className="absolute object-contain rounded-lg max-h-[210px] w-fit"
          />
        </div>
      )}

      <div className="ml-12 w-fit flex items-center gap-3">
        <span className="text-xs text-grayA8 ">
          {moment(new Date(data.created_at)).fromNow()}
        </span>
        <button
          className={classNames(
            "text-sm font-medium hover:underline transition-all",
            liked ? "text-red-600" : "text-grayA8"
          )}
          onClick={handleLiked}
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default UserComment;
