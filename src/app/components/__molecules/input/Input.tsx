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
  isCheckoutPage?: boolean;
};

export default function Input<T extends FieldValues>({
  register,
  errors,
  fieldName,
  isCheckoutPage,
}: InputPropsType<T>) {
  const getLabelText = (fieldName: string): string => {
    const normalizedField = fieldName.toLowerCase();

    switch (normalizedField) {
      case "yourname":
        return "Your Name";
      case "username":
        return "User Name";
      case "email":
        return "Email";
      case "signinname":
        return "Your username or email address";
      case "password":
        return "Password";
      case "name":
        return "Name";
      case "lastname":
        return "Last Name";
      case "phonenumber":
        return "Phone Number";
      case "youremail":
        return "Email";
      case "streetaddress":
        return "Street Address";
      case "country":
        return "Country";
      case "towncity":
        return "Town/City";
      case "state":
        return "State";
      case "zipcode":
        return "ZIP Code";
      case "expirationdate":
        return " Expiration date";
      case "CVCCode":
        return "CVC code";
      default:
        return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    }
  };

  const getInputType = (fieldName: string): string => {
    switch (fieldName) {
      case "email":
      case "yourEmail":
        return "email";
      case "password":
        return "password";
      case "phoneNumber":
        return "tel";
      default:
        return "text";
    }
  };

  return (
    <div
      className={`${isCheckoutPage && "gap-3"} w-full flex flex-col relative`}
    >
      <label
        htmlFor={fieldName}
        className={`${
          isCheckoutPage
            ? "text-xs font-bold leading-[12px] uppercase "
            : "text-base font-normal"
        } text-[#6C7275]  `}
      >
        {getLabelText(fieldName as string)}
      </label>
      <div className="w-full relative  rounded-lg">
        <input
          {...register(fieldName)}
          type={getInputType(fieldName as string)}
          className={`${
            isCheckoutPage
              ? "px-4 py-[9px] border border-[#CBCBCB]"
              : "border-b border-b-[#E8ECEF] outline-none py-1 px-2 text-sm"
          }   w-full `}
        />
        {fieldName === "password" && (
          <div className="absolute top-1/2 right-[10px] transform -translate-y-1/2 cursor-pointer">
            <Eye />
          </div>
        )}
      </div>
      {errors[fieldName] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[fieldName]?.message as string}
        </span>
      )}
    </div>
  );
}
