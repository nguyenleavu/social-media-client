import { userServices } from "@/services/user.services";
import { EditedMedia } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUploadImageMutation = (
  handleSetEditedMedia: (value: EditedMedia) => void,
  goNext?: () => void
) =>
  useMutation({
    mutationFn: (data: FormData) => userServices.uploadImage(data),
    onSuccess: ({ data }) => {
      if (data.data) {
        handleSetEditedMedia(data.data[0]);
        if (goNext) {
          goNext();
        }
      }
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error.message);
    },
  });

export const useUploadVideoMutation = (
  handleSetEditedMedia: (value: EditedMedia) => void,
  goNext: () => void
) =>
  useMutation({
    mutationFn: (data: FormData) => userServices.uploadVideo(data),
    onSuccess: ({ data }) => {
      if (data.data) {
        handleSetEditedMedia(data.data[0]);
        goNext();
      }
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error.message);
    },
  });
