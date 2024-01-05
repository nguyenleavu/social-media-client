import { MediaType } from "@/constants/enum";
import { PostType } from "@/types/post.types";
import classNames from "classnames";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  post: PostType;
  handleLiked: () => void;
}

const TIME_HIDDEN_HEART = 1000;

const Media = ({ post, handleLiked }: Props) => {
  const isMuted = !!localStorage.getItem("isMuted");
  const videoRef = useRef<HTMLVideoElement>(null);

  const [heart, setHeart] = useState<boolean>(false);
  const [appear, setAppear] = useState<boolean>(false);
  const [isPlay, setIsPlay] = useState<boolean>(true);
  const [muted, setMuted] = useState<boolean>(isMuted || true);

  const handleMuted = (e: any) => {
    e.stopPropagation();
    if (muted) {
      localStorage.setItem("isMuted", "Turn of muted");
    } else {
      localStorage.removeItem("isMuted");
    }
    setMuted((prev) => !prev);
  };
  const handleClickVideo = () => {
    if (!videoRef.current) return;
    if (isPlay) {
      videoRef.current.pause();
      setIsPlay(false);
    } else {
      videoRef.current.play();
      setIsPlay(true);
    }
  };
  const handleDoubleClick = () => {
    if (post.medias[0].type === MediaType.Video) {
      return;
    }
    handleLiked();
    setHeart(true);
    setAppear(true);
  };

  useEffect(() => {
    setMuted(!isMuted);
  }, [isMuted]);

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
  return (
    <div
      className="hidden md:flex items-center justify-center h-full w-full flex-1 bg-black relative cursor-pointer"
      onClick={handleClickVideo}
      onDoubleClick={handleDoubleClick}
    >
      {post.medias[0].type === MediaType.Image && (
        <Image
          src={post.medias[0].url as string}
          alt={post.medias[0].url as string}
          height={5000}
          width={5000}
          className="h-full"
        />
      )}
      {post.medias[0].type === MediaType.Video && (
        <video
          loop
          autoPlay
          muted={muted}
          ref={videoRef}
          src={post.medias[0].url}
          className="w-fit max-h-full h-full"
        ></video>
      )}
      {post.medias[0].type === MediaType.Video && !isPlay && (
        <span className="absolute inset-0 flex items-center justify-center">
          <i className="fa-duotone fa-play text-white text-6xl drop-shadow-lg animate-jump"></i>
        </span>
      )}
      {post.medias[0].type === MediaType.Video && (
        <button
          className="bg-[#55555593] rounded-full p-2 absolute bottom-5 right-5 h-10 w-10 z-10"
          onClick={handleMuted}
        >
          {muted && <i className="fa-sharp fa-solid fa-volume-xmark"></i>}
          {!muted && <i className="fa-sharp fa-solid fa-volume"></i>}
        </button>
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
  );
};

export default Media;
