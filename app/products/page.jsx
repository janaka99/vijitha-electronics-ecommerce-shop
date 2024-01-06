"use client";
import React, { useContext, useEffect, useState } from "react";
import { TbCategory } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import ProductsCategories from "@/components/ProductsCategories";
import CartItems from "@components/CartItems";
import Products from "@components/Products";
import SpinLoader from "@components/SpinLoader";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { CartContext } from "@context/cartContext/CartContextState";

const Page = () => {
  const { status } = useSession();
  const { cart, getMyCart, isCartLoading } = useContext(CartContext);
  const [userSearch, setUserSearch] = useState("");

  const [products, setProducts] = useState([]);
  const [allProductList, setAllProductList] = useState([]);

  const [isProductsLoading, setisProductsLoading] = useState(true);

  //get all the products available
  const getProducts = async () => {
    setisProductsLoading(true);
    try {
      const res = await fetch("/api/item/all", {
        method: "GET",
      });
      const newRes = await res.json();

      if (res.ok) {
        setProducts(newRes);
        setAllProductList(newRes);
        setisProductsLoading(false);
        console.log(newRes);
      } else {
        toast.error("Error  while loading products, Refresh the page");
        setisProductsLoading(false);
      }
    } catch (error) {
      setisProductsLoading(false);
      toast.error("Error  while loading products, Refresh the page");
    }
  };

  const filterByCategory = async (id) => {
    setisProductsLoading(true);
    if (id == 0) {
      setProducts(() => {
        return allProductList;
      });
      setisProductsLoading(false);
    } else if (id === 1) {
      setProducts(() => {
        return allProductList.filter((product) => product.category == null);
      });
      setisProductsLoading(false);
    } else {
      setProducts(() => {
        return allProductList.filter(
          (product) => product.category && product.category._id === id
        );
      });
      setisProductsLoading(false);
    }
  };

  const getSearchedProducts = async () => {
    if (
      userSearch.length <= 0 ||
      userSearch === undefined ||
      userSearch === null ||
      userSearch === ""
    ) {
      await getProducts();
      return;
    }
    setisProductsLoading(true);
    try {
      const res = await fetch("/api/item/search", {
        method: "POST",
        body: JSON.stringify({ search: userSearch }),
      });
      const newRes = await res.json();

      if (res.ok) {
        setProducts(newRes);
        console.log("filtered products ", newRes);
        setisProductsLoading(false);
      } else {
        toast.error("Error  while loading products, Refresh the page");
        setisProductsLoading(false);
      }
    } catch (error) {
      setisProductsLoading(false);
      toast.error("Error  while loading products, Refresh the page");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      getMyCart();
    }
    getProducts();
  }, []);

  if (status === "loading") {
    return (
      <div className="w-screen h-[calc(100vh-50px)] absolute top-[50px]">
        <SpinLoader />
      </div>
    );
  }

  return (
    <div className="w-[95%] max-w-[1440px] my-12 mx-auto">
      <div className="flex gap-12 flex-col md:flex-row">
        <div className="md:w-[250px] w-full flex flex-col gap-6 ">
          <div className="w-full flex flex-col gap-3">
            <div className="flex gap-2 items-center text-base font-bold uppercase">
              Categories <TbCategory />
            </div>
            <div className="flex-wrap flex md:flex-col gap-1 pl-2 text-base ">
              <ProductsCategories filterByCategory={filterByCategory} />
            </div>
          </div>
          {status === "authenticated" && (
            <div className="w-full flex-col gap-3 hidden md:flex">
              <div className="flex gap-2 items-center text-base font-bold uppercase">
                Cart <FiShoppingBag />
              </div>
              <div className="flex flex-col gap-1 pl-2 text-base ">
                {isCartLoading ? (
                  <div className="w-full  flex flex-col gap-4 ">
                    <div className="w-full py-4 bg-gray-100"></div>
                    <div className="w-full py-4 bg-gray-100"></div>
                    <div className="w-full py-4 bg-gray-100"></div>
                  </div>
                ) : (
                  <CartItems cart={cart} />
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex-grow flex flex-col w-full gap-12 ">
          <div className="w-full flex items-center h-[50px]">
            <input
              className="bg-gray-200 px-4 h-full outline-none flex-grow rounded-l"
              type="text"
              value={userSearch}
              onChange={(e) => {
                setUserSearch(e.target.value);
              }}
            />
            <button
              className="w-[100px] bg-color-1 h-full text-white rounded-r"
              onClick={getSearchedProducts}
            >
              Search
            </button>
          </div>
          {isProductsLoading ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6">
              <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg p-2  "></div>
              <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg p-2  "></div>
              <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg p-2  "></div>
              <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg p-2  "></div>
              <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg p-2  "></div>
              <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg p-2  "></div>
              <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg p-2  "></div>
              <div className="w-full aspect-[5/6] bg-gray-100 shadow-lg p-2  "></div>
            </div>
          ) : (
            <Products products={products} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
