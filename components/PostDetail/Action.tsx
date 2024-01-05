import React, { useEffect, useState } from "react";
import Tooltip from "../Tooltip";
import { useBookmarkMutation } from "@/apis/post/useBookmarkMutation";
import { PostType } from "@/types/post.types";
import moment from "moment";

interface Props {
  post: PostType;
  onToggleLike: () => void;
  liked: boolean;
}

const Action = ({ post, onToggleLike, liked }: Props) => {
  const [likes, setLikes] = useState<number>(post.likes);
  const [bookmark, setBookmark] = useState<boolean>(post.isBookmark);

  const { mutate: save } = useBookmarkMutation();
  const { mutate: unSave } = useBookmarkMutation();

  const handleBookmark = () => {
    if (bookmark) {
      unSave(post._id);
    } else {
      save(post._id);
    }
    setBookmark((prev) => !prev);
  };

  useEffect(() => {
    if (!post.isLiked) {
      if (liked) {
        setLikes(post.likes + 1);
      }
      if (!liked) {
        setLikes(post.likes);
      }
    }

    if (post.isLiked) {
      if (liked) {
        setLikes(post.likes);
      }

      if (!liked) {
        setLikes(post.likes - 1);
      }
    }
  }, [liked, post.likes, post.isLiked]);
  return (
    <div className="border-t border-grayF14 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
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
            <button className="p-1 text-sm hover:text-white/60 transition-all flex items-center">
              <i className="fa-light fa-message-lines text-xl"></i>
            </button>
          </Tooltip>
          <Tooltip content="Share">
            <button className="p-1 text-sm hover:text-white/60 transition-all flex items-center">
              <i className="fa-light fa-paper-plane text-xl"></i>
            </button>
          </Tooltip>
        </div>
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
      <div className="mt-1 flex items-start ml-1 flex-col">
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
        <p className="text-xs text-grayA8">
          {moment(new Date(post.created_at)).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default Action;
