"use client";
import React, { useEffect, useState } from "react";
import { TbCategory } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import ProductsCategories from "@components/ProductsCategories";
import CartItems from "@components/CartItems";
import Products from "@components/Products";

const CartItem = (product) => {
  return <div className="">cart items</div>;
};

const Page = () => {
  const [cart, setCart] = useState([]);

  const getCartItems = async () => {
    const res = await fetch("/api/cart/get", {
      method: "GET",
    });

    if (res.ok) {
      const resn = await res.json();
      console.log(resn);
      setCart(resn);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="w-[95%] max-w-[1440px] my-12 mx-auto">
      <div className="flex gap-12">
        <div className="w-[250px] flex flex-col gap-6">
          <div className="w-full flex flex-col gap-3">
            <div className="flex gap-2 items-center text-base font-bold uppercase">
              Categories <TbCategory />
            </div>
            <div className="flex flex-col gap-2 pl-2 text-base ">
              <ProductsCategories />
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex gap-2 items-center text-base font-bold uppercase">
              Cart <FiShoppingBag />
            </div>
            <div className="flex flex-col gap-1 pl-2 text-base ">
              <CartItems cart={cart} />
            </div>
          </div>
        </div>
        <div className="flex-grow flex flex-col w-full gap-12 ">
          <div className="w-full flex items-center h-[50px]">
            <input
              className="bg-gray-200 px-4 h-full outline-none flex-grow rounded-l"
              type="text"
            />
            <button className="w-[100px] bg-color-1 h-full text-white rounded-r">
              Search
            </button>
          </div>
          <Products setCart={setCart} />
        </div>
      </div>
    </div>
  );
};

export default Page;
