"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdLocalShipping } from "react-icons/md";
import { FcShipped } from "react-icons/fc";
import { AiFillMessage, AiOutlineShoppingCart } from "react-icons/ai";
import { FaShippingFast } from "react-icons/fa";
import { useRouter } from "next/navigation";
import WholePageLoading from "@components/WholePageLoading";
import SpinLoader from "@components/SpinLoader";
import ErrorPage from "@components/ErrorPage";
import { TbPackages } from "react-icons/tb";

const page = () => {
  const router = useRouter();
  const { data, status } = useSession();

  const [user, setUser] = useState({
    email: "",
    name: "",
    phone_number: "",
    address1: "",
    address2: "",
    address3: "",
    password: "",
  });

  const getUser = async () => {
    const res = await fetch("/api/user/get", {
      method: "GET",
    });
    const jres = await res.json();
    console.log(jres);
    if (res.ok) {
      setUser({
        ...user,
        email: jres.user.email,
        name: jres.user.name,
        phone_number: jres.user.phoneNumber,
        address1: jres.user.address1,
        address2: jres.user.address2,
        address3: jres.user.address3,
      });
    } else {
    }
  };

  useEffect(() => {
    getUser();
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
  return (
    <div className="max-w-[1440px] w-[95%] mx-auto my-12 flex flex-col gap-12">
      <div className="w-full max-w-[400px] justify-between mx-auto grid grid-cols-2 gap-3">
        <a
          href="/user/dashboard/my-orders"
          className="w-full flex flex-col justify-center items-center gap-2 p-2 rounded-md shadow-md hover:shadow-lg transition-all border cursor-pointer"
        >
          <TbPackages size={40} />
          <p>Orders</p>
        </a>
        <a
          href="/products/buy/checkout"
          className="w-full flex flex-col justify-center items-center gap-2 p-2 rounded-md shadow-md hover:shadow-lg transition-all border cursor-pointer"
        >
          <AiOutlineShoppingCart color="blue" size={40} />
          <p>Cart</p>
        </a>{" "}
      </div>
      <div className="w-full max-w-[700px] mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg border">
          <div className="text-2xl font-semibold mb-4 text-gray-700">
            My Information
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Name</p>
            <p className="ml-4 text-black font-medium">{user.name}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Email</p>
            <p className="ml-4 text-blue-600 font-medium">{user.email}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600">Address</p>
            <p className="ml-4 text-black font-medium">{user.address1} </p>
            <p className="ml-4 text-black font-medium">{user.address2} </p>
            <p className="ml-4 text-black font-medium">{user.address3}</p>
          </div>
          <div className="mb-4">
            <p className=" text-gray-600">Contact Number</p>
            <p className="ml-4 text-green-600 font-medium">
              {user.phone_number}
            </p>
          </div>
          <div className="mb-4">
            <a href="/user/dashboard/edit-my-information" className="btn-1">
              Edit My Information
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
