"use client";

import usePlugin from "@/hooks/usePlugin";
import Editor from "@draft-js-plugins/editor";
import { EditorState, convertFromRaw } from "draft-js";
import { useEffect, useRef, useState } from "react";

interface Props {
  content: string;
  className?: string;
}

const Content = ({ content, className }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const { plugins } = usePlugin();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditorState(
      EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    );
  }, [content]);

  return (
    <div className={className} ref={divRef}>
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
