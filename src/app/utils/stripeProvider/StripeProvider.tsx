// "use client";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { ReactNode } from "react";

// if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
//   throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
// }

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// interface StripeProviderProps {
//   children: ReactNode;
//   clientSecret?: string;
// }

// const StripeProvider = ({ children, clientSecret }: StripeProviderProps) => {
//   const options = clientSecret ? {
//     clientSecret,
//     appearance: {
//       theme: "stripe" as const,
//       variables: {
//         colorPrimary: "#141718",
//         colorBackground: "#ffffff",
//         colorText: "#141718",
//         colorDanger: "#df1b41",
//         fontFamily: "system-ui, sans-serif",
//         spacingUnit: "6px",
//         borderRadius: "5px",
//       },
//     },
//   } : undefined;

//   return (
//     <Elements
//       stripe={stripePromise}
//       options={options}
//     >
//       {children}
//     </Elements>
//   );
// };



// export default StripeProvider;



