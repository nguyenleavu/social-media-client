import { ResponseApi } from "@/types/utils.types";
import axios, { AxiosError, HttpStatusCode } from "axios";

export const isAxiosError = <Type>(
  error: unknown
): error is AxiosError<Type> => {
  return axios.isAxiosError(error);
};

export const isAxiosUnprocessableEntityError = <FormError>(
  error: unknown
): error is AxiosError<FormError> => {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.UnprocessableEntity
  );
};

export function isAxiosUnauthorizedError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosError(error) &&
    error.response?.status === HttpStatusCode.Unauthorized
  );
}

export function isAxiosExpiredTokenError<UnauthorizedError>(
  error: unknown
): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ResponseApi<{ name: string; message: string }>>(
      error
    ) && error.response?.data?.message === "Jwt expired"
  );
}
