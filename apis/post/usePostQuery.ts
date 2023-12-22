import { postServices } from "@/services/post.services";
import { useQuery } from "@tanstack/react-query";

export const usePostQuery = (id: string) =>
  useQuery({
    queryKey: ["post", id],
    queryFn: () => postServices.getPost(id),
  });
