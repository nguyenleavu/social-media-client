import { setUser } from "@/redux/profile/profileSlice";
import { userServices } from "@/services/user.services";
import { EditForm } from "@/types/user.types";
import { Dispatch } from "@reduxjs/toolkit";
import { useMutation } from "@tanstack/react-query";
import { error } from "console";
import toast from "react-hot-toast";

export const useEditProfileMutation = (dispatch: Dispatch) =>
  useMutation({
    mutationFn: (data: EditForm) => userServices.editProfile(data),
    onSuccess: ({ data }) => {
      toast.success(data.message);
      dispatch(setUser(data.data));
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
