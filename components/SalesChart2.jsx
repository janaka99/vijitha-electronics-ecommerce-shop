"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import Loader from "./Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart2 = () => {
  const [bills, setbills] = useState([]);
  const [dataSet, setdataSet] = useState([]);
  const [loading, setloading] = useState(false);

  //get all the users available
  const getAllBills = async () => {
    setloading(true);
    try {
      const res = await fetch("/api/bill/all/last7days", {
        method: "GET",
      });
      const newRes = await res.json();
      if (res.ok) {
        setbills(newRes);
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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Based On Date",
      },
    },
  };

  const data = {
    labels: bills.map((dt) => dt.date),
    datasets: [
      {
        label: "Total Cost",
        data: bills.map((dt) => dt.totalCost),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const handleChartChange = async (d) => {
    setloading(true);
    try {
      const res = await fetch("/api/bill/all/" + d, {
        method: "GET",
      });
      const newRes = await res.json();
      console.log("last 31 days ", newRes);
      if (res.ok) {
        setbills(newRes);
      } else {
        // settitleError(newRes.message);
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  return (
    <Container>
      <TopBar>
        <Select
          defaultValue={"last7days"}
          onChange={(e) => handleChartChange(e.target.value)}
        >
          <option value="last7days">Last 7 Days</option>
          <option value="last31days">Last 31 Days</option>
        </Select>
      </TopBar>
      <BarContainer>
        {loading ? (
          <LoadingDiv>
            <Loader size={"50px"} border={"5px"} />
          </LoadingDiv>
        ) : (
          <Bar options={options} data={data} />
        )}
      </BarContainer>
    </Container>
  );
};

export default SalesChart2;

const Container = styled.div`
  width: 90%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const TopBar = styled.div`
  /* height: 30px; */
`;

const Select = styled.select`
  width: 100%;
  background-color: #f1f2f2;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px 15px;
  outline: none;
`;

const BarContainer = styled.div`
  width: 95%;
  min-height: 100%;
  position: relative;
`;

const LoadingDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
