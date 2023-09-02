"use client";
import InventoryCategoryItem from "@components/InventoryCategoryItem";
import Loader from "@components/Loader";
import PopUp from "@components/PopUp";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const page = () => {
  const [categories, setCategories] = useState([]);
  const [titleError, settitleError] = useState("");
  const [reqLoading, setReqLoading] = useState(false);
  const [title, settitle] = useState("");

  const [popUp, setPopUp] = useState({
    message: "",
    type: "",
    show: false,
  });

  const formRef = useRef();

  const getCategories = async () => {
    try {
      const res = await fetch("/api/category/all", {
        method: "GET",
      });
      const newRes = await res.json();
      if (res.ok) {
        setCategories(newRes);
      } else {
        // settitleError(newRes.message);
      }
    } catch (error) {}
  };

  const handleFormView = () => {
    formRef.current.reset();
    settitleError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setReqLoading(true);
    if (title == "") {
      setReqLoading(false);
      settitleError("Category name cannot be empty");
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
        handleFormView();
        setReqLoading(false);

        setPopUp({
          message: "Category successfully added",
          type: "success",
          show: true,
        });
      } else {
        setReqLoading(false);
        setPopUp({
          message: "Something went wrong try again later",
          type: "error",
          show: true,
        });
      }
    } catch (error) {
      setPopUp({
        message: "Something went wrong try again later",
        type: "error",
        show: true,
      });
      setReqLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="max-w-[720px] w-[95%] mx-auto my-12 flex flex-col gap-12 relative">
      <h1 className=" uppercase text-2xl font-semibold text-center">
        Add new Category
      </h1>
      <form
        className="w-full h-fit p-3 flex bg-[#f3f3f353] flex-col gap-6 relative"
        ref={formRef}
        onSubmit={handleFormSubmit}
      >
        <div className="w-full flex flex-col gap-3">
          <label className="w-full text-black">Name</label>
          <input
            className="w-full text-black text-sm bg-white p-3 outline-none"
            type="text"
            placeholder="Category name"
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <div className="h-[5px] text-sm text-red-600">{titleError}</div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <button className="btn-2 min-w-full" type="submit">
            Add
          </button>
        </div>
        {reqLoading && (
          <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
            <Loader size={"50px"} border={"5px"} />
          </div>
        )}
      </form>
      <h1 className=" uppercase text-2xl font-semibold text-center">
        Categories
      </h1>
      <div className="">
        {categories.map((category) => (
          <InventoryCategoryItem
            key={category._id}
            category={category}
            getCategories={getCategories}
            setPopUp={setPopUp}
          />
        ))}
      </div>
      {popUp.show && <PopUp popUp={popUp} setPopUp={setPopUp} />}
    </div>
  );
};

export default page;
