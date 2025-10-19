"use client";
import { AccountDetailsPropsType } from "@/app/interfaces/interface";
import { Input } from "../../__molecules";

const AccountDetails = ({
  register,
  errors,
  isMyAccountPage,
}: AccountDetailsPropsType) => {
  return (
    <div className="w-full flex flex-col gap-6 ">
      <h2 className="text-black font-semibold leading-[32px] text-[20px]">
        Account Details
      </h2>
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
