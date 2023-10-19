import { API_ENDPOINTS } from "@/constants/api-endpoints";
import {
  AuthResponse,
  ForgotPasswordResponse,
  ResetPassword,
  ResetPasswordResponse,
  VerifyEmailResponse,
  VerifyForgotPasswordResponse,
} from "@/types/auth.types";
import http from "@/utils/http";
import { ForgotPasswordForm, LoginForm, RegisterForm } from "@/validation/auth";
import { AxiosResponse } from "axios";

export const authService = {
  login: async (data: LoginForm): Promise<AxiosResponse<AuthResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.LOGIN,
      data,
    }),

  register: async (data: RegisterForm): Promise<AxiosResponse<AuthResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.REGISTER,
      data,
    }),

  refreshToken: async (data: string): Promise<AxiosResponse<AuthResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.REFRESH_TOKEN,
      data,
    }),

  verifyEmail: async (data: {
    email_verify_token: string;
  }): Promise<AxiosResponse<VerifyEmailResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.VERIFY_EMAIL,
      data,
    }),

  forgotPassword: async (
    data: ForgotPasswordForm
  ): Promise<AxiosResponse<ForgotPasswordResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.FORGOT_PASSWORD,
      data,
    }),

  verifyForgotPassword: async (data: {
    forgot_password_token: string;
  }): Promise<AxiosResponse<VerifyForgotPasswordResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.VERIFY_FORGOT_PASSWORD,
      data,
    }),

  resetPassword: async (
    data: ResetPassword
  ): Promise<AxiosResponse<ResetPasswordResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.RESET_PASSWORD,
      data,
    }),
};
