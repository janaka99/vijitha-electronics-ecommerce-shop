"use client";
import ErrorPage from "@components/ErrorPage";
import ManageOrders from "@components/ManageOrders";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";

import React from "react";
import { useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { FcCancel, FcProcess, FcShipped } from "react-icons/fc";
import { GiConfirmed } from "react-icons/gi";
import { MdOutlinePendingActions, MdPaid } from "react-icons/md";

const Button = ({ name, icon, setView, view }) => {
  const handleView = (n) => {
    setView(n);
  };
  return (
    <button
      onClick={() => handleView(name)}
      className={`w-[150px] flex flex-col justify-center items-center gap-2 shadow-xl px-6 py-3 cursor-pointer rounded-lg hover:bg-gray-50 transition-all ${
        view === name && "bg-gray-50"
      }`}
    >
      {icon}
      <div className="text-base uppercase w-full text-center font-semibold">
        {name}
      </div>
    </button>
  );
};

const page = () => {
  const [view, setView] = useState("Pending");
  const { data: session, status } = useSession();

  // const handleView = (view) => {
  //   setView(view);
  // };
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
  if (session.user.role === "customer") {
    return <ErrorPage />;
  }

  return (
    <div className="max-w-[1440px] mx-auto w-[95%] py-12 flex flex-col gap-12">
      <div className="text-lg uppercase w-full text-center font-semibold">
        Manage Orders
      </div>
      <div className="w-full flex flex-wrap gap-6 justify-center items-center">
        <Button
          name="Not Paid"
          icon={<MdPaid color="red" size={50} />}
          setView={setView}
          view={view}
        />
        <Button
          name="Pending"
          icon={<MdOutlinePendingActions size={50} color="blue" />}
          setView={setView}
          view={view}
        />
        <Button
          name="Confirmed"
          icon={<GiConfirmed size={50} color="green" />}
          setView={setView}
          view={view}
        />
        <Button
          name="Processing"
          icon={<FcProcess size={50} />}
          setView={setView}
          view={view}
        />

        <Button
          name="Dispatched"
          icon={<FaShippingFast size={50} />}
          setView={setView}
          view={view}
        />

        <Button
          name="Delivered"
          icon={<FcShipped size={50} />}
          setView={setView}
          view={view}
        />
        <Button
          name="Canceled"
          icon={<FcCancel size={50} />}
          setView={setView}
          view={view}
        />
      </div>
      <div className="w-full flex flex-col gap-6">
        <div className="text-lg uppercase w-full text-left font-semibold">
          {view} Orders
        </div>
        <ManageOrders type={view} />
      </div>
    </div>
  );
};

export default page;
