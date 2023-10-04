"use client";

import React from "react";
import { AiFillEdit } from "react-icons/ai";

//chckeed

const InventoryItemCard = ({ item }) => {
  const nameLength = (name) => {
    if (name.length <= 24) {
      return name;
    }
    return name.slice(0, 16) + "...";
  };

  return (
    <>
      <div className="md:w-[194px] md:h-[220px] w-full rounded-md p-3 bg-[#fbfbfb] flex flex-col justify-between items-center shadow relative">
        <div className="w-full h-[144px] flex justify-center items-center p-2">
          <img
            className="rounded-sm w-full h-full overflow-hidden object-contain"
            alt=""
            src={`${item.src}`}
          />
        </div>
        <div className="flex w-full justify-between items-center">
          <p className="text-color-1 text-base font-bold">
            {item.price} <span>$</span>
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-sm py-1 font-semibold">{nameLength(item.name)}</p>
        </div>
        <a
          className="absolute top-1 right-1"
          href={`/inventory/update/${item.name}?id=${item._id}`}
        >
          <AiFillEdit size={24} />
        </a>
      </div>
    </>
  );
};

export default InventoryItemCard;
