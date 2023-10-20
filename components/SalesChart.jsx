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
import SpinLoader from "./SpinLoader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const [dataSet, setdataSet] = useState([]);
  const [chartDataType, setChartDatatype] = useState("uptoDateMonths");
  const [chartData, setchartData] = useState([]);
  const [loading, setloading] = useState(false);
  const [activeCurr, setActiveCurr] = useState("usd");

  //get all the users available
  const getAllOrderData = async () => {
    setloading(true);
    try {
      const res = await fetch(
        `/api/order/admin/get-sales-data/${chartDataType}`,
        {
          method: "GET",
        }
      );
      const newRes = await res.json();
      console.log("last year 31 order ", newRes);
      if (res.ok) {
        setdataSet(newRes);
        changeCurrency(activeCurr, newRes);
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  useEffect(() => {
    getAllOrderData();
  }, [chartDataType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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

  const changeCurrency = (cur, data) => {
    if (cur === "eth") {
      setchartData(data.map((dt) => dt.eth_total));
    } else {
      setchartData(data.map((dt) => dt.total));
    }
  };

  const data = {
    labels: dataSet.map((dt) => dt.month),
    datasets: [
      {
        label: "Total Sales",
        data: chartData,
        backgroundColor: "#1A56DB",
      },
    ],
  };

  const handleChartChange = async (d) => {
    setChartDatatype(d);
  };

  return (
    <div className="w-[90%] mx-auto flex flex-col ">
      <select
        className="w-full bg-[#f1f2f2] mt-[20px] py-[10px] px-[15px] outline-none"
        name=""
        id=""
        onChange={(e) => {
          setActiveCurr(e.target.value);
          changeCurrency(e.target.value, dataSet);
        }}
      >
        <option value="usd" selected>
          USD
        </option>
        <option value="eth">ETH</option>
      </select>
      <div>
        <select
          className="w-full bg-[#f1f2f2] mt-[20px] py-[10px] px-[15px] outline-none"
          defaultValue={"uptoDateMonths"}
          onChange={(e) => handleChartChange(e.target.value)}
        >
          <option value="uptoDateMonths">This year</option>
          <option value="lastYearMonths">Last year</option>
        </select>
      </div>
      <div className="w-full aspect-[8/5] relative p-2">
        {loading ? (
          <div className="absolute top-0 left-0 w-full h-full  bg-[#ffffff] backdrop-blur-[1px] flex justify-center items-center">
            <SpinLoader />
          </div>
        ) : (
          <Bar options={options} data={data} />
        )}
      </div>
    </div>
  );
};

export default SalesChart;
