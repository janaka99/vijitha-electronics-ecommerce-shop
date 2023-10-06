import React from "react";

const Services = () => {
  return (
    <div className="w-full mt-12 flex flex-col gap-12">
      <h1 className="uppercase text-2xl font-semibold text-center">
        WHY SHOP WITH US
      </h1>
      <div className="w-full grid grid-cols-1  md:grid-cols-3 max-w-[900px] mx-auto gap-12 md:gap-6 my-12">
        <div className="max-w-[500px] md:max-w-[250px]  w-full flex flex-col gap-4 justify-center  mx-auto">
          <div className="">
            <img src="/delivery.svg" alt="" className="w-[55px] mx-auto" />
          </div>
          <div className="text-black  text-2xl font-semibold text-center">
            Fast Delivery
          </div>
          <div className="text-black  text-base text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            perspiciatis.
          </div>
        </div>
        <div className="max-w-[500px] md:max-w-[250px] w-full flex flex-col gap-4 justify-center  mx-auto">
          <div className="">
            {" "}
            <img src="/shipping.svg" alt="" className="w-[55px] mx-auto" />
          </div>
          <div className="text-black  text-2xl font-semibold text-center">
            Free Shipping
          </div>
          <div className="text-black  text-base text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            perspiciatis.
          </div>
        </div>
        <div className="max-w-[500px] md:max-w-[250px] w-full flex flex-col gap-4 justify-center mx-auto">
          <div className="">
            {" "}
            <img src="/quality.svg" alt="" className="w-[55px] mx-auto" />
          </div>
          <div className="text-black  text-2xl font-semibold text-center">
            Best Quality
          </div>
          <div className="text-black  text-base text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            perspiciatis.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
