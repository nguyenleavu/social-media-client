"use client";

import { MediaType } from "@/constants/enum";
import useScrollToPlayVideo from "@/hooks/useScrolltoPlayVideo";
import classNames from "classnames";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  media: { url: string; type: MediaType };
  handleLike: () => void;
  muted: boolean;
  handleMuted: () => void;
}

const TIME_HIDDEN_HEART = 1000;

const Media = ({ media, handleLike, handleMuted, muted }: Props) => {
  const [heart, setHeart] = useState<boolean>(false);
  const [appear, setAppear] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { isPlay, handleClickVideo } = useScrollToPlayVideo(videoRef);

  const handleDoubleClick = () => {
    if (media.type === MediaType.Video) {
      return;
    }
    handleLike();
    setHeart(true);
    setAppear(true);
  };

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

  if (isEmpty(media)) return;

  return (
    <div className="w-full border border-gray26 rounded cursor-pointer relative">
      <div
        className="w-full flex justify-center relative"
        onClick={handleClickVideo}
        onDoubleClick={handleDoubleClick}
      >
        {media.type === MediaType.Image && (
          <Image
            src={media.url}
            alt={media.url}
            width={2000}
            height={2000}
            blurDataURL={media.url}
            className="object-contain max-h-[558px]"
          />
        )}
        {media.type === MediaType.Video && (
          <video
            src={media.url}
            ref={videoRef}
            className="max-h-[558px] h-fit w-fit"
            loop
            muted={muted}
            autoPlay
          ></video>
        )}
        {media.type === MediaType.Video && !isPlay && (
          <span className="absolute inset-0 flex items-center justify-center">
            <i className="fa-duotone fa-play text-white text-6xl drop-shadow-lg"></i>
          </span>
        )}
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

      {media.type === MediaType.Video && (
        <button
          className="bg-grayF14 rounded-full p-2 absolute bottom-5 right-5"
          onClick={handleMuted}
        >
          {muted && <i className="fa-sharp fa-solid fa-volume-xmark"></i>}
          {!muted && <i className="fa-sharp fa-solid fa-volume"></i>}
        </button>
      )}
    </div>
  );
};

export default Media;
