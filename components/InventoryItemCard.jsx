"use client";

import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import styled from "styled-components";

const InventoryItemCard = ({ item }) => {
  const nameLength = (name) => {
    if (name.length <= 24) {
      return name;
    }
    return name.slice(0, 24) + "...";
  };

  return (
    <>
      <div className="md:w-[194px] md:h-[220px] w-full rounded-md p-3 bg-[#f1f2f2] flex flex-col justify-between items-center">
        <img
          className="rounded-sm w-full h-[144px] overflow-hidden object-cover"
          alt=""
          src={`${item.src}`}
        />
        <div className="flex justify-between items-center w-full">
          <p className="text-sm py-1 font-semibold">{nameLength(item.name)}</p>
        </div>
        <div className="flex w-full justify-between items-center">
          <p className="text-color-1 text-sm">
            {item.price} <span>$</span>
          </p>
          <a href={`/inventory/update/${item.name}?id=${item._id}`}>
            <AiFillEdit size={24} />
          </a>
        </div>
      </div>
    </>
  );
};

export default InventoryItemCard;
