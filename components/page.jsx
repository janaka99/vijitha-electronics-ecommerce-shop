"use client";
import ErrorPage from "@components/ErrorPage";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import React from "react";

const Card = ({ icon, title, description }) => (
  <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1 flex items-center">
    <div className="mr-4">{icon}</div>
    <div>
      <a
        href="#"
        className="block text-xl font-semibold text-blue-600 hover:underline"
      >
        {title}
      </a>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
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
    <div className="flex flex-col gap-5 p-12 min-h-[calc(100vh-240px)]">
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1">
          <a
            href="/admin-dashboard/inventory"
            class="block text-xl font-semibold text-blue-600 hover:underline"
          >
            Inventory
          </a>
          <p class="text-gray-600">Manage your inventory here.</p>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1">
          <a
            href="/admin-dashboard/manage-orders"
            class="block text-xl font-semibold text-blue-600 hover:underline"
          >
            Manage Orders
          </a>
          <p class="text-gray-600">View and manage customer orders.</p>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1">
          <a
            href="/admin-dashboard/sales-summary"
            class="block text-xl font-semibold text-blue-600 hover:underline"
          >
            Sales Summary
          </a>
          <p class="text-gray-600">Get an overview of your sales.</p>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1">
          <a
            href="/admin-dashboard/manage-crypto-payment"
            class="block text-xl font-semibold text-blue-600 hover:underline"
          >
            Manage Crypto Payment
          </a>
          <p class="text-gray-600">Manage cryptocurrency payments.</p>
        </div>

        <div class="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1">
          <a
            href="/admin-dashboard/super-admin/manage-employee"
            class="block text-xl font-semibold text-blue-600 hover:underline"
          >
            Manage Employees
          </a>
          <p class="text-gray-600">Manage Employees Here.</p>
        </div>
      </div>
    </div>
  );
};

export default page;

// {data.user.role === "admin" ||
// (data.user.role === "manager" && (

//   ))}
