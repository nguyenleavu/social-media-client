import { filters } from "@/constants/image";
import { map } from "lodash";
import Image from "next/image";
import { RefObject, useEffect } from "react";

interface Props {
  filterClass: string;
  handleSetFilter: (filter: string) => void;
  imgRef: RefObject<HTMLImageElement>;
}

const Filters = ({ filterClass, handleSetFilter, imgRef }: Props) => {
  useEffect(() => {
    const divImg = imgRef.current;
    if (divImg) {
      divImg.style.filter = "";
    }
  }, [filterClass, imgRef]);

  return (
    <div className="w-full grid grid-cols-3 gap-2 px-4 pt-2">
      {map(filters, (filter, index) => {
        return (
          <div key={index} className="p-2 pb-0">
            <div onClick={() => handleSetFilter(filter.class)}>
              <div className="w-full">
                <Image
                  className={`${
                    filter.class
                  } h-full w-full object-cover rounded ${
                    filterClass === filter.class
                      ? "border-2 border-primary animate-jump"
                      : ""
                  }`}
                  src="/images/post/filter.jpg"
                  alt={filter.name}
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-grayA8 mt-2">{filter.name}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
