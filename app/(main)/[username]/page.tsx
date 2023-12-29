"use client";

import { useAppSelector } from "@/redux/hook";
import { isEmpty, map } from "lodash";
import NoMedia from "./NoMedia";
import PostThumbnail from "@/components/PostThumbnail";

const Posts = () => {
  const profile = useAppSelector((state) => state.profile.profile);
  if (isEmpty(profile.posts)) return <NoMedia />;
  return (
    <div className="grid grid-cols-3 max-w-[975px] w-full gap-1">
      {map(profile.posts, (post) => {
        if (post.medias[0]) {
          return (
            <PostThumbnail
              key={post._id}
              id={post._id}
              commentCount={post.comment_count}
              media={post.medias[0]}
              likeCount={post.likes}
            />
          );
        }
      })}
    </div>
  );
};

export default Posts;
