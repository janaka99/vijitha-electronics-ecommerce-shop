"use client";

import Link from "next/link";
import styled from "styled-components";
import { FaHeadphones } from "react-icons/fa";
import { BsFillKeyboardFill } from "react-icons/bs";
import { GiWireCoil } from "react-icons/gi";
import { GrMonitor } from "react-icons/gr";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@components/Loader";
import SpinLoader from "@components/SpinLoader";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [reqLoading, setReqLoading] = useState(false);

  const { data, status } = useSession();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    setReqLoading(true);
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    console.log(res);
    setReqLoading(false);
  };

  if (status === "loading") {
    return <SpinLoader />;
  }
  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <Main>
      <Container>
        <Image>
          <ImageBorder>
            <h1>Wijitha Electronics</h1>
            <Icons>
              <FaHeadphones />
              <BsFillKeyboardFill />
              <GiWireCoil />
              <GrMonitor />
            </Icons>
          </ImageBorder>
        </Image>
        <Content>
          <Title>Welcome Back!</Title>
          <Form onSubmit={handleLogin}>
            <Row>
              <Label>Email</Label>
              <Input
                type="text"
                value={userInfo.email}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, email: target.value })
                }
              />
            </Row>
            <Row>
              <Label>Password</Label>
              <Input
                type="text"
                value={userInfo.password}
                onChange={({ target }) =>
                  setUserInfo({ ...userInfo, password: target.value })
                }
              />
            </Row>
            <Row>
              <SubmitButton type="submit">Login</SubmitButton>
            </Row>
          </Form>
          <ForgotPassword href="/">Forgot Password?</ForgotPassword>
        </Content>
        {reqLoading && (
          <LoadingDiv>
            <Loader size={"50px"} border={"5px"} />
          </LoadingDiv>
        )}
      </Container>
    </Main>
  );
};

export default Login;

const Main = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  max-width: 600px;
  flex-grow: 1;
  display: flex;
  -webkit-box-shadow: 0px 0px 24px 5px rgba(31, 41, 55, 0.07);
  -moz-box-shadow: 0px 0px 24px 5px rgba(31, 41, 55, 0.07);
  box-shadow: 0px 0px 24px 5px rgba(31, 41, 55, 0.07);
  position: relative;
`;

const LoadingDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  /* background-color: red; */
  background-color: #ffffff03;
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.div`
  width: 50%;
`;

const ImageBorder = styled.div`
  height: 100%;
  width: 100%;
  /* border: 5px solid #1f2937b1; */
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 35px;
    font-weight: 600;
  }
`;

const Icons = styled.div`
  display: flex;
  font-size: 20px;
  gap: 10px;
`;

const Content = styled.div`
  width: 50%;
  background-color: #1f2937;
  padding: 50px;
  text-align: center;
  color: #fff;
`;

const Title = styled.div`
  margin-bottom: 30px;
  font-size: 25px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 10px;
  font-size: 14px;
`;

const Label = styled.label``;

const Input = styled.input`
  width: 100%;
  padding: 8px 8px;
  border-radius: 2px;
  outline: none;
  color: #000;
`;

const SubmitButton = styled.button`
  background-color: #1a56db;
  padding: 8px 10px;
  transition: all 0.2s ease-in-out;
  color: #fff;
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  margin-top: 15px;
  margin-bottom: 10px;
  &:hover {
    background-color: #1244af;
    transition: all 0.2s ease-in-out;
  }
`;

const ForgotPassword = styled(Link)`
  font-size: 12px;
  text-decoration: underline;
`;
