import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { PostConfig } from "@/types/post.types";
import {
  CropVideoResponse,
  CroppedAreaPixels,
  EditForm,
  FollowResponse,
  GetMeResponse,
  MediaResponse,
  ProfileResponse,
  SearchResponse,
  SuggestedResponse,
} from "@/types/user.types";
import http from "@/utils/http";
import { AxiosResponse } from "axios";

const headers = {
  "Content-Type": "multipart/form-data",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};

interface SearchConfig extends PostConfig {
  username: string;
}

export const userServices = {
  uploadImage: async (data: FormData): Promise<AxiosResponse<MediaResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.UPLOAD_IMAGE,
      data,
      headers,
    }),

  cropVideo: async ({
    data,
    params,
  }: {
    data: FormData;
    params: CroppedAreaPixels;
  }): Promise<AxiosResponse<CropVideoResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.CROP_VIDEO,
      data,
      params,
      headers,
    }),

  uploadVideo: async (data: FormData): Promise<AxiosResponse<MediaResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.UPLOAD_VIDEO,
      data,
      headers,
    }),

  getProfile: async (
    username: string
  ): Promise<AxiosResponse<ProfileResponse>> =>
    await http.request({
      method: "GET",
      url: API_ENDPOINTS.GET_PROFILE + username,
    }),

  editProfile: async (data: EditForm): Promise<AxiosResponse<GetMeResponse>> =>
    await http.request({
      method: "PATCH",
      url: API_ENDPOINTS.EDIT_PROFILE,
      data,
    }),

  getMe: async (): Promise<AxiosResponse<GetMeResponse>> =>
    await http.request({
      method: "GET",
      url: API_ENDPOINTS.GET_ME,
    }),

  follow: async (data: {
    followed_user_id: string;
  }): Promise<AxiosResponse<FollowResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.FOLLOW,
      data,
    }),

  unfollow: async (id: string): Promise<AxiosResponse<FollowResponse>> =>
    await http.request({
      method: "DELETE",
      url: API_ENDPOINTS.UNFOLLOW + id,
    }),

  geSuggested: async (
    params: PostConfig
  ): Promise<AxiosResponse<SuggestedResponse>> =>
    await http.request({
      method: "GET",
      url: API_ENDPOINTS.SUGGESTED,
      params,
    }),

  searchUser: async (
    params: SearchConfig
  ): Promise<AxiosResponse<SearchResponse>> =>
    await http.request({
      method: "GET",
      url: API_ENDPOINTS.SEARCH,
      params,
    }),
};
