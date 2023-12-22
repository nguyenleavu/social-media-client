import { userServices } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";

export const useProfileQuery = (username: string) =>
  useQuery({
    queryKey: ["profile", username],
    queryFn: () => userServices.getProfile(username),
  });
