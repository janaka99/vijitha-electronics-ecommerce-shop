"use client";

import Link from "next/link";
import styled from "styled-components";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRef, useState } from "react";

const AddNewEmployee = ({ addNewEmpWindow, setAddNewEmpWindow, getUsers }) => {
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const setAllErrorsEmpty = () => {
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setIdError("");
    setAddress1Error("");
    setAddress2Error("");
    setPasswordError("");
  };

  const FormRef = useRef();
  const roleRef = useRef();

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [idError, setIdError] = useState("");
  const [address1Error, setAddress1Error] = useState("");
  const [address2Error, setAddress2Error] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [id, setid] = useState("");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [address3, setaddress3] = useState("");
  const [password, setpassword] = useState("");

  const handleFormView = () => {
    FormRef.current.reset();
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setIdError("");
    setAddress1Error("");
    setAddress2Error("");
    setPasswordError("");
    setAddNewEmpWindow(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setAllErrorsEmpty();

    let error = false;
    if (name == "") {
      error = true;
      setNameError("Name is required");
    }

    if (email == "") {
      error = true;
      setEmailError("Email is required");
    } else if (validateEmail(email) == false) {
      setEmailError("Email is not valid");
    }

    if (password == "") {
      error = true;

      setPasswordError("Password is required");
    } else if (password.length <= 8) {
      setPasswordError("Password should be at least 8 characters long");
    }

    if (id == "") {
      error = true;

      setIdError("Id is required");
    }

    if (phoneNumber == "") {
      error = true;

      setPhoneNumberError("Phone number is required");
    }

    if (address1 == "") {
      error = true;

      setAddress1Error("Address1 is required");
    }

    if (address2 == "") {
      error = true;

      setAddress2Error("Address2 is required");
    }

    if (error == false) {
      const newEmployee = {
        name: name,
        email: email,
        id: id,
        phoneNumber: phoneNumber,
        address1: address1,
        address2: address2,
        address3: address3,
        password: password,
        role: roleRef.current.value,
      };
      try {
        const res = await fetch("/api/user/new", {
          method: "POST",
          body: JSON.stringify(newEmployee),
        });

        if (res.ok) {
          console.log(res);
          getUsers();
          handleFormView();
        } else {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  };

  return (
    <Main>
      <Container>
        <Title>Add New Employee!</Title>
        <FormContainer>
          <Form
            onSubmit={(e) => {
              handleFormSubmit(e);
            }}
            ref={FormRef}
          >
            <ContentContainer>
              <Content>
                <Row>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    required
                    onChange={(e) => {
                      console.log(e.target.value);
                      setname(e.target.value);
                    }}
                  />
                  <Dialog>{nameError}</Dialog>
                </Row>
                <Row>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    required
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                  <Dialog>{emailError}</Dialog>
                </Row>
                <Row>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    required
                    onChange={(e) => {
                      setphoneNumber(e.target.value);
                    }}
                  />
                  <Dialog>{phoneNumberError}</Dialog>
                </Row>
                <Row>
                  <Label>ID Number</Label>
                  <Input
                    type="text"
                    required
                    onChange={(e) => {
                      setid(e.target.value);
                    }}
                  />
                  <Dialog>{idError}</Dialog>
                </Row>
              </Content>
              <Content>
                <Row>
                  <Label>Password</Label>
                  <Input
                    type="text"
                    required
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                  />
                  <Dialog>{passwordError}</Dialog>
                </Row>
                <Row>
                  <Label>Role</Label>
                  <Select ref={roleRef}>
                    <option value="employee" selected>
                      Employee
                    </option>
                    <option value="admin">Admin</option>
                  </Select>
                </Row>
                <Row>
                  <Label>Address</Label>
                  <Address>
                    <Input
                      type="text"
                      placeholder="Address 1"
                      required
                      onChange={(e) => {
                        setaddress1(e.target.value);
                      }}
                    />
                    <Dialog>{address1Error}</Dialog>

                    <Input
                      type="text"
                      placeholder="Address 2"
                      required
                      onChange={(e) => {
                        setaddress2(e.target.value);
                      }}
                    />
                    <Dialog>{address2Error}</Dialog>

                    <Input
                      type="text"
                      placeholder="Address 3"
                      onChange={(e) => {
                        setaddress3(e.target.value);
                      }}
                    />
                  </Address>
                </Row>
              </Content>
            </ContentContainer>
            <Row>
              <SubmitButton type="submit">Register</SubmitButton>
            </Row>
          </Form>
        </FormContainer>
        <CloseIcon>
          <AiOutlineCloseCircle size={25} onClick={handleFormView} />
        </CloseIcon>
      </Container>
    </Main>
  );
};

export default AddNewEmployee;

const Main = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;
  left: 0;
  background: linear-gradient(270deg, #c1d1db7a 0%, #dacac076 100%);
`;

const Container = styled.div`
  max-width: 600px;
  color: #fff;
  background-color: #1f2937;
  flex-grow: 1;
  display: flex;
  padding: 30px;
  flex-direction: column;
  position: relative;
  -webkit-box-shadow: 0px 0px 24px 5px rgba(31, 41, 55, 0.07);
  -moz-box-shadow: 0px 0px 24px 5px rgba(31, 41, 55, 0.07);
  box-shadow: 0px 0px 24px 5px rgba(31, 41, 55, 0.07);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Title = styled.div`
  margin-bottom: 30px;
  font-size: 15px;
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

const Select = styled.select`
  width: 100%;
  color: #000;
  padding: 10px;
`;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 112121;
  cursor: pointer;
`;

const Dialog = styled.div`
  width: 100%;
  margin-top: -8px;
  text-align: start;
  font-size: 12px;
  letter-spacing: 0.1rem;
  color: #fd0000;
  font-weight: 600;
  height: 5px;
`;
