"use client";
import { useEffect, useRef, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import SpinLoader from "@components/SpinLoader";
import ErrorPage from "@components/ErrorPage";

const page = ({}) => {
  const [categories, setCategories] = useState([]);
  const { data, status } = useSession();

  const router = useRouter();

  const getCategories = async () => {
    try {
      const res = await fetch("/api/category/all", {
        method: "GET",
      });
      const newRes = await res.json();
      console.log(newRes);
      if (res.ok) {
        setCategories(newRes);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const formRef = useRef();
  const categoryRef = useRef();

  const [reqLoading, setReqLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [file, setFile] = useState(null);
  const [temporyImageView, setTemporyImageView] = useState(null);

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [stockError, setStockError] = useState("");
  const [fileError, setFileError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const handleFileUploads = async (file) => {
    setFile(null);
    var reader = new FileReader();
    reader.onloadend = function () {
      setTemporyImageView(reader.result);
      console.log("asd ", temporyImageView);
    };
    setFile(file);
    reader.readAsDataURL(file);
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setReqLoading(true);
    let error = false;
    if (name === "") {
      setNameError("Name cannot be empty");
      error = true;
    }
    if (price === 0) {
      setPriceError("Product price cannot be 0");
      error = true;
    } else if (typeof Number(price) == NaN) {
      setPriceError("Invalid price");
      error = true;
    }
    if (description === "") {
      setDescriptionError("Description cannot be empty");
      error = true;
    }
    if (typeof Number(stock) == NaN) {
      setStockError("Invalid stock");
      error = true;
    }
    if (file === undefined || file === null) {
      setFileError("Product Image cannot be empty");
      error = true;
    }

    if (categoryRef.current.value == null || categoryRef.current.value == "") {
      setCategoryError("Select a category");
      error = true;
    }
    if (error === false) {
      const form = new FormData();

      const product = {
        name: name,
        price: price,
        qty: stock,
        description: description,
        stock: stock,
        category: categoryRef.current.value,
      };

      form.append("details ", JSON.stringify(product));
      form.append("file", file);

      const res = await fetch("/api/item/new", {
        method: "POST",
        // body: JSON.stringify(product),
        body: form,
      });

      if (res.ok) {
        setReqLoading(false);
        toast.success("Successfully created new product");
        await delay(5000);
        router.push("/inventory");
      } else {
        setReqLoading(false);

        toast.error("Product add failed");
      }
    } else {
      setReqLoading(false);
      return false;
    }
  };

  useEffect(() => {
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
    <div className="max-w-[1440px]  w-[95%] flex flex-col gap-5 my-12 mx-auto relative">
      <h1 className="uppercase text-2xl font-semibold text-center">
        Add New Product
      </h1>
      <form
        className="w-full min-h-[750px]  h-full p-4 flex flex-col  gap-4"
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
                  setName(e.target.value);
                }}
              />
              <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                {nameError}
              </div>
            </div>
            <div className="md:w-2/5 flex flex-col gap-3">
              <label className="w-full px-5 text-[#1F2937]">Category</label>
              <select
                className="w-full px-5 text-black text-sm bg-gray-200 p-3 outline-none"
                ref={categoryRef}
              >
                <option className="text-black text-sm" value="">
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                {categoryError}
              </div>
            </div>
          </div>
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="w-full flex flex-col gap-3">
              <label className="w-full px-5 text-[#1F2937]">Price</label>
              <input
                className="w-full px-5 text-black text-sm bg-gray-200 p-3 outline-none"
                type="number"
                placeholder="Price ( Rs )"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
              <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                {priceError}
              </div>
            </div>
            <div className="w-full md:w-2/5 flex flex-col gap-3">
              <label className="w-full px-5 text-[#1F2937]">
                Stock Availability
              </label>
              <input
                className="w-full px-5 text-black text-sm bg-gray-200 p-3 outline-none"
                type="number"
                placeholder="Stock ( ex- 99 )"
                defaultValue={0}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
              />
              <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                {stockError}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <label className="w-full px-5 text-[#1F2937]">Description</label>
            <textarea
              className="resize-none h-max px-5 text-black text-sm bg-gray-200 p-3 outline-none min-h-[215px]"
              type="text"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
              {descriptionError}
            </div>
          </div>
        </div>

        <div className="w-full h-[calc(100%-40px)] flex sm:flex-row gap-4">
          <div className="w-full md:w-2/4 flex-col gap-3">
            <label className="w-full px-5 text-[#1F2937] ">Image</label>
            <div className="w-full grid grid-cols-2 gap-4 mt-3">
              <label
                className=" w-full aspect-square  flex justify-center items-center bg-gray-200  "
                id="imageToUploads"
              >
                <BiUpload size={50} />
                <input
                  className="imageToUpload w-full px-5 text-black text-sm bg-gray-200 p-3
                outline-none hidden"
                  type="file"
                  id="imageToUploads"
                  onChange={(e) => {
                    handleFileUploads(e.target.files[0]);
                  }}
                />
              </label>
              <label className=" w-full aspect-square  flex justify-center items-center bg-gray-200  ">
                <img src={temporyImageView} alt="" />
              </label>
            </div>
            <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
              {fileError}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <button className="btn-2 min-w-[100%] ">Add</button>
        </div>
      </form>
      {reqLoading && (
        <div className="absolute w-full h-full bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
          <SpinLoader />
        </div>
      )}
    </div>
  );
};

export default page;
