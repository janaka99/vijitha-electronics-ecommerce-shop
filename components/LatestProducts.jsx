"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import ProductCard from "./ProductCard";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  //get all the products available
  const getProducts = async () => {
    try {
      const res = await fetch("/api/item/all", {
        method: "GET",
      });
      const newRes = await res.json();

      if (res.ok) {
        setProducts(newRes);
      } else {
        // getProducts();
      }
    } catch (error) {
      // getProducts();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full mt-12 flex flex-col gap-12">
      <h1 className="uppercase text-2xl font-semibold text-center">
        Latest Products
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard item={item} key={item.price} />
        ))}
        {products.map((item) => (
          <ProductCard item={item} key={item.price} />
        ))}
      </div>
      <a
        href="/shop/products"
        target="_black"
        rel="noopener noreferrer"
        nonferre
        className="btn-1 my-12 mx-auto"
      >
        See All Products
      </a>
    </div>
  );
};

export default LatestProducts;
