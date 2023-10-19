import { authService } from "@/services/auth.services";
import { AuthError } from "@/types/auth.types";
import { ResponseApi } from "@/types/utils.types";
import { isAxiosUnprocessableEntityError } from "@/utils/error";
import { ForgotPasswordForm } from "@/validation/auth";
import { useMutation } from "@tanstack/react-query";
import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";

export const useForgotPassword = (
  setError: UseFormSetError<ForgotPasswordForm>
) =>
  useMutation({
    mutationFn: (data: ForgotPasswordForm) => authService.forgotPassword(data),
    onSuccess: ({ data }) => {
      toast.success(data.message);
    },
    onError: (error) => {
      if (
        isAxiosUnprocessableEntityError<ResponseApi<ForgotPasswordForm>>(error)
      ) {
        const formError = (error.response?.data as any).errors as AuthError;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof ForgotPasswordForm, {
              message: formError[key as keyof ForgotPasswordForm]?.msg,
            });
          });
        }
      }
    },
  });
