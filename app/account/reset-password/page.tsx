"use client";

import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import ResetForm from "./ResetForm";

const ResetPassword = () => {
  return (
    <section className="flex items-center justify-center h-screen flex-col">
      <div className="w-96 flex flex-col items-center border border-gray-300 rounded-md px-10 py-10 z-10 bg-white">
        <h1 className="text-5xl pb-10">Social Media</h1>
        <h2 className="text-2xl font-semibold mb-2">Reset password</h2>
        <p className="text-center text-gray-500 text-sm">
          Your password must be at least 8 characters and should include a
          combination of numbers, letters and special characters (!$@%).
        </p>
        <ResetForm />
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

export default ResetPassword;
