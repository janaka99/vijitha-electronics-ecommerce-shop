import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = ({ size, border }) => {
  return <Div size={size} border={border}></Div>;
};

export default Loader;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Div = styled.div`
  border: ${(props) => props.border} solid #ececec;
  border-radius: 50%;
  border-top: ${(props) => props.border} solid #3498db;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  -webkit-animation: ${spin} 1s linear infinite; /* Safari */
  animation: ${spin} 1s linear infinite;
  margin-top: auto;
  margin-bottom: auto;
`;
