import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { AuthResponse, RefreshTokenReponse } from "@/types/auth.types";
import { ResponseApi } from "@/types/utils.types";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  HttpStatusCode,
} from "axios";
import toast from "react-hot-toast";
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from "./error";
import {
  clearAccessToken,
  clearLocalStorage,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./token";

class Http {
  instance: AxiosInstance;
  private access_token: string;
  private refresh_token: string;
  private refreshTokenRequest: Promise<string> | null;
  private handleRefreshToken() {
    return this.instance
      .post<AuthResponse>(API_ENDPOINTS.REFRESH_TOKEN, {
        refresh_token: this.refresh_token,
      })
      .then((res) => {
        const accessToken = res.data.data?.access_token;
        const refreshToken = res.data.data?.refresh_token;
        if (accessToken && refreshToken) {
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          this.access_token = accessToken;
          this.refresh_token = refreshToken;
          return accessToken;
        }

        return accessToken || "";
      })
      .catch((error) => {
        clearLocalStorage();
        this.access_token = "";
        this.refresh_token = "";
        throw error;
      });
  }

  constructor() {
    this.access_token = getAccessToken();
    this.refresh_token = getRefreshToken();
    this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    this.instance.interceptors.request.use((config) => {
      if (this.access_token) {
        config.headers.Authorization = `Bearer ${this.access_token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (
          url === API_ENDPOINTS.LOGIN ||
          url === API_ENDPOINTS.REGISTER ||
          url === API_ENDPOINTS.VERIFY_EMAIL
        ) {
          const data = (response.data as AuthResponse).data;

          if (data?.access_token && data.refresh_token) {
            this.access_token = data.access_token;
            this.refresh_token = data.refresh_token;
            setAccessToken(this.access_token);
            setRefreshToken(this.refresh_token);
          } else if (url === API_ENDPOINTS.LOG_OUT) {
            this.access_token = "";
            this.refresh_token = "";
            clearAccessToken();
          }
        }
        return response;
      },
      (error: AxiosError) => {
        if (
          ![
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.Unauthorized,
          ].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
          toast.error(message);
        }

        if (
          isAxiosUnauthorizedError<
            ResponseApi<{ name: string; message: string }>
          >(error)
        ) {
          const config = (error.response?.config as AxiosRequestConfig) || {};
          const { url } = config;
          if (
            isAxiosExpiredTokenError(error) &&
            url !== API_ENDPOINTS.REFRESH_TOKEN
          ) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, 10000);
                });

            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({
                ...config,
                headers: {
                  ...config.headers,
                  authorization: access_token,
                },
              });
            });
          }

          clearLocalStorage();
          this.access_token = "";
          this.refresh_token = "";
          const errorMessage =
            error.response?.data.data?.message || error.response?.data.message;
          if (errorMessage) {
            toast.error(errorMessage);
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
