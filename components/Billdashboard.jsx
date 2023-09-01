"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import BilltableData from "./BilltableData";

const Billdashboard = () => {
  const [todaySorFar, settodaySorFar] = useState(0);
  const [last7days, setlast7days] = useState(0);
  const [last31days, setlast31days] = useState(0);
  const [allbills, setallbills] = useState([]);

  const [loading, setloading] = useState(false);

  const getData = async () => {
    setloading(true);
    try {
      const res = await fetch("/api/bill/all/getalldata", {
        method: "GET",
      });
      const newRes = await res.json();
      console.log(newRes);
      if (res.ok) {
        setlast7days(newRes.last7);
        setlast31days(newRes.last31);
        settodaySorFar(newRes.today);
        setallbills(newRes.bills);
      } else {
        // settitleError(newRes.message);
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Main>
      {loading ? (
        <LoadingDiv>
          <Loader size={"50px"} border={"5px"} />
        </LoadingDiv>
      ) : (
        <>
          <TopBar>
            <Card>
              <Title>Today so far</Title>
              <Sales>
                {todaySorFar} <span>Lkr</span>
              </Sales>
            </Card>
            <Card>
              <Title>Last 7 Days Sales</Title>
              <Sales>
                {last7days} <span>Lkr</span>
              </Sales>
            </Card>
            <Card>
              <Title>Last 31 Days Sales</Title>
              <Sales>
                {last31days} <span>Lkr</span>
              </Sales>
            </Card>
          </TopBar>
          <Bills>
            <BillViewTitle>View Bills</BillViewTitle>
            <BillsTable>
              <Row>
                <Th>Bill ID</Th>
                <Th>Date</Th>
                <Th>Time</Th>
                <Th>Cashier</Th>
                <Th>Total Cost</Th>
              </Row>
              <TableData>
                {allbills.map((bill) => (
                  <BilltableData key={bill._id} bill={bill} />
                ))}
              </TableData>
            </BillsTable>
          </Bills>
        </>
      )}
    </Main>
  );
};

export default Billdashboard;

const Main = styled.div`
  height: 100%;
  width: 100%;
  /* position: relative; */
`;

const TopBar = styled.div`
  width: 100%;
  padding: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;

const Card = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: #f1f2f2;
`;
const Title = styled.div`
  width: 100%;
  text-align: center;
  padding-block: 10px;
  font-size: 15px;
  background-color: #fff;
`;

const Sales = styled.div`
  font-size: 25px;
  margin: 10px;
  width: 100%;
  text-align: center;
  span {
    color: orange;
    font-weight: 600;
  }
`;

const Bills = styled.div`
  width: 100%;
  padding: 5px;
`;

const BillViewTitle = styled.div`
  width: 100%;
  text-align: center;
  padding-block: 5px;
  font-size: 15px;
  background-color: #f1f2f2;
`;

const BillsTable = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  border: 2px solid #f1f2f2;
  padding: 3px 5px;
  font-weight: 600;
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
`;

const TableData = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Th = styled.div``;

const LoadingDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
