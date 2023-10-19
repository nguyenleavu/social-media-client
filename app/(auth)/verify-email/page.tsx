"use client";

import { useVerifyEmailMutation } from "@/apis/auth/useVerifyEmailMutation";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email_verify_token = searchParams.get("token");
  const { mutate: verifyEmail, data } = useVerifyEmailMutation();

  useEffect(() => {
    if (email_verify_token) {
      verifyEmail({ email_verify_token });
    }
  }, [email_verify_token, verifyEmail]);

  return (
    <section className="flex items-center justify-center h-screen flex-col">
      <div className="flex flex-col items-center space-y-2 z-10 bg-white p-10 rounded-md">
        <h1 className="text-4xl font-bold">{data?.data.message}</h1>
        <div className="py-4">
          <i className="text-8xl text-primary fa-thin fa-envelope-circle-check"></i>
        </div>
        <p className="max-w-xl text-center pb-5">
          Thank you for confirming your email address. I hope you have a
          relaxing and enjoyable day.
        </p>
        <Link
          href={ROUTES.HOME}
          className=" bg-primary px-4 py-2 rounded text-white hover:bg-primary/90"
        >
          Home
        </Link>
      </div>
    </section>
  );
};

export default VerifyEmail;
