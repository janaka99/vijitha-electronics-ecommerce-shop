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
import Loader from "./Loader";
import SpinLoader from "./SpinLoader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart2 = () => {
  const [chartDataType, setChartDatatype] = useState("last7days");
  const [dataSet, setdataSet] = useState([]);
  const [loading, setloading] = useState(false);

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
      console.log(newRes);
      if (res.ok) {
        setdataSet(newRes);
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
        text: "Based On Date",
      },
    },
  };

  const data = {
    labels: dataSet.map((dt) => dt.date),
    datasets: [
      {
        label: "Total Cost",
        data: dataSet.map((dt) => dt.total),
        backgroundColor: "#1A56DB",
      },
    ],
  };

  const handleChartChange = async (d) => {
    setChartDatatype(d);
  };

  return (
    <div className="w-[90%] mx-auto flex flex-col ">
      <div>
        <select
          className="w-full bg-[#f1f2f2] mt-[20px] py-[10px] px-[15px] outline-none"
          defaultValue={"last7days"}
          onChange={(e) => handleChartChange(e.target.value)}
        >
          <option value="last7days">Last 7 Days</option>
          <option value="last31days">Last 31 Days</option>
        </select>
      </div>
      <div className="w-full aspect-[8/5]  relative ">
        {loading ? (
          <div className="absolute top-0 left-0 w-full h-full aspect-[] bg-[#ffffff] backdrop-blur-[1px] flex justify-center items-center">
            <SpinLoader />
          </div>
        ) : (
          <Bar options={options} data={data} />
        )}
      </div>
    </div>
  );
};

export default SalesChart2;
