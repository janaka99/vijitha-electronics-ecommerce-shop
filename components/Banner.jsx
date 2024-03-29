import React from "react";
import styled from "styled-components";
// import Image from "/images/hero2.avif";

const Banner = () => {
  return (
    <div className=" relative w-screen h-[calc(100svh-50px)] flex items-center justify-center  text-white ">
      <div className="max-w-[1440px] py-20 w-[95%] h-full flex flex-col md:flex-row gap-10">
        <div className="flex flex-col gap-8 w-[90%] h-full  mx-auto justify-center items-center text-center">
          <h1 className=" text-5xl sm:text-7xl uppercase">
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
            src={"/images/hero2.avif"}
            className="w-full h-full object-cover object-center bg-no-repeat brightness-[0.25]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
