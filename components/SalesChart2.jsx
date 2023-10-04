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
    <div className="w-[90%] mx-auto flex flex-col mt-[30px]">
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
      <div className="w-full min-h-full h-[500px] relative">
        {loading ? (
          <div className="absolute top-0 left-0 w-full h-full min-h-[500px] bg-[#ffffff] backdrop-blur-[1px] flex justify-center items-center">
            <Loader size={"50px"} border={"5px"} />
          </div>
        ) : (
          <Bar options={options} data={data} />
        )}
      </div>
    </div>
  );
};

export default SalesChart2;
