"use client";

import { useAppSelector } from "@/redux/hook";
import { isEmpty, map } from "lodash";
import NoMedia from "../NoMedia";
import PostThumbnail from "@/components/PostThumbnail";

const Saved = () => {
  const profile = useAppSelector((state) => state.profile.profile);

  if (isEmpty(profile.bookmarks)) return <NoMedia />;
  return (
    <div className="grid grid-cols-3 w-content gap-1">
      {map(profile.bookmarks, (post) => (
        <div key={post._id}>
          <PostThumbnail
            id={post._id}
            commentCount={post.comment_count}
            media={post.medias[0]}
          />
        </div>
      ))}
    </div>
  );
};

export default Saved;
