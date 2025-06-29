"use client";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Eye } from "../../__atoms";

export type InputPropsType<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: Path<T>;
};

export default function Input<T extends FieldValues>({
  register,
  // errors,
  fieldName,
}: InputPropsType<T>) {
  const labelText =
    fieldName === "yourName"
      ? "Your Name"
      : fieldName === "userName"
      ? "User Name"
      : fieldName === "email"
      ? "Email"
      : fieldName === "signInName"
      ? "Your username or email address"
      : "Password";

  return (
    <div className="w-full flex flex-col relative">
      <label
        htmlFor={fieldName}
        className="text-[#6C7275] text-base font-normal"
      >
        {labelText}
      </label>
      <div className="w-full relative bg-green-200 rounded-lg">
        <input
          {...register(fieldName)}
          type="text"
          className="w-full border-b border-b-[#E8ECEF] outline-none py-1 px-2 text-sm "
        />
        {fieldName === "password" && (
          <div className="absolute top-1/2 right-[10px] transform -translate-y-1/2 cursor-pointer">
            <Eye />
          </div>
        )}
      </div>
    </div>
  );
}
