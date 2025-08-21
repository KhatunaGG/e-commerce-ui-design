// "use client";
// import { useShopStore } from "@/app/store/shop-page.store";
// import { Camera, ChevronLeft } from "../../__atoms";
// import { accountLinks } from "@/app/commons/data";
// import Link from "next/link";
// import { useSignInStore } from "@/app/store/sign-in.store";
// import { usePathname } from "next/navigation";
// import { useAccountStore } from "@/app/store/account.store";
// import { useEffect, useRef } from "react";
// import Image from "next/image";

// function AccountSidebar() {
//   const { normalizeFirstChar } = useShopStore();
//   const { logout, currentUser, accessToken } = useSignInStore();
//   const pathname = usePathname();
//   const { handleFileChange, avatar } = useAccountStore();
//   const inputRef = useRef<HTMLInputElement>(null);
//   const getUsersAvatar = useAccountStore((state) => state.getUsersAvatar);

//   const getLinkPath = (item: string) =>
//     `/account-page${item === "account" ? "" : `/${item}`}`;

//   // const fetchAvatar = async (
//   //   token: string,
//   //   getUsersAvatarFn: (token: string) => Promise<void>
//   // ) => {
//   //   await getUsersAvatarFn(token);
//   // };
//   // useEffect(() => {
//   //   if (!accessToken) return;
//   //   fetchAvatar(accessToken, getUsersAvatar);
//   // }, [accessToken, getUsersAvatar]);

//     useEffect(() => {
//     if (!accessToken) return;
//     const fetchAvatar = async () => {
//       try {
//         await getUsersAvatar(accessToken);
//       } catch (e) {
//         console.error("Failed to fetch avatar", e);
//       }
//     };
//     fetchAvatar();
//   }, [accessToken]);

// // , pathname, getUsersAvatar

//   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     await handleFileChange(file);
//     if (inputRef.current) {
//       inputRef.current.value = "";
//     }
//   };

//   return (
//     <div className="w-full  flex flex-col  items-center lg:gap-[79px] gap-4">
//       <div className="w-full flex lg:hidden items-center justify-start gap-1 ">
//         <div className="w-auto h-auto flex items-center justify-center pt-[6px]">
//           <ChevronLeft />
//         </div>
//         <p>Back</p>
//       </div>

//       <div className="w-full flex flex-col md:flex-row lg:flex-col gap-10   py-10 px-4 bg-[#F3F5F7] rounded-lg">
//         <div className="w-full flex flex-col items-center justify-center gap-[6px]">
//           <div className="w-20 h-20 rounded-full flex items-center justify-center border border-black/40 relative">
//             {avatar ? (
//               <Image
//                 // src={avatar}
//                 src={avatar}
//                 alt="User Avatar"
//                 fill
//                 className="object-cover z-10 absolute inset-0 w-20 h-20 rounded-full"
//               />
//             ) : (
//               <span className="text-sm text-gray-500 w-full h-full flex items-center justify-center">
//                 Avatar
//               </span>
//             )}
//             <div className="absolute bottom-0 right-0 cursor-pointer  w-[30px] h-[31px]">
//               <input
//                 ref={inputRef}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="opacity-0 w-[30px] h-[31px] z-30 absolute inset-0"
//               />
//               <div className="w-[30px] h-[31px] absolute inset-0 z-20">
//                 <Camera />
//               </div>
//             </div>
//           </div>

//           <h2 className="font-semibold text-[20px] text-black leading-[32px]">
//             {currentUser?.yourName
//               ? normalizeFirstChar(currentUser?.yourName)
//               : ""}{" "}
//             {currentUser?.lastName
//               ? normalizeFirstChar(currentUser?.lastName)
//               : ""}
//           </h2>
//         </div>

//         <div className="w-full flex flex-col items-start gap-4">
//           {accountLinks.map((item, i) => {
//             const label = normalizeFirstChar(item);
//             const isLogout = item === "logout";
//             const linkPath = getLinkPath(item);
//             const isActive = pathname === linkPath;

//             const baseStyles =
//               "w-full py-2 text-base leading-[26px] cursor-pointer transition";
//             const activeStyles = "font-bold border-b border-black text-black";
//             const inactiveStyles =
//               "font-semibold text-[#6C7275] hover:text-black";

//             if (isLogout) {
//               return (
//                 <button
//                   key={i}
//                   onClick={logout}
//                   className={`${baseStyles} ${inactiveStyles} text-left`}
//                 >
//                   {label}
//                 </button>
//               );
//             }

//             return (
//               <Link
//                 key={i}
//                 href={linkPath}
//                 className={`${baseStyles} ${
//                   isActive ? activeStyles : inactiveStyles
//                 }`}
//               >
//                 {label}
//               </Link>
//             );
//           })}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default AccountSidebar;

"use client";
import { useShopStore } from "@/app/store/shop-page.store";
import { Camera, ChevronLeft } from "../../__atoms";
import { accountLinks } from "@/app/commons/data";
import Link from "next/link";
import { useSignInStore } from "@/app/store/sign-in.store";
import { usePathname } from "next/navigation";
import { useAccountStore } from "@/app/store/account.store";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { RouterButton } from "../../__molecules";

function AccountSidebar() {
  const { normalizeFirstChar } = useShopStore();
  const { logout, currentUser, accessToken } = useSignInStore();
  const pathname = usePathname();
  const { handleFileChange, avatar } = useAccountStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const getUsersAvatar = useAccountStore((state) => state.getUsersAvatar);

  const getLinkPath = (item: string) =>
    `/account-page${item === "account" ? "" : `/${item}`}`;

  useEffect(() => {
    if (!accessToken) return;
    const fetchAvatar = async () => {
      try {
        await getUsersAvatar(accessToken);
      } catch (e) {
        console.error("Failed to fetch avatar", e);
      }
    };
    fetchAvatar();
  }, [accessToken]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await handleFileChange(file);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full  flex flex-col  items-center lg:gap-[79px] gap-4">
      <div className="w-full flex lg:hidden items-center justify-start gap-1 ">
        <div className="w-auto h-auto flex items-center justify-center pt-[6px]">
          <ChevronLeft />
        </div>
        <p>Back</p>
      </div>

      <div className="w-full flex flex-col md:flex-row lg:flex-col gap-10   py-10 px-4 bg-[#F3F5F7] rounded-lg">
        <div className="w-full flex flex-col items-center justify-center gap-[6px]">
          <div className="w-20 h-20 rounded-full flex items-center justify-center border border-black/40 relative">
            {avatar ? (
              <Image
                src={avatar}
                alt="User Avatar"
                fill
                className="object-cover z-10 absolute inset-0 w-20 h-20 rounded-full"
              />
            ) : (
              <span className="text-sm text-gray-500 w-full h-full flex items-center justify-center">
                {/* Avatar */}
                {normalizeFirstChar(currentUser?.yourName || "").charAt(0)}{" "}
                {normalizeFirstChar(currentUser?.lastName || "").charAt(0)}
              </span>
            )}
            <div className="absolute bottom-0 right-0 cursor-pointer  w-[30px] h-[31px]">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="opacity-0 w-[30px] h-[31px] z-30 absolute inset-0"
              />
              <div className="w-[30px] h-[31px] absolute inset-0 z-20">
                <Camera />
              </div>
            </div>
          </div>

          <h2 className="font-semibold text-[20px] text-black leading-[32px]">
            {currentUser?.yourName
              ? normalizeFirstChar(currentUser?.yourName)
              : ""}{" "}
            {currentUser?.lastName
              ? normalizeFirstChar(currentUser?.lastName)
              : ""}
          </h2>
        </div>

        <div className="MD-SCREENS hidden w-full md:flex flex-col items-start gap-4">
          {accountLinks.map((item, i) => {
            const label = normalizeFirstChar(item);
            const isLogout = item === "logout";
            const linkPath = getLinkPath(item);
            const isActive = pathname === linkPath;

            const baseStyles =
              "w-full py-2 text-base leading-[26px] cursor-pointer transition";
            const activeStyles = "font-bold border-b border-black text-black";
            const inactiveStyles =
              "font-semibold text-[#6C7275] hover:text-black";

            if (isLogout) {
              return (
                <button
                  key={i}
                  onClick={logout}
                  className={`${baseStyles} ${inactiveStyles} text-left`}
                >
                  {label}
                </button>
              );
            }

            return (
              <Link
                key={i}
                href={linkPath}
                className={`${baseStyles} ${
                  isActive ? activeStyles : inactiveStyles
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex md:hidden w-full bg-white border border-[#6C7275] rounded-lg">
          <RouterButton accountLinks={accountLinks} />
        </div>
      </div>
    </div>
  );
}

export default AccountSidebar;
