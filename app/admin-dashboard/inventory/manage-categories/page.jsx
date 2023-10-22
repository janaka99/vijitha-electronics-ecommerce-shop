"use client";
import InventoryCategoryItem from "@components/InventoryCategoryItem";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const { data, status } = useSession();
  const [categories, setCategories] = useState([]);
  const [titleError, settitleError] = useState("");
  const [reqLoading, setReqLoading] = useState(false);
  const [title, settitle] = useState("");
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);

  const formRef = useRef();

  const getCategories = async () => {
    setIsCategoriesLoading(true);
    try {
      const res = await fetch("/api/category/all", {
        method: "GET",
      });
      const newRes = await res.json();
      if (res.ok) {
        setCategories(newRes);
        setIsCategoriesLoading(false);
      } else {
        setIsCategoriesLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setIsCategoriesLoading(false);
      toast.error("Something went wrong");
    }
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
        settitle("");
        setReqLoading(false);
        toast.success("Category successfully added");
      } else {
        setReqLoading(false);
        toast.error("Something went wrong");
      }
    } catch (error) {
      setReqLoading(false);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (status === "loading") {
    return (
      <div className="w-screen h-[calc(100vh-240px)] ">
        <SpinLoader />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return <ErrorPage />;
  }

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
          <button
            className="bg-blue-500 px-3 py-2 transition-all text-white w-fit  items-center cursor-pointer flex justify-center  text-sm hover:bg-[#1244af] min-w-full"
            type="submit"
          >
            Add
          </button>
        </div>
        {reqLoading && (
          <div className="absolute w-full h-full top-0 left-0 bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
            <SpinLoader />
          </div>
        )}
      </form>
      <h1 className=" uppercase text-2xl font-semibold text-center">
        Categories
      </h1>
      <div className="">
        {isCategoriesLoading ? (
          <SpinLoader />
        ) : (
          categories.map((category) => (
            <InventoryCategoryItem
              key={category._id}
              category={category}
              getCategories={getCategories}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default page;
