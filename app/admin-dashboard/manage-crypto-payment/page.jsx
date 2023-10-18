"use client";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import ErrorPage from "@components/ErrorPage";
import toast from "react-hot-toast";

const page = () => {
  const { data, status } = useSession();

  const [loading, setloading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getData = async () => {
    setloading(true);
    try {
      const res = await fetch("/api/order/admin/eth/get-eth-orders", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setOrders[data];
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching orders");
    }
    setloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  if (status === "loading") {
    return (
      <div className="w-screen h-[calc(100vh-50px)] absolute top-[50px]">
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
          <div className="gap-6 max-w-7xl mx-auto flex flex-col">
            <h1 className="text-base uppercase tracking-wider font-bold">
              Manage Crypto Payments
            </h1>
          </div>
          <button onClick={getData}>Get orders</button>
          <div className="w-full gap-2 flex flex-col">
            <div className="flex w-full border border-gray-200 text-sm font-semibold">
              <div className="w-[20%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Email
              </div>
              <div className="w-[15%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Date
              </div>
              <div className="w-[15%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Status
              </div>
              <div className="w-[15%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Order ID
              </div>
              <div className="w-[15%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Payment Address
              </div>
              <div className="w-[5%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Total
              </div>
              <div className="w-[10%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Action
              </div>
            </div>
            {orders.map((order) => (
              <></>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
