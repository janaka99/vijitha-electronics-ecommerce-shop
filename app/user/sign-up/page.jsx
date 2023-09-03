"use client";

import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import WholePageLoading from "@components/WholePageLoading";
import { resolve } from "styled-jsx/css";
// import Loader from "./Loader";

const page = () => {
  const router = useRouter();
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

  const asdasd = async () => {
    await new Promise((resolve) => setTimeout(resolve, 10000));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("asdasd ", errorList);
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
    } else if (typeof Number(user.phone_number) == NaN) {
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
    console.log(user);

    await asdasd();
    console.log(errorList);
    //   try {
    //     const res = await fetch("/api/user/reasign", {
    //       method: "POST",
    //       body: JSON.stringify(updatedEmployee),
    //     });

    //     if (res.ok) {
    //       console.log(res);
    //     } else {
    //       console.log(res);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   getUsers();
    setloading(false);
  };

  if (status === "loading") {
    <WholePageLoading />;
  } else if (status === "unauthenticated") {
    router.push("/user/login");
  }

  return (
    <div className="max-w-[700px] w-[95%] mx-auto my-16">
      <form onSubmit={handleFormSubmit} className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2 mb-12">
          <h1 className=" uppercase text-2xl font-semibold text-center">
            Sign Up
          </h1>
        </div>
        <div className="w-full flex flex-col gap-1">
          <label className="text-sm text-black ml-3 ">Email</label>
          <input
            className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
              });
            }}
          />
          <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-right ">
            {errorList.email}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm text-black ml-3 ">Name</label>
          <input
            className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => {
              setUser({
                ...user,
                name: e.target.value,
              });
            }}
          />
          <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-right ">
            {errorList.name}
          </div>
        </div>

        <div className="w-full flex flex-col gap-2">
          <label className="text-sm text-black ml-3 ">Contact Number</label>
          <input
            className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
            type="text"
            placeholder="Contact Number"
            onChange={(e) => {
              setUser({
                ...user,
                phone_number: e.target.value,
              });
            }}
          />
          <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-right ">
            {errorList.phone_number}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm text-black ml-3 ">Address</label>
          <div className="flex flex-col w-full gap-8 ">
            <div className="flex flex-col w-full ">
              <input
                className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                type="text"
                placeholder="Address 1"
                onChange={(e) => {
                  setUser({
                    ...user,
                    address1: e.target.value,
                  });
                }}
              />
              <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-right ">
                {errorList.address1}
              </div>
            </div>
            <div className="flex flex-col w-full ">
              <input
                className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                type="text"
                placeholder="Address 2"
                onChange={(e) => {
                  setUser({
                    ...user,
                    address2: e.target.value,
                  });
                }}
              />
              <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-right">
                {errorList.address2}
              </div>
            </div>
            <div className="flex flex-col w-full ">
              <input
                className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                type="text"
                placeholder="Address 2"
                onChange={(e) => {
                  setUser({
                    ...user,
                    address3: e.target.value,
                  });
                }}
              />
              <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-right">
                {errorList.address3}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm text-black ml-3 ">Password</label>
          <input
            className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
            type="text"
            placeholder="Contact Number"
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value,
              });
            }}
          />
          <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-right ">
            {errorList.password}
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <button className="btn-1 min-w-full" type="submit">
            Sign Up
          </button>
        </div>
      </form>
      {/* <AddNewEmp addNewEmpWindow={addNewEmpWindow}>
        <AddNewEmployee
          setAddNewEmpWindow={setAddNewEmpWindow}
          getUsers={getUsers}
        />
      </AddNewEmp> */}
      {loading && (
        // <LoadingDiv>
        //   <Loader size={"50px"} border={"5px"} />
        // </LoadingDiv>
        <></>
      )}
    </div>
  );
};

export default page;
