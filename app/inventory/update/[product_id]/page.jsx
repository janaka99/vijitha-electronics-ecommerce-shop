"use client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import styled from "styled-components";
import Loader from "@components/Loader";

const InputField = (name, defaultValue, type) => {
  return (
    <input
      className="w-full px-5 text-black bg-white p-3 outline-none"
      type={type}
      name={name}
      defaultValue={defaultValue}
    />
  );
};

const page = (props, { setUpdateInventoryProductWindow }) => {
  const formRef = useRef();
  const categoryRef = useRef();

  const [categories, setCategories] = useState([]);
  const [tempImageUrl, setTempImageUrl] = useState("");

  const getProduct = async () => {
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
        category: newRes[0].category.name,
        category_id: newRes[0].category._id,
      });
      console.log(newRes);
    }
  };

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
    setUpdateInventoryProductWindow(false);
    formRef.current.reset();
    setFile(null);
    setTemporyImageView(`${item.src}`);
    setAllErrorsNull();
    seterrMessage("");
  };

  const handleFileUpload = async (file) => {
    console.log("triggered");
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
      setErrorList({
        ...errorList,
        name: "Name Can't be empty",
      });

      error = true;
    }
    if (itemToUpdate.price === "0") {
      setErrorList({
        ...errorList,
        price: "Product price cannot be 0",
      });
      error = true;
    } else if (typeof Number(itemToUpdate.price) == NaN) {
      setErrorList({
        ...errorList,
        price: "Invalid price",
      });
      error = true;
    } else if (Number(itemToUpdate.price) == 0) {
      setErrorList({
        ...errorList,
        price: "Product price cannot be 0",
      });
      error = true;
    }
    if (itemToUpdate.description === "") {
      setErrorList({
        ...errorList,
        description: "Description cannot be empty",
      });
      error = true;
    }
    if (typeof Number(itemToUpdate.qty) == NaN) {
      setErrorList({
        ...errorList,
        quantity: "Invalid quantity",
      });
      error = true;
    }
    if (
      categoryRef.current.value == null ||
      categoryRef.current.value == "" ||
      categoryRef.current.value === 0
    ) {
      setErrorList({
        ...errorList,
        category: "Select a category",
      });
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
      console.log(product);
      form.append("details ", JSON.stringify(product));
      if (itemToUpdate.file !== null) {
        form.append("file", itemToUpdate.file);
      }
      console.log(product);
      console.log(itemToUpdate);
      // const res = await fetch("/api/item/update", {
      //   method: "POST",
      //   body: form,
      // });

      // if (res.ok) {
      //   // getProducts();
      //   // handleFormView();
      //   console.log("successfully updated product ", await res.json());
      // } else {
      //   setErrorList({
      //     ...errorList,
      //     form: "Product Update Failed, Try again later!",
      //   });
      // }
      setReqLoading(false);
    } else {
      setReqLoading(false);
      return false;
    }
  };

  const handleProductDelete = async () => {
    setReqLoading(true);
    setErrorListEmpty();
    const data = {
      userId: itemToUpdate._id,
    };
    const res = await fetch("/api/item/delete", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const newRes = await res.json();
    if (newRes.ok) {
      // getProducts();
      // handleFormView();
    } else {
      setErrorList({
        ...errorList,
        form: "Product Update Failed, Try again later!",
      });
    }
    setReqLoading(false);
  };

  useEffect(() => {
    getProduct();
    getCategories();
  }, []);

  return (
    <div className="max-w-[1440px]  w-[95%] flex flex-col gap-5 my-12 mx-auto">
      <div className="h-[50px] p-1 flex justify-center items-center bg-[#1f2937] w-full text-white">
        Update Product Image
      </div>
      <form
        className="w-full min-h-[750px]  h-full p-4 flex flex-col bg-[#1f2937] gap-4"
        ref={formRef}
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <div className="flex-grow h-full flex flex-col gap-4">
          <div className="w-full flex flex-col gap-3">
            <label className="w-full px-5 text-white">Name</label>
            <input
              className="w-full px-5 text-black bg-white p-3 outline-none"
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
          <div className="w-full flex flex-col gap-3">
            <label className="w-full px-5 text-white">Price</label>
            <input
              className="w-full px-5 text-black bg-white p-3 outline-none"
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
          <div className="w-full flex flex-col gap-3">
            <label className="w-full px-5 text-white">Description</label>
            <textarea
              className="resize-none h-max px-5 text-black bg-white p-3 outline-none min-h-[215px]"
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
              <label className="w-full px-5 text-white">
                Stock Availability
              </label>
              <input
                className="w-full px-5 text-black bg-white p-3 outline-none"
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
            <div className="w-full flex flex-col gap-3">
              <label className="w-full px-5 text-white">Category</label>
              {itemToUpdate?.category_id === null ? (
                <>
                  <select
                    className="w-full px-5 text-black bg-white p-3 outline-none"
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
                    className="w-full px-5 text-black bg-white p-3 outline-none"
                    ref={categoryRef}
                    defaultValue={itemToUpdate.category_id}
                  >
                    <option value={itemToUpdate.category_id}>
                      {itemToUpdate.category}
                    </option>
                    {categories
                      .filter(
                        (category) => category._id !== itemToUpdate.category_id
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
            <div className="w-full flex flex-col gap-3">
              <label className="w-full px-5 text-white">Image</label>
              <div className="w-full sm:flex grid grid-cols-2 sm:flex-wrap gap-4 now">
                <label
                  className="sm:w-[25%]  w-full aspect-square  flex sm:justify-center items-center bg-gray-200  "
                  htmlFor="imageToUploadInUpdate"
                >
                  <BiUpload size={50} />
                  <input
                    className="imageToUploadInUpdate imageToUpload w-full px-5 text-black bg-white p-3
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
                <button>
                  <p onClick={keepOriginalImage}>Keep the original</p>
                </button>
              </div>
              <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
                {errorList.file}
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <button className="btn-2 min-w-[100%] ">Update</button>
          </div>
        </div>
      </form>
      <div className="text-red-900 ml-[20px] text-[12px] h-[10px]">
        {errorList.form}
      </div>
      <div className="w-full flex flex-col gap-3">
        <button className="btn-3 min-w-[100%] " onClick={handleProductDelete}>
          Delete
        </button>
      </div>
      {reqLoading && (
        <LoadingDiv>
          <Loader size={"50px"} border={"5px"} />
        </LoadingDiv>
      )}
    </div>
  );
};

export default page;

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
