import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { getAccessToken } from "./token";
import { isEmpty } from "lodash";

export const truncateName = (str: string, num: number = 20) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

const convertContentToEditorState = (content: string) => {
  if (content) {
    try {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } catch {
      return EditorState.createEmpty();
    }
  } else {
    return EditorState.createEmpty();
  }
};

const getTruncatedContentState = (
  jsonContentBlocks: string,
  maxCharCount: number
): ContentState | undefined => {
  const editorState = convertContentToEditorState(jsonContentBlocks);

  const contentState = editorState.getCurrentContent();
  const blocks = contentState.getBlocksAsArray();

  let currentLength = 0;
  const truncatedBlocks = [];

  for (let i = 0; i < blocks.length; i++) {
    const blockLength = blocks[i].getCharacterList().size;
    let truncatedText = "";

    if (blockLength >= maxCharCount - currentLength) {
      // We need to trim it
      truncatedText = blocks[i]
        .getText()
        .slice(0, maxCharCount - currentLength);
      currentLength += truncatedText.length;

      const state = ContentState.createFromText(`${truncatedText}...`);
      truncatedBlocks.push(state.getFirstBlock());
      break;
    } else if (blockLength > 0) {
      truncatedText = blocks[i].getText();
      currentLength += truncatedText.length;

      const state = ContentState.createFromText(`${truncatedText}`);
      truncatedBlocks.push(state.getFirstBlock());
    }
  }

  if (truncatedBlocks.length > 0) {
    return ContentState.createFromBlockArray(truncatedBlocks);
  }

  return undefined;
};

export const getTruncatedContent = (
  jsonContentBlocks: string,
  maxCharCount: number
): string => {
  const contentState = getTruncatedContentState(
    jsonContentBlocks,
    maxCharCount
  );

  if (contentState) {
    const raw = convertToRaw(contentState);
    return JSON.stringify(raw);
  }

  return "";
};
