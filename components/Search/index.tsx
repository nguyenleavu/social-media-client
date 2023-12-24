import useOnClickOutside from "@/hooks/useOutsideClick";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchResult from "./SearchResult";
import { isEmpty } from "lodash";
import { useSearchQuery } from "@/apis/user/useSearchQuery";
import { User } from "@/types/user.types";
import useDebounce from "@/hooks/useDebounce";

interface SearchProps {
  onCloseTab: () => void;
}

const SEARCH_LIMIT = 30;

const Search = ({ onCloseTab }: SearchProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const debounce = useDebounce(searchValue);

  const { data, isLoading } = useSearchQuery(SEARCH_LIMIT, debounce);

  const searchRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(searchRef, onCloseTab);

  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleResetInput = () => {
    setSearchValue("");
  };

  const handleClickUser = () => {
    onCloseTab();
    handleResetInput();
  };

  return (
    <section ref={searchRef} className="py-2 h-full">
      <div className="my-2 pl-6 pt-3 pb-9">
        <h2 className="text-2xl font-medium">Search</h2>
      </div>
      <div className="pb-6 border-b border-gray26">
        <div className="mx-4 h-10">
          <div className="relative top-0 bottom-0 left-0 w-full h-full">
            <input
              value={searchValue}
              onChange={handleChangeSearchValue}
              placeholder="Search"
              className="w-full absolute h-10 px-4 py-1 rounded-lg bg-gray26 text-sm"
            />
            {!isEmpty(searchValue) && !isLoading && (
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
                onClick={handleResetInput}
              >
                <i className="fa-sharp fa-solid fa-circle-xmark"></i>
              </button>
            )}

            {isLoading && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white">
                <i className="animate-spin fa-duotone fa-spinner-third"></i>
              </span>
            )}
          </div>
        </div>
      </div>
      <SearchResult
        data={data?.data as User[]}
        isLoading={isLoading}
        handleClickUser={handleClickUser}
      />
    </section>
  );
};

export default Search;
