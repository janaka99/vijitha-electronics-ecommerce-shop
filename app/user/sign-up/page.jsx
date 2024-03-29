"use client";

import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import WholePageLoading from "@components/WholePageLoading";
import { resolve } from "styled-jsx/css";
import toast from "react-hot-toast";
import SpinLoader from "@components/SpinLoader";
import ErrorPage from "@components/ErrorPage";
import { AiOutlineLoading } from "react-icons/ai";
import PageLoader from "@components/PageLoader";
// import Loader from "./Loader";

const page = () => {
  const router = useRouter();

  const formRef = useRef();
  const { data: session, status } = useSession();

  const [loading, setloading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    name: "",
    phone_number: "",
    address1: "",
    address2: "",
    address3: "",
    password: "",
  });
  const [errorList, setErrorList] = useState({
    email: "",
    name: "",
    phone_number: "",
    address1: "",
    address2: "",
    address3: "",
    password: "",
  });

  const [seletedUser, setSelectedUser] = useState(null);

  const setAllErrorsEmpty = () => {
    setErrorList({
      email: "",
      name: "",
      phone_number: "",
      address1: "",
      address2: "",
      address3: "",
      password: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setAllErrorsEmpty();
    setloading(true);
    let error = false;
    if (user.name == "") {
      setErrorList((prev) => ({
        ...prev,
        name: "Name Cannot Be Empty",
      }));
      error = true;
    }
    if (user.password == "") {
      setErrorList((prev) => ({
        ...prev,
        password: "Password Cannot Be Empty",
      }));
      error = true;
    } else if (user.password.length <= 8) {
      setErrorList((prev) => ({
        ...prev,
        password: "Password should be atleast 9 characters long",
      }));
      error = true;
    }
    if (user.email == "") {
      error = true;
      setErrorList((prev) => ({
        ...prev,
        email: "Email Cannot Be Empty",
      }));
    }

    if (user.phone_number == "") {
      error = true;
      setErrorList((prev) => ({
        ...prev,
        phone_number: "Contact Cannot Be Empty",
      }));
    }
    if (isNaN(Number(user.phone_number))) {
      error = true;
      setErrorList((prev) => ({
        ...prev,
        phone_number: "Contact Should Be Numbers",
      }));
    }
    if (user.address1 == "") {
      error = true;
      setErrorList((prev) => ({
        ...prev,
        address1: "Address 1 Cannot Be Empty",
      }));
    }
    if (user.address2 == "") {
      error = true;
      setErrorList((prev) => ({
        ...prev,
        address2: "Address 2 Cannot Be Empty",
      }));
    }

    if (error == true) {
      toast.error("Check the form and try again");
      setloading(false);
      return;
    }
    try {
      const res = await fetch("/api/user/sign-up", {
        method: "POST",
        body: JSON.stringify(user),
      });

      if (res.ok) {
        setloading(false);
        formRef.current.reset();
        toast.success("Successfully signed up. Verify your email address");
      } else {
        const newRes = await res.json();
        setloading(false);

        toast.error(newRes.message);
      }
    } catch (error) {
      setloading(false);

      toast.error("Something went wrong, please try again");
    }
  };

  if (status === "loading") {
    return <PageLoader />;
  }
  if (status === "authenticated") {
    return <ErrorPage />;
  }

  return (
    <div className="max-w-[700px] w-[95%] mx-auto my-16">
      <form
        ref={formRef}
        onSubmit={handleFormSubmit}
        className="w-full flex flex-col gap-1 shadow-md p-6 border-gray-100 border"
      >
        <div className="w-full flex flex-col gap-2 mb-2">
          <h1 className=" uppercase text-2xl font-semibold text-center">
            Sign Up
          </h1>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-black ml-3 ">Email</label>
            <input
              className="w-full text-sm outline-blue-500 px-2 py-2 bg-gray-100 rounded-md "
              type="email"
              placeholder="Devid@gmail.com"
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
            <div className="h-[5px] text-[12px] w-full mr-3 text-red-500 text-right ">
              {errorList.email}
            </div>
          </div>

          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-black ml-3 ">Name</label>
            <input
              className="w-full text-sm outline-blue-500 px-2 py-2 bg-gray-100 rounded-md "
              type="text"
              placeholder="Devid Liam"
              onChange={(e) => {
                setUser({
                  ...user,
                  name: e.target.value,
                });
              }}
            />
            <div className="h-[5px] text-[12px] w-full mr-3 text-red-500 text-right ">
              {errorList.name}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-black ml-3 ">Contact Number</label>
            <input
              className="w-full text-sm outline-blue-500 px-2 py-2 bg-gray-100 rounded-md "
              type="text"
              placeholder="+9475 755 555"
              onChange={(e) => {
                setUser({
                  ...user,
                  phone_number: e.target.value,
                });
              }}
            />
            <div className="h-[5px] text-[12px] w-full mr-3 text-red-500 text-right ">
              {errorList.phone_number}
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-black ml-3 ">Password</label>
            <input
              className="w-full text-sm outline-blue-500 px-2 py-2 bg-gray-100 rounded-md "
              type="password"
              placeholder="*************"
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
            />
            <div className="h-[5px] text-[12px] w-full mr-3 text-red-500 text-right ">
              {errorList.password}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <div className="w-full flex flex-col gap-2">
            <label className="text-sm text-black ml-3 ">Address</label>
            <div className="flex flex-col w-full gap-2  ">
              <div className="flex flex-col w-full mb-1">
                <input
                  className="w-full text-sm outline-blue-500 px-2 py-2 bg-gray-100 rounded-md "
                  type="text"
                  placeholder="No 00"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      address1: e.target.value,
                    });
                  }}
                />
                <div className="h-[5px] text-[12px] w-full mr-3 text-red-500 text-right ">
                  {errorList.address1}
                </div>
              </div>
              <div className="flex flex-col w-full mb-1">
                <input
                  className="w-full text-sm outline-blue-500 px-2 py-2 bg-gray-100 rounded-md "
                  type="text"
                  placeholder="Wolf street"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      address2: e.target.value,
                    });
                  }}
                />
                <div className="h-[5px] text-[12px] w-full mr-3 text-red-500 text-right">
                  {errorList.address2}
                </div>
              </div>
              <div className="flex flex-col w-full mb-1">
                <input
                  className="w-full text-sm outline-blue-500 px-2 py-2 bg-gray-100 rounded-md "
                  type="text"
                  placeholder="Califonia"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      address3: e.target.value,
                    });
                  }}
                />
                <div className="h-[5px] text-[12px] w-full mr-3 text-red-500 text-right">
                  {errorList.address3}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 mt-2">
          {loading ? (
            <button
              type="submit"
              disabled
              className="w-full p-2 text-sm bg-blue-400 ext-white rounded-md  text-white flex justify-center items-center"
            >
              <span className="animate-spin">
                <AiOutlineLoading size={20} />
              </span>
            </button>
          ) : (
            <button
              className="px-6 py-2 text-white bg-blue-500 rounded-sm w-fit min-w-full"
              type="submit"
            >
              Sign Up
            </button>
          )}
          <span className="w-full text-center text-sm tracking-wider font-semibold italic">
            Already registered?{" "}
            <a className="text-blue-500" href="/user/login">
              login
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default page;
