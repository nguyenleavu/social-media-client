import { ROUTES } from "@/constants/routes";
import { PostType } from "@/types/post.types";

import { useEffect, useState } from "react";
import Tooltip from "../Tooltip";
import Link from "next/link";
import { useBookmarkMutation } from "@/apis/post/useBookmarkMutation";

interface Props {
  data: PostType;
  liked: boolean;
  onToggleLike: () => void;
}

const Action = ({ data, liked, onToggleLike }: Props) => {
  const [likes, setLikes] = useState<number>(data.likes);
  const [bookmark, setBookmark] = useState<boolean>(data.isBookmark);

  const { mutate: save } = useBookmarkMutation();
  const { mutate: unSave } = useBookmarkMutation();

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

  const handleBookmark = () => {
    if (bookmark) {
      unSave(data._id);
    } else {
      save(data._id);
    }
    setBookmark((prev) => !prev);
  };

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <Tooltip content="Like">
            <button
              className="p-1 text-sm hover:text-white/60 transition-all flex items-center"
              onClick={onToggleLike}
            >
              {liked ? (
                <i className="fa-solid fa-heart text-red-500 text-[22px] animate-jump"></i>
              ) : (
                <i className="fa-light fa-heart text-[22px]"></i>
              )}
            </button>
          </Tooltip>
          <Tooltip content="Comment">
            <Link
              href={`${ROUTES.POST_ID}/${data._id}`}
              className="p-1 text-sm hover:text-white/60 transition-all flex items-center"
            >
              <i className="fa-light fa-message-lines text-xl"></i>
            </Link>
          </Tooltip>
          <Tooltip content="Share">
            <button className="p-1 text-sm hover:text-white/60 transition-all flex items-center">
              <i className="fa-light fa-paper-plane text-xl"></i>
              {data.quote_count > 0 && (
                <span className="text-sm font-semibold ml-2">
                  {data.quote_count}
                </span>
              )}
            </button>
          </Tooltip>
        </div>
        <div>
          <Tooltip content="Save" place="right">
            <button
              className="p-1 text-sm hover:text-white/60 transition-all"
              onClick={handleBookmark}
            >
              {bookmark ? (
                <i className="fa-solid fa-bookmark text-white text-xl animate-jump"></i>
              ) : (
                <i className="fa-light fa-bookmark text-xl"></i>
              )}
            </button>
          </Tooltip>
        </div>
      </div>
      <div className="mt-1 flex items-center">
        {likes > 0 ? (
          <span className="text-sm font-semibold">{likes} likes</span>
        ) : (
          <div className="text-sm text-grayA8">
            Be the first to
            <button className="font-medium ml-1 " onClick={onToggleLike}>
              like this
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Action;
