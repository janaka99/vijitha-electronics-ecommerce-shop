"use client";
import React, { useEffect, useState } from "react";

const ProductsCategories = () => {
  const [categories, setCategories] = useState([]);

  //get all the categories available
  const getCategories = async () => {
    try {
      const res = await fetch("/api/category/all", {
        method: "GET",
      });
      const newRes = await res.json();

      if (res.ok) {
        setCategories(newRes);
      } else {
        // settitleError(newRes.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories.map((category, index) => (
        <div key={index} className="capitalize">
          {category.name}
        </div>
      ))}
    </>
  );
};

export default ProductsCategories;
