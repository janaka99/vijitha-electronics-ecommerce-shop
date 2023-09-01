"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import SalesChart from "./SalesChart";
import SalesChart2 from "./SalesChart2";

const SalesDashboard = () => {
  const [loading, setloading] = useState(false);
  const [allBill, setAllBill] = useState([]);

  //get all the users available
  const getAllBills = async () => {
    setloading(true);
    try {
      const res = await fetch("/api/bill/all/lastYearMonths", {
        method: "GET",
      });
      const newRes = await res.json();
      console.log(newRes);
      if (res.ok) {
        setAllBill(newRes);
        // last12MonthsSales(newRes, 12);
        // last31MonthsSales(newRes);
      } else {
        // settitleError(newRes.message);
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  useEffect(() => {
    getAllBills();
  }, []);

  const last12MonthsSales = async (payload, count) => {
    const dataSet = [];
    payload.map((item) => {
      switch (item.createdAt.getMonth()) {
        case value:
          break;

        default:
          break;
      }
    });
  };

  const last31MonthsSales = (data) => {
    for (let i = 0; i < data.length; i++) {
      console.log(new Date(data[i].createdAt).getMonth());
      console.log(new Date(data[i].createdAt));
    }
  };

  const last7MonthsSales = (data) => {};

  if (loading) {
    return (
      <LoadingDiv>
        <Loader size={"50px"} border={"5px"} />
      </LoadingDiv>
    );
  }
  return (
    <Main>
      <Container>
        <Title>Sales Summary</Title>
        <Dashboard>
          <SalesChart2 />
          <SalesChart />
        </Dashboard>
      </Container>
    </Main>
  );
};

export default SalesDashboard;
const LoadingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Main = styled.div`
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  background-color: #1f293710;
  padding: 5px;
  width: 100%;
  text-align: center;
`;

const Dashboard = styled.div`
  flex-grow: 1;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
`;
