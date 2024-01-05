import createCounterPlugin from "@draft-js-plugins/counter";
import createEmojiPlugin, { defaultTheme } from "@draft-js-plugins/emoji";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createMentionPlugin from "@draft-js-plugins/mention";
import Mention from "@/components/Mention";
import { FunctionComponent, useMemo } from "react";

const usePlugin = () => {
  const {
    plugins,
    MentionSuggestions,
    EmojiSuggestions,
    EmojiSelect,
    CharCounter,
    CustomCounter,
  } = useMemo(() => {
    const counterPlugin = createCounterPlugin();
    const hashtagPlugin = createHashtagPlugin({
      theme: {
        hashtag: "text-primary",
      },
    });
    const mentionPlugin = createMentionPlugin({
      mentionComponent: Mention as FunctionComponent,
      theme: {
        mention: "text-primary font-semibold hover:underline",
        mentionSuggestionsEntryText: "text-primary font-semibold",
        mentionSuggestions: "bg-black rounded w-[260px] p-2 !z-50",
      },
    });
    const emojiPlugin = createEmojiPlugin({
      theme: {
        ...defaultTheme,
        emojiSuggestions: "w-36 bg-black p-2",
        emojiSuggestionsEntry:
          "w-36 bg-black flex items-center py-1 cursor-pointer",
        emojiSuggestionsEntryFocused:
          "w-36 bg-black flex items-center py-1 cursor-pointer",
        emojiSelectButton: "bg-transparent ml-4 text-3xl text-grayA8",
        emojiSelectButtonPressed: "bg-transparent ml-4 text-3xl text-grayA8",
        emojiSelectPopover:
          "shadow-none bg-black border-grayActive rounded-lg !z-50",
        emojiSelectPopoverTitle: "hidden",
      },
    });
    const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
    const { CharCounter, CustomCounter } = counterPlugin;
    const { MentionSuggestions } = mentionPlugin;

    const plugins = [mentionPlugin, hashtagPlugin, emojiPlugin, counterPlugin];
    return {
      plugins,
      CharCounter,
      MentionSuggestions,
      EmojiSuggestions,
      EmojiSelect,
      CustomCounter,
    };
  }, []);
  return {
    plugins,
    MentionSuggestions,
    EmojiSuggestions,
    EmojiSelect,
    CharCounter,
    CustomCounter,
  };
};

export default usePlugin;
