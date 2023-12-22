import { ROUTES } from "@/constants/routes";
import { authService } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import toast from "react-hot-toast";

export const useLogOutMutation = (router: AppRouterInstance) =>
  useMutation({
    mutationFn: () => authService.logOut(),
    onSuccess: ({ data }) => {
      router.push(ROUTES.SIGN_IN);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
