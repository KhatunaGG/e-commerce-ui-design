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
//   isCheckoutPage?: boolean;
//   isMyAccountPage?: boolean;
// };

// export default function Input<T extends FieldValues>({
//   register,
//   errors,
//   fieldName,
//   isCheckoutPage,
//   isMyAccountPage,
// }: InputPropsType<T>) {
//   const getLabelText = (fieldName: string): string => {
//     const normalizedField = fieldName.toLowerCase();

//     switch (normalizedField) {
//       case "yourname":
//         return "Your Name";
//       case "username":
//         return "User Name";
//       case "email":
//         return "Email";
//       case "signinname":
//         return "Your username or email address";
//       case "password":
//         return "Password";
//       case "name":
//         return "Name";
//       case "lastname":
//         return "Last Name";
//       case "phonenumber":
//         return "Phone Number";
//       case "youremail":
//         return "Email";
//       case "streetaddress":
//         return "Street Address";
//       case "country":
//         return "Country";
//       case "towncity":
//         return "Town/City";
//       case "state":
//         return "State";
//       case "zipcode":
//         return "ZIP Code";
//       case "expirationdate":
//         return " Expiration date";
//       case "CVCCode":
//         return "CVC code";
//       case "accountname":
//         return "Name";
//       case "accountlastname":
//         return "Last Name";
//       case "displayname":
//         return "Display Name";
//       case "accountemail":
//         return "Email";
//       case "oldpassword":
//         return "Old Password";
//       case "newpassword":
//         return "new password";
//       case "confirmpassword":
//         return "repeat new password";

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
//     <div
//       className={`${
//         (isCheckoutPage || isMyAccountPage) && "gap-3"
//       } w-full flex flex-col relative`}
//     >
//       <label
//         htmlFor={fieldName}
//         className={`${
//           isCheckoutPage || isMyAccountPage
//             ? "text-xs font-bold leading-[12px] uppercase "
//             : "text-base font-normal"
//         } text-[#6C7275]  `}
//       >
//         {getLabelText(fieldName as string)}
//       </label>
//       <div className="w-full relative  rounded-lg">
//         <input
//           {...register(fieldName)}
//           type={getInputType(fieldName as string)}
//           className={`${
//             isCheckoutPage || isMyAccountPage
//               ? "px-4 py-[9px] border border-[#CBCBCB]"
//               : "border-b border-b-[#E8ECEF]  py-1 px-2 text-sm"
//           }   w-full outline-none`}
//         />
//         {fieldName === "password" && (
//           <div className="absolute top-1/2 right-[10px] transform -translate-y-1/2 cursor-pointer">
//             <Eye />
//           </div>
//         )}
//       </div>
//       {errors[fieldName] && (
//         <span className="absolute bottom-[-18px] left-0 text-red-500 text-sm mt-1">
//           {errors[fieldName]?.message as string}
//         </span>
//       )}
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
  isMyAccountPage?: boolean;
  page?: string;
};

export default function Input<T extends FieldValues>({
  register,
  errors,
  fieldName,
  isCheckoutPage,
  isMyAccountPage,
  page,
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
      // case "youremail":
      //   return "Email";
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
      case "accountname":
        return "Name";
      case "accountlastname":
        return "Last Name";
      case "displayname":
        return "Display Name";
      case "accountemail":
        return "Email";
      case "oldpassword":
        return "Old Password";
      case "newpassword":
        return "new password";
      case "confirmpassword":
        return "repeat new password";

      case "youremail":
        if (page === "contact") {
          return "EMAIL ADDRESS";
        } else {
          return "Email"
        }

      case "fullname":
        return "FULL NAME";

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
      className={`${
        (isCheckoutPage || isMyAccountPage  ) && "gap-3"
      } w-full flex flex-col relative`}
    >
      <label
        htmlFor={fieldName}
        className={`${
          isCheckoutPage || isMyAccountPage
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
            isCheckoutPage || isMyAccountPage || page === "contact"
              ? "px-4 py-[9px] border border-[#CBCBCB]"
              : "border-b border-b-[#E8ECEF]  py-1 px-2 text-sm"
          }  ${page === "contact" && "rounded-lg"}  w-full outline-none`}
        />
        {fieldName === "password" && (
          <div className="absolute top-1/2 right-[10px] transform -translate-y-1/2 cursor-pointer">
            <Eye />
          </div>
        )}
      </div>
      {errors[fieldName] && (
        <span className="absolute bottom-[-18px] left-0 text-red-500 text-sm mt-1">
          {errors[fieldName]?.message as string}
        </span>
      )}
    </div>
  );
}

