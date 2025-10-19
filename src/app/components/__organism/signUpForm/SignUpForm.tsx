"use client";
import { Input, Submit } from "../../__molecules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpStore } from "@/app/store/sign-up.store";
import { signUpSchema } from "@/app/schema/shema";
import { SignUpType } from "@/app/interfaces/interface";

const SignUpForm = () => {
  const { signUp } = useSignUpStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      yourName: "",
      userName: "",
      email: "",
      password: "",
      isTerms: false,
    },
  });

  const onSubmit = async (formData: SignUpType) => {
    try {
      const isSuccess = await signUp(formData);
      if (isSuccess) {
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-8 px-8 lg:px-0"
    >
      <Input register={register} errors={errors} fieldName="yourName" />
      <Input register={register} errors={errors} fieldName="userName" />
      <Input register={register} errors={errors} fieldName="email" />
      <Input register={register} errors={errors} fieldName="password" />
      <div className="flex gap-2 items-center          relative">
        <input
          type="checkbox"
          id="terms-checkbox"
          {...register("isTerms")}
          className="cursor-pointer"
        />
        <label
          htmlFor="terms-checkbox"
          className="text-[#6C7275] text-xs md:text-sm lg:text-base font-semibold"
        >
          I agree with <span className="font-bold">Privacy Policy</span> and{" "}
          <span className="font-bold">Terms of Use</span>
        </label>
        {errors.isTerms && (
          <p className="text-red-500 text-xs      absolute top-6 left-0">
            {errors.isTerms.message}
          </p>
        )}
      </div>
      <Submit />
    </form>
  );
};

export default SignUpForm;
