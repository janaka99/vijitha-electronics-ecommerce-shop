"use client";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import ErrorPage from "@components/ErrorPage";
import toast from "react-hot-toast";
import EthOrderItem from "@components/EthOrderItem";
import { AiOutlineDown, AiOutlineLoading } from "react-icons/ai";

const page = () => {
  const { data, status } = useSession();

  const [loading, setloading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState({
    type: "by_customer_id",
    body: "",
  });
  const [orders, setOrders] = useState([]);

  const getData = async () => {
    setIsSearching(true);
    try {
      const res = await fetch("/api/order/admin/eth/get-eth-orders", {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setOrders(data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching orders");
    }
    setIsSearching(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(search);
    if (search.type === "") {
      toast.error("Please select a search type");
      return;
    }
    setIsSearching(true);
    if (search.body === "") {
      await getData();
      setIsSearching(false);
      return;
    }
    try {
      const res = await fetch("/api/order/admin/eth/get-eth-order-by-id", {
        method: "POST",
        body: JSON.stringify(search),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setOrders(data);
      } else {
        toast.error("Error fetching orders 2");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching ordersa");
    }
    setIsSearching(false);
  };

  const loadDataOnPageLoad = async () => {
    setloading(true);

    await getData();
    setloading(false);
  };

  useEffect(() => {
    loadDataOnPageLoad();
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
          <form
            onSubmit={handleSearch}
            className="w-full h-10 flex justify-center items-center"
          >
            <select
              className="p-2 h-full outline-none rounded-l-md text-sm bg-gray-100 border border-gray-300"
              onChange={(e) => {
                console.log(e.target.value);
                setSearch((prev) => ({
                  ...prev,
                  type: e.target.value,
                }));
              }}
              name="type"
              id=""
            >
              <option value="by_customer_id" defaultChecked>
                By Customer Id
              </option>
              <option value="by_customer_payment_address" defaultChecked>
                By Payment Address
              </option>
            </select>
            <input
              type="text"
              onChange={(e) => {
                console.log(e.target.value.length);
                setSearch((prev) => ({
                  ...prev,
                  body: e.target.value,
                }));
              }}
              className="flex-grow h-full border-none outline-none bg-gray-100 p-2 text-black text-sm"
            />
            <button className="p-2 h-full bg-blue-500 text-white text-sm">
              Search
            </button>
          </form>
          <div className="w-full gap-2 flex flex-col">
            <div className="flex w-full border border-gray-200 text-sm font-semibold">
              <div className="w-[25%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Email
              </div>
              <div className="w-[10%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Date
              </div>
              <div className="w-[20%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Order ID
              </div>
              <div className="w-[35%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Payment Address
              </div>
              <div className="w-[10%] flex items-center pl-2 justify-start py-1 border-r border-r-gray-200">
                Action
              </div>
            </div>
            {isSearching ? (
              <div className="w-full h-48 backdrop-blur-[2px] flex justify-center items-center">
                <span className="animate-spin">
                  <AiOutlineLoading size={20} className="text-blue-500" />
                </span>
              </div>
            ) : orders.length <= 0 ? (
              <div className="w-full h-20 flex justify-center items-center text-sm italic font-bold">
                Can not find any orders
              </div>
            ) : (
              orders.map((order, i) => (
                <EthOrderItem key={i} order={order} getData={getData} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default page;
