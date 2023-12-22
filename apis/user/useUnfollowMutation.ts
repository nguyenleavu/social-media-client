import { userServices } from "@/services/user.services";
import { useMutation } from "@tanstack/react-query";

export const useUnfollowMutation = () =>
  useMutation({
    mutationFn: (id: string) => userServices.unfollow(id),
  });
