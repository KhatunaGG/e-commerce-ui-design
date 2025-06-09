
import Link from "next/link";
import React from "react";
import SignUpForm from "../signUpForm/SignUpForm";


const SignUp = () => {

  return (
    <section className="bg-white-300 w-full lg:w-[48.88%] min-h-screen flex flex-col items-center justify-center gap-8 lg:pl-[80px] lg:pr-[160px]">
      <div className="w-full flex flex-col gap-6 px-8 lg:px-0">
        <h1 className="text-5xl font-medium text-[#141718]">Sign Up</h1>
        <p className="text-[#6C7275] text-base font-semibold">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-[#38CB89] cursor-pointer inline-block transform hover:underline transition-transform duration-300 ease-in-out hover:scale-105"
          >
            Sign in
          </Link>
        </p>
      </div>
      <SignUpForm />
    </section>
  );
};

export default SignUp;
