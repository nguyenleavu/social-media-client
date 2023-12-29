"use client";

import usePlugin from "@/hooks/usePlugin";
import Editor from "@draft-js-plugins/editor";
import { EditorState, convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";
interface Props {
  content: string;
  className?: string;
}

const Content = ({ content, className }: Props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { plugins } = usePlugin();

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    );
  }, [content]);

  return (
    <div className={className}>
      <Editor
        readOnly
        plugins={plugins}
        editorState={editorState}
        onChange={setEditorState}
      />
    </div>
  );
};

export default Content;
