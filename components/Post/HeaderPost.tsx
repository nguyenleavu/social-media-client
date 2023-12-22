import { PostAudience, SizesAvatar, TypeAvatar } from "@/constants/enum";
import { User } from "@/types/user.types";
import Avatar from "../Avatar";

interface Props {
  data: User;
  createAt: string;
  audience: PostAudience;
}

const HeaderPost = ({ data, createAt, audience }: Props) => {
  return (
    <div className="flex items-center justify-between py-3">
      <Avatar
        src={data.avatar}
        createAt={createAt}
        audience={audience}
        name={data.username}
        type={TypeAvatar.Normal}
        size={SizesAvatar.Small}
      />
      <button>
        <span className="p-2 pr-0">
          <i className="fa-regular fa-ellipsis"></i>
        </span>
      </button>
    </div>
  );
};

export default HeaderPost;
