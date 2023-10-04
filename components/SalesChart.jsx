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
    <div className="w-[90%] mx-auto flex flex-col mt-[30px]">
      <div>
        <select
          className="w-full bg-[#f1f2f2] mt-[20px] py-[10px] px-[15px] outline-none"
          defaultValue={"last7days"}
          onChange={(e) => handleChartChange(e.target.value)}
        >
          <option value="lastYearMonths">Last year</option>
          <option value="uptoDateMonths">This year so far</option>
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

export default SalesChart;
