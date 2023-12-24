import { MediaType } from "@/constants/enum";
import { ROUTES } from "@/constants/routes";
import { Media } from "@/types/user.types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  media: Media;
  likeCount?: number;
  commentCount: number;
  id: string;
}

const PostThumbnail = ({ media, likeCount, commentCount, id }: Props) => {
  return (
    <Link
      href={`${ROUTES.POST_ID}/${id}`}
      className="relative pt-[100%] group cursor-pointer block"
    >
      {media.type === MediaType.Image ? (
        <Image
          className="absolute object-cover left-0 top-0 w-full h-full"
          src={media.url}
          alt={media.url}
          height={2000}
          width={2000}
        />
      ) : (
        <video
          src={media.url}
          className="absolute object-cover left-0 top-0 w-full h-full"
          loop
          muted
        ></video>
      )}
      <div className="absolute top-5 right-5 drop-shadow-lg">
        {media.type === MediaType.Image ? (
          <i className="fa-light fa-image text-2xl"></i>
        ) : (
          <i className="fa-light fa-clapperboard-play text-2xl"></i>
        )}
      </div>
      <div className="absolute hidden  group-hover:bg-black/40 inset-0 group-hover:flex items-center justify-center gap-2 transition-all duration-700">
        {likeCount !== 0 && (
          <div className="flex items-center gap-2">
            <span className="text-2xl mb-1">
              <i className="fa-solid fa-heart"></i>
            </span>
            <span className="font-semibold text-lg">{likeCount}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            <i className="fa-solid fa-message-lines"></i>
          </span>
          <span className="font-semibold text-lg">{commentCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostThumbnail;
