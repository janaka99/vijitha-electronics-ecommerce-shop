import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6  mx-auto w-full">
      <div className="max-w-[1440px] w-[95%] pt-4 mx-auto flex flex-col gap-4">
        <div className="container mx-auto flex flex-col md:flex-row gap-10 md:gap-2 items-center md:justify-between w-[95%] ">
          <div className="flex-grow md:flex-grow-[1] flex flex-col gap-6 justify-center md:justify-start ">
            <div className="text-xl font-bold  flex-grow flex justify-center ">
              <a href="#" className="text-white">
                Vijitha Electronics
              </a>
            </div>
          </div>
          <div className="flex-grow md:flex-grow-[2] flex-col md:flex-row flex gap-10 justify-center">
            <nav className="flex-grow flex gap-2 justify-center flex-col lg:flex-row">
              <a href="#" className="block text-center hover:text-gray-400">
                Home
              </a>
              <a href="#" className="block text-center hover:text-gray-400">
                Terms and Conditions
              </a>
              <a href="#" className="block text-center hover:text-gray-400">
                Contact
              </a>
            </nav>
            <div className="flex items-center justify-center flex-grow">
              <a href="#" className="text-white mx-2 hover:text-gray-400">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-white mx-2 hover:text-gray-400">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white mx-2 hover:text-gray-400">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white mx-2 hover:text-gray-400">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-sm text-center mt-[30px] md:text-left">
          &copy; 2023 Vijitha Electronics. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
