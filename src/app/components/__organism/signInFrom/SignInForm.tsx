"use client";
import { Input, Submit } from "../../__molecules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/app/schema/shema";
import { SignInType } from "@/app/interfaces/interface";

const SignInForm = () => {
  const { signIn } = useSignInStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      signInName: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("rememberMe", e.target.checked);
  };

  const onsubmit = async (formData: SignInType) => {
    try {
      const isSuccess = await signIn(formData);
      if (isSuccess) {
        reset();
      }
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="w-full flex flex-col gap-8 px-8 lg:px-0"
    >
      <Input register={register} errors={errors} fieldName="signInName" />
      <Input register={register} errors={errors} fieldName="password" />
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center gap-3">
          <input onChange={handleCheckbox} type="checkbox" name="" id="" />
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
      <Submit />
    </form>
  );
};

export default SignInForm;
