import z from "zod";

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

export const myAccountShippingSchema = z.object({
  _id: z.string().optional(),
  type: z.string().optional(),
  streetAddress: z.string().min(1, "Street address is required"),
  townCity: z.string().min(1, "Town/City is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  differentBilling: z.boolean().optional(),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+[\d\s]+$/, "Enter a valid international phone number"),
});

export const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last Name is required").max(50),
  phoneNumber: z
    .string({
      required_error: "Phone number is required",
    })
    .min(1, "Phone number is required")
    .refine((val) => {
      if (!val || val.trim() === "") {
        return false;
      }
      const digitsOnly = val.replace(/[^\d]/g, "");
      return digitsOnly.length >= 7;
    }, "Please enter a complete phone number"),
  yourEmail: z
    .string()
    .min(1, "Email is required")
    .max(50)
    .email("Please enter a valid email address"),
  streetAddress: z.string().min(1, "Street address is required"),
  townCity: z.string().min(1, "Town/City is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  expirationDate: z.string().min(1, "Expiration Date is required"),
  CVC: z.string().min(1, "CVC code is required"),
  differentBilling: z.boolean().optional(),
  paymentMethod: z.enum(["Credit Card", "Paypal"], {
    required_error: "Please select a payment method",
  }),
});

export const mailSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  yourEmail: z
    .string()
    .min(1, "Email is required")
    .max(50, "Email is too long")
    .nonempty("Email is required"),
  message: z.string().min(1, "Message is required"),
});

export const blogSchema = z.object({
  title: z.string().optional(),
  filepath: z.string().optional(),
  context: z.string().optional(),
  articleTitle: z.string().optional(),
});

export const questionSchema = z.object({
  text: z.string().min(1, "Text is required"),
  productId: z.string().min(1, "Product ID is required"),
  status: z.enum(["question", "answer"]),
  questionId: z.string().optional(),
  ownerId: z.string().optional(),
});

export const reviewSchema = z.object({
  text: z.string().min(1, "Please write a review"),
  productId: z.string().min(1, "Product ID is required"),
  status: z.enum(["review", "reply"]),
  reviewOwnerId: z.string().nullable().optional(),
  replyToId: z.string().optional(),
  replyOwnerId: z.string().optional(),
});

export const signInSchema = z.object({
  signInName: z
    .string()
    .min(1, "Username or email is required")
    .max(50, "Too long")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
        /^[a-zA-Z0-9_]{1,}$/.test(val),
      {
        message: "Enter a valid email or username",
      }
    ),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must be less then 15 characters")
    .nonempty("Password is required"),
  rememberMe: z.boolean().optional(),
});

export const signUpSchema = z.object({
  yourName: z
    .string()
    .min(1, "Your name is required")
    .max(50, "Name is too long")
    .nonempty("Your name is required"),
  userName: z
    .string()
    .min(1, "User name name is required")
    .max(50, "User name is too long")
    .nonempty("User name name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Email is too long")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(15, "Password must be less then 15 characters")
    .nonempty("Password is required"),
  isTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms",
  }),
});
