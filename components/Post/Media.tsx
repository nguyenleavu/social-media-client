"use client";

import { MediaType } from "@/constants/enum";
import useScrollToPlayVideo from "@/hooks/useScrolltoPlayVideo";
import classNames from "classnames";
import { isEmpty } from "lodash";
import Image from "next/image";
import { MutableRefObject, useEffect, useRef, useState } from "react";

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

  const handleNothing = () => {};

  if (isEmpty(media)) return;

  return (
    <div className="w-full border border-gray26 rounded cursor-pointer relative">
      <div
        className="w-full flex justify-center relative"
        onClick={handleClickVideo}
        onDoubleClick={
          media.type === MediaType.Image ? handleDoubleClick : handleNothing
        }
      >
        {media.type === MediaType.Image ? (
          <div>
            <Image
              src={media.url}
              alt={media.url}
              priority
              width={2000}
              height={2000}
              className="object-contain max-h-[558px]"
            />
          </div>
        ) : (
          <div className="relative">
            <video
              src={media.url}
              ref={videoRef}
              className="max-h-[558px]"
              loop
              muted={muted}
              autoPlay
            ></video>
            {!isPlay && (
              <span className="absolute inset-0 flex items-center justify-center">
                <i className="fa-duotone fa-play text-white text-6xl drop-shadow-lg shadow-lg"></i>
              </span>
            )}
          </div>
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
          {muted ? (
            <i className="fa-sharp fa-solid fa-volume-xmark"></i>
          ) : (
            <i className="fa-sharp fa-solid fa-volume"></i>
          )}
        </button>
      )}
    </div>
  );
};

export default Media;
