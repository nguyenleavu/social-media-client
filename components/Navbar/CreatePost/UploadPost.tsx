/* eslint-disable @next/next/no-img-element */
import { MediaType } from "@/constants/enum";
import { EditedMedia } from "@/types/user.types";
import { Dialog } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import TextEditor from "./TextEditor";

interface Props {
  goBack: () => void;
  aspect: number;
  editedMedia: EditedMedia;
}

const UploadPost = ({ goBack, editedMedia, aspect }: Props) => {
  return (
    <div className="h-full flex flex-col">
      <Dialog.Title
        as="div"
        className="h-11 text-white flex items-center justify-between border-b border-grayF14 font-semibold"
      >
        <button className="px-4" onClick={goBack}>
          <i className="text-white fa-light fa-arrow-left-long text-lg"></i>
        </button>
        <h3 className="text-sm font-semibold">Create new post</h3>
        <button className="px-4 text-primary text-sm font-semibold">
          Post
        </button>
      </Dialog.Title>
      <div className="flex-1 flex justify-between w-full">
        <div className="w-2/3 h-full">
          <div className="h-full flex items-center justify-center bg-black">
            {editedMedia &&
              (editedMedia.type === MediaType.Image ? (
                <Image
                  className={classNames(
                    aspect === 1 && "h-full w-full",
                    aspect === 16 / 9 && "w-full h-fit",
                    aspect === 9 / 16 && "h-post w-fit"
                  )}
                  src={editedMedia.url}
                  alt="edit-image"
                  width={2000}
                  height={2000}
                />
              ) : (
                <video
                  src={editedMedia.url}
                  className="h-full max-h-post"
                  loop
                  autoPlay
                ></video>
              ))}
          </div>
        </div>
        <TextEditor />
      </div>
    </div>
  );
};

export default UploadPost;
