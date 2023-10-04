"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import SpinLoader from "./SpinLoader";
import { AiOutlineDownCircle, AiOutlineUpCircle } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

const Buttons = ({ type, orderId, getOrders }) => {
  const [isOrderhadling, setisOrderhadling] = useState(false);
  const handleOrder = async (type, nextAction) => {
    setisOrderhadling(true);
    const res = await fetch("/api/order/admin/take-action", {
      method: "POST",
      body: JSON.stringify({
        type: type,
        nextAction: nextAction,
        orderId: orderId,
      }),
    });

    if (res.ok) {
      let data = await res.json();
      getOrders();
      toast.success(`Order ${nextAction}`);
      setisOrderhadling(false);
    } else {
      setisOrderhadling(false);
      toast.error("Something went wrong, Try again later");
    }
  };

  return isOrderhadling ? (
    <button
      disabled
      className="w-full  bg-blue-300 py-3 px-2 flex justify-center items-center text-white  text-base font-semibold gap-4 rounded-sm shadow-sm box-border mr-2"
    >
      <span className="animate-spin">
        <FaSpinner size={20} color="white" />
      </span>
    </button>
  ) : (
    <>
      {type === "Pending" && (
        <>
          <button
            onClick={() => handleOrder(type, "Confirmed")}
            className="bg-blue-500 h-[30px] px-2 hover:bg-blue-600 transition-all"
          >
            Confirm
          </button>
          <button
            onClick={() => handleOrder(type, "Canceled")}
            className="bg-red-500 h-[30px] px-2"
          >
            Cancel
          </button>
        </>
      )}
      {type === "Confirmed" && (
        <>
          <button
            onClick={() => handleOrder(type, "Processing")}
            className="bg-blue-500 h-[30px] px-2 hover:bg-blue-600 transition-all"
          >
            Process
          </button>
          <button
            onClick={() => handleOrder(type, "Canceled")}
            className="bg-red-500 h-[30px] px-2 hover:bg-red-600 transition-all"
          >
            Cancel
          </button>
        </>
      )}
      {type === "Processing" && (
        <>
          <button
            onClick={() => handleOrder(type, "Dispatched")}
            className="bg-blue-500 h-[30px] px-2 hover:bg-blue-600 transition-all"
          >
            Dispatch
          </button>
          <button
            onClick={() => handleOrder(type, "Canceled")}
            className="bg-red-500 h-[30px] px-2 hover:bg-red-600 transition-all"
          >
            Cancel
          </button>
        </>
      )}
      {type === "Dispatched" && <></>}
      {type === "Canceled" && <></>}
    </>
  );
};

const Order = ({ order, type, getOrders }) => {
  const [expand, setExpand] = useState(false);

  const functionGetDate = (date, name) => {
    let newDate = date.slice(0, 10);

    return `${newDate} - ${name}`;
  };

  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex border-l border-r text-sm h-[50px] relative ${
          expand === false && "border-b"
        }`}
      >
        <div className="w-[50%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
          {order.customer.email}
        </div>
        <div className="w-[20%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
          {order.createdAt.slice(0, 9)}
        </div>
        <div className="w-[25%] flex items-center pl-2 py-1 border-r border-r-gray-200 justify-center gap-2">
          <Buttons type={type} orderId={order._id} getOrders={getOrders} />
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
                <span className="w-[105px]">Processing By </span>
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

const ManageOrders = ({ type }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    setIsLoading(true);
    const res = await fetch("/api/order/admin/get/status?status=" + type, {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setOrders(data);
      setIsLoading(false);
    } else {
      console.log(res);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getOrders();
  }, [type]);

  return (
    <div className="table-header w-full relative">
      {isLoading ? (
        <SpinLoader />
      ) : (
        <>
          <div className="flex w-full border border-gray-200 text-sm font-semibold">
            <div className="w-[50%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
              Email
            </div>
            <div className="w-[20%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
              Date
            </div>
            <div className="w-[25%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
              Action
            </div>
            <div className="w-[5%]"></div>
          </div>
          <div className="flex flex-col gap-2">
            {orders.map((order, i) => (
              <Order order={order} key={i} type={type} getOrders={getOrders} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageOrders;
