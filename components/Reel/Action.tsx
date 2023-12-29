import { useBookmarkMutation } from "@/apis/post/useBookmarkMutation";
import { useLikeMutation } from "@/apis/post/useLikeMutation";
import { useUnlikeMutation } from "@/apis/post/useUnlikeMutation";
import { PostType } from "@/types/post.types";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  data: PostType;
}

const ButtonAction = ({
  children,
  onClick,
  count,
}: {
  children: ReactNode;
  onClick: () => void;
  count?: number;
}) => {
  return (
    <button
      className="hover:text-white/60 transition-all flex items-center flex-col h-11"
      onClick={onClick}
    >
      {children}
      {count !== 0 && <p className="text-sm font-medium mt-1">{count}</p>}
    </button>
  );
};

const Action = ({ data }: Props) => {
  const [liked, setLiked] = useState<boolean>(data.isLiked);
  const [likes, setLikes] = useState<number>(data.likes);
  const [bookmark, setBookmark] = useState<boolean>(data.isBookmark);

  const { mutate: likePost } = useLikeMutation();
  const { mutate: unlikePost } = useUnlikeMutation();
  const { mutate: save } = useBookmarkMutation();
  const { mutate: unSave } = useBookmarkMutation();

  const onToggleLike = () => {
    if (liked) {
      unlikePost(data._id);
    } else {
      likePost(data._id);
    }
    setLiked((prev) => !prev);
  };

  const onToggleBookmark = () => {
    if (bookmark) {
      unSave(data._id);
    } else {
      save(data._id);
    }
    setBookmark((prev) => !prev);
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
  return (
    <div className="h-full ml-3 flex-1 flex flex-col justify-end pb-4 gap-5">
      <ButtonAction onClick={onToggleLike} count={likes}>
        {liked && (
          <i className="fa-solid fa-heart text-red-500 text-2xl animate-jump"></i>
        )}
        {!liked && <i className="fa-light fa-heart text-2xl"></i>}
      </ButtonAction>
      <ButtonAction onClick={() => {}} count={data.comment_count}>
        <i className="fa-light fa-message-lines text-2xl"></i>
      </ButtonAction>
      <ButtonAction onClick={() => {}}>
        <i className="fa-light fa-paper-plane text-2xl"></i>
      </ButtonAction>
      <ButtonAction onClick={onToggleBookmark}>
        {bookmark && (
          <i className="fa-solid fa-bookmark text-yellow-500 text-2xl animate-jump"></i>
        )}
        {!bookmark && <i className="fa-light fa-bookmark text-2xl"></i>}
      </ButtonAction>
    </div>
  );
};

export default Action;
