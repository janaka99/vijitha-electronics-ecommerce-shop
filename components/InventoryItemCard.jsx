"use client";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import UpdateInventoryProduct from "./UpdateInventoryProduct";

const InventoryItemCard = ({
  item,
  setInventoryProductWindow,
  setCategoryAddWindow,
  getProducts,
  setAddInventoryProductWindow,
  categories,
}) => {
  const [updateInventoryProductWindow, setUpdateInventoryProductWindow] =
    useState(false);

  const handleViewProductWindow = () => {
    setCategoryAddWindow(false);
    setInventoryProductWindow(false);
    setUpdateInventoryProductWindow(!updateInventoryProductWindow);
    setAddInventoryProductWindow(false);
  };

  return (
    <>
      <Main onClick={handleViewProductWindow}>
        <Img alt="" src={`${item.src}`} />
        <Div>
          <Name>{item.name}</Name>
          <Price>
            {item.price} &nbsp; <span>Lkr</span>
          </Price>
        </Div>
      </Main>
      <a href={`/inventory/update/${item.name}?id=${item._id}`}>edit</a>
      <UpdateInventoryProductWindow
        updateInventoryProductWindow={updateInventoryProductWindow}
      >
        <UpdateInventoryProduct
          item={item}
          getProducts={getProducts}
          setUpdateInventoryProductWindow={setUpdateInventoryProductWindow}
          categories={categories}
        />
      </UpdateInventoryProductWindow>
    </>
  );
};

export default InventoryItemCard;

const Main = styled.button`
  width: 100%;
  aspect-ratio: 20/22;
  padding: 10px;
  background-color: #f1f2f2;
  transition: all 0.1s ease-in-out;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: #dbdcdc;
    transition: all 0.1s ease-in-out;
  }
`;

const Img = styled.img`
  width: 100%;
  border-radius: 4px;
  width: 200px;
  height: 100px;
  /* height: 100%; */
  flex-grow: 1;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 14px;
  padding: 5px;
  font-weight: 600;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Price = styled.p`
  font-weight: 600;
  span {
    font-weight: 700;
  }
`;

const UpdateInventoryProductWindow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1111;
  display: ${(props) => (props.updateInventoryProductWindow ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background: linear-gradient(270deg, #c1d1db7a 0%, #dacac076 100%);
`;
