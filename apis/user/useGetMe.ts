import { userServices } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";
import { isEmpty } from "lodash";

export const useGetMeQuery = () =>
  useQuery({
    queryKey: ["get-me"],
    queryFn: () => userServices.getMe(),
  });
