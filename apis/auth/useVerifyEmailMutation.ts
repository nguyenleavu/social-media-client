import { authService } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmailMutation = () =>
  useMutation({
    mutationFn: (data: { email_verify_token: string }) =>
      authService.verifyEmail(data),
  });
