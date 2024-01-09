import { useCreatePostMutation } from "@/apis/post/useCreatePostMutation";
import { useSearchQuery } from "@/apis/user/useSearchQuery";
import { PostAudience, PostRequestType } from "@/constants/enum";
import useDebounce from "@/hooks/useDebounce";
import usePlugin from "@/hooks/usePlugin";
import { PostRequest } from "@/types/post.types";
import { User } from "@/types/user.types";
import Editor from "@draft-js-plugins/editor";
import { extractHashtagsWithIndices } from "@draft-js-plugins/hashtag";
import { EditorState, convertToRaw } from "draft-js";
import { map } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../Button";
import Entry from "../CreatePost/Entry";

const SEARCH_LIMIT = 5;

interface Props {
  id: string;
  handleChange: () => void;
}

const CreateComment = ({ id, handleChange }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [mentions, setMentions] = useState<string[]>([]);

  const ref = useRef<Editor>(null);
  const { EmojiSelect, EmojiSuggestions, MentionSuggestions, plugins } =
    usePlugin();
  const debounce = useDebounce(searchValue);
  const { data } = useSearchQuery(SEARCH_LIMIT, debounce);
  const { mutate: createPost, isPending } = useCreatePostMutation();

  useEffect(() => {
    if (data && data.data) {
      setSuggestions(data?.data);
    }
  }, [data]);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);

  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSearchValue(value);
  }, []);

  const onFocus = () => {
    ref.current!.focus();
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
      type: PostRequestType.Comment,
      audience: PostAudience.Everyone,
      content,
      hashtags,
      medias: [],
      mentions,
      parent_id: id,
    };
    await createPost(postRequest);
    setEditorState(EditorState.createEmpty());
    setTimeout(() => {
      handleChange();
    }, 500);
  };

  return (
    <div className="flex items-center justify-between p-2 border-t border-grayF14">
      <div className="-translate-y-1 z-40">
        <EmojiSuggestions />
        <EmojiSelect closeOnEmojiSelect />
      </div>
      <div
        onClick={onFocus}
        className="flex-1 text-sm px-1 z-50 max-h-20 overflow-auto"
      >
        <Editor
          ref={ref}
          editorKey={"editor"}
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          placeholder="Add a comment..."
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          entryComponent={(EntryComponentProps) => (
            <Entry {...(EntryComponentProps as any)} />
          )}
          onAddMention={onAddMention}
        />
      </div>
      <Button
        variant="transparent"
        className="text-primary text-sm px-1 font-medium"
        loading={isPending}
        onClick={handlePost}
      >
        Post
      </Button>
    </div>
  );
};

export default CreateComment;
