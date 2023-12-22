"use client";

import { ROUTES } from "@/constants/routes";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LoginOauth = () => {
  const searchParams = useSearchParams();
  const access_token = searchParams.get("access_token");
  const refresh_token = searchParams.get("refresh_token");

  useEffect(() => {
    if (access_token && refresh_token) {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      redirect(ROUTES.HOME);
    }
  }, [access_token, refresh_token]);
  return (
    <section className="flex items-center justify-center h-screen flex-col"></section>
  );
};

export default LoginOauth;
