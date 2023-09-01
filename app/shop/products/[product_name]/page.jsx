"use client";
import Review from "@components/Review";
import React, { useEffect, useState } from "react";

const page = (props) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    const res = await fetch(
      `/api/item/get/product_id?id=${props.searchParams.id}`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      const newRes = await res.json();
      setProduct(newRes[0]);
      console.log(newRes);
    }
  };

  const handleCartItems = async () => {
    const data = {
      product_id: product._id,
      quantity: quantity,
    };
    const res = await fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      console.log(await res.json());
    } else {
      console.log(await res.json());
    }
  };

  const handleQuantity = (method) => {
    console.log(quantity);
    if (method === "minus") {
      setQuantity((prev) => {
        if (prev - 1 <= 0) return 1;
        prev = prev - 1;
        return prev;
      });
    } else if (method === "plus") {
      setQuantity((prev) => {
        if (prev + 1 > product.qty) return product.qty;
        prev = prev + 1;
        return prev;
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="max-w-[1440px] w-[95%] mx-auto flex flex-col gap-12 py-12 min-h-[calc(100vh-80px)]">
      <div className="w-full flex gap-12  flex-col lg:flex-row">
        <div className=" flex justify-center lg:justify-start item-start ">
          <div className="max-w-[500px] w-full aspect-square bg-gray-200 p-6 flex justify-center items-center">
            <img
              className="object-contain object-center"
              src={`${product?.src}`}
              alt=""
            />
          </div>
        </div>
        <div className="flex-grow flex flex-col gap-6">
          <div className="text-[#1F2937] text-4xl font-semibold">
            {product?.name}
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-[#1f2937] text-base font-bold">Details:</div>
            <div className="">{product?.description}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#1f2937] font-bold text-base">
              Available Quantity:{" "}
            </div>
            <div className="">{product?.qty}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#1f2937] font-bold text-base">
              Quantity Sold:{" "}
            </div>
            <div className="">{product?.totalSold}</div>
          </div>
          <div className="text-[#1A55D9] text-xl font-semibold">
            {product?.price} $
          </div>
          <div className="">{product?.status}</div>
          <div className="flex items-center gap-4">
            <div className="text-[#1f2937] font-bold text-base">Quantity</div>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantity("minus")}
                className="h-[35px] w-[30px] bg-gray-200 flex justify-center items-center border-2 hover:bg-gray-300"
              >
                -
              </button>
              <span className="h-[35px] w-[60px] bg-gray-100 flex justify-center items-center border-t-2 border-b-2">
                {quantity}
              </span>

              <button
                onClick={() => handleQuantity("plus")}
                className="h-[35px] w-[30px] bg-gray-200 flex justify-center items-center border-2 hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex  gap-4 justify-center sm:justify-start">
            <button
              onClick={handleCartItems}
              className="px-8 py-2 border-[1px] text-base border-[#1A56DB] text-color-1 w-fit hover:text-[#1a57dbf0]"
            >
              Add to cart
            </button>
            <button className="px-8 py-2 bg-color-1 text-white w-fit border-[1px] border-[#1A56DB] hover:bg-[#1a57dbf0]">
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="Categories flex flex-col w-full gap-4 justify-center ">
        <Review />
        <Review />
        <Review />

        <button className="px-8 py-2 border-[1px] mx-auto text-base border-[#1A56DB] text-color-1 w-fit hover:text-[#1a57dbf0]">
          Load More
        </button>
      </div>
    </div>
  );
};

export default page;
