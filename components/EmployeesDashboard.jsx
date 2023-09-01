"use client";

import styled from "styled-components";
import AdminEmployeeDetails from "./AdminEmployeeDetails";
import AddNewEmployee from "./AddNewEmployee";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Loader from "./Loader";
import UserListItem from "./UserListItem";

const EmployeesDashboard = () => {
  const [addNewEmpWindow, setAddNewEmpWindow] = useState(false);

  const { data: session, status } = useSession();

  const handleAddEmpWindow = () => {
    setAddNewEmpWindow(!addNewEmpWindow);
  };

  const [users, setAllUsers] = useState([]);
  const [seletedUser, setseletedUser] = useState([]);
  const [userView, setuserView] = useState(null);
  const [loading, setloading] = useState(false);

  //get all the users available
  const getUsers = async () => {
    setloading(true);
    try {
      const res = await fetch("/api/user/all", {
        method: "GET",
      });
      const newRes = await res.json();
      console.log(newRes);
      if (res.ok) {
        console.log("session found ", session);
        setseletedUser(() =>
          newRes.filter((i) => i.email === session.user.email)
        );
        setAllUsers(() => newRes.filter((i) => i.email !== session.user.email));
        const sell = newRes.filter((i) => i.email === session.user.email);
        setuserView(sell[0]);
        console.log("user ", userView);
        console.log("users ", seletedUser);
        console.log("user1 ", users);
      } else {
        settitleError(newRes.message);
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };

  useEffect(() => {
    getUsers();
  }, [status]);

  if (loading) {
    return (
      <LoadingDiv>
        <Loader size={"50px"} border={"5px"} />
      </LoadingDiv>
    );
  }

  return (
    <Main>
      <Container>
        <Title>Manage Employee</Title>
        <Dashboard>
          <Left>
            {session.user.role === "manager" && (
              <Row>
                <Button onClick={handleAddEmpWindow}>Add New Employee</Button>
              </Row>
            )}
            <Users>
              {seletedUser.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  setuserView={setuserView}
                />
              ))}
              {session.user.role === "admin" ||
                (session.user.role === "manager" &&
                  users.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      setuserView={setuserView}
                    />
                  )))}
            </Users>
          </Left>
          <Right>
            {userView === null ? (
              ""
            ) : (
              <AdminEmployeeDetails
                seletedUser={userView}
                setAddNewEmpWindow={setAddNewEmpWindow}
                addNewEmpWindow={addNewEmpWindow}
                getUsers={getUsers}
              />
            )}
          </Right>
        </Dashboard>
      </Container>
    </Main>
  );
};

export default EmployeesDashboard;

const LoadingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  background-color: #1f293710;
  padding: 5px;
  width: 100%;
  text-align: center;
`;

const Dashboard = styled.div`
  flex-grow: 1;
  display: flex;
  width: 100%;
  overflow-x: hidden;
`;

const Left = styled.div`
  width: 200px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Right = styled.div`
  width: calc(100% - 200px);
  margin-top: 5px;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Row = styled.div`
  border: 5px solid #1f293710;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Users = styled.div`
  /* padding: 5px; */
  border: 5px solid #1f293710;
  background-color: #fff;
  flex-grow: 1;
  overflow-x: hidden;
`;

const Button = styled.button`
  background-color: #1a56db;
  padding: 5px 5px;
  transition: all 0.2s ease-in-out;
  color: #fff;
  width: 100%;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  &:hover {
    background-color: #1244af;
    transition: all 0.2s ease-in-out;
  }
`;

const User = styled.div`
  background-color: #f3f3f353;
  margin: 0 5px 5px 5px;

  display: flex;
  justify-content: start;
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #f3f3f3b5;
  }
`;
