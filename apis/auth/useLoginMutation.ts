import { authService } from "@/services/auth.services";
import { AuthError } from "@/types/auth.types";
import { ResponseApi } from "@/types/utils.types";
import { isAxiosUnprocessableEntityError } from "@/utils/error";
import { LoginForm } from "@/validation/auth";
import { useMutation } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";

export const useLoginMutation = (
  setError: UseFormSetError<LoginForm>,
  router: AppRouterInstance
) =>
  useMutation({
    mutationFn: (data: LoginForm) => authService.login(data),
    onSuccess: ({ data }) => {
      if (data.data) {
        const { access_token, refresh_token } = data.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
      }
      toast.success(data.message);
      router.push("/");
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ResponseApi<LoginForm>>(error)) {
        const formError = (error.response?.data as any).errors as AuthError;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof LoginForm, {
              message: formError[key as keyof LoginForm]?.msg,
            });
          });
        }
      }
    },
  });
