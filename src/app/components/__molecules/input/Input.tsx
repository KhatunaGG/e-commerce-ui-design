// "use client";
// import {
//   FieldErrors,
//   FieldValues,
//   Path,
//   UseFormRegister,
// } from "react-hook-form";
// import { Eye } from "../../__atoms";

// export type InputPropsType<T extends FieldValues> = {
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   fieldName: Path<T>;
// };

// export default function Input<T extends FieldValues>({
//   register,
//   // errors,
//   fieldName,
// }: InputPropsType<T>) {
//   const labelText =
//     fieldName === "yourName"
//       ? "Your Name"
//       : fieldName === "userName"
//       ? "User Name"
//       : fieldName === "email"
//       ? "Email"
//       : fieldName === "signInName"
//       ? "Your username or email address"
//       : "Password";

//   return (
//     <div className="w-full flex flex-col relative">
//       <label
//         htmlFor={fieldName}
//         className="text-[#6C7275] text-base font-normal"
//       >
//         {labelText}
//       </label>
//       <div className="w-full relative bg-green-200 rounded-lg">
//         <input
//           {...register(fieldName)}
//           type="text"
//           className="w-full border-b border-b-[#E8ECEF] outline-none py-1 px-2 text-sm "
//         />
//         {fieldName === "password" && (
//           <div className="absolute top-1/2 right-[10px] transform -translate-y-1/2 cursor-pointer">
//             <Eye />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



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








// "use client";
// import {
//   FieldErrors,
//   FieldValues,
//   Path,
//   UseFormRegister,
// } from "react-hook-form";
// import { Eye } from "../../__atoms";

// export type InputPropsType<T extends FieldValues> = {
//   register: UseFormRegister<T>;
//   errors: FieldErrors<T>;
//   fieldName: Path<T>;
// };

// export default function Input<T extends FieldValues>({
//   register,
//   errors,
//   fieldName,
// }: InputPropsType<T>) {
//   const getLabelText = (fieldName: string): string => {
//     switch (fieldName) {
//       case "yourName":
//         return "Your Name";
//       case "userName":
//         return "User Name";
//       case "email":
//         return "Email";
//       case "signInName":
//         return "Your username or email address";
//       case "password":
//         return "Password";
//       case "name":
//         return "Name";
//       case "lastName":
//         return "Last Name";
//       case "phoneNumber":
//         return "Phone Number";
//       case "yourEmail":
//         return "Email";
//       default:
//         return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
//     }
//   };

//   const getInputType = (fieldName: string): string => {
//     switch (fieldName) {
//       case "email":
//       case "yourEmail":
//         return "email";
//       case "password":
//         return "password";
//       case "phoneNumber":
//         return "tel";
//       default:
//         return "text";
//     }
//   };

//   return (
//     <div className="w-full flex flex-col relative">
//       <label
//         htmlFor={fieldName}
//         className="text-[#6C7275] text-base font-normal"
//       >
//         {getLabelText(fieldName as string)}
//       </label>
//       <div className="w-full relative bg-green-200 rounded-lg">
//         <input
//           {...register(fieldName)}
//           type={getInputType(fieldName as string)}
//           className="w-full border-b border-b-[#E8ECEF] outline-none py-1 px-2 text-sm"
//         />
//         {fieldName === "password" && (
//           <div className="absolute top-1/2 right-[10px] transform -translate-y-1/2 cursor-pointer">
//             <Eye />
//           </div>
//         )}
//       </div>
//       {errors[fieldName] && (
//         <span className="text-red-500 text-sm mt-1">
//           {errors[fieldName]?.message as string}
//         </span>
//       )}
//     </div>
//   );
// }