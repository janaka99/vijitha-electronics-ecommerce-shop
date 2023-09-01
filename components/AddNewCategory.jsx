"use client";
import { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import Loader from "./Loader";

const AddNewCategory = ({
  setCategoryAddWindow,
  getCategories,
  getProducts,
}) => {
  const [title, settitle] = useState("");
  const [titleError, settitleError] = useState("");
  const [reqLoading, setReqLoading] = useState(false);

  const formRef = useRef();

  const handleFormView = () => {
    formRef.current.reset();
    settitleError("");
    setCategoryAddWindow(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setReqLoading(true);
    if (title == "") {
      settitleError("Category cannot be empty");
      return;
    }
    try {
      const data = {
        name: title,
      };
      const res = await fetch("/api/category/new", {
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
      settitleError("Something went wrong! Try again later");
      setReqLoading(false);
    }
  };

  return (
    <div className="max-w-[350px] w-[90%] h-fit flex flex-col  gap-1 gradient-bg relative">
      <div className="h-[50px] p-1 flex justify-center items-center bg-[#1f2937] w-full text-white">
        Add New Category
      </div>
      <form
        className="w-full h-fit p-3 flex bg-[#1f2937] flex-col gap-6"
        ref={formRef}
        onSubmit={handleFormSubmit}
      >
        <div className="w-full flex flex-col gap-3">
          <label className="w-full text-white">Name</label>
          <input
            className="w-full text-black bg-white p-3 outline-none"
            type="text"
            placeholder="Category name"
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <div className="h-[5px] text-sm text-red-900">{titleError}</div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <button className="btn-2 min-w-full" type="submit">
            Add
          </button>
        </div>
      </form>
      <div className="absolute top-1 right-1 z-50 cursor-pointer text-white">
        <AiOutlineCloseCircle size={25} onClick={handleFormView} />
      </div>
      {reqLoading && (
        <div className="absolute w-full h-full bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
          <Loader size={"50px"} border={"5px"} />
        </div>
      )}
    </div>
  );
};

export default AddNewCategory;
