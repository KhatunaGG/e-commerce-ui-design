"use client";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "../../__molecules";
import { MyAccountType } from "../account/Account";

export type AccountDetailsPropsType = {
  register: UseFormRegister<MyAccountType>;
  errors: FieldErrors<MyAccountType>;
  isMyAccountPage: boolean;
};

const AccountDetails = ({
  register,
  errors,
  isMyAccountPage,
}: AccountDetailsPropsType) => {
  return (
    <div className="w-full flex flex-col gap-6 ">
      <h2 className="text-black font-semibold leading-[32px] text-[20px]">Account Details</h2>
      <div className="w-full flex flex-col  gap-6">
        <Input
          register={register}
          errors={errors}
          fieldName={"accountName"}
          isMyAccountPage={isMyAccountPage}
        />

        <Input
          register={register}
          errors={errors}
          fieldName={"accountLastName"}
          isMyAccountPage={isMyAccountPage}
        />

        <Input
          register={register}
          errors={errors}
          fieldName={"displayName"}
          isMyAccountPage={isMyAccountPage}
        />

        <Input
          register={register}
          errors={errors}
          fieldName={"accountEmail"}
          isMyAccountPage={isMyAccountPage}
        />
      </div>
    </div>
  );
};

export default AccountDetails;
