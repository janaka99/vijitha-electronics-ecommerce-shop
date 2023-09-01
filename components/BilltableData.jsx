"use client";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";

const BilltableData = ({ bill }) => {
  const [popUpView, setPopUpView] = useState(false);
  const [loading, setloading] = useState(false);

  const handleBill = () => {
    setPopUpView(true);
  };

  const handleClose = () => {
    console.log("asd", popUpView);
    setPopUpView(false);
  };

  return (
    <>
      <Row onClick={handleBill}>
        <Td>{bill._id}</Td>
        <Td>{bill.createdAt.slice(0, 10)}</Td>
        <Td>{bill.createdAt.slice(11, 16)}</Td>
        <Td>{bill.cashier.name}</Td>
        <Td className="price">
          {bill.totalCost} <span>Lkr</span>
        </Td>
      </Row>
      <Div popUpView={popUpView}>
        <BillContainer>
          <BillContent>
            <Btop>
              {bill._id.slice(0, 10) + "..."}{" "}
              <span>
                Cashier: <span className="name">{bill.cashier.name}</span>
              </span>
            </Btop>
            <BItems>
              {bill.billItems.map((item) => (
                <div key={item._id}>
                  <p>{item.name}</p>
                  <h4>{item.quantity}</h4>
                  <h5>
                    {item.price} <span>lkr</span>
                  </h5>
                </div>
              ))}
            </BItems>
            <Btop className="bottom">
              Total <span className="price">{bill.totalCost} Lkr</span>
            </Btop>
          </BillContent>
          {loading && (
            <BillLoading>
              <Loader size={"50px"} border={"5px"} />
            </BillLoading>
          )}
          <CloseIcon>
            <AiOutlineCloseCircle size={25} onClick={handleClose} />
          </CloseIcon>
        </BillContainer>
      </Div>
    </>
  );
};

export default BilltableData;

const Div = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: ${(props) => (props.popUpView ? "flex" : "none")};
  background-color: #b8b8b84f;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  border: 1px solid #f1f2f2;
  padding: 3px 5px;
  div:nth-of-type(1) {
    width: 30%;
  }
  div:nth-of-type(2) {
    width: 20%;
  }
  div:nth-of-type(3) {
    width: 20%;
  }
  div:nth-of-type(4) {
    width: 20%;
  }
  div:nth-of-type(5) {
    width: 10%;
  }
  &:hover {
    background-color: #f1f2f2;
    cursor: pointer;
  }

  .price {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

const Td = styled.div``;
const BillLoading = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  backdrop-filter: blur(1px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BillContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  border-radius: 5px;
  max-height: 500px;
  min-height: 500px;
  background-color: #fff;
`;

const BillContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  min-height: 500px;
  background-color: #f1f2f2;

  .bottom {
    background-color: #1a56db;
    color: #fff;
    span {
      color: #fff;
    }
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 112121;
  cursor: pointer;
`;

const Btop = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .price {
    font-weight: 600;
  }
  span {
    .name {
      font-weight: 600;
    }
  }
`;

const BItems = styled.div`
  flex-grow: 1;
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #5555559e;
  }
  div {
    display: flex;
    align-items: center;

    p {
      width: 50%;
    }
    h4 {
      width: 10%;
      text-align: right;
    }
    h5 {
      width: 40%;
      text-align: right;
    }
  }
`;
