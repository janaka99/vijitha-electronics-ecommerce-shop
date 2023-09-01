import React from "react";
import styled from "styled-components";

const BannerTwo = () => {
  return (
    <div className="w-full h-[500px] bg-[#86aaf9] flex items-center gap-12 mx-auto  rounded-md my-12 p-8 border-2 shadow-2xl">
      <div className="flex-[3] "></div>
      <div className="flex-[4] flex flex-col gap-12">
        <h1 className="text-white text-4xl sm:text-5xl">
          BEST SAVINGS ON <br /> NEW ARRIVALS
        </h1>
        <p className="w-full  text-base text-white">
          After seeing that there is no rejection, the matter is bound to
          prevent it, it will happen not to the needs of the error, the
          distinction of resilience takes. Our escape from pains is the result
          of distinction, we may be able to repulse some of the happy elders
          when, as you see, they endure the accusers.
        </p>
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-color-1 text-white w-fit">
            Buy Now
          </button>
          <button className="px-6 py-2 bg-white text-black w-fit">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default BannerTwo;

const Main = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

const Container = styled.div`
  width: 100%;
  height: 600px;
  margin: 30px auto;
  display: flex;
  gap: 30px;
  background-color: red;
  border-radius: 20px;
`;

const Left = styled.div`
  width: 75%;

  h1 {
    font-size: 96px;
  }
`;
const Right = styled.div`
  width: 25%;
`;

const Button = styled.button``;
