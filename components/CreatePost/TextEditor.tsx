"use client";

import { useSearchQuery } from "@/apis/user/useSearchQuery";
import useDebounce from "@/hooks/useDebounce";
import usePlugin from "@/hooks/usePlugin";
import { User } from "@/types/user.types";
import Editor from "@draft-js-plugins/editor";
import { EditorState } from "draft-js";
import { useCallback, useEffect, useRef, useState } from "react";
import Entry from "./Entry";
import { useAppSelector } from "@/redux/hook";
import Avatar from "@/components/Avatar";
import { SizesAvatar, TypeAvatar } from "@/constants/enum";
import Footer from "@/app/(main)/(home)/Suggested/Footer";

const SEARCH_LIMIT = 5;

interface Props {
  editorState: EditorState;
  handleChange: (_editorState: EditorState) => void;
  onAddMention: (mention: User) => void;
}

const TextEditor = ({ editorState, handleChange, onAddMention }: Props) => {
  const ref = useRef<Editor>(null);
  const {
    plugins,
    EmojiSelect,
    EmojiSuggestions,
    MentionSuggestions,
    CharCounter,
  } = usePlugin();
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const debounce = useDebounce(searchValue);
  const { data } = useSearchQuery(SEARCH_LIMIT, debounce);

  const user = useAppSelector((state) => state.profile.user);

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

  return (
    <div className="w-1/3 text-white text-gray">
      <div className="p-4">
        <Avatar
          src={user?.avatar as string}
          size={SizesAvatar.Small}
          name={user?.username as string}
          type={TypeAvatar.Normal}
        />
      </div>
      <div className="px-4 h-[168px] overflow-auto" onClick={onFocus}>
        <Editor
          editorKey={"editor"}
          editorState={editorState}
          onChange={handleChange}
          plugins={plugins}
          ref={ref}
          placeholder="Write a caption..."
        />
      </div>
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
      <EmojiSuggestions />
      <div className="mb-5 px-4 flex items-center justify-between">
        <EmojiSelect />
        <div className="flex items-center text-grayA8 text-sm">
          <CharCounter limit={2000} />
          /2000
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TextEditor;
