import { authService } from "@/services/auth.services";
import { AuthError, ResetPassword } from "@/types/auth.types";
import { ResponseApi } from "@/types/utils.types";
import { isAxiosUnprocessableEntityError } from "@/utils/error";
import { ResetPasswordForm } from "@/validation/auth";
import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";

export const useResetPasswordMutation = (
  setError: UseFormSetError<ResetPassword>
) =>
  useMutation({
    mutationFn: (data: ResetPassword) => authService.resetPassword(data),
    onError: (error) => {
      if (
        isAxiosUnprocessableEntityError<ResponseApi<ResetPasswordForm>>(error)
      ) {
        const formError = (error.response?.data as any).errors as AuthError;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof ResetPasswordForm, {
              message: formError[key as keyof ResetPasswordForm]?.msg,
            });
          });
        }
      }
    },
  });
