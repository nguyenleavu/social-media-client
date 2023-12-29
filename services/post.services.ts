import { API_ENDPOINTS } from "@/constants/api-endpoints";
import {
  CommentsResponseWithPagination,
  MediasConfig,
  MediasResponse,
  PostConfig,
  PostLikeResponse,
  PostRequest,
  PostResponse,
  PostsResponse,
} from "@/types/post.types";
import http from "@/utils/http";
import { AxiosResponse } from "axios";

export const postServices = {
  getPosts: async (params: PostConfig): Promise<AxiosResponse<PostsResponse>> =>
    await http.request({
      method: "GET",
      url: API_ENDPOINTS.GET_POSTS,
      params,
    }),

  getPost: async (id: string): Promise<AxiosResponse<PostResponse>> =>
    await http.request({
      method: "GET",
      url: API_ENDPOINTS.GET_POST + id,
    }),

  getComments: async (
    id: string,
    params: any
  ): Promise<AxiosResponse<CommentsResponseWithPagination>> =>
    await http.request({
      method: "GET",
      url: `${API_ENDPOINTS.GET_COMMENT}/${id}/children`,
      params,
    }),

  likePost: async (id: string): Promise<AxiosResponse<PostLikeResponse>> =>
    await http.request({
      method: "POST",
      url: `${API_ENDPOINTS.LIKE_POST}/${id}`,
    }),

  unlikePost: async (id: string): Promise<AxiosResponse<PostLikeResponse>> =>
    await http.request({
      method: "DELETE",
      url: `${API_ENDPOINTS.UNLIKE_POST}/${id}`,
    }),

  bookmark: async (id: string): Promise<AxiosResponse<PostLikeResponse>> =>
    await http.request({
      method: "POST",
      url: `${API_ENDPOINTS.BOOKMARK}/${id}`,
    }),

  unBookmark: async (id: string): Promise<AxiosResponse<PostLikeResponse>> =>
    await http.request({
      method: "DELETE",
      url: `${API_ENDPOINTS.BOOKMARK}/${id}`,
    }),

  getMedias: async (
    params: MediasConfig
  ): Promise<AxiosResponse<MediasResponse>> =>
    await http.request({
      method: "GET",
      url: API_ENDPOINTS.GET_MEDIAS,
      params,
    }),

  createPost: async (data: PostRequest): Promise<AxiosResponse<PostResponse>> =>
    await http.request({
      method: "POST",
      url: API_ENDPOINTS.CREATE_POST,
      data,
    }),
};
