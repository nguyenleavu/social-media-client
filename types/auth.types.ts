import { ResetPasswordForm } from "@/validation/auth";
import { ResponseApi } from "./utils.types";

export type AuthResponse = ResponseApi<{
  access_token: string;
  refresh_token: string;
}>;

export type LogOutResponse = ResponseApi<{
  message: string;
}>;

export type VerifyEmailResponse = ResponseApi<{
  access_token: string;
  refresh_token: string;
}>;

export type ForgotPasswordResponse = ResponseApi<{
  message: string;
}>;

export type VerifyForgotPasswordResponse = ResponseApi<{
  message: string;
}>;

export type ResetPasswordResponse = ResponseApi<{
  message: string;
}>;

export type RefreshTokenReponse = ResponseApi<{ access_token: string }>;

interface Error {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface AuthError {
  email?: Error;
  password?: Error;
  name?: Error;
  confirm_password?: Error;
  date_of_birth?: Error;
}

export interface ResetPassword extends ResetPasswordForm {
  forgot_password_token: string;
}
