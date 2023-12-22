import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "@/redux/profile/profileSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
