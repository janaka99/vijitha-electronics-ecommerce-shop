"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import SpinLoader from "./SpinLoader";

const ShoppingCartItem = ({ item, getCartItems }) => {
  const [isLoading, setIsLoading] = useState(false);

  const increaseQuantity = async () => {
    if (isLoading === false) {
      setIsLoading(true);
      const res = await fetch(
        "/api/cart/increase/bill-item-?id=" + item.itemId._id,
        {
          method: "POST",
        }
      );

      if (res.ok) {
        const resn = await res.json();
        await getCartItems();
        setIsLoading(false);
        console.log(resn);
      } else {
        console.log(res);
        setIsLoading(false);
      }
    }
  };
  const reduceQuantity = async () => {
    if (isLoading === false) {
      setIsLoading(true);
      const res = await fetch(
        "/api/cart/decrease/bill-item-?id=" + item.itemId._id,
        {
          method: "POST",
        }
      );

      if (res.ok) {
        const resn = await res.json();

        await getCartItems();
        setIsLoading(false);

        console.log(resn);
      } else {
        console.log(res);
        setIsLoading(false);
      }
    }
  };
  const removeItem = async () => {
    if (isLoading === false) {
      setIsLoading(true);
      const res = await fetch("/api/cart/delete/bill-item-?id=" + item._id, {
        method: "GET",
      });

      if (res.ok) {
        const resn = await res.json();
        await getCartItems();
        setIsLoading(false);

        console.log(resn);
      } else {
        console.log(res);
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="  p-2 flex gap-2 shadow-sm rounded-sm h-[166px] w-full relative">
      <div className="w-[150px] h-[150px] flex justify-center items-center bg-gray-200 p-2 rounded-lg">
        <img
          className="w-full h-full object-contain "
          src={item.itemId.src}
          alt=""
        />
      </div>
      <div className="flex-grow flex flex-col p-2 justify-between">
        <div className="w-full flex justify-between ">
          <span className="text-blue-600 font-bold ">{item.itemId.name}</span>
          <span className="text-blue-600 font-bold ">
            {item.itemId.price * item.quantity} $
          </span>
        </div>
        <div className="mt-12 flex  justify-between">
          <p className="flex border rounded-sm">
            <span
              onClick={reduceQuantity}
              className="py-2 px-4 flex justify-center items-center border-r cursor-pointer hover:bg-gray-100"
            >
              <AiOutlineMinus />
            </span>
            <span className="py-2 w-[55px] flex justify-center items-center border-r">
              {item.quantity}
            </span>
            <span
              onClick={increaseQuantity}
              className="py-2 px-4 flex justify-center items-center  cursor-pointer hover:bg-gray-100"
            >
              <AiOutlinePlus />
            </span>
          </p>
          <button onClick={removeItem} className="cursor-pointer">
            <TiDeleteOutline size={24} className="text-red-600" />
          </button>
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0 w-full h-full">
          <SpinLoader />
        </div>
      )}
    </div>
  );
};

export default ShoppingCartItem;
