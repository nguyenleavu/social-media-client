import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { ContentState, EditorState, convertToRaw } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import { mentions } from "./mentions";
import "@draft-js-plugins/hashtag/lib/plugin.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import { extractHashtagsWithIndices } from "@draft-js-plugins/hashtag";

function TextEditor(): ReactElement {
  const ref = useRef<Editor>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionTrigger: "@",
      mentionPrefix: "@",
    });
    const hashtagPlugin = createHashtagPlugin();
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin, hashtagPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const handleChange = useCallback((_editorState: EditorState) => {
    setEditorState(_editorState);
  }, []);

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(
    ({ trigger, value }: { trigger: string; value: string }) => {
      console.log("trigger", trigger);
      console.log("value", value);
      // setSuggestions(defaultSuggestionsFilter(value, mentions));
    },
    []
  );

  return (
    <>
      <div
        className="w-1/3 text-white h-40 px-2"
        onClick={() => {
          ref.current!.focus();
        }}
      >
        <Editor
          editorState={editorState}
          onChange={handleChange}
          plugins={plugins}
          ref={ref}
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          onAddMention={(mention) => {
            console.log("mention", mention);
          }}
        />
      </div>
    </>
  );
}

export default TextEditor;
