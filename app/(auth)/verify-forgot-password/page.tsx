"use client";

import { useVerifyForgotPasswordMutation } from "@/apis/auth/useVerifyForgotPasswordMutation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const VerifyForgotPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const forgot_password_token = searchParams.get("token");

  const { mutate: verifyForgotPassword, data } =
    useVerifyForgotPasswordMutation(router);

  useEffect(() => {
    if (forgot_password_token) {
      localStorage.setItem("forgot_password_token", forgot_password_token);
      verifyForgotPassword({ forgot_password_token });
    }
  }, [forgot_password_token, verifyForgotPassword]);

  return (
    <section className="flex items-center justify-center h-screen flex-col">
      <div className="flex flex-col items-center space-y-2 z-10 bg-white p-10 rounded-md">
        <h1 className="text-4xl font-bold">{data?.data.message}</h1>
        <div className="py-4">
          <i className="text-8xl text-primary fa-thin fa-envelope-circle-check"></i>
        </div>
        <p className="max-w-xl text-center pb-5">
          Thank you for confirming your reset password. I will direct you to the
          password reset page.
        </p>
      </div>
    </section>
  );
};

export default VerifyForgotPassword;
