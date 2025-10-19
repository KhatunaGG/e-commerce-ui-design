"use client";
import AccountDetails from "../accountDetails/AccountDetails";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import AccountPassword from "../accountPassword/AccountPassword";
import { useSignInStore } from "@/app/store/sign-in.store";
import { useEffect } from "react";
import { useAccountStore } from "@/app/store/account.store";
import { useShopStore } from "@/app/store/shop-page.store";
import { myAccountSchema } from "@/app/schema/shema";
import { MyAccountType } from "@/app/interfaces/interface";

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

      <div className="w-full flex items-start">
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
