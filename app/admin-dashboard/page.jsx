"use client";
import ErrorPage from "@components/ErrorPage";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session, status } = useSession();

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
  return (
    <div className="flex flex-col gap-5 m-12">
      <a href="/admin-dashboard/inventory">Inventory</a>
      <a href="/admin-dashboard/manage-orders">Manage orders</a>
      <a href="/admin-dashboard/sales">Sales</a>
      <a href="/admin-dashboard/sales-summary">Sales-summary</a>
      {data.user.role === "admin" ||
        (data.user.role === "manager" && (
          <a href="/admin-dashboard/super-admin/manage-employee">
            manage-employees
          </a>
        ))}
    </div>
  );
};

export default page;
