"use client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Loader from "./Loader";

const EditCategory = ({
  getCategories,
  category,
  setcategoryEditWindow,
  setPopUp,
}) => {
  const [title, settitle] = useState(category.name);
  const [titleError, settitleError] = useState("");
  const [reqLoading, setReqLoading] = useState(false);

  const handleFormView = () => {
    settitleError("");
    setcategoryEditWindow(false);
  };

  const handleEdit = async () => {
    setReqLoading(true);
    if (title == "") {
      settitleError("Category name cannot be empty");
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

      handleFormView();
      setPopUp({
        message: "SuccessFully Updated",
        type: "success",
        show: true,
      });
    } else {
      setPopUp({
        message: "Something went wrong try again later",
        type: "error",
        show: true,
      });
    }
    setReqLoading(false);
  };

  const handleDelete = async (id) => {
    setReqLoading(true);
    try {
      const data = {
        categoryId: id,
      };
      const res = await fetch("/api/category/delete", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const newRes = await res.json();
      if (res.ok) {
        setReqLoading(false);
        getCategories();
        handleFormView();
        setPopUp({
          message: "Successfully deleted the category",
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
      setReqLoading(false);

      setPopUp({
        message: "Something went wrong try again later",
        type: "error",
        show: true,
      });
    }
  };

  useEffect(() => {
    settitle(category.name);
  }, []);

  return (
    <div className="w-full p-2 relative">
      <div className="flex flex-col gap-3 ">
        <div className="w-full flex flex-col gap-[5px]">
          <input
            className="w-full p-3 outline-none bg-white"
            type="text"
            value={title}
            placeholder="Category name"
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />
          <div className="w-full h-[5px] mb-[5px] text-[12px] text-red-600">
            {titleError}
          </div>
        </div>
        <div className="w-full flex gap-[10px]">
          <button className="btn-2" onClick={handleEdit}>
            Update
          </button>
          <button className="btn-3" onClick={() => handleDelete(category._id)}>
            Delete
          </button>
        </div>
      </div>
      {reqLoading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[#ffffff03] backdrop-blur-[1px]">
          <Loader size={"50px"} border={"5px"} />
        </div>
      )}
    </div>
  );
};

export default EditCategory;
