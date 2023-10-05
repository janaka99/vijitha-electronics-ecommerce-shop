"use client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import styled from "styled-components";
import Loader from "@components/Loader";
import PopUp from "@components/PopUp";
import { useSession } from "next-auth/react";
import SpinLoader from "@components/SpinLoader";
import ErrorPage from "@components/ErrorPage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = (props) => {
  const formRef = useRef();
  const categoryRef = useRef();

  const router = useRouter();
  const { data, status } = useSession();

  const [categories, setCategories] = useState([]);
  const [tempImageUrl, setTempImageUrl] = useState("");

  const [isGetProductLoading, setIsGetProductLoading] = useState(true);
  const getProduct = async () => {
    setIsGetProductLoading(true);
    const res = await fetch(
      `/api/item/get/product_id?id=${props.searchParams.id}`,
      {
        method: "GET",
      }
    );
    if (res.ok) {
      const newRes = await res.json();
      console.log(newRes);
      setItemToUpdate({
        id: newRes[0]._id,
        name: newRes[0].name,
        price: newRes[0].price,
        description: newRes[0].description,
        qty: newRes[0].qty,
        file: null,
        src: newRes[0].src,
        category: newRes[0].category != null ? newRes[0].category?.name : null,
        category_id:
          newRes[0].category != null ? newRes[0].category?._id : null,
      });
      setIsGetProductLoading(false);
    }
  };

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

  const [itemToUpdate, setItemToUpdate] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    qty: "",
    file: null,
    src: "",
    category: "",
    category_id: "",
  });

  const [reqLoading, setReqLoading] = useState(false);

  // const [temporyImageView, setTemporyImageView] = useState(`${item.src}`);
  const [temporyImageView, setTemporyImageView] = useState("item.src");

  const [errorList, setErrorList] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    file: "",
    category: "",
    form: "",
  });

  const setErrorListEmpty = () => {
    setErrorList({
      name: "",
      price: "",
      description: "",
      quantity: "",
      file: "",
      category: "",
      form: "",
    });
  };

  const handleFormView = () => {
    formRef.current.reset();
    setFile(null);
    setTemporyImageView(`${item.src}`);
    setAllErrorsNull();
    seterrMessage("");
  };

  const handleFileUpload = async (file) => {
    setTempImageUrl("");
    var reader = new FileReader();
    reader.onloadend = function () {
      setTempImageUrl(reader.result);
    };
    setItemToUpdate({
      ...itemToUpdate,
      file: file,
    });
    reader.readAsDataURL(file);
    console.log(temporyImageView);
  };

  const keepOriginalImage = () => {
    setItemToUpdate({
      ...itemToUpdate,
      file: null,
    });
    setTempImageUrl("");
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setReqLoading(true);
    setErrorListEmpty();
    let error = false;
    if (itemToUpdate.name === "") {
      setErrorList((prev) => ({
        ...prev,
        name: "Name Can't be empty",
      }));

      error = true;
    }
    if (itemToUpdate.price === "0") {
      setErrorList((prev) => ({
        ...prev,
        price: "Product price cannot be 0",
      }));
      error = true;
    } else if (typeof Number(itemToUpdate.price) == NaN) {
      setErrorList((prev) => ({
        ...prev,
        price: "Invalid price",
      }));
      error = true;
    } else if (Number(itemToUpdate.price) == 0) {
      setErrorList((prev) => ({
        ...prev,
        price: "Product price cannot be 0",
      }));
      error = true;
    }
    if (itemToUpdate.description === "") {
      setErrorList((prev) => ({
        ...prev,
        description: "Description cannot be empty",
      }));
      error = true;
    }
    if (typeof Number(itemToUpdate.qty) == NaN) {
      setErrorList((prev) => ({
        ...prev,
        quantity: "Invalid quantity",
      }));
      error = true;
    }
    if (
      categoryRef.current.value == null ||
      categoryRef.current.value == "" ||
      categoryRef.current.value === 0
    ) {
      setErrorList((prev) => ({
        ...prev,
        category: "Select a category",
      }));
      error = true;
    }
    if (error === false) {
      const form = new FormData();

      const product = {
        name: itemToUpdate.name,
        price: itemToUpdate.price,
        qty: itemToUpdate.qty,
        description: itemToUpdate.description,
        stock: itemToUpdate.qty,
        category: categoryRef.current.value,
        id: itemToUpdate.id,
      };

      form.append("details ", JSON.stringify(product));
      if (itemToUpdate.file !== null) {
        form.append("file", itemToUpdate.file);
      }

      const res = await fetch("/api/item/update", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        toast.success("Product updated successfully");
      } else {
        toast.error("Something went wrong");
      }
      setReqLoading(false);
    } else {
      setReqLoading(false);
      toast.error("Check all the fields before udpate");
    }
  };

  const handleProductDelete = async () => {
    setReqLoading(true);
    setErrorListEmpty();
    const data = {
      itemId: itemToUpdate.id,
    };
    const res = await fetch("/api/item/delete", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const newRes = await res.json();
    if (res.ok) {
      router.push("/inventory");
      toast.success("Product deleted Successfully");
    } else {
      setReqLoading(false);
      console.log(res);
      toast.error("Something went wrong 2");
    }
    setReqLoading(false);
  };

  useEffect(() => {
    getProduct();
    getCategories();
  }, []);

  if (status === "loading") {
    return (
      <div className="w-screen h-[calc(100vh-50px)] absolute top-[50px]">
        <SpinLoader />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return <ErrorPage />;
  }

  return (
    <div className="max-w-[1440px]  w-[95%] flex flex-col gap-3 my-12 mx-auto relative">

      {isGetProductLoading ? (
           <div className="w-screen h-[calc(100vh-50px)] absolute top-[50px]">
        <SpinLoader />
        </div>
      ) : (
        <>
              <h1 className="uppercase text-2xl font-semibold text-center mb-7">
        Update Product Image
      </h1>
          <form
            className="w-full min-h-[750px]  h-full p-4 flex flex-col gap-4 pb-0"
            ref={formRef}
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <div className="flex-grow h-full flex flex-col gap-4">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="w-full flex flex-col gap-3">
                  <label className="w-full px-5 text-[#1F2937]">Name</label>
                  <input
                    className="w-full px-5 text-black text-sm bg-gray-200 p-3 outline-none"
                    type="text"
                    placeholder="Product Name"
                    onChange={(e) => {
                      setItemToUpdate({
                        ...itemToUpdate,
                        name: e.target.value,
                      });
                    }}
                    defaultValue={itemToUpdate?.name}
                  />
                  <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                    {errorList.name}
                  </div>
                </div>
                <div className="w-full md:w-2/5 flex flex-col gap-3">
                  <label className="w-full px-5 text-[#1F2937]">Category</label>
                  {itemToUpdate?.category_id === null ? (
                    <>
                      <select
                        className="w-full px-5 text-black text-sm bg-gray-200 p-3 outline-none"
                        ref={categoryRef}
                        defaultValue={""}
                      >
                        <option value={""}>None</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </>
                  ) : (
                    <>
                      <select
                        className="w-full px-5 text-black text-sm bg-gray-200 p-3 outline-none"
                        ref={categoryRef}
                        defaultValue={itemToUpdate.category_id}
                      >
                        <option value={itemToUpdate.category_id}>
                          {itemToUpdate.category}
                        </option>
                        {categories
                          .filter(
                            (category) =>
                              category._id !== itemToUpdate.category_id
                          )
                          .map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </>
                  )}

                  <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                    {errorList.category}
                  </div>
                </div>
              </div>
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="w-full flex flex-col gap-3">
                  <label className="w-full px-5 text-[#1F2937]">Price</label>
                  <input
                    className="w-full px-5 text-black text-sm bg-gray-200  p-3 outline-none"
                    type="number"
                    placeholder="Price ( Rs )"
                    onChange={(e) => {
                      setItemToUpdate({
                        ...itemToUpdate,
                        price: e.target.value,
                      });
                    }}
                    defaultValue={itemToUpdate?.price}
                  />
                  <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                    {errorList.price}
                  </div>
                </div>
                <div className="w-full md:w-2/5 flex flex-col gap-3">
                  <label className="w-full px-5 text-[#1F2937]">
                    Stock Availability
                  </label>
                  <input
                    className="w-full px-5 text-black text-sm bg-gray-200  p-3 outline-none"
                    type="number"
                    placeholder="Stock ( ex- 99 )"
                    onChange={(e) => {
                      setItemToUpdate({
                        ...itemToUpdate,
                        qty: e.target.value,
                      });
                    }}
                    defaultValue={itemToUpdate?.qty}
                  />
                  <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                    {errorList.quantity}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-3">
                <label className="w-full px-5 text-[#1F2937]">
                  Description
                </label>
                <textarea
                  className="resize-none h-max px-5 text-black text-sm bg-gray-200  p-3 outline-none min-h-[215px]"
                  type="text"
                  placeholder="Description"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setItemToUpdate({
                      ...itemToUpdate,
                      description: e.target.value,
                    });
                  }}
                  defaultValue={itemToUpdate?.description}
                />
                <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                  {errorList.description}
                </div>
              </div>
            </div>
            <div className="flex-grow flex flex-col justify-between gap-4">
              <div className="w-full h-[calc(100%-40px)] flex flex-col gap-4">
                <div className="w-full flex flex-col gap-3">
                  <div className="flex gap-4 ">
                    <label className="w-fit px-5 text-[#1F2937]">Image</label>
                    <button
                      className="btn-2 h-fit w-fit place-self-end"
                      onClick={keepOriginalImage}
                    >
                      Keep the original image
                    </button>
                  </div>
                  <div className="w-full sm:flex grid grid-cols-2 sm:flex-wrap gap-4 now">
                    <label
                      className="sm:w-[25%]  w-full aspect-square  flex justify-center items-center bg-gray-200  "
                      htmlFor="imageToUploadInUpdate"
                    >
                      <BiUpload size={50} />
                      <input
                        className="imageToUploadInUpdate imageToUpload w-full px-5 text-black bg-gray-200  p-3
                outline-none hidden"
                        type="file"
                        id="imageToUploadInUpdate"
                        onInput={(e) => {
                          handleFileUpload(e.target.files[0]);
                        }}
                      />
                    </label>
                    <label className="sm:w-[25%] w-full aspect-square  flex justify-center items-center bg-gray-200  ">
                      <img
                        src={`${
                          tempImageUrl === "" ? itemToUpdate.src : tempImageUrl
                        }`}
                        alt=""
                      />
                    </label>
                  </div>
                  <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                    {errorList.file}
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-3">
                <button type="submit" className="btn-2 min-w-[100%] ">
                  Update
                </button>
              </div>
            </div>
          </form>
          <div className="w-[100%] px-4 mx-auto flex flex-col gap-3">
            <button
              className="btn-3 min-w-[100%] "
              onClick={handleProductDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
      {reqLoading && (
        <div className="absolute w-screen h-full bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
          <SpinLoader />
        </div>
      )}
    </div>
  );
};

export default page;
