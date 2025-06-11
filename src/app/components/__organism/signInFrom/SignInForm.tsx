"use client";
import { Input, Submit } from "../../__molecules";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Link from "next/link";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useRouter } from "next/navigation";


export const signInSchema = z.object({
  signInName: z
    .string()
    .min(1, "Username or email is required")
    .max(50, "Too long")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        /^[a-zA-Z0-9_]{1,}$/.test(val),
      {
        message: "Enter a valid email or username",
      }
    ),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must be less then 15 characters")
    .nonempty("Password is required"),
  rememberMe: z.boolean().optional(),
});

export type SignInType = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const { signIn } = useSignInStore();
  const router = useRouter();

  // useEffect(() => {
  //   initialize();
  // }, [initialize]);

  // useEffect(() => {
  //   if (accessToken) {
  //     router.push("/");
  //   }
  // }, [accessToken, router]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
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
    console.log(formData, "formData");
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
      <Submit isSubmitting={isSubmitting} />
    </form>
  );
};

export default SignInForm;
