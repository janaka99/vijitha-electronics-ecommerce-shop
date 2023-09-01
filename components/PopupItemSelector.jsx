"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";

const PopupItemSelector = ({ setPopupWindow, selectedItem, setBillItems }) => {
  console.log(selectedItem);
  const [quantity, setQuantity] = useState(1);
  const [price, setprice] = useState(selectedItem.price);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const [newBillItem, setnewBillItem] = useState(null);

  const handleQuantity = (qt) => {
    if (qt <= 0) {
      setError({
        isError: true,
        message: "Invalid quantity",
      });
    }
    if (qt > selectedItem.qty) {
      setError({
        isError: true,
        message: "Exceeded maximum quantity",
      });
    }
    if (qt > 0 && qt <= selectedItem.qty) {
      setError({
        isError: false,
        message: "",
      });
    }

    if (error.isError === false) {
      setQuantity(qt);
      setprice(() => {
        return qt * selectedItem.price;
      });
    }
  };

  const handleClose = () => {
    setPopupWindow(false);
    setprice(selectedItem.price);
    setError({
      isError: false,
      message: "",
    });
    setQuantity(1);
  };

  const handleBillItem = () => {
    //generate unique name for product image
    var crypto = require("crypto");
    var vcode = crypto.randomBytes(20).toString("hex");
    var vcode2 = crypto.randomBytes(20).toString("hex");
    var unicode = vcode + vcode2;
    const billItem = {
      name: selectedItem.name,
      quantity: quantity,
      price: price,
      itemId: selectedItem._id,
      billItemId: unicode,
    };
    setBillItems((previtems) => [...previtems, billItem]);
    handleClose();
  };

  return (
    <Main>
      <Img src={selectedItem.src} alt="" width={200} height={200} />
      <Details>
        <ItemNameAndPrice>
          <Top>
            <Name>{selectedItem.name}</Name>
            <Name>{selectedItem.price} Lkr</Name>
          </Top>
          <Bottom>
            <Available>
              {" "}
              <span>Stock : </span> {selectedItem.qty}
            </Available>
            <Total>Total : {price} Lkr</Total>
          </Bottom>
        </ItemNameAndPrice>
        <Qty>
          <Input
            min={0}
            max={selectedItem.qty + 1}
            type="number"
            defaultValue={quantity}
            onChange={(e) => {
              handleQuantity(e.target.value);
            }}
          />
          <Error>{error.message}</Error>
        </Qty>
        <Button onClick={handleBillItem}>Add</Button>
      </Details>

      <FillCloseCircle size={30} onClick={handleClose} />
    </Main>
  );
};

export default PopupItemSelector;

const Main = styled.div`
  padding: 10px;
  background-color: #1f2937;
  display: flex;
  gap: 10px;
  color: #fff;
  border-radius: 4px;
  position: relative;
  height: 200px;
`;
const Img = styled(Image)`
  border-radius: 4px;
  height: 100%;
`;
const Details = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
`;
const ItemNameAndPrice = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  /* margin-top: 10px; */
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Available = styled.div`
  span {
    font-size: 12px;

    color: lightgreen;
  }
`;
const Total = styled.div``;

const Name = styled.div`
  font-size: 14px;
`;
const Qty = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 200px;
  margin-top: 10px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  outline: none;
  border: none;
  color: #000;
`;

const Error = styled.div`
  height: 20px;
  font-size: 12px;
  color: red;
  width: 100%;
  text-align: center;
`;

const FillCloseCircle = styled(AiFillCloseCircle)`
  position: absolute;
  z-index: 111111;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #1a56db;
  transition: all 0.2s ease-in-out;
  color: #fff;
  width: fit-content;
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #1244af;
    transition: all 0.2s ease-in-out;
  }
`;
