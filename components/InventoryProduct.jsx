"use client";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import styled from "styled-components";

const InventoryProduct = ({ setInventoryProductWindow }) => {
  const handleFormView = () => {
    setInventoryProductWindow(false);
  };

  return (
    <div className="max-w-[1000px] min-h-[520px] w-[90%] h-fit flex flex-col gap-1 shadow-lg relative">
      <div className="h-[50px] p-1 flex justify-center items-center bg-[#1f2937] w-full text-white">
        Add New Product
      </div>
      <form className="w-full h-full p-4 flex flex-col lg:flex-row bg-[#1f2937] gap-4">
        <div className="flex-grow h-full  flex flex-col gap-4">
          <div className="w-full flex flex-col gap-3">
            <label className="w-full px-5 text-white">Name</label>
            <input
              className="w-full px-5 text-black bg-white p-3 outline-none"
              type="text"
              placeholder="Product Name"
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <label className="w-full px-5 text-white">Price</label>
            <input
              className="w-full px-5 text-black bg-white p-3 outline-none"
              type="text"
              placeholder="Price ( Rs )"
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <label className="w-full px-5 text-white">Description</label>
            <textarea
              className="resize-none w-full px-5 text-black bg-white p-3 outline-none min-h-[215px]"
              type="text"
              placeholder="Description"
            />
          </div>
        </div>
        <div className="flex-grow flex flex-col justify-between gap-4">
          <div className="w-full h-[calc(100%-40px)] flex flex-col gap-4">
            <div className="w-full flex flex-col gap-3">
              <label className="w-full px-5 text-white">
                Stock Availability
              </label>
              <input
                className="w-full px-5 text-black bg-white p-3 outline-none"
                type="text"
                placeholder="Stock ( ex- 99 )"
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <label className="w-full px-5 text-white">Image</label>
              <div className="w-full  grid gap-4 grid-cols-2">
                <input
                  className="w-full px-5 text-black bg-white p-3
                outline-none hidden"
                  type="file"
                  id="imageToUpload"
                />
                <label
                  className="w-full aspect-square  flex justify-center items-center bg-gray-200  "
                  htmlFor="imageToUpload"
                >
                  <BiUpload size={50} />
                </label>
                <label className="w-full aspect-square  flex justify-center items-center bg-gray-200  ">
                  <img src="" alt="" />
                </label>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <button className="btn-2 min-w-[100%] ">Add</button>
          </div>
        </div>
      </form>
      <div className="absolute top-1 right-1 z-50 cursor-pointer text-white ">
        <AiOutlineCloseCircle size={25} onClick={handleFormView} />
      </div>
    </div>
  );
};

export default InventoryProduct;
