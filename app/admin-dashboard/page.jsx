"use client";
import ErrorPage from "@components/ErrorPage";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import React from "react";
import {
  FaBitcoin,
  FaBox,
  FaChartBar,
  FaClipboardList,
  FaMoneyBillAlt,
  FaUser,
} from "react-icons/fa";

const Card = ({ icon, title, description, link }) => (
  <a
    href={link}
    className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1 flex items-center"
  >
    <div className="mr-4">{icon}</div>
    <div>
      <span className="block text-xl font-semibold text-blue-600 hover:underline">
        {title}
      </span>
      <p className="text-gray-600">{description}</p>
    </div>
  </a>
);

const page = () => {
  const { data, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-screen h-[calc(100vh-240px)]">
        <SpinLoader />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return <ErrorPage />;
  }
  return (
    <div className="flex flex-col gap-5 p-12 min-h-[calc(100vh-240px)] max-w-[1440px] w-[95%]">
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">
        Control Center
      </h1>
      <div className="grid grid-cols-2 gap-4">
        <Card
          icon={<FaBox size={30} color="blue" />}
          title="Inventory"
          description="Manage your inventory here."
          link="/admin-dashboard/inventory"
        />
        <Card
          icon={<FaClipboardList size={30} color="green" />}
          title="Manage Orders"
          description="View and manage customer orders."
          link="/admin-dashboard/manage-orders"
        />
        <Card
          icon={<FaChartBar size={30} color="red" />}
          title="Sales Summary"
          description="Get an overview of your sales."
          link="/admin-dashboard/sales-summary"
        />
        <Card
          icon={<FaBitcoin size={30} color="orange" />}
          title="Manage Crypto Payment"
          description="Manage cryptocurrency payments."
          link="/admin-dashboard/manage-crypto-payment"
        />
        <Card
          icon={<FaUser size={30} color="purple" />}
          title="Manage Employees"
          description="Manage Employees Here."
          link="/admin-dashboard/super-admin/manage-employee"
        />
        <Card
          icon={<FaMoneyBillAlt size={30} color="green" />}
          title="Manage Stripe Payment"
          description="Manage stripe payments."
          link="/admin-dashboard/manage-stripe-payment"
        />
      </div>
    </div>
  );
};

export default page;

// {data.user.role === "admin" ||
// (data.user.role === "manager" && (

//   ))}
