"use client";

import React, { useEffect, useState } from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import InventoryCategoryItem from "@components/InventoryCategoryItem";
import AddNewCategory from "@components/AddNewCategory";
import InventoryItemCard from "@components/InventoryItemCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Inventory = () => {
  const router = useRouter();
  const { data, status } = useSession();

  const [inventoryProductWindow, setInventoryProductWindow] = useState(false);
  const [addInventoryProductWindow, setAddInventoryProductWindow] =
    useState(false);
  const [categoryAddWindow, setCategoryAddWindow] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setproducts] = useState([]);

  const handleAddNewCategoryWindow = () => {
    setInventoryProductWindow(false);
    setCategoryAddWindow(!categoryAddWindow);
  };
  const handleAddNewProductWindow = () => {
    setCategoryAddWindow(false);
    setAddInventoryProductWindow(!addInventoryProductWindow);
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
        settitleError(newRes.message);
      }
    } catch (error) {}
  };

  const getProducts = async () => {
    try {
      const res = await fetch("/api/item/all", {
        method: "GET",
      });
      const newRes = await res.json();
      console.log(newRes);
      if (res.ok) {
        console.log(newRes);
        setproducts(newRes);
      } else {
        settitleError(newRes.message);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);
  if (status === "unauthenticated") {
    router.push("/user/login");
  } else {
    return (
      <div className="max-w-[1440px] mx-auto w-[95%] o">
        <div
          className={`w-full my-12 flex gap-8  ${
            categoryAddWindow
              ? "w-[calc(100vh-50px)] overflow-hidden"
              : "min-h-[1400px]"
          }`}
        >
          <div className="w-full bg-[#1f293710]">
            <div className="p-3 w-full h-[60px] flex justify-between">
              <div className="h-full flex gap-2">
                <a className="btn-2" href="/inventory/add-new-product">
                  Add New Product &nbsp; <MdProductionQuantityLimits />{" "}
                </a>
                <button className="btn-2" onClick={handleAddNewCategoryWindow}>
                  Add New Category &nbsp; <BiCategoryAlt />{" "}
                </button>
              </div>
              <div className="w-fit bg-white h-full flex rounded-md">
                <input
                  className="px-2 rounded outline-none h-full text-sm"
                  type="text"
                  placeholder="Search for product.."
                />
                <button className="bg-color-1 h-full px-5 rounded-r hover:bg-[#1244af]">
                  <AiOutlineSearch size={25} color="#fff" />
                </button>
              </div>
            </div>
            <div className="w-full h-full flex pb-3 text-base">
              <div className="w-[200px] bg-white h-full p-1 rounded ml-3">
                <div className="p-1 text-center">Categories</div>
                {categories.map((category) => (
                  <InventoryCategoryItem
                    key={category._id}
                    category={category}
                    getCategories={getCategories}
                    getProducts={getProducts}
                  />
                ))}
              </div>
              <div className="flex-grow h-full  bg-white rounded mx-3 grid gap-3 p-3 grid-cols-inventory">
                {products.map((product) => (
                  <InventoryItemCard
                    key={product._id}
                    item={product}
                    getProducts={getProducts}
                    setInventoryProductWindow={setInventoryProductWindow}
                    setCategoryAddWindow={setCategoryAddWindow}
                    setAddInventoryProductWindow={setAddInventoryProductWindow}
                    categories={categories}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {categoryAddWindow && (
          <div
            className={`absolute top-0 left-0 w-screen h-screen z-[1111] flex justify-center items-center gradient-bg-1`}
          >
            <AddNewCategory
              setCategoryAddWindow={setCategoryAddWindow}
              getCategories={getCategories}
              getProducts={getProducts}
            />
          </div>
        )}
      </div>
    );
  }
};

export default Inventory;
