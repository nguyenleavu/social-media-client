import { postServices } from "@/services/post.services";
import { useMutation } from "@tanstack/react-query";

export const useUnlikeMutation = () =>
  useMutation({
    mutationFn: (id: string) => postServices.unlikePost(id),
  });
