"use client";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import styled from "styled-components";
import EditCategory from "./EditCategory";

const InventoryCategoryItem = ({ category, getCategories, getProducts }) => {
  const [popUpwindow, setpopUpwindow] = useState(false);
  const [categoryEditWindow, setcategoryEditWindow] = useState(false);

  return (
    <>
      <Main>
        <p>{category.name}</p>
        <EditIcon
          onClick={() => {
            setpopUpwindow(true);
          }}
        >
          <AiFillEdit />
        </EditIcon>
      </Main>
      <EditCategoryPopUpWindow popUpwindow={popUpwindow}>
        <EditCategory
          setpopUpwindow={setpopUpwindow}
          getCategories={getCategories}
          category={category}
          getProducts={getProducts}
        />
      </EditCategoryPopUpWindow>
    </>
  );
};

export default InventoryCategoryItem;

const Main = styled.button`
  margin: 5px;
  background-color: #f3f3f353;
  width: calc(100% - 10px);
  display: flex;
  justify-content: start;
  padding: 5px;
  /* cursor: pointer; */
  font-size: 14px;
  &:hover {
    background-color: #f3f3f3b5;
  }
  position: relative;
`;

const EditIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  border: 1px solid #000;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #32323238;
  }
`;

const EditCategoryPopUpWindow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1111;
  display: ${(props) => (props.popUpwindow ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background: linear-gradient(270deg, #c1d1db7a 0%, #dacac076 100%);
`;
