"use client";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartLoading, setisCartLoading] = useState(false);

  const getMyCart = async () => {
    setisCartLoading(true);
    const res = await fetch("/api/cart/get-cart", { method: "GET" });

    if (res.ok) {
      let length = await res.json();
      setCart(length.value);
      setisCartLoading(false);
    }
    setisCartLoading(false);
  };

  return (
    <CartContext.Provider value={{ cart, getMyCart, isCartLoading }}>
      {children}
    </CartContext.Provider>
  );
};
