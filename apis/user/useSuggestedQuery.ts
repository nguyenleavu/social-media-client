import { userServices } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";

const PAGE = 1;

export const useSuggestedQuery = (limit: number) =>
  useQuery({
    queryKey: ["suggested", limit],
    queryFn: () =>
      userServices.geSuggested({ limit, page: PAGE }).then((res) => res.data),
  });
