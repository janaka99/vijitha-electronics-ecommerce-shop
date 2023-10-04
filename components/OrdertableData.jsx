import React, { useEffect } from "react";
import { useState } from "react";
import SpinLoader from "./SpinLoader";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";

const OrdertableData = ({ order }) => {
  const [expand, setExpand] = useState(false);

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
      let itemTotal = item.boughtPrice_unit * item.quantity;
      total = total + itemTotal;
    });

    return total;
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex border-l border-r text-sm h-[50px] relative ${
          expand === false && "border-b"
        }`}
      >
        <div className="w-[15%] flex items-center pl-1 justify-start py-1 border-r border-r-gray-200">
          {order.customer.name}
        </div>
        <div className="w-[28%] flex items-center pl-1 justify-start py-1 border-r border-r-gray-200">
          {order.customer.email}
        </div>
        <div className="w-[10%] flex items-center pl-1 justify-start py-1 border-r border-r-gray-200">
          {order.createdAt.slice(0, 9)}
        </div>
        <div className="w-[22%] flex items-center pl-1 py-1 border-r border-r-gray-200 justify-center gap-2">
          {order._id}
        </div>
        <div className="w-[10%] flex items-center pl-1 py-1 border-r border-r-gray-200 justify-center gap-2">
          {order.status}
        </div>
        <div className="w-[10%] flex items-center pl-1 py-1 border-r border-r-gray-200 justify-center gap-2">
          {calTotal(order.orderItems)}
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
            {order.orderItems.map((item, i) => (
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
                    {item.quantity} x {item.boughtPrice_unit} LKR
                  </span>
                  <span></span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2 border border-gray-200 p-2">
              <div className="flex gap-2 text-sm">
                <span className="w-[105px]">Confirmed By </span>
                <span className="font-bold ">
                  {order.confirmedBy.user || order.confirmedBy.isConfirmed
                    ? functionGetDate(
                        order.confirmedBy.datetime,
                        order.confirmedBy.user?.name
                      )
                    : "Not Confiremd Yet"}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="w-[105px]">Processed By </span>
                <span className="font-bold ">
                  {order.processingBy.user || order.processingBy.isProcessing
                    ? functionGetDate(
                        order.processingBy.datetime,
                        order.processingBy.user?.name
                      )
                    : "Not Processes Yet"}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="w-[105px]">Distpacthed By </span>
                <span className="font-bold ">
                  {order.dispatchedBy.user || order.dispatchedBy.isDispatched
                    ? functionGetDate(
                        order.dispatchedBy.datetime,
                        order.dispatchedBy.user?.name
                      )
                    : "Not Dispatched Yet"}
                </span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="w-[105px]">Canceled By </span>
                <span className="font-bold ">
                  {order.canceledBy.user || order.canceledBy.isCanceled
                    ? functionGetDate(
                        order.canceledBy.datetime,
                        order.canceledBy.user?.name
                      )
                    : "Order is not canceled"}
                </span>
              </div>
            </div>
            <div className="border border-gray-200 p-2">
              <div className="flex flex-col flex-grow">
                <div className="text-sm">{order.shippingDetails.name}</div>
                <div className="text-sm">
                  {order.shippingDetails.address1} {","}{" "}
                  {order.shippingDetails.address2}
                </div>
                <div className="text-sm">
                  {order.shippingDetails.city} {","}{" "}
                  {order.shippingDetails.state}
                </div>
                <div className="text-sm">
                  {order.shippingDetails.country.label} {","}{" "}
                  {order.shippingDetails.postalCode}
                </div>
                <div className="text-sm">{order.shippingDetails.contact}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdertableData;
