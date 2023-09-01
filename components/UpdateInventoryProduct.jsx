"use client";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiUpload } from "react-icons/bi";
import styled from "styled-components";
import Loader from "@components/Loader";

const UpdateInventoryProduct = ({
  setUpdateInventoryProductWindow,
  getProducts,
  item,
  categories,
}) => {
  const formRef = useRef();
  const categoryRef = useRef();

  const [reqLoading, setReqLoading] = useState(false);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [description, setDescription] = useState(item.description);
  const [stock, setStock] = useState(item.qty);
  const [file, setFile] = useState(null);
  const [temporyImageView, setTemporyImageView] = useState(`${item.src}`);

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [stockError, setStockError] = useState("");
  const [fileError, setFileError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const [errMessage, seterrMessage] = useState("");

  const handleFormView = () => {
    setUpdateInventoryProductWindow(false);
    formRef.current.reset();
    setFile(null);
    setTemporyImageView(`${item.src}`);
    setAllErrorsNull();
    seterrMessage("");
  };

  const setAllErrorsNull = () => {
    setNameError("");
    setPriceError("");
    setDescriptionError("");
    setStockError("");
    setFileError("");
    setCategoryError("");
  };

  const handleFileUpload = async (file) => {
    console.log("triggered");
    setFile(null);
    var reader = new FileReader();
    reader.onloadend = function () {
      setTemporyImageView(reader.result);
    };
    setFile(file);
    reader.readAsDataURL(file);
    console.log(temporyImageView);
  };

  const handleItemImage = () => {
    setTemporyImageView(`${item.src}`);
    console.log(temporyImageView);
    setFile(null);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setReqLoading(true);
    setAllErrorsNull();
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
    if (file === undefined) {
      setFileError("Product Image cannot be empty");
      error = true;
    }

    if (
      categoryRef.current.value == null ||
      categoryRef.current.value == "" ||
      categoryRef.current.value === 0
    ) {
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
        id: item._id,
      };
      console.log(product);
      form.append("details ", JSON.stringify(product));
      if (file !== null) {
        form.append("file", file);
      }

      const res = await fetch("/api/item/update", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        getProducts();
        handleFormView();
      } else {
        seterrMessage("Check the form and try again");
      }
      setReqLoading(false);
    } else {
      setReqLoading(false);
      return false;
    }
  };

  const handleProductDelete = async () => {
    setReqLoading(true);
    setAllErrorsNull();
    const data = {
      userId: item._id,
    };
    const res = await fetch("/api/item/delete", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const newRes = await res.json();
    if (newRes.ok) {
      getProducts();
      handleFormView();
    } else {
      seterrMessage("Something went wrong Try again");
    }
    setReqLoading(false);
  };

  return (
    <Main>
      <Title>Update Product</Title>
      <Form ref={formRef} onSubmit={(e) => handleFormSubmit(e)}>
        <Left>
          <Row>
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Product Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              defaultValue={item.name}
            />
            <Error>{nameError}</Error>
          </Row>
          <Row>
            <Label>Price</Label>
            <Input
              type="number"
              placeholder="Price ( Rs )"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              defaultValue={item.price}
            />
            <Error>{priceError}</Error>
          </Row>
          <Row>
            <Label>Description</Label>
            <Textarea
              type="text"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              defaultValue={item.description}
            />
            <Error>{descriptionError}</Error>
          </Row>
        </Left>
        <Right>
          <RightTop>
            <Row>
              <Label>Stock Availability</Label>
              <Input
                type="number"
                placeholder="Stock ( ex- 99 )"
                onChange={(e) => {
                  setStock(e.target.value);
                }}
                defaultValue={item.qty}
              />
              <Error>{stockError}</Error>
            </Row>
            <Row>
              <Label>Category</Label>
              {item.category === null ? (
                <>
                  <select ref={categoryRef} defaultValue={""}>
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
                  <select ref={categoryRef} defaultValue={item.category._id}>
                    <option value={item.category._id}>
                      {item.category.name}
                    </option>
                    {categories
                      .filter((category) => category._id !== item.category._id)
                      .map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </>
              )}

              <Error>{categoryError}</Error>
            </Row>
            <Row>
              <Label>Image</Label>
              <ImageBox>
                <ImageLabel htmlFor="imageToUploadInUpdate">
                  <BiUpload size={50} />
                  <Input
                    type="file"
                    id="imageToUploadInUpdate"
                    className="imageToUploadInUpdate"
                    onInput={(e) => {
                      handleFileUpload(e.target.files[0]);
                    }}
                  />
                </ImageLabel>

                <ImageLabel>
                  <img src={temporyImageView} alt="" />
                </ImageLabel>
                <ImageBtn>
                  <p onClick={handleItemImage}>Keep the original</p>
                </ImageBtn>
              </ImageBox>
              <Error>{fileError}</Error>
            </Row>
          </RightTop>
          <Row>
            <Button>Update</Button>
          </Row>
        </Right>
      </Form>
      <ErrorMessage>{errMessage}</ErrorMessage>
      <DeleteButton onClick={handleProductDelete}>Delete</DeleteButton>
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

export default UpdateInventoryProduct;

const Main = styled.div`
  width: 1000px;
  height: 550px;
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

const Form = styled.form`
  width: 100%;
  height: calc(100% - 55px);
  padding: 10px;
  display: flex;
  background-color: #1f2937;
`;

const ErrorMessage = styled.div`
  height: 50px;
  width: 100%;
  background-color: #1f2937;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Left = styled.div`
  width: 50%;
  height: 100%;
  /* background-color: gray; */
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Right = styled.div`
  width: 50%;
  height: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const RightTop = styled.div`
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;

  select {
    width: calc(100% - 40px);
    margin-inline: 20px;
    color: #000;
    background-color: #fbfbfb;
    background-color: #fff;
    padding: 10px;
    outline: none;
  }
`;

const Label = styled.label`
  width: calc(100% - 40px);
  margin-inline: 20px;
  color: #fff;
`;

const Input = styled.input`
  width: calc(100% - 40px);
  margin-inline: 20px;
  color: #000;
  background-color: #fbfbfb;
  background-color: #fff;
  padding: 10px;
  outline: none;
`;

const Textarea = styled.textarea`
  resize: none;
  width: calc(100% - 40px);
  margin-inline: 20px;
  color: #000;
  background-color: #fbfbfb;
  padding: 10px;
  outline: none;
  height: 215px;
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
  margin-bottom: 14px;
  &:hover {
    background-color: #1244af;
    transition: all 0.2s ease-in-out;
  }
`;

const DeleteButton = styled.button`
  background-color: #db1a1a;
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
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
  &:hover {
    background-color: #c81818;
    transition: all 0.2s ease-in-out;
  }
`;

const ImageBox = styled.div`
  width: calc(100% - 40px);
  margin-inline: 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: 150px 150px 20px;
  .imageToUploadInUpdate {
    position: absolute;
    top: -10000px;
  }
`;

const ImageLabel = styled.label`
  width: 100%;
  aspect-ratio: 1;
  background-color: #fbfbfb;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageBtn = styled.div`
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  p {
    cursor: pointer;
    color: #fff;
    text-decoration: underline;
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

const Error = styled.div`
  color: red;
  margin-left: 20px;
  font-size: 12px;
  height: 10px;
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
