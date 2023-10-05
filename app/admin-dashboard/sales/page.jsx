"use client";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";
import SalesChart2 from "@components/SalesChart2";
import SalesChart from "@components/SalesChart";

const Page = () => {
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
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader size={"50px"} border={"5px"} />
      </div>
    );
  }
  return (
    <div className="max-w-[1440px] mx-auto w-[95%] ">
      <div className="h-full w-full flex flex-col">
        <h1 className=" uppercase text-2xl font-semibold text-center mt-12">
          Sales Summary
        </h1>
        <div className="flex-grow grid w-full grid-cols-1  gap-12 mb-12"></div>
      </div>
    </div>
  );
};

export default Page;
