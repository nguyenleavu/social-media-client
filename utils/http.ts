import { error } from "console";
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from "axios";
import toast from "react-hot-toast";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        // const originalRequest = error.config;
        // if (error.response?.status === 401) {
        //   try {
        //     const result = {
        //       data: {
        //         access_token: "",
        //         refresh_token: "",
        //       },
        //     };
        //     const { access_token, refresh_token } = result.data;
        //     localStorage.setItem("access_token", access_token);
        //     localStorage.setItem("refresh_token", refresh_token);
        //     originalRequest.headers.Authorization = `Bearer ${access_token}`;

        //     return this.instance(originalRequest);
        //   } catch (err) {
        //     console.log("error", error);
        //   }
        // }

        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
          // Toast error
          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
