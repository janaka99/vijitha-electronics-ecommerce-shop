"use client";

import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";

const BillItem = ({ item, removeBillItem }) => {
  const handleClose = () => {
    removeBillItem(item.billItemId);
  };

  return (
    <Main>
      <Name>{item.name}</Name>
      <Qty>{item.quantity}</Qty>
      <Price>
        {" "}
        {item.price} <span>Lkr</span>
      </Price>
      <OutlineCloseCircle size={20} onClick={handleClose} />
    </Main>
  );
};

export default BillItem;

const Main = styled.div`
  padding: 5px;
  background-color: #fff;
  display: flex;
  width: 100%;
  gap: 10px;
`;

const Name = styled.div`
  flex-grow: 1;
  font-size: 14px;
`;

const Qty = styled.div`
  width: 20px;
  font-size: 14px;
`;

const Price = styled.div`
  width: 80px;
  font-size: 14px;
  display: flex;
  justify-content: end;
  span {
    font-size: 14px;
    padding-left: 10px;
  }
`;

const OutlineCloseCircle = styled(AiOutlineCloseCircle)`
  cursor: pointer;
`;
