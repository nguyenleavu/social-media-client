"use client";

import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PostDetail from "../PostDetail";

interface Props {
  id: string;
}

const PostModal = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

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
      <PostDetail id={id} />
    </Modal>
  );
};

export default PostModal;
