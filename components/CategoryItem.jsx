"use client";
import React from "react";
import styled from "styled-components";

const CategoryItem = ({ category, filterProducts }) => {
  const handleProductsFilter = () => [filterProducts(category._id)];

  return <Main onClick={handleProductsFilter}>{category.name}</Main>;
};

export default CategoryItem;

const Main = styled.button`
  margin: 5px;
  background-color: #f3f3f353;
  width: calc(100% - 10px);
  display: flex;
  justify-content: start;
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #f3f3f3b5;
  }
`;
