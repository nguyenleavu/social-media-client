"use client";

import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import Divider from "../components/Divider";
import ForgotForm from "./ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <section className="flex items-center justify-center h-screen flex-col">
      <div className="w-96 flex flex-col items-center border border-gray-300 rounded-md px-10 py-10 z-10 bg-white">
        <h1 className="text-5xl pb-10">Social Media</h1>
        <p className="text-center text-gray-500 text-sm">
          Enter your email and we&apos;ll send you a link to get back into your
          account.
        </p>
        <ForgotForm />
        <Divider />
        <Link
          href={ROUTES.SIGN_UP}
          className="text-primary font-medium text-sm mt-2"
        >
          Create new account
        </Link>
        <Link
          href={ROUTES.SIGN_IN}
          className="text-black font-medium text-sm mt-16"
        >
          Back to login
        </Link>
      </div>
    </section>
  );
};

export default ForgotPassword;
