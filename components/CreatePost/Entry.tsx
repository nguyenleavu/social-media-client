import { User } from "@/types/user.types";
import { MentionPluginTheme } from "@draft-js-plugins/mention";
import Image from "next/image";

export interface EntryComponentProps {
  className?: string;
  role: string;
  id: string;
  theme?: MentionPluginTheme;
  mention: User;
  isFocused: boolean;
  searchValue?: string;
}

const Entry = (props: EntryComponentProps) => {
  const { mention, theme, searchValue, isFocused, id, ...parentProps } = props;

  return (
    <div {...parentProps} key={id}>
      <div className="flex items-center px-2 my-1 hover:bg-gray26 rounded cursor-pointer">
        <div>
          <Image
            width={2000}
            height={20000}
            src={mention.avatar}
            className="h-8 w-8 rounded-full"
            role="presentation"
            alt={mention._id}
          />
        </div>
        <div className="flex flex-col justify-center ml-2 ">
          <div className="text-sm font-medium">{mention.username}</div>
          <div className="text-xs text-grayA8">{mention.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
