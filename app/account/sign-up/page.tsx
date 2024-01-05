"use client";

import { ROUTES } from "@/constants/routes";
import AuthFooter from "../components/AuthFooter";
import Divider from "../components/Divider";
import LoginWithGoogle from "../components/LoginWithGoogle";
import RegisterForm from "./RegisterForm";

const SignUP = () => {
  return (
    <section className="flex items-center justify-center h-screen flex-col">
      <div className="w-96 flex flex-col items-center border border-gray-300 rounded-md px-10 py-10 z-10 bg-white">
        <h1 className="text-5xl pb-10">Social Media</h1>
        <p className="text-center font-semibold text-gray-500 text-sm">
          Sign up to see photos and videos from your friends.
        </p>
        <LoginWithGoogle />
        <Divider />
        <RegisterForm />
      </div>
      <AuthFooter
        typography="Have an account?"
        href={ROUTES.SIGN_IN}
        label="Log in"
      />
    </section>
  );
};

export default SignUP;
