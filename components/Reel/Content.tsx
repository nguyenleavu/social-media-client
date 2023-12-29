import { User } from "@/types/user.types";
import Avatar from "../Avatar";
import { PostAudience, SizesAvatar, TypeAvatar } from "@/constants/enum";
import Content from "../Post/Content";

interface Props {
  user: User;
  content: string;
  createAt: string;
  audience: PostAudience;
}

const Info = ({ user, content, createAt, audience }: Props) => {
  return (
    <div className="absolute bottom-4 left-4 w-11/12">
      <Avatar
        name={user.username}
        audience={audience}
        size={SizesAvatar.Small}
        createAt={createAt}
        src={user.avatar}
        type={TypeAvatar.Normal}
      />
      <div className="text-sm drop-shadow-lg mt-4">
        <Content content={content} />
      </div>
    </div>
  );
};

export default Info;
