import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TbBrandWhatsapp } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6  mx-auto w-full">
      <div className="max-w-[1440px] w-[95%] pt-4 mx-auto flex flex-col gap-4">
        <div className="container mx-auto flex flex-col md:flex-row gap-10 md:gap-2 items-center md:justify-between  ">
          <div className="flex-grow md:flex-grow-[1] flex flex-col gap-6 justify-center md:justify-start ">
            <div className="text-xl font-bold  flex-grow flex flex-col justify-center md:justify-start ">
              <a href="#" className="text-white w-fit">
                Vijitha Electronics
              </a>
              <p className="text-sm text-gray-400 text-center md:text-left">
                Yatinuwara Street
              </p>
              <p className="text-sm text-gray-400 text-center md:text-left">
                Kandy
              </p>
            </div>
          </div>
          <div className="flex-grow md:flex-grow-[2] flex-col md:flex-row flex gap-10 justify-center">
            <nav className="flex-grow flex gap-2 justify-center flex-col lg:flex-row">
              <a href="#" className="block text-center hover:text-gray-400">
                Home
              </a>
              <a
                href="/terms-conditions"
                className="block text-center hover:text-gray-400"
              >
                Terms and Conditions
              </a>
              <a className="hover:text-blue-100" href="/privacy-policy">
                Privacy Policy
              </a>
              <a
                href="/contact"
                className="block text-center hover:text-gray-400"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center justify-center md:justify-end flex-grow">
              <a
                href="https://www.facebook.com/profile.php?id=100049676782993&mibextid=LQQJ4d"
                className="text-white mx-2 flex items-center gap-2 hover:text-gray-400"
              >
                Facebook
                <FaFacebook size={24} />
              </a>
              <a
                href="whatsapp://send?phone=94767008571"
                className="text-white mx-2 flex items-center gap-2 hover:text-gray-400"
              >
                Whatsapp
                <TbBrandWhatsapp size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-gray-400 text-sm text-center mt-[30px] md:text-left">
          &copy; 2024 Vijitha Electronics. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
