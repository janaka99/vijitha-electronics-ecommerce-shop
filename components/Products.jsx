"use client";
import React, { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import ProductCard from "./ProductCard";
import SpinLoader from "./SpinLoader";
import toast from "react-hot-toast";

//chcked

const Products = ({ products }) => {
  return (
    <div className="w-full flex flex-col gap-12">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <ProductCard item={item} key={item._id} />
        ))}
      </div>
      <button className="btn-1 my-12 mx-auto">Next</button>
    </div>
  );
};

export default Products;
