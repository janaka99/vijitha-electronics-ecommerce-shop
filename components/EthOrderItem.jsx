"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import SpinLoader from "./SpinLoader";
import {
  AiOutlineDownCircle,
  AiOutlineLoading,
  AiOutlineUpCircle,
} from "react-icons/ai";
import toast from "react-hot-toast";

const EthOrderItem = ({ order, getData }) => {
  const [expand, setExpand] = useState(false);
  const [isReqProcessing, setIsReqProcessing] = useState(false);

  const functionGetDate = (date, name) => {
    let newDate = date.slice(0, 10);

    return `${newDate} - ${name}`;
  };

  const calTotal = (items) => {
    if (items.length <= 0) {
      return 0;
    }
    let total = 0;

    items.map((item) => {
      let itemTotal = item.boughtPrice_unit_eth * item.quantity;
      total = total + itemTotal;
    });

    return total;
  };

  const markAsPaid = async (id) => {
    setIsReqProcessing(true);
    if (id === "") {
      toast.error("Error while submitting request");
    }
    try {
      const res = await fetch("/api/order/admin/eth/confirm-eth-pay", {
        method: "POST",
        body: JSON.stringify({ orderId: id }),
      });
      if (res.ok) {
        toast.success("Successfully updated");
        getData();
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
    setIsReqProcessing(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex border-l border-r text-sm h-[50px] relative ${
          expand === false && "border-b"
        }`}
      >
        <div className="w-[25%] flex items-center pl-1 justify-start py-1 border-r border-r-gray-200">
          {order.orderDetails.customer.email}
        </div>
        <div className="w-[10%] flex items-center pl-1 justify-start py-1 border-r border-r-gray-200">
          {order.orderDetails.customer.createdAt.slice(0, 10)}
        </div>

        <div className="w-[20%] flex items-center pl-1 py-1 border-r border-r-gray-200 justify-center gap-2">
          {order.orderId}
        </div>
        <div className="w-[35%] flex items-center pl-1 py-1 border-r border-r-gray-200 justify-center gap-2">
          {order.paymentAddress}
        </div>
        <div className="w-[5%] flex justify-center items-center hover:bg-gray-100">
          <button
            onClick={() => setExpand((prev) => !prev)}
            className="cursor-pointer"
          >
            {expand ? (
              <AiOutlineUpCircle size={25} />
            ) : (
              <AiOutlineDownCircle size={25} />
            )}
          </button>
        </div>
      </div>
      {expand && (
        <div className=" top-full left-0 w-full py-3 px-2 flex gap-2 border border-gray-200 justify-between">
          <div className=" flex flex-col gap-4 border-">
            {order.orderDetails.orderItems.map((item, i) => (
              <div className="w-full flex gap-6">
                <div className="w-[50px] h-[50px] flex justify-center rounded overflow-hidden bg-gray-200 items-center">
                  <img
                    className="w-full h-full p-2 object-contain"
                    src={item.product_img}
                    alt=""
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} x {item.boughtPrice_unit_eth} ETH
                  </span>
                  <span></span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 border border-gray-200 p-2 text-sm">
              <div className="flex items-center justify-start gap-2 ">
                Status:{" "}
                <span className="font-bold">{order.orderDetails.status} </span>
              </div>
              <div className="flex items-center  py-1  gap-2">
                Total:{" "}
                <span className="font-bold gap-2">
                  {calTotal(order.orderDetails.orderItems)}
                  {" ETH"}
                </span>
              </div>
              <div className="flex items-center justify-start gap-2 ">
                Paid:{" "}
                <span className="font-bold">
                  {order.orderDetails.isPaid ? "Paid" : "Not Paid"}{" "}
                </span>
              </div>
              {!order.orderDetails.isPaid &&
                (isReqProcessing ? (
                  <button
                    disabled={true}
                    className="p-2 rounded bg-blue-400 text-center text-white w-[111px] flex justify-center items-center"
                  >
                    <span className="animate-spin">
                      <AiOutlineLoading size={20} />
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={() => markAsPaid(order.orderDetails._id)}
                    className="p-2 rounded bg-blue-500 text-center text-white w-[111px]"
                  >
                    Mark As Paid
                  </button>
                ))}
            </div>
            <div className="flex flex-col gap-2 border border-gray-200 p-2">
              <div className="flex gap-2 text-sm">
                <span className="w-[105px]">Confirmed By </span>
                <span className="font-bold ">
                  {order.orderDetails.confirmedBy.user ||
                  order.orderDetails.confirmedBy.isConfirmed
                    ? functionGetDate(
                        order.orderDetails.confirmedBy.datetime,
                        order.orderDetails.confirmedBy.user?.name
                      )
                    : "Not Confiremd Yet"}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="w-[105px]">Processed By </span>
                <span className="font-bold ">
                  {order.orderDetails.processingBy.user ||
                  order.orderDetails.processingBy.isProcessing
                    ? functionGetDate(
                        order.orderDetails.processingBy.datetime,
                        order.orderDetails.processingBy.user?.name
                      )
                    : "Not Processes Yet"}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="w-[105px]">Distpacthed By </span>
                <span className="font-bold ">
                  {order.orderDetails.dispatchedBy.user ||
                  order.orderDetails.dispatchedBy.isDispatched
                    ? functionGetDate(
                        order.orderDetails.dispatchedBy.datetime,
                        order.orderDetails.dispatchedBy.user?.name
                      )
                    : "Not Dispatched Yet"}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="w-[105px]">Canceled By </span>
                <span className="font-bold ">
                  {order.orderDetails.canceledBy.user ||
                  order.orderDetails.canceledBy.isCanceled
                    ? functionGetDate(
                        order.orderDetails.canceledBy.datetime,
                        order.orderDetails.canceledBy.user?.name
                      )
                    : "Order is not canceled"}
                </span>
              </div>
            </div>
            <div className="border border-gray-200 p-2">
              <div className="flex flex-col flex-grow">
                <div className="text-sm">
                  {order.orderDetails.shippingDetails.name}
                </div>
                <div className="text-sm">
                  {order.orderDetails.shippingDetails.address1} {","}{" "}
                  {order.orderDetails.shippingDetails.address2}
                </div>
                <div className="text-sm">
                  {order.orderDetails.shippingDetails.city} {","}{" "}
                  {order.orderDetails.shippingDetails.state}
                </div>
                <div className="text-sm">
                  {order.orderDetails.shippingDetails.country.label} {","}{" "}
                  {order.orderDetails.shippingDetails.postalCode}
                </div>
                <div className="text-sm">
                  {order.orderDetails.shippingDetails.contact}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthOrderItem;
