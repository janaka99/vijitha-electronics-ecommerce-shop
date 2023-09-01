"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import WholePageLoading from "./WholePageLoading";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
  const { data, status } = useSession();
  const router = useRouter();

  const [navBarVisibility, setNavBarVisibility] = useState(false);

  const handleNavBar = () => {
    setNavBarVisibility(!navBarVisibility);
  };

  const handleSignOut = async () => {
    const res = await signOut();
  };

  if (status === "loading") {
    return <WholePageLoading />;
  } else {
    return (
      <Nav>
        <NavContainer>
          <Logo>Vijitha Electronics</Logo>
          <div className="flex gap-12 items-center">
            <Link href="/" className="relative ">
              <AiOutlineShoppingCart size={24} className="text-white" />
              <span className="absolute right-[-12px] -top-[10px] z-10 text-[#1A56DB] font-bold text-lg">
                5
              </span>
            </Link>
            <NavLinks navBarVisibility={navBarVisibility}>
              <Link href="/">Home</Link>

              {status === "authenticated" && data !== null ? (
                <>
                  <Link href="/inventory">Inventory</Link>
                  <Link href="/">Bill</Link>
                  <Link href="/user/admin">Settings</Link>

                  <button className="_btn1" onClick={handleSignOut}>
                    Log out
                  </button>
                </>
              ) : (
                <Link className="_btn1" href="/user/login">
                  Log In
                </Link>
              )}
            </NavLinks>
          </div>
          <HamburgerMenu
            onClick={handleNavBar}
            color="#fff"
            size={30}
            className="cursor-pointer lg:"
          />
        </NavContainer>
      </Nav>
    );
  }
};

export default Header;

const Nav = styled.header`
  background-color: #1f2937;
  width: 100%;
  height: 50px;
  position: relative;
`;

const NavContainer = styled.nav`
  width: 95%;
  max-width: 1440px;
  margin-inline: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Logo = styled.div`
  color: #ffffff;
`;

const NavLinks = styled.div`
  color: #ffffff;
  display: flex;
  height: 100%;
  align-items: center;
  gap: 15px;
  font-size: 14px;
  line-height: 16px;

  @media screen and (max-width: 768px) {
    position: absolute;
    top: 50px;
    right: 0;
    background-color: #1f2937;
    flex-direction: column;
    height: calc(100vh - 50px);
    gap: 40px;
    padding-top: 30px;
    width: 200px;
    align-items: center;
    transition: all 0.5s ease-in-out;
    transform: ${(props) =>
      props.navBarVisibility ? "translateX(0)" : "translateX(200px)"};
  }
`;

const HamburgerMenu = styled(GiHamburgerMenu)`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;
