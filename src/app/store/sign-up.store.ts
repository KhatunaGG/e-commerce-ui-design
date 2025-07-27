import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { toast } from "react-toastify";
import { SignUpType } from "../components/__organism/signUpForm/SignUpForm";
import { axiosInstance } from "../libs/axiosInstance";


export interface ErrorResponse {
  message: string;
}

const handleApiError = (error: AxiosError<ErrorResponse>): string => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data.message || "An error occurred";
    toast.error(errorMessage);
    return errorMessage;
  }
  const unexpectedError = "An unexpected error occurred";
  toast.error(unexpectedError);
  return unexpectedError;
};

// export type SignUpType = {
//   yourName: string;
//   userName: string;
//   email: string;
//   password: string;
//   isTerms: boolean
// };

export interface IUseSignUpStore {
  axiosError: string;
  isLoading: boolean;
  yourName: string;
  userName: string;
  email: string;
  password: string;
  isTerms: boolean;
  setFormData: (
    yourName: string,
    userName: string,
    email: string,
    password: string,
    isTerms: boolean
  ) => void;

  // signUp: (formData: SignUpType) => void;
  signUp: (formData: SignUpType) => Promise<boolean>;
}

export const useSignUpStore = create<IUseSignUpStore>((set) => ({
  axiosError: "",
  isLoading: false,
  yourName: "",
  userName: "",
  email: "",
  password: "",
  isTerms: false,
  setFormData: (yourName, userName, email, password, isTerms) =>
    set({ yourName, userName, email, password, isTerms }),

signUp: async (formData) => {
  set({ isLoading: true, axiosError: "" });
  console.log(formData, "formData before API call");
  try {
    const res = await axiosInstance.post("/auth/sign-up", formData);
    if (res.status >= 200 && res.status <= 204) {
       window.location.href = "/sign-in";
      set({
        isLoading: false,
        yourName: "",
        userName: "",
        password: "",
        email: "",
        isTerms: false,
      });
      toast.success("Sign up successful!");
      return true;
    }
    set({ isLoading: false });
    return false;
  } catch (e) {
    const errorMessage = handleApiError(e as AxiosError<ErrorResponse>);
    set({ axiosError: errorMessage, isLoading: false });
    return false;
  }
},

}));
