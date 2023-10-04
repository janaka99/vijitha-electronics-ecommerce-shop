"use client";
import React from "react";
import CustomOrderItem from "./CustomOrderItem";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";
import SpinLoader from "./SpinLoader";

const CustomerOrder = ({ order, c_date, getAllOrders }) => {
  const calTotal = (item) => {
    let total = 0;

    item.map((i) => {
      total += i.boughtPrice_unit * i.quantity;
    });
    return total;
  };

  const [isMarkAsDeliveredLoading, setIsMarkAsDeliveredLoading] =
    useState(false);

  const markAsDelivered = async (id) => {
    setIsMarkAsDeliveredLoading(true);
    const res = await fetch("/api/order/mark-as-delivered", {
      method: "POST",
      body: JSON.stringify({
        order_id: id,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);

      setIsMarkAsDeliveredLoading(false);
      getAllOrders();
      toast.success("Order marked as delivered");
    } else {
      console.log("Error");
      setIsMarkAsDeliveredLoading(false);
      toast.error("Failed to mark as delivered, Try again later");
    }
  };
  const [isOrderRemoving, setIsOrderRemoving] = useState(false);
  const removeOrder = async (id) => {
    setIsOrderRemoving(true);
    const res = await fetch("/api/order/remove-unpaid-order", {
      method: "POST",
      body: JSON.stringify({
        order_id: id,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setIsOrderRemoving(false);
      getAllOrders();
      toast.success("Order removed successfully");
    } else {
      console.log("Error");
      setIsOrderRemoving(false);
      toast.error("Failed to remove order, please try again later");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 shadow-md bg-gray-100 p-2 relative">
      <div className="w-full flex justify-between items-center border-b  border-b-gray-200 p-2 pr-4">
        <div className="text-sm ">
          Ordered Date:{" "}
          <span className="font-semibold">{c_date.slice(0, 9)}</span>
        </div>
        <div className="text-sm ">
          Payment Status:{" "}
          <span className="font-semibold text-blue-500">
            {order.isPaid ? "Paid" : "Not Paid"}
          </span>
        </div>
        <div className="text-sm ">
          Ordered Status:{" "}
          <span className="font-semibold text-blue-500">{order.status}</span>
        </div>
      </div>
      {order.orderItems.map((item) => (
        <CustomOrderItem
          item={item}
          status={order.status}
          order_id={order._id}
          getAllOrders={getAllOrders}
        />
      ))}
      <div className="w-full flex justify-between items-center border-b  border-b-gray-200 p-2">
        <div className="text-sm ">Total</div>

        <div className="text-sm ">
          <span className="font-semibold text-blue-500">
            {calTotal(order.orderItems)} LKR
          </span>
        </div>
      </div>
      {order.status === "Dispatched" &&
        (isMarkAsDeliveredLoading ? (
          <button
            disabled
            className="text-sm w-full p-2 bg-blue-400 flex justify-center items-center"
          >
            <span className="animate-spin">
              <AiOutlineLoading3Quarters size={24} color="white" />
            </span>
          </button>
        ) : (
          <button
            onClick={() => markAsDelivered(order._id)}
            className=" text-sm w-full p-2 bg-blue-500 text-center text-white hover:bg-blue-600 transition-all "
          >
            Mark Order as Delivered
          </button>
        ))}
      {!order.isPaid &&
        (isOrderRemoving ? (
          <button disabled className="absolute top-0 right-0 w-full he-full">
            <SpinLoader />
          </button>
        ) : (
          <button
            onClick={removeOrder}
            className="absolute top-0 right-0 z-30 cursor-pointer m-1 "
          >
            <AiOutlineClose size={20} color="red" />
          </button>
        ))}
    </div>
  );
};

export default CustomerOrder;
