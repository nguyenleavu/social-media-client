"use client";

import { useMediasInfiniteQuery } from "@/apis/post/useMediasQuery";
import Footer from "@/components/Footer";
import ExploreLoading from "@/components/Loading/ExploreLoading";
import PostThumbnail from "@/components/PostThumbnail";
import { MediasList } from "@/types/post.types";
import { map } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

const Explore = () => {
  const { data, isPending, fetchNextPage, hasNextPage } =
    useMediasInfiniteQuery();

  const medias = map(data?.pages, (medias) =>
    map(medias.data, (item: MediasList) => (
      <PostThumbnail
        key={item._id}
        media={item.medias[0]}
        commentCount={item.comment_count}
        likeCount={item.likes}
        id={item._id}
      />
    ))
  );
  return (
    <div className="w-full flex flex-col items-center py-6">
      {isPending && <ExploreLoading />}
      <InfiniteScroll
        dataLength={medias.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<ExploreLoading />}
      >
        <div className="w-content grid grid-cols-3 gap-1">{medias}</div>
      </InfiniteScroll>
      <Footer />
    </div>
  );
};

export default Explore;
