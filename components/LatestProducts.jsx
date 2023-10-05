"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import ProductCard from "./ProductCard";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get all the products available
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/item/latest-products", {
        method: "GET",
      });
      const newRes = await res.json();

      if (res.ok) {
        setProducts(newRes);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-[95%] max-w-[1440px] mx-auto mt-12 flex flex-col gap-12">
      <h1 className="uppercase text-2xl font-semibold text-center">
        Latest Products
      </h1>
      <div className="w-full  max-w-[1024px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
        {isLoading ? (
          <>
            <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg relative p-2  "></div>
            <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg relative p-2  "></div>
            <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg relative p-2  "></div>
            <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg relative p-2  "></div>
            <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg relative p-2  "></div>
            <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg relative p-2  "></div>
            <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg relative p-2  "></div>
            <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg relative p-2  "></div>
          </>
        ) : (
          products.map((item, i) => <ProductCard item={item} key={i} />)
        )}
      </div>
      <a
        href="/products"
        target="_black"
        rel="noreferrer"
        className="btn-1 my-12 mx-auto"
      >
        See All Products
      </a>
    </div>
  );
};

export default LatestProducts;
