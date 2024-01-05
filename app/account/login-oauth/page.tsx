"use client";

import { ROUTES } from "@/constants/routes";
import { setAccessToken, setRefreshToken } from "@/utils/token";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LoginOauth = () => {
  const searchParams = useSearchParams();
  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");

  useEffect(() => {
    if (access_token && refresh_token) {
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      redirect(ROUTES.HOME);
    }
  }, [access_token, refresh_token]);
  return null;
};

export default LoginOauth;
