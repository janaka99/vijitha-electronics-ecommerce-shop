"use client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import Loader from "./Loader";

const EditCategory = ({
  setpopUpwindow,
  getCategories,
  category,
  getProducts,
}) => {
  const [title, settitle] = useState(category.name);
  const [titleError, settitleError] = useState("");
  const [reqLoading, setReqLoading] = useState(false);

  const handleFormView = () => {
    settitle(category.name);
    settitleError("");
    setpopUpwindow(false);
  };

  const handleEdit = async () => {
    setReqLoading(true);
    if (title == "") {
      settitleError("Category cannot be empty");
      return;
    }
    const data = {
      title: title,
      categoryId: category._id,
    };
    const res = await fetch("/api/category/update", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const newRes = await res.json();
    if (res.ok) {
      getCategories();
      getProducts();
      handleFormView();
    } else {
      settitleError(newRes.message);
    }
    setReqLoading(false);
  };

  const handleDelete = async () => {
    setReqLoading(true);
    try {
      const data = {
        categoryId: category._id,
      };
      const res = await fetch("/api/category/delete", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const newRes = await res.json();
      if (res.ok) {
        getCategories();
        getProducts();
        handleFormView();
      } else {
        settitleError(newRes.message);
      }
      setReqLoading(false);
    } catch (error) {
      console.error(error);
      settitleError("Something went wrong! Try again later");
      setReqLoading(false);
    }
  };

  useEffect(() => {
    settitle(category.name);
  }, []);

  return (
    <Main>
      <Title>Edit {category.name}</Title>
      <Form>
        <Row>
          <Label>Name</Label>
          <Input
            type="text"
            value={title}
            placeholder="Category name"
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <div>{titleError}</div>
        </Row>
        <ButtonRow>
          <Button onClick={handleEdit}>Update</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </ButtonRow>
      </Form>
      <CloseIcon>
        <AiOutlineCloseCircle size={25} onClick={handleFormView} />
      </CloseIcon>
      {reqLoading && (
        <LoadingDiv>
          <Loader size={"50px"} border={"5px"} />
        </LoadingDiv>
      )}
    </Main>
  );
};

export default EditCategory;

const Main = styled.div`
  min-width: 350px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 2px;
  -webkit-box-shadow: 0px 0px 24px 5px rgba(31, 41, 55, 0.07);
  -moz-box-shadow: 0px 0px 24px 5px rgba(31, 41, 55, 0.07);
  box-shadow: 0px 0px 24px 5px rgba(31, 41, 55, 0.07);
  position: relative;
`;

const Title = styled.div`
  height: 50px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f2937;
  width: 100%;
  color: #fff;
`;

const Form = styled.div`
  width: 100%;
  height: calc(100% - 55px);
  padding: 10px;
  display: flex;
  background-color: #1f2937;
  flex-direction: column;
  gap: 30px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  div {
    height: 5px;
    font-size: 12px;
    color: red;
  }
`;

const ButtonRow = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  gap: 10px;

  div {
    height: 5px;
    font-size: 12px;
    color: red;
  }
`;

const Label = styled.label`
  width: 100%;
  color: #fff;
`;

const Input = styled.input`
  width: 100%;

  color: #000;
  background-color: #fbfbfb;
  background-color: #fff;
  padding: 10px;
  outline: none;
`;

const Button = styled.button`
  background-color: #1a56db;
  transition: all 0.2s ease-in-out;
  color: #fff;
  width: fit-content;
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #1244af;
    transition: all 0.2s ease-in-out;
  }

  &:nth-of-type(2) {
    background-color: red;
    &:hover {
      background-color: #ff0000bc;
      transition: all 0.2s ease-in-out;
    }
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1121211111;
  cursor: pointer;
  color: #fff;
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
