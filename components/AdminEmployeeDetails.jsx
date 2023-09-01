"use client";

import styled from "styled-components";
import AddNewEmployee from "./AddNewEmployee";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Loader from "./Loader";

const AdminEmployeeDetails = ({
  loggedUser,
  seletedUser,
  addNewEmpWindow,
  setAddNewEmpWindow,
  getUsers,
}) => {
  const { data: session, status } = useSession();

  const [loading, setloading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [nicError, setnicError] = useState("");
  const [address1Error, setAddress1Error] = useState("");
  const [address2Error, setAddress2Error] = useState("");

  const [name, setname] = useState(seletedUser.name);
  const [email, setemail] = useState(seletedUser.email);
  const [phoneNumber, setphoneNumber] = useState(seletedUser.phoneNumber);
  const [nic, setnic] = useState(seletedUser.NIC);
  const [address1, setaddress1] = useState(seletedUser.address1);
  const [address2, setaddress2] = useState(seletedUser.address2);
  const [address3, setaddress3] = useState(seletedUser.address3);
  const [joinedDate, setjoinedDate] = useState(seletedUser.createdAt);

  const setAllErrorsEmpty = () => {
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setnicError("");
    setAddress1Error("");
    setAddress2Error("");
  };

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const nicRef = useRef();
  const address1Ref = useRef();
  const address2Ref = useRef();
  const address3Ref = useRef();

  const handleUpdateDetails = async () => {
    setloading(true);
    let error = false;
    if (nameRef.current.value == "") {
      error = true;
      setNameError("Name is required");
    }

    if (nicRef.current.value == "") {
      error = true;
      setnicError("Id is required");
    }

    if (phoneRef.current.value == "") {
      error = true;
      setPhoneNumberError("Phone number is required");
    }

    if (address1Ref.current.value == "") {
      error = true;
      setAddress1Error("Address1 is required");
    }

    if (address2Ref.current.value == "") {
      error = true;
      setAddress2Error("Address2 is required");
    }
    if (error === true) return;
    const updatedEmployee = {
      name: nameRef.current.value,
      nic: nicRef.current.value,
      phoneNumber: phoneRef.current.value,
      address1: address1Ref.current.value,
      address2: address2Ref.current.value,
      address3: address3Ref.current.value,
      id: seletedUser._id,
    };

    try {
      const res = await fetch("/api/user/update/details", {
        method: "POST",
        body: JSON.stringify(updatedEmployee),
      });

      if (res.ok) {
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    getUsers();
    setloading(false);
  };

  const handleUpdateEmail = async () => {
    let error = false;
    setloading(true);
    if (emailRef.current.value == "") {
      error = true;
      setEmailError("Email is required");
    }
    if (error === true) return;
    const updatedEmployee = {
      email: emailRef.current.value,
      id: seletedUser._id,
    };

    try {
      const res = await fetch("/api/user/update/email", {
        method: "POST",
        body: JSON.stringify(updatedEmployee),
      });

      if (res.ok) {
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    getUsers();
    setloading(false);
  };

  const handleRemoveuser = async () => {
    setloading(true);
    const updatedEmployee = {
      userId: seletedUser._id,
    };

    try {
      const res = await fetch("/api/user/delete", {
        method: "POST",
        body: JSON.stringify(updatedEmployee),
      });

      if (res.ok) {
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    getUsers();
    setloading(false);
  };
  const handleRegisteruser = async () => {
    setloading(true);
    const updatedEmployee = {
      userId: seletedUser._id,
    };

    try {
      const res = await fetch("/api/user/reasign", {
        method: "POST",
        body: JSON.stringify(updatedEmployee),
      });

      if (res.ok) {
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    getUsers();
    setloading(false);
  };
  useEffect(() => {
    setname(seletedUser.name);
    setemail(seletedUser.email);
    setphoneNumber(seletedUser.phoneNumber);
    setnic(seletedUser.NIC);
    setaddress1(seletedUser.address1);
    setaddress2(seletedUser.address2);
    setaddress3(seletedUser.address3);
    setjoinedDate(seletedUser.createdAt);
  }, [seletedUser]);
  return (
    <Main>
      <Container>
        <Column>
          <Row>
            <Title>
              {seletedUser && seletedUser.role}{" "}
              <span>{seletedUser && seletedUser.accountStatus}</span>
            </Title>
          </Row>
          <Row>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              ref={emailRef}
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </Row>
          <Row>
            <Label>Name</Label>
            <Input
              type="text"
              value={name}
              ref={nameRef}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
          </Row>

          <Row>
            <Label>Joined Date</Label>
            <Input type="text" value={joinedDate.slice(0, 10)} readOnly />
          </Row>
          <Row>
            <Label>Phone Number</Label>
            <Input
              type="number"
              value={phoneNumber}
              ref={phoneRef}
              onChange={(e) => {
                setphoneNumber(e.target.value);
              }}
            />
          </Row>
          <Row>
            <Label>ID Number</Label>
            <Input
              type="text"
              value={nic}
              ref={nicRef}
              onChange={(e) => {
                setnic(e.target.value);
              }}
            />
          </Row>
          <Row>
            <Label>Address</Label>
            <Address>
              <Input
                type="text"
                value={address1}
                ref={address1Ref}
                onChange={(e) => {
                  setaddress1(e.target.value);
                }}
              />
              <Input
                type="text"
                value={address2}
                ref={address2Ref}
                onChange={(e) => {
                  setaddress2(e.target.value);
                }}
              />
              <Input
                type="text"
                value={address3}
                ref={address3Ref}
                onChange={(e) => {
                  setaddress3(e.target.value);
                }}
              />
            </Address>
          </Row>
        </Column>
        <Column2>
          {seletedUser && session.user.email === seletedUser.email && (
            <BtnRow>
              <Button onClick={handleUpdateEmail}>Update Email</Button>
              <Button onClick={handleUpdateDetails}>Update Details</Button>
            </BtnRow>
          )}
          {seletedUser &&
            session.user.role === "manager" &&
            session.user.email !== seletedUser.email && (
              <BtnRow>
                {seletedUser.accountStatus === "working" && (
                  <Button onClick={handleRemoveuser}>remove</Button>
                )}
                {seletedUser.accountStatus === "resigned" && (
                  <Button onClick={handleRegisteruser}>Re Asign</Button>
                )}

                {/* <Button>Update</Button> */}
              </BtnRow>
            )}
        </Column2>
      </Container>
      <AddNewEmp addNewEmpWindow={addNewEmpWindow}>
        <AddNewEmployee
          setAddNewEmpWindow={setAddNewEmpWindow}
          getUsers={getUsers}
        />
      </AddNewEmp>
      {loading && (
        <LoadingDiv>
          <Loader size={"50px"} border={"5px"} />
        </LoadingDiv>
      )}
    </Main>
  );
};

export default AdminEmployeeDetails;

const Main = styled.div`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  background-color: #1f293710;
  overflow: hidden;
  /* position: relative; */
`;

const LoadingDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: red; */
  background-color: #ffffff03;
  backdrop-filter: blur(1px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  gap: 5px;
  height: 100%;
  width: 100%;
  padding: 5px;
`;

const Column = styled.div`
  flex-grow: 2;
  background-color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  overflow-x: hidden;
`;
const Column2 = styled.div`
  width: 200px;
  background-color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: 100%;
  font-size: 14px;
`;

const Title = styled.div`
  color: #1f2937;
  font-weight: 600;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  span {
    color: limegreen;
  }
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  background-color: #fbfbfb;
  margin-left: 20px;
  padding: 5px 10px;
  outline: none;
  border: none;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const BtnRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const AddNewEmp = styled.div`
  display: ${(props) => (props.addNewEmpWindow ? "" : "none")};
`;
