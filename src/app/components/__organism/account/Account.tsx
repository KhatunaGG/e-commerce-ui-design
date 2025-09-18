"use client";
import AccountDetails from "../accountDetails/AccountDetails";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import AccountPassword from "../accountPassword/AccountPassword";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useEffect } from "react";
import { useAccountStore } from "@/app/store/account.store";
import { useShopStore } from "@/app/store/shop-page.store";

export const myAccountSchema = z
  .object({
    accountName: z.string().optional(),
    accountLastName: z.string().optional(),
    displayName: z.string().optional(),
    accountEmail: z.string().email().optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => {
      const anyPasswordEntered =
        data.oldPassword || data.newPassword || data.confirmPassword;
      if (anyPasswordEntered) {
        return (
          !!data.oldPassword &&
          !!data.newPassword &&
          !!data.confirmPassword &&
          data.newPassword === data.confirmPassword
        );
      }
      return true;
    },
    {
      message:
        "If changing password, all password fields are required and new passwords must match.",
      path: ["confirmPassword"],
    }
  );

export type MyAccountType = z.infer<typeof myAccountSchema>;

const Account = () => {
  const path = usePathname();
  const isMyAccountPage = path.includes("account-page");
  const { accessToken, initialize, currentUser } = useSignInStore();
  const { submitAccountSettings } = useAccountStore();
  const { normalizeFirstChar } = useShopStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const {
    handleSubmit,
    formState: { errors },
    // reset,
    register,
    setValue,
  } = useForm<MyAccountType>({
    resolver: zodResolver(myAccountSchema),
    defaultValues: {
      accountName: "",
      accountLastName: "",
      displayName: "",
      accountEmail: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { setFormData } = useAccountStore();

  useEffect(() => {
    if (currentUser) {
      const formattedFirstName = normalizeFirstChar(currentUser.yourName ?? "");
      const formattedLastName = normalizeFirstChar(currentUser.lastName ?? "");
      const formattedDisplayName = normalizeFirstChar(
        currentUser.userName ?? ""
      );

      setValue("accountName", formattedFirstName);
      setValue("accountLastName", formattedLastName);
      setValue("displayName", formattedDisplayName);
      setValue("accountEmail", currentUser.email ?? "");

      setFormData({
        accountName: formattedFirstName,
        accountLastName: formattedLastName,
        displayName: formattedDisplayName,
        accountEmail: currentUser.email ?? "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [currentUser, setValue, setFormData, normalizeFirstChar]);

  const onsubmit = async (formState: MyAccountType) => {
    if (!accessToken) return;
    // await submitAccountSettings(formState, accessToken);
    const success = await submitAccountSettings(formState, accessToken);
    if (success) {
      setValue("oldPassword", "");
      setValue("newPassword", "");
      setValue("confirmPassword", "");
    }
  };

  if (!accessToken) return null;

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="w-full  h-full flex flex-col gap-10 lg:px-[72px] pb-10"
    >
      <AccountDetails
        register={register}
        errors={errors}
        isMyAccountPage={isMyAccountPage}
      />
      <AccountPassword
        register={register}
        errors={errors}
        isMyAccountPage={isMyAccountPage}
      />

      <div  className="w-full flex items-start">
        <button
          type="submit"
          className="text-base py-3 px-10 font-medium leading-[28px] tracking-[-0.4px] text-white bg-[#141718] rounded-lg hover:bg-gray-800 transition-colors duration-300 ease-in-out"
        >
          Save changes
        </button>
      </div>
    </form>
  );
};

export default Account;
