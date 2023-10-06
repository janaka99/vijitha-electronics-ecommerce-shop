import React from "react";
import styled from "styled-components";

const Banner = () => {
  return (
    <div className=" relative w-screen h-[calc(100vh-50px)] flex items-center justify-center  text-white ">
      <div className="flex flex-col gap-8 w-[90%] max-w-[1024px] mx-auto justify-center items-center text-center">
        <h1 className=" text-5xl sm:text-7xl">
          Tech, at your fingertips. Shop smarter, shop here
        </h1>
        <a
          href="/products"
          className="px-6 py-2 bg-color-1 font-bold tracking-wider  w-fit"
        >
          SHOP NOW
        </a>
      </div>
      <div className="absolute inset-0 w-full h-full justify-center flex items-center z-[-1] ">
        <img
          src="/images/hero2.avif"
          className="w-full h-full object-cover object-center bg-no-repeat brightness-50"
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
