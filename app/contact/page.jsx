"use client";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaWhatsappSquare, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const page = () => {
  const contact = [
    {
      title: "Address",
      text: "Yatinuwara Street, Kandy",
      icon: FaLocationDot,
      color: "text-gray-600",
    },
    {
      title: "Email",
      text: "vijithaelectronicskandy@gmail.com",
      icon: MdEmail,
      color: "text-red-300",
    },
    {
      title: "Phone Number",
      text: "+94 767661522",
      icon: FaPhone,
      color: "text-blue-500",
    },
    {
      title: "Whatsapp",
      text: "+94 767008571",
      icon: FaWhatsappSquare,
      color: "text-green-500",
    },
  ];

  return (
    <div className="flex flex-col gap-5 p-12 min-h-[calc(100vh-240px)] max-w-[1440px] mx-auto w-[95%]">
      <h1 className="text-2xl font-semibold text-blue-600 mb-4">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contact.map((c, i) => (
          <div
            key={i}
            className={` p-4 bg-white shadow-lg rounded-lg hover:shadow-xl hover:border-blue-600 border transition-transform transform hover:-translate-y-1 flex items-center`}
          >
            <div className="mr-4">
              <c.icon size={50} className={c.color} />
            </div>
            <div>
              <span className="block text-xl font-semibold text-blue-600 hover:underline">
                {c.title}
              </span>
              <p className="text-gray-600">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
