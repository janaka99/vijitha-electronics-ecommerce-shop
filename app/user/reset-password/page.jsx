"use client";
import ErrorPage from "@components/ErrorPage";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";
import { useStateManager } from "react-select";

const page = (props) => {
  const router = useRouter();
  const [isTokenVerified, setisTokenVerified] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, seterror] = useState(false);
  const [isReqLoading, setisReqLoading] = useState(false);
  const [isTokenValidating, setisTokenValidating] = useState(true);

  const { data, status } = useSession();

  const handleForm = async (e) => {
    e.preventDefault();
    if (password == "") {
      toast.error("Password cannot be empty");
      return;
    }
    if (password.length <= 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password != confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setisReqLoading(true);
    try {
      const ver_token = window.location.search.split("=")[1].toString();
      let res = await fetch(`/api/user/reset-password`, {
        method: "POST",
        body: JSON.stringify({
          token: ver_token,
          password: password,
        }),
      });
      if (res.ok) {
        toast.success("Password reset Successfull. PLease Login");
        router.push("/user/login");
        setisReqLoading(false);
      } else {
        const msg = await res.json();
        console.log(msg);
        toast.error(`${msg.message}`);
        setisReqLoading(false);
      }
    } catch (error) {
      toast.error("Password reset failed");
      setisReqLoading(false);
    }
  };
  const verifyToken = async () => {
    setisTokenValidating(true);

    const ver_token = window.location.search.split("=")[1].toString();
    try {
      let res = await fetch(`/api/user/verify-token/token?token=${ver_token}`, {
        method: "GET",
      });
      if (res.ok) {
        console.log(res);
        setisTokenVerified(true);
        setisTokenValidating(false);
      } else {
        setisTokenValidating(false);
        setisTokenVerified(false);
      }
    } catch (error) {
      console.log("error ", error);
      setisTokenValidating(false);
    }
  };
  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("trigfgered error");
      verifyToken();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="w-screen h-[calc(100vh-50px)] absolute top-[50px]">
        <SpinLoader />
      </div>
    );
  }
  if (status === "authenticated") {
    return <ErrorPage />;
  }

  if (isTokenValidating == true) {
    return (
      <div className="w-screen h-[calc(100vh-50px)] absolute top-[50px]">
        <SpinLoader />
      </div>
    );
  }
  if (isTokenVerified === false) {
    return <ErrorPage />;
  }
  return (
    <div className="w-screen max-w-full h-[calc(100vh-80px)] flex justify-center items-center">
      <div className="max-w-[400px] mx-auto w-[90%] p-6 flex gap6 border border-gray-200 shadow-md rounded-md">
        <form onSubmit={handleForm} className="w-full flex flex-col gap-6">
          <input
            type="password"
            className="p-2 outline-blue-500 text-sm border border-gray-200 rounded-md"
            placeholder="Enter Passowrd "
            disabled={isReqLoading ? true : false}
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            type="password"
            className="p-2 outline-blue-500 text-sm border border-gray-200 rounded-md"
            placeholder="Enter Password Again"
            disabled={isReqLoading ? true : false}
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          {isReqLoading ? (
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
              type="submit"
              className="w-full p-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Reset
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default page;
