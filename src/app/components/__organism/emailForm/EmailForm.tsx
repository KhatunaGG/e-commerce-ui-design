"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../__molecules";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";

export const mailSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  yourEmail: z
    .string()
    .min(1, "Email is required")
    .max(50, "Email is too long")
    .nonempty("Email is required"),
});

export type MailType = z.infer<typeof mailSchema>;

const EmailForm = () => {
  const pathName = usePathname();
  const page = useMemo(() => {
    const parts = pathName.split("/") || [];
    return parts[1] || "default";
  }, [pathName]);

  const {
    register,
    // handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<MailType>({
    resolver: zodResolver(mailSchema),
    defaultValues: {
      fullName: "",
      yourEmail: "",
    },
  });
  return (
    <form className="w-full flex items-start flex-col lg:flex-row lg:gap-[28px] gap-6">
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
            placeholder="Your message"
            className="resize-none outline-none w-full border border-[#CBCBCB] p-4 rounded-lg min-h-[140px]"
          ></textarea>
        </div>
        <div className="w-full flex items-center justify-center md:items-start md:justify-start">
          <button className="w-fit px-10 py-[6px] text-white bg-[#141718] rounded-lg text-base font-medium leading-[28px] tracking-[-0.4px]">
            Send Message
          </button>
        </div>
      </div>

      {/* <div className="lg:flex-1 relative w-[311px] h-[311px] md:w-[548px] md:h-[404px] ">
        <Image
          src={"/assets/map.png"}
          alt={"Map"}
          fill
          className="object-cover rounded-lg"
        />
      </div>
   */}

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

