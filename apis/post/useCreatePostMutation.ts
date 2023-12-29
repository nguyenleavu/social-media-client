import { postServices } from "@/services/post.services";
import { PostRequest } from "@/types/post.types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreatePostMutation = () =>
  useMutation({
    mutationFn: (data: PostRequest) => postServices.createPost(data),
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
  });
