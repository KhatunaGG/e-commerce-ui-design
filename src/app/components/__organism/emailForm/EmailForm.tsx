"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../__molecules";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import { useMenuStore } from "@/app/store/menu.store";
import { useSignInStore } from "@/app/store/sign-in.store";
import { toast } from "react-toastify";
import { mailSchema } from "@/app/schema/shema";
import { MailType } from "@/app/interfaces/interface";

const EmailForm = () => {
  const pathName = usePathname();
  const page = useMemo(() => {
    const parts = pathName.split("/") || [];
    return parts[1] || "default";
  }, [pathName]);
  const { isLoading, sendEmail } = useMenuStore();
  const { initialize } = useSignInStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MailType>({
    resolver: zodResolver(mailSchema),
    defaultValues: {
      fullName: "",
      yourEmail: "",
      message: "",
    },
  });

  const onSubmit = async (formData: MailType) => {
    console.log("formData", formData);
    await initialize();
    const token = useSignInStore.getState().accessToken;
    if (!token) {
      toast.error("You must be signed in to send email");
      return;
    }
    const success = await sendEmail(formData, token ?? "");
    if (success) {
      reset();
      toast.success("Message sent successfully!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex items-start flex-col lg:flex-row lg:gap-[28px] gap-6"
    >
      <div className="w-full flex flex-col gap-5 lg:flex-1">
        <Input
          register={register}
          errors={errors}
          fieldName="fullName"
          page={page}
        />
        <Input
          register={register}
          errors={errors}
          fieldName="yourEmail"
          page={page}
        />
        <div className="w-full flex flex-col gap-3">
          <label className="uppercase text-[#6C7275]">massage</label>
          <textarea
            {...register("message")}
            placeholder="Your message"
            className="resize-none outline-none w-full border border-[#CBCBCB] p-4 rounded-lg min-h-[140px]"
          ></textarea>
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>
        <div className="w-full flex items-center justify-center md:items-start md:justify-start">
          <button
            type="submit"
            disabled={isLoading}
            className="w-fit px-10 py-[6px] text-white bg-[#141718] rounded-lg text-base font-medium leading-[28px] tracking-[-0.4px]"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>

      <div className="relative min-w-[311px] min-h-[311px] md:min-w-[548px] md:min-h-[404px] lg:w-[548px] lg:h-[404px] w-full h-full ">
        <Image
          src="/assets/map.png"
          alt="Map"
          fill
          sizes="(min-width: 1024px) 548px, 100vw"
          className="object-cover rounded-lg"
        />
      </div>
    </form>
  );
};

export default EmailForm;
