import { ROUTES } from "@/constants/routes";
import { authService } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useVerifyForgotPasswordMutation = (router: AppRouterInstance) =>
  useMutation({
    mutationFn: (data: { forgot_password_token: string }) =>
      authService.verifyForgotPassword(data),
    onSuccess: () => {
      router.push(ROUTES.RESET_PASSWORD);
    },
  });
