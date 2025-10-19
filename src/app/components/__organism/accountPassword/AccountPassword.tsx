"use client";
import { AccountPasswordPropsType } from "@/app/interfaces/interface";
import { Input } from "../../__molecules";

const AccountPassword = ({
  register,
  errors,
  isMyAccountPage,
}: AccountPasswordPropsType) => {
  return (
    <div className="w-full flex flex-col gap-6">
      <h2 className="text-black font-semibold leading-[32px] text-[20px]">
        Password
      </h2>
      <div className="w-full flex flex-col gap-6">
        <Input
          register={register}
          errors={errors}
          fieldName={"oldPassword"}
          isMyAccountPage={isMyAccountPage}
        />

        <Input
          register={register}
          errors={errors}
          fieldName={"newPassword"}
          isMyAccountPage={isMyAccountPage}
        />

        <Input
          register={register}
          errors={errors}
          fieldName={"confirmPassword"}
          isMyAccountPage={isMyAccountPage}
        />
      </div>
    </div>
  );
};

export default AccountPassword;
