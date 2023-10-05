"use client";

import Link from "next/link";
import styled from "styled-components";
import { FaHeadphones } from "react-icons/fa";
import { BsFillKeyboardFill } from "react-icons/bs";
import { GiWireCoil } from "react-icons/gi";
import { GrMonitor } from "react-icons/gr";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@components/Loader";
import SpinLoader from "@components/SpinLoader";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [reqLoading, setReqLoading] = useState(false);

  const { data, status } = useSession();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    setReqLoading(true);
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    console.log(res);
    setReqLoading(false);
  };

  if (status === "loading") {
    return <SpinLoader />;
  }
  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="max-w-[95%] mx-auto w-screen h-[calc(100vh-50px)] flex justify-center items-center">
      <div className="max-w-[400px] w-full  flex flex-col justify-center items-center p-6 gap-2 border border-gray-100 shadow-md rounded-md">
        <div className="w-full flex flex-col gap-4 pt-2 pb-4 text-center">
          <h1 className="text-2xl uppercase tracking-wider font-semibold">
            Vijitha Electronics
          </h1>
          <div className="flex w-full justify-center items-center gap-1 text-black">
            <FaHeadphones />
            <BsFillKeyboardFill />
            <GiWireCoil />
            <GrMonitor />
          </div>
        </div>
        <div className=" flex flex-col gap-1 w-full ">
          <h1 className="text-base text-left tracking-widest mb-4  ">
            Welcome Back!
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="w-full flex  ">
              <input
                className="w-full rounded-md border border-gray-100 outline-blue-500  text-sm p-2"
                type="email"
                placeholder="Email"
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
              />
            </div>
            <div className="w-full flex  ">
              <input
                className="w-full rounded-md border border-gray-100 outline-blue-500  text-sm p-2"
                type="password"
                placeholder="Password"
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
              />
            </div>
            <div className="w-full flex justify-center">
              <button
                className="w-fit bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md text-sm text-white font-bold tracking-widest"
                type="submit"
              >
                Login
              </button>
            </div>
            <span className="w-full text-center text-sm tracking-wider font-semibold italic">
              Not registered?{" "}
              <a className="text-blue-500" href="/user/sign-up">
                Sign Up
              </a>
            </span>
          </form>
          <span className="w-full text-center text-sm tracking-wider font-semibold ">
            <a className="underline text-sm" href="/forgot-password">
              Forgot Password
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
