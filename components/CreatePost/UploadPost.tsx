/* eslint-disable @next/next/no-img-element */
import { MediaType, PostAudience, PostRequestType } from "@/constants/enum";
import { EditedMedia, User } from "@/types/user.types";
import { Dialog } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import TextEditor from "./TextEditor";
import { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { extractHashtagsWithIndices } from "@draft-js-plugins/hashtag";
import { map } from "lodash";
import { useCreatePostMutation } from "@/apis/post/useCreatePostMutation";
import { PostRequest } from "@/types/post.types";

interface Props {
  goBack: () => void;
  aspect: number;
  editedMedia: EditedMedia;
  handleCloseModal: () => void;
}

const UploadPost = ({
  goBack,
  editedMedia,
  aspect,
  handleCloseModal,
}: Props) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [mentions, setMentions] = useState<string[]>([]);

  const { mutate: createPost, isPending, isSuccess } = useCreatePostMutation();

  const handleChange = (_editorState: EditorState) => {
    setEditorState(_editorState);
  };

  const onAddMention = (mention: User) => {
    setMentions((prev) => [...prev, mention._id]);
  };

  const handlePost = async () => {
    const text = convertToRaw(editorState.getCurrentContent());
    const content = JSON.stringify(text);
    const hashtagsBlock = map(text.blocks, (block) =>
      extractHashtagsWithIndices(block.text)
    ).flat();
    const hashtags = map(hashtagsBlock, (item) => item.hashtag);

    const postRequest: PostRequest = {
      type: PostRequestType.Post,
      audience: PostAudience.Everyone,
      content,
      hashtags,
      medias: [editedMedia],
      mentions,
      parent_id: null,
    };
    await createPost(postRequest);
  };

  useEffect(() => {
    if (isSuccess) handleCloseModal();
  }, [handleCloseModal, isSuccess]);

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
        <button
          className="px-4 text-primary text-sm font-semibold"
          onClick={handlePost}
        >
          Post
        </button>
      </Dialog.Title>
      <div className="flex-1 flex justify-between w-full relative">
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
            <i className="animate-spin fa-solid fa-circle-notch text-white"></i>
          </div>
        )}
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
        <TextEditor
          editorState={editorState}
          handleChange={handleChange}
          onAddMention={onAddMention}
        />
      </div>
    </div>
  );
};

export default UploadPost;
