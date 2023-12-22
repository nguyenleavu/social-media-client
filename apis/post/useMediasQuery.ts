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

export const useMediasInfiniteQuery = () =>
  useInfiniteQuery({
    queryKey: ["medias"],
    queryFn: getMedias,
    initialPageParam: PAGE_PARAM,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_page) {
        return lastPage.prevOffset + 1;
      }
    },
  });
