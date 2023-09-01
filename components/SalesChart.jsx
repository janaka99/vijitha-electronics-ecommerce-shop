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

const SalesChart = () => {
  const [bills, setbills] = useState([]);
  const [dataSet, setdataSet] = useState([]);
  const [loading, setloading] = useState(false);

  //get all the users available
  const getAllBills = async () => {
    setloading(true);
    try {
      const res = await fetch("/api/bill/all/lastYearMonths", {
        method: "GET",
      });
      const newRes = await res.json();
      //   console.log(newRes);
      if (res.ok) {
        setbills(newRes);
        loadChart(newRes);
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

  const loadChart = (data) => {
    let curDataSet = [];
    let month;
    for (let i = 0; i < data.length; i++) {
      console.log("runds ", i);
      if (i === 0) {
        month = "January";
      }
      if (i === 1) {
        month = "February";
      }
      if (i === 2) {
        month = "March";
      }
      if (i === 3) {
        month = "April";
      }
      if (i === 4) {
        month = "May";
      }
      if (i === 5) {
        month = "June";
      }
      if (i === 6) {
        month = "July";
      }
      if (i === 7) {
        month = "August";
      }
      if (i === 8) {
        month = "September";
      }
      if (i === 9) {
        month = "October";
      }
      if (i === 10) {
        month = "November";
      }
      if (i === 11) {
        month = "December";
      }
      const totalCost = data[i].totalCost;

      const ds = {
        month: month,
        totalCost: totalCost,
      };

      curDataSet.push(ds);
    }
    setdataSet(curDataSet);
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Based On Month",
      },
    },
  };

  const data = {
    labels: dataSet.map((dt) => dt.month),
    datasets: [
      {
        label: "Total Cost",
        data: dataSet.map((dt) => dt.totalCost),
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
      console.log("result ", newRes);
      if (res.ok) {
        setbills(newRes);
        loadChart(newRes);
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
          <option value="lastYearMonths">Last year</option>
          <option value="uptoDateMonths">This year so far</option>
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

export default SalesChart;

const Container = styled.div`
  width: 90%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
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
  width: 100%;
  min-height: 100%;
  height: 500px;
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
