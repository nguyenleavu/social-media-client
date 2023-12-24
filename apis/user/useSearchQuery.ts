import { userServices } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";

const PAGE = 1;

export const useSearchQuery = (limit: number, username: string = "") =>
  useQuery({
    queryKey: ["search", username],
    queryFn: () => {
      if (isEmpty(username)) {
        return null;
      }

      return userServices
        .searchUser({ username, limit, page: PAGE })
        .then((res) => res.data);
    },
  });
