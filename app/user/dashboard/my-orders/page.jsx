"use client";
import React, { useEffect, useState } from "react";
import CustomerOrder from "@components/CustomerOrder";
import ErrorPage from "@components/ErrorPage";
import { useSession } from "next-auth/react";
import PageLoader from "@components/PageLoader";

const page = () => {
  const [rating, setRating] = useState(0);
  const [orders, setOrders] = useState([]);

  const { data, status } = useSession();

  const getAllOrders = async () => {
    const res = await fetch("/api/customer/get/my-all-orders", {
      method: "GET",
    });

    if (res.ok) {
      let data = await res.json();
      setOrders(data);
      console.log(data);
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  if (status === "loading") {
    return <PageLoader />;
  }
  if (status === "unauthenticated") {
    return <ErrorPage />;
  }

  return (
    <div className="max-w-[768px] flex-grow min-h-[calc(100svh-150px)] mx-auto w-[95%] py-12 flex flex-col gap-12">
      <div className="text-lg uppercase w-full text-center font-semibold">
        Order History
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="w-full max-w-[768px] mx-auto flex flex-col gap-4">
          {orders.length <= 0 ? (
            <div>No Orders</div>
          ) : (
            orders.map((order) => (
              <>
                <CustomerOrder
                  order={order}
                  c_date={order.createdAt}
                  getAllOrders={getAllOrders}
                />
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
