"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import ProductCard from "./ProductCard";

const Products = ({ setCart }) => {
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
      console.log(newRes);
    } catch (error) {
      console.log(error);
      // getProducts();
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard item={item} key={item.price} />
        ))}
      </div>
      <button className="btn-1 my-12 mx-auto">Next</button>
    </div>
  );
};

export default Products;
