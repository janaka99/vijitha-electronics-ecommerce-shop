"use client";
import React from "react";
import styled, { keyframes } from "styled-components";
import Loader from "./Loader";

const WholePageLoading = () => {
  return (
    <Main>
      <Content>
        <Header></Header>
        <Loader size={"80px"} border={"16px"} />
      </Content>
    </Main>
  );
};

export default WholePageLoading;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 100%;
  width: 100%;
  flex-direction: column;
`;

const Header = styled.div`
  background-color: #1f2937;
  width: 100%;
  height: 50px;
  position: relative;
  backdrop-filter: blur(10px);
`;

const Main = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffffff;
  /* backdrop-filter: blur(10px);  */
  z-index: 11111111111111111111111111111111;
`;
