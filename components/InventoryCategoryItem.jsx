"use client";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import EditCategory from "./EditCategory";

//chekced

const InventoryCategoryItem = ({ category, getCategories }) => {
  const [categoryEditWindow, setcategoryEditWindow] = useState(false);

  return (
    <>
      <div className="m-1 w-full flex-col bg-[#f3f3f353] flex-grow flex justify-between hover:bg-[#f3f3f3b5] text-sm relative items-center">
        <div className="w-full px-2 flex items-center justify-between">
          <p className="flex-grow w-full  py-2">{category.name}</p>
          <div
            className="flex justify-center items-center cursor-pointer "
            onClick={() => {
              setcategoryEditWindow((prev) => !prev);
            }}
          >
            <AiFillEdit size={22} />
          </div>
        </div>
        <div
          className={`w-full h-full bg-gradient-to-r from-[#c1d1db7a] to-[#dacac076] ${
            categoryEditWindow ? "flex" : "hidden"
          } `}
        >
          <EditCategory
            setcategoryEditWindow={setcategoryEditWindow}
            getCategories={getCategories}
            category={category}
          />
        </div>
      </div>
    </>
  );
};

export default InventoryCategoryItem;
