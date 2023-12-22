"use client";

import { usePostQuery } from "@/apis/post/usePostQuery";
import CommentLoading from "@/components/Loading/CommentLoading";
import PostDetailLoading from "@/components/Loading/PostDetailLoading";
import Modal from "@/components/Modal";
import Post from "@/components/Post";
import { PostType } from "@/types/post.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Comments from "./Comment";
import CreateComment from "./CreateComment";

interface Props {
  id: string;
}

const PostModal = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const { data, isLoading } = usePostQuery(id);

  const handleOnOpenChangeModal = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      handleOnOpenChangeModal={handleOnOpenChangeModal}
      handleCloseModal={handleCloseModal}
    >
      <div className="relative max-h-full h-full w-[600px] bg-[#111111] rounded-lg px-5 py-5 text-white">
        <div className="pb-20 h-full overflow-y-auto no-scrollbar">
          {isLoading ? (
            <>
              <PostDetailLoading />
              <CommentLoading />
            </>
          ) : (
            <div>
              <Post fullWidth data={data?.data.data as PostType} />
              <Comments id={data?.data.data?._id as string} />
            </div>
          )}
        </div>
        <CreateComment />
      </div>
    </Modal>
  );
};

export default PostModal;
