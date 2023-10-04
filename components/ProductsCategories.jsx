"use client";
import React, { useEffect, useState } from "react";
import SpinLoader from "./SpinLoader";

const ProductsCategories = ({ filterByCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  //get all the categories available
  const getCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const res = await fetch("/api/category/all", {
        method: "GET",
      });
      const newRes = await res.json();

      if (res.ok) {
        setCategories(newRes);
        setIsCategoriesLoading(false);
      } else {
        // settitleError(newRes.message);
        setIsCategoriesLoading(false);
      }
    } catch (error) {
      setIsCategoriesLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {isCategoriesLoading ? (
        <div className="w-full  flex flex-col gap-4 ">
          <div className="w-full py-4 bg-gray-100"></div>
          <div className="w-full py-4 bg-gray-100"></div>
          <div className="w-full py-4 bg-gray-100"></div>
          <div className="w-full py-4 bg-gray-100"></div>
          <div className="w-full py-4 bg-gray-100"></div>
        </div>
      ) : (
        <>
          <button
            className=" md:w-full w-fit flex bg-[#f3f3f353] whitespace-nowrap px-1  py-2 text-sm hover:bg-[#f3f3f3b5]"
            onClick={() => filterByCategory(0)}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              className=" md:w-full w-fit flex bg-[#f3f3f353] whitespace-nowrap px-1  py-2 text-sm hover:bg-[#f3f3f3b5]"
              key={category._id}
              onClick={() => filterByCategory(category._id)}
            >
              {category.name}
            </button>
          ))}
          <button
            className=" md:w-full w-fit flex bg-[#f3f3f353] whitespace-nowrap px-1  py-2 text-sm hover:bg-[#f3f3f3b5]"
            onClick={() => filterByCategory(1)}
          >
            Uncategorized
          </button>
        </>
      )}
    </>
  );
};

export default ProductsCategories;
