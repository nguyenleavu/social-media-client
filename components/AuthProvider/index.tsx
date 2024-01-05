"use client";

import { useGetMeQuery } from "@/apis/user/useGetMe";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/profile/profileSlice";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { data } = useGetMeQuery();

  useEffect(() => {
    dispatch(setUser(data?.data.data));
  }, [data?.data.data, dispatch]);

  return children;
};

export default AuthProvider;
