import Link from "next/link";
import React from "react";
import SignInForm from "../signInFrom/SignInForm";

const SignIn = () => {
  return (
    <section className="bg-white-300 w-full lg:w-[48.88%] min-h-screen flex flex-col items-center justify-center gap-8 lg:pl-[80px] lg:pr-[160px]">
      <div className="w-full flex flex-col gap-6 px-8 lg:px-0">
        <h1 className="text-5xl font-medium text-[#141718]">Sign In</h1>
        <p className="text-[#6C7275] text-base font-semibold">
          Don’t have an account yet?{" "}
          <Link
            href="/sign-in"
            className="text-[#38CB89] cursor-pointer inline-block transform hover:underline transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Sign up
          </Link>
        </p>
      </div>
      <SignInForm />

    </section>
  );
};

export default SignIn;
