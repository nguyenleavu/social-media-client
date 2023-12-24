"use client";

import Editor from "@draft-js-plugins/editor";
import createEmojiPlugin, { defaultTheme } from "@draft-js-plugins/emoji";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createMentionPlugin from "@draft-js-plugins/mention";
import { EditorState } from "draft-js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// CSS
import "@draft-js-plugins/emoji/lib/plugin.css";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import "@draft-js-plugins/mention/lib/plugin.css";
// Fake Date
import { useSearchQuery } from "@/apis/user/useSearchQuery";

import { User } from "@/types/user.types";
import Entry from "./Entry";
import useDebounce from "@/hooks/useDebounce";

defaultTheme.emojiSelectButton = "bg-transparent ml-4 text-3xl text-grayA8";
defaultTheme.emojiSelectButtonPressed =
  "bg-transparent ml-4 text-3xl text-grayA8";
defaultTheme.emojiSelectPopover =
  "shadow-none bg-black border-grayActive rounded-lg";
defaultTheme.emojiSelectPopoverTitle = "hidden";

const SEARCH_LIMIT = 5;

const TextEditor = () => {
  const ref = useRef<any>();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [mentions, setMentions] = useState<string[]>([]);

  const debounce = useDebounce(searchValue);
  const { data, isLoading } = useSearchQuery(SEARCH_LIMIT, debounce);

  const { plugins, MentionSuggestions, EmojiSuggestions, EmojiSelect } =
    useMemo(() => {
      const hashtagPlugin = createHashtagPlugin();
      const mentionPlugin = createMentionPlugin();
      const emojiPlugin = createEmojiPlugin({
        theme: defaultTheme,
      });
      const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
      const { MentionSuggestions } = mentionPlugin;

      const plugins = [mentionPlugin, hashtagPlugin, emojiPlugin];
      return {
        plugins,
        MentionSuggestions,
        EmojiSuggestions,
        EmojiSelect,
      };
    }, []);

  const handleChange = (_editorState: EditorState) => {
    setEditorState(_editorState);
  };

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
  console.log("mentions", mentions);

  const onAddMention = (mention: User) => {
    setMentions((prev) => [...prev, mention._id]);
  };

  return (
    <div className="w-1/3 text-white text-gray">
      <div className="h-40 px-4 min-h-[168px]">
        <Editor
          editorKey={"editor"}
          editorState={editorState}
          onChange={handleChange}
          plugins={plugins}
          ref={(editor) => (ref.current = editor)}
          placeholder="Write a caption..."
        />
      </div>
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        entryComponent={Entry as any}
        onAddMention={onAddMention}
      />
      <EmojiSuggestions />
      <div className="mb-5">
        <EmojiSelect />
      </div>
    </div>
  );
};

export default TextEditor;
