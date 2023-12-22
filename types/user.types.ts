import { MediaType } from "@/constants/enum";
import { ResponseApi, ResponseApiWithPagination } from "./utils.types";
import { PostType } from "./post.types";

export interface Media {
  url: string;
  type: MediaType;
}

export interface MediaState {
  file: File;
  type: MediaType;
}

export interface CroppedMediaState {
  file: Blob;
  type: MediaType;
}

export interface EditedMedia {
  url: string;
  type: MediaType;
}

export interface CroppedAreaPixels {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  verify: number;
  bio: string;
  location: string;
  website: string;
  username: string;
  avatar: string;
  cover_photo: string;
}

export interface Profile {
  _id: string;
  name: string;
  email: string;
  date_of_birth: string;
  created_at: string;
  updated_at: string;
  verify: number;
  bio: string;
  location: string;
  website: string;
  username: string;
  avatar: string;
  cover_photo: string;
  posts: PostType[];
  followers: number;
  following: number;
  bookmarks: PostType[];
  isFollowing: boolean;
}

export interface SuggestedType {
  _id: string;
  count: number;
  user: User;
}

export type MediaResponse = ResponseApi<Media[]>;
export type CropVideoResponse = ResponseApi<{
  url: string;
  type: MediaType;
}>;
export type ProfileResponse = ResponseApi<Profile>;
export type FollowResponse = { message: string };
export type SuggestedResponse = ResponseApiWithPagination<SuggestedType>;
export type SearchResponse = ResponseApiWithPagination<User[]>;
