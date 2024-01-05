"use client";

import Link from "next/link";
import AuthFooter from "../components/AuthFooter";
import LoginWithGoogle from "../components/LoginWithGoogle";
import LoginForm from "./LoginForm";
import { ROUTES } from "@/constants/routes";
import Divider from "../components/Divider";

const SignIn = () => {
  return (
    <section className="flex items-center justify-center h-screen flex-col">
      <div className="w-96 flex flex-col items-center border border-gray-300 rounded-md px-10 py-10 z-10 bg-white">
        <h1 className="text-5xl pb-10">Social Media</h1>
        <LoginForm />
        <Divider />
        <LoginWithGoogle />
        <Link className="text-xs text-primary" href={ROUTES.FORGOT_PASSWORD}>
          Forgot password?
        </Link>
      </div>
      <AuthFooter
        typography="Don't have an account?"
        href={ROUTES.SIGN_UP}
        label="Sign up"
      />
    </section>
  );
};

export default SignIn;
