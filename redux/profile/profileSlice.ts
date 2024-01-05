import { Profile, User } from "@/types/user.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { profile: Profile; user: User | null } = {
  profile: {
    _id: "",
    name: "",
    email: "",
    date_of_birth: "",
    created_at: "",
    updated_at: "",
    verify: 1,
    bio: "",
    location: "",
    website: "",
    username: "",
    avatar: "",
    cover_photo: "",
    posts: [],
    bookmarks: [],
    followers: 0,
    following: 0,
    isFollowing: false,
  },
  user: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      state.profile = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setProfile, setUser } = profileSlice.actions;

export default profileSlice.reducer;
