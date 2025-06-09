"use client";
import { Input, Submit } from "../../__molecules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";

export const signInSchema = z.object({
  signInName: z
    .string()
    .min(1, "Your name is required")
    .max(50, "Name is too long")
    .nonempty("Your name is required"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must be less then 15 characters")
    .nonempty("Password is required"),
});

export type SignInType = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const {
    register,
    // handleSubmit,
    formState: {
      errors,

      isSubmitting
    },
    // reset,
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      signInName: "",
      password: "",
    },
  });

  return (
    <form className="w-full flex flex-col gap-8 px-8 lg:px-0">
      <Input register={register} errors={errors} fieldName="signInName" />
      <Input register={register} errors={errors} fieldName="password" />
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-3">
          <input type="checkbox" name="" id="" />
          <p className="text-[#6C7275] text-xs md:text-sm lg:text-base font-semibold">
            Remember me
          </p>
        </div>
        <Link
          href={""}
          className="w-full cursor-pointer inline-block transform hover:underline transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <p className="block w-full text-base font-semibold text-right text-black/70">
            Forgot password?
          </p>
        </Link>
      </div>
      <Submit isSubmitting={isSubmitting} />
    </form>
  );
};

export default SignInForm;
