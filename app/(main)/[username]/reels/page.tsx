"use client";

import { useAppSelector } from "@/redux/hook";
import { filter, isEmpty, map } from "lodash";
import { MediaType } from "@/constants/enum";
import NoMedia from "../NoMedia";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import PostThumbnail from "@/components/PostThumbnail";

const Reels = () => {
  const profile = useAppSelector((state) => state.profile.profile);

  const video = filter(
    profile.posts,
    (post) => post.medias[0].type === MediaType.Video
  );

  if (isEmpty(video)) return <NoMedia />;

  return (
    <div className="grid grid-cols-3 w-content gap-1">
      {map(
        profile.posts,
        (post) =>
          post.medias[0].type === MediaType.Video && (
            <Link href={`${ROUTES.POST_ID}/${post._id}`} key={post._id}>
              <PostThumbnail
                id={post._id}
                commentCount={post.comment_count}
                media={post.medias[0]}
              />
            </Link>
          )
      )}
    </div>
  );
};

export default Reels;
