import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5 p-12 min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto w-[95%]">
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">Contact Us</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1 flex items-center">
          <div>
            <span className="block text-xl font-semibold text-blue-600 hover:underline">
              Address
            </span>
            <div className="text-gray-600 flex flex-col">
              <p>Yatinuwara Street</p>
              <p>Kandy</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1 flex items-center">
          <div>
            <span className="block text-xl font-semibold text-blue-600 hover:underline">
              Email
            </span>
            <div className="text-gray-600 flex flex-col">
              <p>vijithaelectronicskandy@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1 flex items-center">
          <div>
            <span className="block text-xl font-semibold text-blue-600 hover:underline">
              Phone number
            </span>
            <div className="text-gray-600 flex flex-col">
              <p>+94 767661522</p>
              <p>+94 757669625</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
