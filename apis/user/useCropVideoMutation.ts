import { userServices } from "@/services/user.services";
import { CroppedAreaPixels, CroppedMediaState } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCropVideoMutation = () =>
  useMutation({
    mutationFn: ({
      data,
      params,
    }: {
      data: FormData;
      params: CroppedAreaPixels;
    }) => userServices.cropVideo({ data, params }),
    onSuccess: ({ data }) => {
      if (data.data) {
        console.log("data.data", data.data);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
