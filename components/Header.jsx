"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import WholePageLoading from "./WholePageLoading";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from "@context/cartContext/CartContextState";

const Header = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const [navBarVisibility, setNavBarVisibility] = useState(false);
  const [cartLength, setCartLength] = useState(0);

  const { cart, getMyCart } = useContext(CartContext);

  console.log(data);

  const handleNavBar = () => {
    setNavBarVisibility(!navBarVisibility);
  };

  const handleSignOut = async () => {
    const res = await signOut();
    router.push("/");
  };

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
              className={`absolute z-[51] top-[50px] md:top-0 right-0 bg-[#1f2937] flex-col md:flex-row flex h-[calc(100vh-50px)] gap-10 pt-8  md:pt-0 w-[200px] md:w-fit items-center transition-all text-white md:h-full md:gap-4 text-sm md:static md:translate-x-0 ${
                navBarVisibility ? "translate-x-0" : "translate-x-[200px]"
              } `}
            >
              <Link href="/">Home</Link>

              {status === "authenticated" && data !== null ? (
                <>
                  {data.user.role === "admin" ||
                    data.user.role === "manager" ||
                    (data.user.role === "employee" && (
                      <>
                        <Link href="/user/dashboard">My Dashboard</Link>
                      </>
                    ))}
                  <Link href="/admin-dashboard">Admin Dashboard</Link>
                  <Link href="/products/buy/checkout" className="relative mr-1">
                    <AiOutlineShoppingCart size={24} className="text-white" />
                    <span className="absolute right-[-10px] -top-[10px] z-10 text-[#1A56DB] font-bold text-sm">
                      {cart.length}
                    </span>
                  </Link>
                  <button className="_btn1" onClick={handleSignOut}>
                    Log out
                  </button>
                </>
              ) : (
                <Link className="_btn1" href="/user/login">
                  Log In
                </Link>
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
