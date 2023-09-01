"use client";
import { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import styled from "styled-components";
import Loader from "@components/Loader";

const AddInventoryProduct = ({ setAddInventoryProductWindow, categories }) => {
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

  const handleFormView = () => {
    setAddInventoryProductWindow(false);
    formRef.current.reset();
    setFile(null);
    setTemporyImageView(null);
  };

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
        handleFormView();
        console.log(res);
      } else {
        console.log(res.json());
      }
      setReqLoading(false);
    } else {
      setReqLoading(false);
      return false;
    }
  };

  return (
    <div className="max-w-[1000px] min-h-[520px] w-[90%] h-fit flex flex-col gap-1 shadow-lg relative">
      <div className="h-[50px] p-1 flex justify-center items-center bg-[#1f2937] w-full text-white">
        Add New Product
      </div>
      <form
        className="w-full h-full p-4 flex flex-col lg:flex-row bg-[#1f2937] gap-4"
        ref={formRef}
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="flex-grow h-full  flex flex-col gap-4">
          <div className="w-full flex flex-col gap-3">
            <label className="w-full px-5 text-white">Name</label>
            <input
              className="w-full px-5 text-black bg-white p-3 outline-none"
              type="text"
              placeholder="Product Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Error>{nameError}</Error>
          </div>
          <div className="w-full flex flex-col gap-3">
            <label className="w-full px-5 text-white">Price</label>
            <input
              className="w-full px-5 text-black bg-white p-3 outline-none"
              type="number"
              placeholder="Price ( Rs )"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <Error>{priceError}</Error>
          </div>
          <div className="w-full flex flex-col gap-3">
            <label className="w-full px-5 text-white">Description</label>
            <textarea
              className="resize-none w-full px-5 text-black bg-white p-3 outline-none min-h-[215px]"
              type="text"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Error>{descriptionError}</Error>
          </div>
        </div>
        <div className="flex-grow flex flex-col justify-between gap-4">
          <div className="w-full h-[calc(100%-40px)] flex flex-col gap-4">
            <div className="w-full flex flex-col gap-3">
              <label className="w-full px-5 text-white">
                Stock Availability
              </label>
              <input
                className="w-full px-5 text-black bg-white p-3 outline-none"
                type="number"
                placeholder="Stock ( ex- 99 )"
                defaultValue={0}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
              />
              <Error>{stockError}</Error>
            </div>
            <div className="w-full flex flex-col gap-3">
              <label className="w-full px-5 text-white">Category</label>
              <select
                className="w-full px-5 text-black bg-white p-3 outline-none"
                ref={categoryRef}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Error>{categoryError}</Error>
            </div>
            <div className="w-full flex flex-col gap-3">
              <label className="w-full px-5 text-white">Image</label>
              <div className="w-full  grid gap-4 grid-cols-2">
                <label className="w-full aspect-square  flex justify-center items-center bg-gray-200  ">
                  <BiUpload size={50} />
                  <input
                    className="imageToUpload w-full px-5 text-black bg-white p-3
                outline-none hidden"
                    type="file"
                    id="imageToUploads"
                    onChange={(e) => {
                      handleFileUploads(e.target.files[0]);
                    }}
                  />
                </label>
                <label className="w-full aspect-square  flex justify-center items-center bg-gray-200  ">
                  <img src={temporyImageView} alt="" />
                </label>
              </div>
              <Error>{fileError}</Error>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <button className="btn-2 min-w-[100%] ">Add</button>
          </div>
        </div>
      </form>
      <div className="absolute top-1 right-1 z-50 cursor-pointer text-white ">
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

export default AddInventoryProduct;

const Error = styled.div`
  color: red;
  margin-left: 20px;
  font-size: 12px;
  height: 10px;
`;
