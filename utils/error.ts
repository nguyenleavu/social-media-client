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
