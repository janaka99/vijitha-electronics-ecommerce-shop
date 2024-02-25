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
    <div className="bg-white border border-gray-300 rounded-lg  my-1 shadow-md">
      <div
        className={`flex border-l border-r text-sm h-[50px] relative bg-gray-100  ${
          expand === false && "border-b"
        }`}
      >
        <div className="w-[25%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
          {order.orderDetails?.customer.email}
        </div>
        <div className="w-[10%] flex items-center pl-2 py-2 border-r border-gray-300 text-gray-600">
          {order.orderDetails?.customer.createdAt.slice(0, 10)}
        </div>

        <div className="w-[20%] flex items-center pl-2 py-2 border-r border-gray-300 text-gray-800">
          {order.orderId}
        </div>
        <div className="w-[35%]  flex items-center pl-2 py-2 border-r border-gray-300 text-gray-800">
          {order.paymentAddress}
        </div>
        <div className="w-[10%] flex justify-center items-center hover:bg-gray-200">
          <button
            onClick={() => setExpand((prev) => !prev)}
            className="cursor-pointer text-blue-500 hover:text-blue-600"
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
        <div className="w-full p-4 border flex flex-col justify-between text-sm gap-2">
          <div className="flex py-2 justify-start gap-4">
            <div className="flex items-center justify-start gap-2 text-gray-800">
              Status:{" "}
              <span className="font-bold">{order.orderDetails?.status}</span>
            </div>
            <div className="flex items-center py-1 gap-2 text-gray-800">
              Total:{" "}
              <span className="font-bold">
                {calTotal(order.orderDetails?.orderItems)} ETH
              </span>
            </div>
            <div className="flex items-center justify-start gap-2 text-gray-800">
              Paid:{" "}
              <span className="font-bold text-green-500">
                {order.orderDetails?.isPaid ? "Paid" : "Not Paid"}
              </span>
            </div>
            {!order.orderDetails?.isPaid &&
              (isReqProcessing ? (
                <button
                  disabled={true}
                  className="w-[111px] h-10 bg-blue-600 text-white rounded-lg cursor-pointer flex justify-center items-center"
                >
                  <span className="animate-spin">
                    <AiOutlineLoading size={20} />
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => markAsPaid(order.orderDetails?._id)}
                  className="w-[111px] h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer"
                >
                  Mark As Paid
                </button>
              ))}
          </div>
          <div className="flex justify-between text-sm gap-2">
            <div className="flex flex-col gap-4   pr-4">
              {order.orderDetails?.orderItems.map((item, i) => (
                <div className="flex gap-4 items-center">
                  <div className="w-[50px] h-[50px] flex justify-center rounded overflow-hidden bg-gray-200">
                    <img
                      className="w-full h-full object-cover"
                      src={item.product_img}
                      alt={item.name}
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <span className="text-sm font-semibold text-gray-800">
                      {item.name}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {item.quantity} x {item.boughtPrice_unit_eth} ETH
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-gray-800 font-semibold text-lg">
                Status Details
              </div>
              <div className="flex gap-2 text-gray-800">
                <span className="w-[90px] text-gray-600">Confirmed:</span>
                <span className="font-bold">
                  {order.orderDetails?.confirmedBy.user ||
                  order.orderDetails?.confirmedBy.isConfirmed
                    ? functionGetDate(order.orderDetails?.confirmedBy.datetime)
                    : "Not Confirmed Yet"}
                </span>
              </div>
              <div className="flex gap-2 text-gray-800">
                <span className="w-[90px] text-gray-600">Processed:</span>
                <span className="font-bold">
                  {order.orderDetails?.processingBy.user ||
                  order.orderDetails?.processingBy.isProcessing
                    ? functionGetDate(order.orderDetails?.processingBy.datetime)
                    : "Not Processed Yet"}
                </span>
              </div>
              <div className="flex gap-2 text-gray-800">
                <span className="w-[90px] text-gray-600">Dispatched:</span>
                <span className="font-bold">
                  {order.orderDetails?.dispatchedBy.user ||
                  order.orderDetails?.dispatchedBy.isDispatched
                    ? functionGetDate(order.orderDetails?.dispatchedBy.datetime)
                    : "Not Dispatched Yet"}
                </span>
              </div>
              <div className="flex gap-2 text-gray-800">
                <span className="w-[90px] text-gray-600">Canceled:</span>
                <span className="font-bold">
                  {order.orderDetails?.canceledBy.user ||
                  order.orderDetails?.canceledBy.isCanceled
                    ? functionGetDate(order.orderDetails?.canceledBy.datetime)
                    : "Order is not canceled"}
                </span>
              </div>
            </div>
            <div className="rounded-lg px-4">
              <div className="text-gray-800 font-semibold text-lg mb-4">
                Shipping Address
              </div>
              <div className="text-gray-800 font-semibold text-base">
                {order.orderDetails?.shippingDetails.name}
              </div>
              <div className="text-gray-600">
                {order.orderDetails?.shippingDetails.address1},{" "}
                {order.orderDetails?.shippingDetails.address2}
              </div>
              <div className="text-gray-600">
                {order.orderDetails?.shippingDetails.city},{" "}
                {order.orderDetails?.shippingDetails.state}
              </div>
              <div className="text-gray-600">
                {order.orderDetails?.shippingDetails.country.label},{" "}
                {order.orderDetails?.shippingDetails.postalCode}
              </div>
              <div className="text-gray-800">
                {order.orderDetails?.shippingDetails.contact}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthOrderItem;
