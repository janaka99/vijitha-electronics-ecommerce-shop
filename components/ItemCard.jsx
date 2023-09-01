"use client";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import PopupItemSelector from "./PopupItemSelector";

const ItemCard = ({ item, setBillItems, isBillProcessing }) => {
  const handleBill = () => {
    if (isBillProcessing === true) return;
    setPopupWindow(true);
  };
  const [popupWindow, setPopupWindow] = useState(false);

  return (
    <>
      <Main onClick={() => handleBill()}>
        <Img width={130} alt="" height={100} src={item.src} />
        <Details>
          <Name>{item.name}</Name>
          <Name>{item.price}</Name>
        </Details>
      </Main>
      <PopUpItemSelector popupWindow={popupWindow}>
        <PopupItemSelector
          selectedItem={item}
          setPopupWindow={setPopupWindow}
          setBillItems={setBillItems}
        />
      </PopUpItemSelector>
    </>
  );
};

export default ItemCard;

const Main = styled.button`
  width: 100%;
  aspect-ratio: 1;
  padding: 10px;
  background-color: #f1f2f2;
  transition: all 0.1s ease-in-out;
  position: relative;
  &:hover {
    background-color: #dbdcdc;
    transition: all 0.1s ease-in-out;
  }
`;

const Img = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 14px;
  padding: 5px;
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PopUpItemSelector = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 1111;
  background-color: #0000004d;
  display: flex;
  justify-content: center;
  align-items: center;

  display: ${(props) => (props.popupWindow ? "" : "none")};
`;
