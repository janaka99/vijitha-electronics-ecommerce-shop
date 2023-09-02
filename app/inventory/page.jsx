"use client";

import React, { useEffect, useState } from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import InventoryItemCard from "@components/InventoryItemCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Inventory = () => {
  const router = useRouter();
  const { data, status } = useSession();

  const [categories, setCategories] = useState([]);
  const [allProductList, setAllProductList] = useState([]);
  const [products, setproducts] = useState([]);

  const handleManageCategories = () => {
    router.push("/inventory/manage-categories");
  };

  const getCategories = async () => {
    try {
      const res = await fetch("/api/category/all", {
        method: "GET",
      });
      const newRes = await res.json();
      // console.log(newRes);
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
        setproducts(newRes);
        setAllProductList(newRes);
      } else {
        settitleError(newRes.message);
      }
    } catch (error) {}
  };

  const filterByCategory = async (id) => {
    if (id == 0) {
      console.log(products);
      console.log("sdf", allProductList);
      setproducts(() => {
        return allProductList;
      });
    } else {
      setproducts(() => {
        return allProductList.filter((product) => product.category._id === id);
      });
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);
  if (status === "unauthenticated") {
    router.push("/user/login");
  } else {
    return (
      <div className=" w-full h-full ">
        <div className={`max-w-[1440px] mx-auto w-[95%] my-12 flex gap-8 `}>
          <div className="w-full bg-[#fff]">
            <div className="p-3 w-full md:h-[60px] gap-3 md:gap-0 flex flex-col md:flex-row justify-between">
              <div className="h-full flex gap-2">
                <a className="btn-2" href="/inventory/add-new-product">
                  Add New Product &nbsp; <MdProductionQuantityLimits />{" "}
                </a>
                <button className="btn-2" onClick={handleManageCategories}>
                  Manage Categories &nbsp; <BiCategoryAlt />{" "}
                </button>
              </div>
              <div className="md:w-fit w-full h-[36px] bg-[#f3f3f353]  flex rounded-md">
                <input
                  className="px-2 bg-[#f3f3f353] flex-grow rounded outline-none h-full text-sm"
                  type="text"
                  placeholder="Search for product.."
                />
                <button className="bg-color-1 h-full px-5 rounded-r hover:bg-[#1244af]">
                  <AiOutlineSearch size={25} color="#fff" />
                </button>
              </div>
            </div>
            <div className="w-full h-full flex flex-col pb-3 text-base md:flex-row gap-3 md:gap-0">
              <div className="md:w-[200px] md:min-w-[200px] bg-white h-fit p-1 rounded w-full">
                <div className="p-1 text-center">Categories</div>
                <div className="flex md:flex-col gap-2 md:gap-[2px] w-full flex-wrap place-content-start">
                  <button
                    onClick={() => filterByCategory(0)}
                    className="md:my-1 md:w-full w-fit flex bg-[#f3f3f353] whitespace-nowrap px-1  py-2 text-sm hover:bg-[#f3f3f3b5]"
                  >
                    All
                  </button>
                  {categories.map((category, i) => (
                    <button
                      onClick={() => filterByCategory(category._id)}
                      key={i}
                      className="md:my-1 md:w-full w-fit flex bg-[#f3f3f353] whitespace-nowrap px-1  py-2 text-sm hover:bg-[#f3f3f3b5]"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:flex-grow w-full md:flex gap-3 md:flex-wrap md:pl-3 pt-3 md:place-content-start grid grid-cols-1 sm:grid-cols-2">
                {products.map((product) => (
                  <InventoryItemCard key={product._id} item={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Inventory;
