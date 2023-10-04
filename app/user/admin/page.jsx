"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SpinLoader from "@components/SpinLoader";

const page = () => {
  const { data, status } = useSession();

  const [loading, setloading] = useState(false);

  if (status === "loading") {
    <SpinLoader />;
  } else if (status === "unauthenticated") {
    router.push("/user/login");
  } else {
    return (
      <div className="max-w-[1440px] w-[95%] mx-auto py-12 flex flex-col">
        <div className="flex flex-col w-full gap-8">
          <h1 className="text-2xl">Admin Dashboard</h1>
          <div className=" flex flex-col gap-2">
            <a
              className="bg-blue-500 p-2 roudned w-fit"
              href="/user/admin/employee"
            >
              Manage Employee
            </a>

            <a
              className="bg-blue-500 p-2 roudned w-fit"
              href="/user/admin/sales"
            >
              Sales
            </a>
            <a
              className="bg-blue-500 p-2 roudned w-fit"
              href="/user/admin/bills"
            >
              Bills
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default page;
