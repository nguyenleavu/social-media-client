"use client";

import { usePostsInfiniteQuery } from "@/apis/post/usePostsQuery";
import PostLoading from "@/components/Loading/PostLoading";
import Post from "@/components/Post";
import CheckEmail from "@/components/Post/CheckEmail";
import FollowMore from "@/components/Post/FollowMore";
import { PostType } from "@/types/post.types";
import { map } from "lodash";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Feeds = () => {
  const { data, isPending, fetchNextPage, hasNextPage, isError } =
    usePostsInfiniteQuery();

  const [muted, setMuted] = useState<boolean>(true);

  const handleMuted = () => {
    if (muted) {
      localStorage.setItem("isMuted", "Turn of muted");
    } else {
      localStorage.removeItem("isMuted");
    }
    setMuted((prev) => !prev);
  };

  const contents = map(data?.pages, (posts) =>
    map(posts.data, (post: PostType) => (
      <Post
        viewAllComments
        key={post._id}
        data={post}
        muted={muted}
        handleMuted={handleMuted}
      />
    ))
  );

  return (
    <div className="w-full flex flex-col items-center rounded-lg">
      {isPending && <PostLoading />}
      {isError && <CheckEmail />}
      <InfiniteScroll
        dataLength={contents.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<PostLoading />}
        endMessage={<FollowMore />}
      >
        {contents}
      </InfiniteScroll>
    </div>
  );
};

export default Feeds;
