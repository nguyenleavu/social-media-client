import { postServices } from "@/services/post.services";
import { useInfiniteQuery } from "@tanstack/react-query";

const PAGE_PARAM = 1;
const LIMIT = 10;

const getComments = async ({
  id,
  pageParam = PAGE_PARAM,
}: {
  id: string;
  pageParam?: number;
}) => {
  const data = await postServices.getComments(id, {
    limit: LIMIT,
    page: pageParam,
    post_type: 2,
  });
  return { ...data.data, prevOffset: pageParam };
};

export const useCommentsInfiniteQuery = (id: string, key: boolean) =>
  useInfiniteQuery({
    queryKey: ["comments", id, key],
    queryFn: ({ pageParam }) => getComments({ id, pageParam }),
    initialPageParam: PAGE_PARAM,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_page) {
        return lastPage.prevOffset + 1;
      }
      return undefined;
    },
  });
