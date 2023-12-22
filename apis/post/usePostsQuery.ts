import { postServices } from "@/services/post.services";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_PARAM = 1;
const LIMIT = 10;

const getPosts = async ({ pageParam = 1 }: { pageParam: number }) => {
  const data = await postServices.getPosts({
    limit: LIMIT,
    page: pageParam,
  });
  return { ...data.data, prevOffset: pageParam };
};

export const usePostsInfiniteQuery = () =>
  useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
    initialPageParam: PAGE_PARAM,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_page) {
        return lastPage.prevOffset + 1;
      }
    },
  });
