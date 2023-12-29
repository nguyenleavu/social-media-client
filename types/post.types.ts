import { MediaType } from "@/constants/enum";
import { Media, User } from "./user.types";
import { ResponseApi, ResponseApiWithPagination } from "./utils.types";

export interface PostConfig {
  page?: number | string;
  limit?: number | string;
}

export interface PostRequest {
  type: number;
  audience: number;
  content: string;
  parent_id: string | null;
  hashtags: string[];
  mentions: string[];
  medias: Media[];
}

export interface MediasConfig extends PostConfig {
  medias_type: MediaType;
}

export interface PostType {
  _id: string;
  user_id: string;
  type: number;
  audience: number;
  content: string;
  parent_id: null;
  hashtags: {
    _id: string;
    name: string;
    created_at: string;
  }[];
  mentions: never[];
  medias: { url: string; type: MediaType }[];
  guest_views: number;
  user_views: number;
  created_at: string;
  updated_at: string;
  user: User;
  bookmarks: number;
  likes: number;
  isLiked: boolean;
  isBookmark: boolean;
  comment_count: number;
  repost_count: number;
  quote_count: number;
}

export interface PostLike {
  _id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface MediasList {
  _id: string;
  medias: Media[];
  likes: number;
  comment_count: number;
}

export type PostsResponse = ResponseApiWithPagination<PostType[]>;
export type MediasResponse = ResponseApiWithPagination<PostType[]>;
export type CommentsResponseWithPagination = ResponseApiWithPagination<
  PostType[]
>;
export type PostResponse = ResponseApi<PostType>;
export type PostLikeResponse = ResponseApi<PostLike>;
