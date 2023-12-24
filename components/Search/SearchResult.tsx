import { isEmpty, map } from "lodash";
import { SizesAvatar, TypeAvatar } from "@/constants/enum";
import { User } from "@/types/user.types";
import Link from "next/link";
import Avatar from "../Avatar";
import Loading from "../Loading/SearchLoading";
import { useRouter } from "next/navigation";

interface SearchResultProps {
  data: User[];
  isLoading: boolean;
  handleClickUser: () => void;
}

const SearchResult = ({
  data,
  isLoading,
  handleClickUser,
}: SearchResultProps) => {
  const router = useRouter();

  const handleClick = (user: User) => () => {
    router.push(`/${user.username}`);
    handleClickUser();
  };
  return (
    <div className="pt-3 h-full overflow-auto">
      {isLoading &&
        map(Array(15).fill(0), (_, index) => <Loading key={index} />)}

      {!isLoading && isEmpty(data) && (
        <div className="h-full flex items-center justify-center text-white text-sm">
          <p>No result searches.</p>
        </div>
      )}

      {!isEmpty(data) && (
        <div className="flex flex-col w-full items-start">
          {map(data, (user) => (
            <button
              key={user._id}
              className="h-[70px] flex items-center px-6 w-full cursor-pointer hover:bg-gray26 transition-all"
              onClick={handleClick(user)}
            >
              <Avatar
                fullWidth
                name={user.username}
                size={SizesAvatar.Medium}
                subTitle={user.name}
                src={user.avatar}
                type={TypeAvatar.Normal}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
