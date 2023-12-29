import { User } from "@/types/user.types";
import { SubMentionComponentProps } from "@draft-js-plugins/mention/lib/Mention";
import Link from "next/link";

interface Props extends SubMentionComponentProps {
  mention: User;
}

const Mention = ({ children, mention }: Props) => {
  return (
    <Link
      href={`/${mention.username}`}
      className="cursor-pointer hover:underline text-primary font-semibold"
    >
      {children}
    </Link>
  );
};

export default Mention;
