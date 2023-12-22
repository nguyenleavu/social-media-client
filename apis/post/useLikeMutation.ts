import { postServices } from "@/services/post.services";
import { useMutation } from "@tanstack/react-query";

export const useLikeMutation = () =>
  useMutation({
    mutationFn: (id: string) => postServices.likePost(id),
  });
