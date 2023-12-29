"use client";

import { useMediasInfiniteQuery } from "@/apis/post/useMediasQuery";
import ReelLoading from "@/components/Loading/ReelLoading";
import Reel from "@/components/Reel";
import { MediaType } from "@/constants/enum";
import { PostType } from "@/types/post.types";
import { map } from "lodash";
import { useState } from "react";

const Reels = () => {
  const [muted, setMuted] = useState<boolean>(true);

  const handleMuted = () => {
    setMuted((prev) => !prev);
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMediasInfiniteQuery(MediaType.Video);

  const handleGetVideos = () => fetchNextPage();

  const medias = map(data?.pages, (medias) => {
    if (medias.data) {
      return map(medias.data, (item: PostType, index: number) => (
        <Reel
          muted={muted}
          handleMuted={handleMuted}
          key={item._id}
          data={item}
          index={index + 1}
          lastVideoIndex={(medias.data as PostType[]).length - 1}
          handleGetVideos={handleGetVideos}
        />
      ));
    }
  });

  return (
    <div className="h-screen w-full flex flex-col items-center scroll-smooth overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {medias}
      {isLoading && <ReelLoading />}
      {hasNextPage && isFetchingNextPage && <ReelLoading />}
    </div>
  );
};

export default Reels;
