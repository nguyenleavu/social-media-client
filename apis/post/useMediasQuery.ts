import { MediaType } from "@/constants/enum";
import { postServices } from "@/services/post.services";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_PARAM = 1;
const LIMIT = 12;

const getMedias = async ({ pageParam = 1 }: { pageParam: number }) => {
  const data = await postServices.getMedias({
    medias_type: MediaType.Image,
    limit: LIMIT,
    page: pageParam,
  });
  return { ...data.data, prevOffset: pageParam };
};

const getMediasTypeVideo = async ({ pageParam = 1 }: { pageParam: number }) => {
  const data = await postServices.getMedias({
    medias_type: MediaType.Video,
    limit: LIMIT,
    page: pageParam,
  });
  return { ...data.data, prevOffset: pageParam };
};

export const useMediasInfiniteQuery = (type: MediaType) =>
  useInfiniteQuery({
    queryKey: ["medias"],
    queryFn: type === MediaType.Image ? getMedias : getMediasTypeVideo,
    initialPageParam: PAGE_PARAM,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_page) {
        return lastPage.prevOffset + 1;
      }
    },
  });
