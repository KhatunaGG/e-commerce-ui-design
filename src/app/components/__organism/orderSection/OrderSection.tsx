"use client";
import { useAddressStore } from "@/app/store/address.store";
import { useSignInStore } from "@/app/store/sign-in.store";
import React, { useEffect } from "react";
import { AnimateSpin, Pagination } from "../../__molecules";
import { useCheckoutStore } from "@/app/store/checkout.store";

const OrderSection = () => {
  const { initialize, accessToken } = useSignInStore();
  const {
    getAllOrders,
    isLoading,
    getOrderStatus,
    purchasesDataByPage,
    page,
    ordersTotalCount,
  } = useAddressStore();
  const { formatDate } = useCheckoutStore();
  const dataForCurrentPage = purchasesDataByPage[page];

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading && accessToken) {
      getAllOrders();
    }
  }, [accessToken]);

  if (isLoading) {
    return <AnimateSpin />;
  }

  if (!accessToken) return null;

  return (
    <section className="w-full h-full lg:px-[72px] pb-10 flex flex-col lg:gap-10 ">
      <h2 className="font-semibold text-[20px] leading-[32px] text-black">
        Orders History
      </h2>
      <div className="ORDERS ">
        <div className="w-full flex md:flex-col">
          <div className="TITLES hidden w-1/2 md:w-full md:pb-2 md:flex flex-col gap-4 md:items-center md:flex-row md:justify-between md:gap-0">
            {["Number ID", "Dates", "Status", "Price"].map((item, i) => (
              <p
                key={i}
                className="md:flex-1 font-normal text-sm leading-[22px] text-[#6C7275]"
              >
                {item}
              </p>
            ))}
          </div>
          <div className="w-full flex-col ">
            {dataForCurrentPage &&
            Array.isArray(dataForCurrentPage) &&
            ordersTotalCount > 0 ? (
              dataForCurrentPage.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="ORDER flex w-full   py-4 md:py-0 border-b border-b-[#E8ECEF]  "
                  >
                    <div className="TITLES w-1/2 md:hidden md:w-full  flex flex-col gap-4 md:items-center md:flex-row md:justify-between md:gap-0">
                      {["Number ID", "Dates", "Status", "Price"].map(
                        (item, i) => (
                          <p
                            key={i}
                            className="md:flex-1 font-normal text-sm leading-[22px] text-[#6C7275]"
                          >
                            {item}
                          </p>
                        )
                      )}
                    </div>
                    <div className="w-1/2 md:w-full md:py-6 flex flex-col gap-4 md:items-center md:flex-row md:justify-between md:gap-0">
                      <p className=" md:flex-1 font-normal text-sm leading-[22px] text-[#141718]">
                        {item.orderCode}
                      </p>
                      <p className=" md:flex-1 font-normal text-sm leading-[22px] text-[#141718]">
                        {formatDate(item.createdAt)}
                      </p>
                      <p className="  md:flex-1 font-normal text-sm leading-[22px] text-[#141718]">
                        {getOrderStatus(item.createdAt)}
                      </p>
                      <p className=" md:flex-1 font-normal text-sm leading-[22px] text-[#141718]">
                        ${item.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="font-normal text-sm leading-[22px] text-red-600">
                No purchases found.
              </div>
            )}
          </div>
        </div>
      </div>
      <Pagination />
    </section>
  );
};

export default OrderSection;
