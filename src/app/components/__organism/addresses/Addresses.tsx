"use client";
import { useSignInStore } from "@/app/store/sign-in.store";
import { Edit } from "../../__atoms";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ShippingAddress from "../shippingAddress/ShippingAddress";
import { usePathname } from "next/navigation";
import { useAddressStore } from "@/app/store/address.store";
import { useShopStore } from "@/app/store/shop-page.store";

const myAccountShippingSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  townCity: z.string().min(1, "Town/City is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  differentBilling: z.boolean().optional(),
});

type MyAccountShippingFormType = z.infer<typeof myAccountShippingSchema>;

const Addresses = () => {
  const { accessToken } = useSignInStore();
  const { normalizeFirstChar } = useShopStore();
  const { currentUser } = useSignInStore();
  const { setEditAddress, editAddress, addressType, setAddressType } =
    useAddressStore();
  const path = usePathname();
  const isMyAccountPage = path.includes("/account-page");

  const {
    // handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<MyAccountShippingFormType>({
    resolver: zodResolver(myAccountShippingSchema),
    defaultValues: {
      streetAddress: "",
      townCity: "",
      country: "",
      state: "",
      zipCode: "",
      differentBilling: false,
    },
  });

  const handleEdit = (type: string) => {
    if (editAddress && addressType === type) {
      setEditAddress(false);
      setAddressType("");
    } else {
      setEditAddress(true);
      setAddressType(type);
    }
  };

  if (!accessToken) return null;

  return (
    <div className="w-full  h-full   lg:px-[72px] pb-10  lg;pr-[72px] flex flex-col gap-[19px]">
      <h2 className="font-semibold text-[20px] leading-[32px] text-black">
        Address
      </h2>

      <div className="w-full   grid grid-cols-1 md:grid-cols-2 gap-[23px] md:gap-4 lg:gap-10">
        {["billing", "Shipping"].map((item, i) => {
          return (
            <div
              key={i}
              className=" flex flex-col p-4 gap-2 border border-[#6C7275] rounded-lg"
            >
              <div className="w-full flex items-center justify-between">
                <h3 className="font-semibold text-base leading-[26px] text-black">
                  {normalizeFirstChar(item)} Address
                </h3>
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center gap-1 cursor-pointer group "
                >
                  <div>
                    <Edit />
                  </div>
                  <div className="font-semibold text-base leading-[26px] text-[#6C7275] group-hover:text-blue-800 transition-colors duration-300 ease-in-out">
                    Edit
                  </div>
                </button>
              </div>
              <div className="w-full flex flex-col gap-1">
                <p className="font-normal text-sm leading-[22px] text-black">
                  {normalizeFirstChar(currentUser?.yourName ?? "")}{" "}
                  {normalizeFirstChar(currentUser?.lastName ?? "")}
                </p>
                <p className="font-normal text-sm leading-[22px] text-black">
                  (+1) 234 567 890
                </p>
                <p className="font-normal text-sm leading-[22px] text-black  break-words">
                  345 Long Island, NewYork, United States
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {editAddress && (
        <div className="w-full flex flex-col gap-8">
          <ShippingAddress
            register={register}
            errors={errors}
            setValue={setValue}
            isMyAccountPage={isMyAccountPage}
            addressType={addressType}
          />

          <div className="w-full flex items-start">
            <button
              type="submit"
              className="text-base py-3 px-10 font-medium leading-[28px] tracking-[-0.4px] text-white bg-[#141718] rounded-lg hover:bg-gray-800 transition-colors duration-300 ease-in-out"
            >
              Save changes
            </button>
          </div>
        </div>
      )}

      {/* <AddressForm /> */}
    </div>
  );
};

export default Addresses;
