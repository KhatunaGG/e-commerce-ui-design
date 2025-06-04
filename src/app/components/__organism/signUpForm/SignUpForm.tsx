"use client";
import { Input, Submit } from "../../__molecules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const signUpSchema = z.object({
  yourName: z
    .string()
    .min(1, "Your name is required")
    .max(50, "Name is too long")
    .nonempty("Your name is required"),
  userName: z
    .string()
    .min(1, "User name name is required")
    .max(50, "User name is too long")
    .nonempty("User name name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Email is too long")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must be less then 15 characters")
    .nonempty("Password is required"),
});

export type SignUpType = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const {
    register,
    // handleSubmit,
    formState: {
      errors,

      // isSubmitting
    },
    // reset,
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      yourName: "",
      userName: "",
      email: "",
      password: "",
    },
  });



  return (
    <form className="w-full flex flex-col gap-8 px-8 lg:px-0">
      <Input register={register} errors={errors} fieldName="yourName" />
      <Input register={register} errors={errors} fieldName="userName" />
      <Input register={register} errors={errors} fieldName="email" />
      <Input register={register} errors={errors} fieldName="password" />
      <div className="flex gap-2 items-center">
        <input type="checkbox" name="" id="" />
        <p className="text-[#6C7275] text-xs md:text-sm lg:text-base font-semibold">
          I agree with <span className="font-bold">Privacy Policy</span> and{" "}
          <span className="font-bold">Terms of Use</span>
        </p>
      </div>
      <Submit />
    </form>
  );
};

export default SignUpForm;
