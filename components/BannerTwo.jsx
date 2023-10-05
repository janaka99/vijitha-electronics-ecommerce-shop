import React from "react";

const BannerTwo = () => {
  return (
    <div className="w-full h-[500px] bg-[#86aaf9] flex items-center gap-12 mx-auto  rounded-md my-12 p-8 border-2 shadow-2xl">
      <div className="flex-[3] "></div>
      <div className="flex-[4] flex flex-col gap-12">
        <h1 className="text-white text-4xl sm:text-5xl">
          BEST SAVINGS ON <br /> NEW ARRIVALS
        </h1>
        <p className="w-full  text-base text-white">
          Discover the future of electronics shopping with the touch of a
          button! At our electronics shop, we make finding the perfect gadgets
          and devices effortless. With a vast selection and user-friendly
          interface, you can browse, select, and order your favorite electronics
          with ease. Embrace convenience, innovation, and cutting-edge
          technology – all at your fingertips.
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
