"use client";
import React, { useState } from "react";

const CartItems = ({ cart }) => {
  const handleCheckout = () => {};

  return (
    <>
      {cart.length <= 0 ? (
        <>
          <div className="italic text-sm text-gray-500">No items in cart</div>
        </>
      ) : (
        <>
          {cart.map((cart, i) => (
            <div
              key={i}
              className="flex items-center border-[1px] border-gray-200 shadow-md px-2 py-1 justify-between gap-2"
            >
              <div className="flex items-center gap-2 ">
                <div className="h-10 w-10 flex justify-center items-center">
                  <img
                    src={cart.itemId.src}
                    alt=""
                    className="object-contain bg-gray-200"
                  />
                </div>
                <div className="text-sm text-gray-600">{cart.itemId.name}</div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="text-sm text-gray-600">x</div>
                <div className="text-sm text-gray-600">{cart.quantity}</div>
              </div>
            </div>
          ))}
          <a
            href="/shop/buy/checkout"
            className="px-8 mx-auto py-2 bg-color-1 text-white w-full mt-6 border-[1px] border-[#1A56DB] hover:bg-[#1a57dbf0]"
          >
            Checkout
          </a>
        </>
      )}
    </>
  );
};

export default CartItems;
