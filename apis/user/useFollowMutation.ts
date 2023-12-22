import { userServices } from "@/services/user.services";
import { useMutation } from "@tanstack/react-query";

export const useFollowMutation = () =>
  useMutation({
    mutationFn: (followed_user_id: string) =>
      userServices.follow({ followed_user_id }),
  });
