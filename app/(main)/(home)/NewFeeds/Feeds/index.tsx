"use client";

import { usePostsInfiniteQuery } from "@/apis/post/usePostsQuery";
import PostLoading from "@/components/Loading/PostLoading";
import Post from "@/components/Post";
import CheckEmail from "@/components/Post/CheckEmail";
import FollowMore from "@/components/Post/FollowMore";
import { PostType } from "@/types/post.types";
import { map } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

const Feeds = () => {
  const { data, isPending, fetchNextPage, hasNextPage, isError } =
    usePostsInfiniteQuery();

  const contents = map(data?.pages, (posts) =>
    map(posts.data, (post: PostType) => (
      <Post viewAllComments key={post._id} data={post} />
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
      >
        {contents}
        {!isError && !hasNextPage && !isPending && <FollowMore />}
      </InfiniteScroll>
    </div>
  );
};

export default Feeds;
