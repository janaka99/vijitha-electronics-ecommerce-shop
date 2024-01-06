"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import WholePageLoading from "./WholePageLoading";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "@context/cartContext/CartContextState";
import { ethers } from "ethers";

const Header = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const [navBarVisibility, setNavBarVisibility] = useState(false);
  const [dropView, setDropView] = useState(false);
  const [cartLength, setCartLength] = useState(0);

  const { cart, getMyCart } = useContext(CartContext);

  console.log(data);

  const handleNavBar = () => {
    setNavBarVisibility(!navBarVisibility);
  };

  const handleSignOut = async () => {
    const res = await signOut();
    setNavBarVisibility(false);
    router.push("/");
  };

  // const loadBlockchaindata = async () => {
  //   const accounts = await window.ethereum.request({
  //     method: "eth_accounts",
  //   });

  //   console.log(accounts[0]);
  // };

  useEffect(() => {
    if (status === "authenticated") {
      getMyCart();
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="w-screen h-[50px] bg-[#1F2937] flex justify-start items-center">
        <div className="w-[90%] max-w-[1440px] mx-auto">
          <a className="cursor-pointer text-white" href="/">
            Vijitha Electronics
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <header className="bg-[#1f2937] w-full h-[50px] relative">
        <nav className="w-[90%] max-w-[1440px] mx-auto flex justify-between items-center h-full">
          <a className="cursor-pointer text-white" href="/">
            Vijitha Electronics
          </a>
          <div className="flex h-full gap-12 items-center">
            <div
              className={`absolute z-[51] top-[50px] md:top-0 right-0 bg-[#1f2937] flex-col md:flex-row flex h-[calc(100vh-50px)] gap-10 pt-8  md:pt-0 w-[300px] md:w-fit items-center transition-all text-white md:h-full md:gap-4 text-sm md:static md:translate-x-0 ${
                navBarVisibility ? "translate-x-0" : "translate-x-[300px]"
              } `}
            >
              <a className="hover:text-blue-100" href="/">
                Home
              </a>
              <a className="hover:text-blue-100" href="/">
                Privacy Policy
              </a>
              <a className="hover:text-blue-100" href="/">
                Contact Us
              </a>

              {status === "authenticated" && data !== null ? (
                <>
                  {data.user.role === "admin" ||
                    data.user.role === "manager" ||
                    (data.user.role === "employee" && (
                      <>
                        <a
                          className="hover:text-blue-100"
                          href="/user/dashboard"
                        >
                          My Dashboard
                        </a>
                      </>
                    ))}
                  <div className="md:hidden">
                    <a className="hover:text-blue-100" href="/admin-dashboard">
                      Admin Dashboard
                    </a>
                  </div>
                  <div className="md:hidden">
                    <a
                      className="hover:text-blue-100"
                      href="/user/dashboard/my-orders"
                    >
                      My Orders
                    </a>
                  </div>
                  <div className="md:hidden">
                    <a className="hover:text-blue-100" href="/user/dashboard">
                      Profile
                    </a>
                  </div>

                  <a href="/products/buy/checkout" className="relative mr-1">
                    <AiOutlineShoppingCart size={24} className="text-white" />
                    <span className="absolute right-[-10px] -top-[10px] z-10 text-[#1A56DB] font-bold text-sm">
                      {cart.length}
                    </span>
                  </a>

                  <div className="md:hidden">
                    <button className="_btn1" onClick={handleSignOut}>
                      Log out
                    </button>
                  </div>
                  <button
                    onClick={() => setDropView((prev) => !prev)}
                    className="w-10 h-10 flex justify-center items-center rounded-[50%]  relative"
                  >
                    <img
                      className="w-full h-full object-cover  object-center rounded-[50%]"
                      src={data.user.src}
                      alt=""
                    />
                    {dropView && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute hidden cursor-auto md:flex top-[45px] w-[200px] h-[250px] right-0 bg-[#1F2937] p-2 text-white rounded-b-md "
                      >
                        <div className="flex w-full flex-col gap-2 justify-around items-center">
                          <a
                            className="hover:text-blue-100"
                            href="/user/dashboard/my-orders"
                          >
                            My Orders
                          </a>
                          <a
                            className="hover:text-blue-100"
                            href="/user/dashboard"
                          >
                            Profile
                          </a>
                          <a
                            className="hover:text-blue-100"
                            href="/admin-dashboard"
                          >
                            Admin Dashboard
                          </a>
                          <div className="w-full flex justify-center">
                            <button className="_btn1 " onClick={handleSignOut}>
                              Log out
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                </>
              ) : (
                <a className="_btn1" href="/user/login">
                  Log In
                </a>
              )}
            </div>
          </div>
          <GiHamburgerMenu
            onClick={handleNavBar}
            color="#fff"
            size={30}
            className="cursor-pointer flex md:hidden"
          />
        </nav>
      </header>
    );
  }
};

export default Header;
