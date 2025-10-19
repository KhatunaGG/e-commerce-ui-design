"use client";
import { useSignInStore } from "@/app/store/sign-in.store";
import { Edit } from "../../__atoms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ShippingAddress from "../shippingAddress/ShippingAddress";
import { usePathname } from "next/navigation";
import { useAddressStore } from "@/app/store/address.store";
import { useShopStore } from "@/app/store/shop-page.store";
import { useEffect } from "react";
import { parsePhoneNumber } from "react-phone-number-input";
import { myAccountShippingSchema } from "@/app/schema/shema";
import {
  AddressDataType,
  MyAccountShippingFormType,
} from "@/app/interfaces/interface";

const Addresses = () => {
  const { accessToken, initialize } = useSignInStore();
  const { normalizeFirstChar } = useShopStore();
  const { currentUser } = useSignInStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const {
    setEditAddressId,
    editAddressId,
    addressType,
    setAddressType,
    getAllShippingAddresses,
    addressData,
    clearAddressData,
    submitEditAddress,
  } = useAddressStore();
  const path = usePathname();
  const isMyAccountPage = path.includes("/account-page");

  useEffect(() => {
    clearAddressData();
    getAllShippingAddresses();
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    reset,
    control,
  } = useForm<MyAccountShippingFormType>({
    resolver: zodResolver(myAccountShippingSchema),
    defaultValues: {
      _id: "",
      type: "",
      streetAddress: "",
      townCity: "",
      country: "",
      state: "",
      zipCode: "",
      differentBilling: false,
    },
  });

  const handleEdit = (type: string, id: string) => {
    if (editAddressId === id) {
      setEditAddressId(null);
      setAddressType(null);
    } else {
      setEditAddressId(id);
      setAddressType(type);

      const address = addressData.find((a) => a._id === id);
      if (address) {
        setValue("streetAddress", address.streetAddress);
        setValue("townCity", address.townCity);
        setValue("country", address.country);
        setValue("state", address.state);
        setValue("zipCode", address.zipCode);
        setValue("phoneNumber", address.phoneNumber);
        setValue("differentBilling", address.differentBilling ?? false);
        setValue("_id", address._id);
        setValue("type", address.type);
      }
    }
  };

  const onSubmit = async (formData: MyAccountShippingFormType) => {
    console.log(formData, "formData form ");
    if (!formData._id) {
      return;
    }
    const formattedData: AddressDataType = {
      ...formData,
      _id: formData._id || "",
      type: formData.type || "",
    };

    const success = await submitEditAddress(formattedData);
    if (success) {
      reset();
    }
  };

  if (!accessToken) return null;

  return (
    <section className="w-full  h-full   lg:px-[72px] pb-10  lg:pr-[72px] flex flex-col gap-[19px]">
      <h2 className="font-semibold text-[20px] leading-[32px] text-black">
        Address
      </h2>

      <div className="w-full   grid grid-cols-1 md:grid-cols-2 gap-[23px] md:gap-4 lg:gap-10 ">
        {Array.isArray(addressData) &&
          addressData.length > 0 &&
          addressData.map((item, i) => {
            const formatted = item.phoneNumber
              ? parsePhoneNumber(item.phoneNumber)?.formatInternational()
              : item.phoneNumber;
            return (
              <div
                key={i}
                className=" flex flex-col p-4 gap-2 border border-[#6C7275] rounded-lg"
              >
                <div className="w-full flex items-center justify-between">
                  <h3 className="font-semibold text-base leading-[26px] text-black">
                    {normalizeFirstChar(item.type)} Address
                  </h3>
                  <button
                    onClick={() => handleEdit(item.type, item._id ?? "")}
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
                    {formatted}
                  </p>
                  <p className="font-normal text-sm leading-[22px] text-black  break-words">
                    {item.streetAddress}, {item.townCity}, {item.country},{" "}
                    {item.state}, {item.zipCode}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      {editAddressId && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-8"
        >
          <ShippingAddress
            register={register}
            errors={errors}
            setValue={setValue}
            isMyAccountPage={isMyAccountPage}
            addressType={addressType}
            control={control}
          />

          <div className="w-full flex items-start">
            <button
              type="submit"
              className="text-base py-3 px-10 font-medium leading-[28px] tracking-[-0.4px] text-white bg-[#141718] rounded-lg hover:bg-gray-800 transition-colors duration-300 ease-in-out"
            >
              Save changes
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default Addresses;
