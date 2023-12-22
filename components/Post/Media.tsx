"use client";

import { MediaType } from "@/constants/enum";
import classNames from "classnames";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  media: { url: string; type: MediaType };
  handleLike: () => void;
}

const TIME_HIDDEN_HEART = 1000;

const Media = ({ media, handleLike }: Props) => {
  const [heart, setHeart] = useState<boolean>(false);
  const [appear, setAppear] = useState<boolean>(false);

  useEffect(() => {
    if (heart) {
      let timer = setTimeout(() => {
        setHeart(false);
      }, TIME_HIDDEN_HEART);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [heart]);

  const handleDoubleClick = () => {
    handleLike();
    setHeart(true);
    setAppear(true);
  };

  if (isEmpty(media)) return;

  return (
    <div
      className="w-full border border-gray26 rounded cursor-pointer"
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-full flex justify-center relative">
        <Image
          src={media.url}
          alt={media.url}
          priority
          width={2000}
          height={2000}
          className="object-contain max-h-[558px]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <i
            className={classNames(
              "fa-solid fa-heart  text-[100px] animate-duration-200 drop-shadow-2xl ",
              appear ? "text-red-500" : "text-transparent",
              heart ? "animate-jump-in" : "animate-jump-out"
            )}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Media;
