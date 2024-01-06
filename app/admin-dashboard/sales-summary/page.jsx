"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";

import BilltableData from "@components/OrdertableData";
import Loader from "@components/Loader";
import OrdertableData from "@components/OrdertableData";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import ErrorPage from "@components/ErrorPage";
import SalesChart from "@components/SalesChart";
import SalesChart2 from "@components/SalesChart2";

const Button = ({ title, total, filter, handleTableView, type }) => {
  return (
    <button
      onClick={() => handleTableView(filter, type)}
      className="w-full p-2 rounded bg-[#1F2937] hover:shadow-lg cursor-pointer"
    >
      <div className="w-full text-center py-3 uppercase font-semibold bg-white ">
        {title}
      </div>
      <div className="text-[25px] p-2 w-full flex justify-between text-white">
        {total}{" "}
        <span className="text-blue-500 font-bold uppercase">{type}</span>
      </div>
    </button>
  );
};

const page = () => {
  const { data, status } = useSession();
  const [todaySorFar, settodaySorFar] = useState({
    total: 0,
    orders: [],
  });
  const [last7days, setlast7days] = useState({
    total: 0,
    orders: [],
  });
  const [last31days, setlast31days] = useState({
    total: 0,
    orders: [],
  });
  const [allOrders, setallOrders] = useState({
    total: 0,
    orders: [],
  });

  const [loading, setloading] = useState(false);

  const [tableData, setTableData] = useState({
    title: "Loading...",
    currencyType: "",
    orders: [],
  });

  const [istableDataLoading, setIstableDataLoading] = useState(false);
  const [currencyType, setCurrencyType] = useState("usd");

  const getData = async () => {
    setloading(true);
    try {
      const res = await fetch("/api/order/admin/get-sales-data/get-all-data", {
        method: "GET",
      });
      if (res.ok) {
        const newRes = await res.json();
        console.log(newRes);
        setlast7days(newRes.last7days);
        setlast31days(newRes.last31days);
        settodaySorFar(newRes.today);
        setallOrders(newRes.allOrders);
        setTableData({
          title: "Today so far",
          orders: newRes.today.orders,
        });
      } else {
        // settitleError(newRes.message);
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  const handleTableView = (filter, type) => {
    setIstableDataLoading(true);
    let fType;
    if (type === "usd") {
      fType = false;
    } else {
      fType = true;
    }
    switch (filter) {
      case "todaysofar":
        setTableData({
          title: "Today so far",
          currencyType: type === "usd" ? "USD" : "ETH",
          orders: todaySorFar.orders.filter(
            (order) => order.isEthPayment === fType
          ),
        });
        setIstableDataLoading(false);
        break;
      case "last7days":
        setTableData({
          title: "last 7 days",
          orders: last7days.orders.filter(
            (order) => order.isEthPayment === fType
          ),
        });
        setIstableDataLoading(false);
        break;

      case "last31days":
        setTableData({
          title: "last 31 days",
          currencyType: type === "usd" ? "USD" : "ETH",
          orders: last31days.orders.filter(
            (order) => order.isEthPayment === fType
          ),
        });
        setIstableDataLoading(false);
        break;

      case "uptotoday":
        setTableData({
          title: "Up to date",
          currencyType: type === "usd" ? "USD" : "ETH",
          orders: allOrders.orders.filter(
            (order) => order.isEthPayment === fType
          ),
        });
        setIstableDataLoading(false);
        break;
      default:
        setTableData({
          title: "today so far",
          currencyType: type === "usd" ? "USD" : "ETH",
          orders: todaySorFar.orders.filter(
            (order) => order.isEthPayment === fType
          ),
        });
        setIstableDataLoading(false);
        break;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (status === "loading") {
    return (
      <div className="w-screen h-[calc(100vh-240px)] ">
        <SpinLoader />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return <ErrorPage />;
  }
  if (data.user.role === "employee" || data.user.role === "customer") {
    return <ErrorPage />;
  }
  return (
    <div className="max-w-[1440px] w-[95%] mx-auto py-12 flex flex-col gap-8">
      {loading ? (
        <div className="w-screen h-[calc(100vh-176px)] flex justify-center items-center backdrop-blur-[1px]">
          <Loader size={"50px"} border={"5px"} />
        </div>
      ) : (
        <>
          <div className="flex gap-2 ">
            <SalesChart2 currencyType={currencyType} />
            <SalesChart currencyType={currencyType} />
          </div>
          <div className="w-full p-1 grid grid-cols-4 gap-2">
            <Button
              title={"Today So Far"}
              total={todaySorFar.total.usd}
              type="usd"
              filter={"todaysofar"}
              handleTableView={handleTableView}
            />

            <Button
              title={"Last 7 Days"}
              total={last7days.total.usd}
              type="usd"
              filter={"last7days"}
              handleTableView={handleTableView}
            />

            <Button
              title={"Last 31 Days"}
              total={last31days.total.usd}
              type="usd"
              filter={"last31days"}
              handleTableView={handleTableView}
            />

            <Button
              title={"Up to Date"}
              total={allOrders.total.usd}
              type="usd"
              filter={"uptotoday"}
              handleTableView={handleTableView}
            />
          </div>
          <div className="w-full p-1 grid grid-cols-4 gap-2">
            <Button
              title={"Today So Far"}
              total={todaySorFar.total.eth}
              type="eth"
              filter={"todaysofar"}
              handleTableView={handleTableView}
            />

            <Button
              title={"Last 7 Days"}
              total={last7days.total.eth}
              type="eth"
              filter={"last7days"}
              handleTableView={handleTableView}
            />

            <Button
              title={"Last 31 Days"}
              total={last31days.total.eth}
              type="eth"
              filter={"last31days"}
              handleTableView={handleTableView}
            />

            <Button
              title={"Up to Date"}
              total={allOrders.total.eth}
              type="eth"
              filter={"uptotoday"}
              handleTableView={handleTableView}
            />
          </div>
          <div className="w-full p-1">
            {istableDataLoading ? (
              <SpinLoader />
            ) : (
              <>
                <div className="w-full text-center flex justify-between font-extrabold uppercase py-1 text-base bg-white">
                  {tableData.title}
                  <span className="">
                    Total Orders: {tableData.orders.length}
                  </span>
                </div>
                <div className="mt-2 w-full flex flex-col">
                  <div className="flex border-[2px] border-[#f1f2f2] p-1">
                    <div className="w-[15%] p-1 text-sm font-semibold">
                      Name
                    </div>
                    <div className="w-[28%] p-1 text-sm font-semibold">
                      Email
                    </div>
                    <div className="w-[10%] p-1 text-sm font-semibold">
                      Date
                    </div>
                    <div className="w-[22%] p-1 text-sm font-semibold">Id</div>
                    <div className="w-[10%] p-1 text-sm font-semibold">
                      Status
                    </div>
                    <div className="w-[10%] p-1 text-sm font-semibold gap-1 flex items-center">
                      Total <span>{`(${tableData.currencyType})`}</span>
                    </div>
                    <div className="w-[5%] p-1 text-sm font-semibold"></div>
                  </div>
                  <div className="flex flex-col w-full">
                    {tableData.orders.map((order) => (
                      <OrdertableData key={order._id} order={order} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
