import { postServices } from "@/services/post.services";
import { useMutation } from "@tanstack/react-query";

export const useBookmarkMutation = () =>
  useMutation({
    mutationFn: (id: string) => postServices.bookmark(id),
  });
