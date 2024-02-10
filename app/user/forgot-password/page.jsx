"use client";
import ErrorPage from "@components/ErrorPage";
import PageLoader from "@components/PageLoader";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading } from "react-icons/ai";

const page = () => {
  const [email, setEmail] = useState("");
  const [isReqLoading, setIsReqLoading] = useState(false);

  const { status } = useSession();

  const handleForm = async (e) => {
    e.preventDefault();
    if (email == "") {
      toast.error("Email cannot be empty");
      return;
    }
    setIsReqLoading(true);
    let res = await fetch("/api/user/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    });
    if (res.ok) {
      toast.success("Email reset link successfully sent to your email");
      setIsReqLoading(false);
    } else {
      toast.error("Something went wrong");
      setIsReqLoading(false);
    }
  };
  if (status == "loading") {
    return <PageLoader />;
  }
  if (status == "authenticated") {
    return <ErrorPage />;
  }
  return (
    <div className="w-screen max-w-full h-[calc(100vh-80px)] flex justify-center items-center">
      <div className="max-w-[400px] mx-auto w-[90%] p-6 flex gap6 border border-gray-200 shadow-md rounded-md">
        <form onSubmit={handleForm} className="w-full flex flex-col gap-6">
          <input
            type="email"
            className="p-2 outline-blue-500 text-sm border border-gray-200 rounded-md"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
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
