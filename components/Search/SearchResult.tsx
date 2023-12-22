import { isEmpty, map } from "lodash";
import Loading from "./Loading";
import { User } from "@/types/user.types";
import Avatar from "../Avatar";
import { SizesAvatar, TypeAvatar } from "@/constants/enum";
import Link from "next/link";

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
            <Link
              key={user._id}
              href={`/${user.username}`}
              className="h-[70px] flex items-center px-6 w-full cursor-pointer hover:bg-gray26 transition-all"
              onClick={handleClickUser}
            >
              <Avatar
                fullWidth
                name={user.username}
                size={SizesAvatar.Medium}
                subTitle={user.name}
                src={user.avatar}
                type={TypeAvatar.Normal}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
