import { useLikeMutation } from "@/apis/post/useLikeMutation";
import { useUnlikeMutation } from "@/apis/post/useUnlikeMutation";
import useScrollToPlayVideo from "@/hooks/useScrolltoPlayVideo";
import { PostType } from "@/types/post.types";
import { ReactNode, useEffect, useRef, useState } from "react";
import InfiniteSnapScroll from "../InfiniteSnapScroll";
import { useBookmarkMutation } from "@/apis/post/useBookmarkMutation";
import Action from "./Action";
import Content from "../Post/Content";
import Info from "./Content";

interface Props {
  muted: boolean;
  handleMuted: () => void;
  data: PostType;
  index: number;
  lastVideoIndex: number;
  handleGetVideos: () => void;
}

const Reel = ({
  data,
  index,
  handleGetVideos,
  lastVideoIndex,
  handleMuted,
  muted,
}: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isPlay, handleClickVideo } = useScrollToPlayVideo(videoRef);

  return (
    <InfiniteSnapScroll
      index={index}
      lastVideoIndex={lastVideoIndex}
      handleGetVideos={handleGetVideos}
    >
      <div className="sm:w-[550px] w-full mt-4 snap-center cursor-pointer relative flex h-full">
        <div
          className="relative w-screen sm:w-[480px] h-[850px] flex items-center justify-center"
          onClick={handleClickVideo}
        >
          <video
            src={data.medias[0].url}
            ref={videoRef}
            className="rounded absolute h-fit w-full max-h-full object-cover"
            loop
            muted={muted}
            autoPlay
          ></video>
          {!isPlay && (
            <span className="absolute inset-0 flex items-center justify-center animate-jump animate-once">
              <i className="fa-duotone fa-play text-white text-6xl drop-shadow-lg"></i>
            </span>
          )}
          <Info
            audience={data.audience}
            user={data.user}
            content={data.content}
            createAt={data.created_at}
          />
        </div>
        <Action data={data} />
        <button
          className="bg-grayF14 rounded-full p-2 absolute top-2 right-20 h-9 w-9 flex items-center justify-center"
          onClick={handleMuted}
        >
          {muted && <i className="fa-sharp fa-solid fa-volume-xmark"></i>}
          {!muted && <i className="fa-sharp fa-solid fa-volume"></i>}
        </button>
      </div>
    </InfiniteSnapScroll>
  );
};

export default Reel;
