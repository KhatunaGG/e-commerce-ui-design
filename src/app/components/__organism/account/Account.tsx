"use client";
import AccountDetails from "../accountDetails/AccountDetails";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";

export const myAccountSchema = z.object({
  accountName: z.string().optional(),
  accountLasName: z.string().optional(),
  displayName: z.string().optional(),
  accountEmail: z.string().email().optional(),
});

export type MyAccountType = z.infer<typeof myAccountSchema>;

const Account = () => {
  const path = usePathname()
  const isMyAccountPage = path.includes('account-page')

  const {
    handleSubmit,
    formState: { errors },
    // reset,
    register,
  } = useForm<MyAccountType>({
    resolver: zodResolver(myAccountSchema),
    defaultValues: {},
  });

  const onsubmit = async (formState: MyAccountType) => {
    console.log(formState, "formState");
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="w-full  h-full flex flex-col gap-10 lg:px-[72px] "
    >
      <AccountDetails register={register} errors={errors} isMyAccountPage={isMyAccountPage}  />

      <div className="w-full flex flex-col gap-6">
        <h2>Password</h2>
        <div className="w-full flex flex-col gap-6"></div>
      </div>

      <button type="submit">Save changes</button>
    </form>
  );
};

export default Account;
