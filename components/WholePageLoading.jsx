"use client";
import React from "react";
import Loader from "./Loader";

const WholePageLoading = () => {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 bg-white z-[11111111111111111111111111111111111111111]">
      <div className="flex items-center justify-start h-screen w-screen flex-col overflow-hidden">
        <div className="bg-[#1f2937] w-full h-[50px] relative backdrop-blur-[1px]"></div>
        <Loader size={"80px"} border={"16px"} />
      </div>
    </div>
  );
};

export default WholePageLoading;
