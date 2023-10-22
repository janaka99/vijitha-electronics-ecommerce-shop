"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  AiFillDelete,
  AiOutlineLoading,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import SpinLoader from "@components/SpinLoader";
import ErrorPage from "@components/ErrorPage";
import { TbPackages } from "react-icons/tb";
import toast from "react-hot-toast";
import Select from "react-select";

const Address = ({ add, getUser }) => {
  const [isAddressRemoving, setIsAddressRemoving] = useState(false);
  const { data, status } = useSession();

  const deleteAddress = async (id) => {
    setIsAddressRemoving(true);
    const res = await fetch("/api/user/remove-shipping-address", {
      method: "POST",
      body: JSON.stringify({ id: id }),
    });
    if (res.ok) {
      await getUser();
      setIsAddressRemoving(false);
      toast.success("Successfully removed the shipping address");
    } else {
      setIsAddressRemoving(false);
      toast.error("Failed to remove the shipping address");
    }
  };

  return (
    <>
      <div className="border border-gray-200 p-2 relative">
        <div className="flex flex-col flex-grow">
          <div className="text-sm">{add.name}</div>
          <div className="text-sm">
            {add.address1} {","} {add.address2}
          </div>
          <div className="text-sm">
            {add.city} {","} {add.state}
          </div>
          <div className="text-sm">
            {add.country.label} {","} {add.postalCode}
          </div>
          <div className="text-sm">{add.contact}</div>
        </div>
        <button
          onClick={() => deleteAddress(add._id)}
          className="absolute top-2 right-2 z-10"
        >
          <AiFillDelete size={24} color="red" />
        </button>
        {isAddressRemoving && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-[2px]">
            <div className="gap-2 flex justify-center items-center">
              Deleting
              <span className="animate-spin">
                <AiOutlineLoading size={20} />
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const page = () => {
  const router = useRouter();
  const { data, status } = useSession();

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [ShippingAddressError, setShippingAddressError] = useState("");
  const [isAddressSaving, setisAddressSaving] = useState(false);
  const [address, setaddress] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    contact: "",
  });
  const [user, setUser] = useState({
    email: "",
    name: "",
    phone_number: "",
    address1: "",
    address2: "",
    address3: "",
    password: "",
    src: "",
    shippingAddresses: [],
  });

  const handleInput = (e, name) => {
    const { value } = e.target;
    setaddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const addNewShippingAddress = async () => {
    setisAddressSaving(true);
    setShippingAddressError((prev) => "");
    if (
      address.name === "" ||
      address.name === undefined ||
      address.address1 === "" ||
      address.address1 === undefined ||
      address.address2 === "" ||
      address.address2 === undefined ||
      address.city === "" ||
      address.city === undefined ||
      address.state === "" ||
      address.state === undefined ||
      address.country === "" ||
      address.country === undefined ||
      address.postalCode === "" ||
      address.postalCode === undefined ||
      address.contact === "" ||
      address.contact === undefined
    ) {
      setisAddressSaving(false);
      setShippingAddressError((prev) => "Fill all the fields");
      return;
    }
    if (isNaN(address.contact)) {
      setisAddressSaving(false);
      setShippingAddressError((prev) => "Invalid Contact");
      return;
    }

    const res = await fetch("/api/user/add-shipping-address", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(address),
    });

    if (res.ok) {
      await getUser();
      setaddress({
        name: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        contact: "",
      });
      setisAddressSaving(false);
      toast.success("Successfully added new address");
    } else {
      toast.error("Something went wrong, Try again later");
      setisAddressSaving(false);
    }
  };

  const getUser = async () => {
    const res = await fetch("/api/user/get", {
      method: "GET",
    });
    const jres = await res.json();

    if (res.ok) {
      setUser({
        ...user,
        email: jres.user.email,
        name: jres.user.name,
        phone_number: jres.user.phoneNumber,
        address1: jres.user.address1,
        address2: jres.user.address2,
        address3: jres.user.address3,
        src: jres.user.src,
        shippingAddresses: jres.user.shippingAddress,
      });
      console.log(jres);
    }
  };

  const loadUser = async () => {
    setIsUserLoading(true);
    await getUser();
    setIsUserLoading(false);
  };

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
        setaddress((prev) => ({
          ...prev,
          country: data.userSelectValue,
        }));
      });
  }, []);

  useEffect(() => {
    loadUser();
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
    <div className="max-w-[1440px] w-[95%] mx-auto my-12 flex flex-col gap-12">
      <div className="w-full max-w-[400px] justify-between mx-auto grid grid-cols-2 gap-3">
        <a
          href="/user/dashboard/my-orders"
          className="w-full flex flex-col justify-center items-center gap-2 p-2 rounded-md shadow-md hover:shadow-lg transition-all border cursor-pointer"
        >
          <TbPackages size={40} />
          <p>Orders</p>
        </a>
        <a
          href="/products/buy/checkout"
          className="w-full flex flex-col justify-center items-center gap-2 p-2 rounded-md shadow-md hover:shadow-lg transition-all border cursor-pointer"
        >
          <AiOutlineShoppingCart color="blue" size={40} />
          <p>Cart</p>
        </a>{" "}
      </div>
      <div className="w-full max-w-[700px] mx-auto relative ">
        {isUserLoading ? (
          <div className="absolute rounded-lg shadow-lg border w-full h-[544px] top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <SpinLoader />
          </div>
        ) : (
          <>
            <div className="bg-white p-6 rounded-lg shadow-lg border">
              <div className="w-full mb-4 flex justify-center items-center">
                <img
                  className="w-[150px] h-[150px] border-2 border-gray-200 shadow-md rounded-[50%] object-center object-cover"
                  src={user.src ? user.src : "/profilePlaceholder.png"}
                  alt=""
                />
              </div>
              <div className="text-2xl font-semibold mb-4 w-full text-center text-gray-700">
                Hello, {user.name}
              </div>
              <div className="mb-4  flex flex-col gap-2">
                <p className="text-gray-600">Email</p>
                <p className="  flex-grow p-2 bg-gray-100 rounded-sm  text-sm ml-4 text-blue-600 font-medium">
                  {user.email}
                </p>
              </div>
              <div className="mb-4   flex flex-col gap-2">
                <p className="text-gray-600">Address</p>
                <p className="  flex-grow p-2 bg-gray-100 rounded-sm  text-sm ml-4 text-black font-medium">
                  {user.address1}{" "}
                </p>
                <p className="  flex-grow p-2 bg-gray-100 rounded-sm  text-sm ml-4 text-black font-medium">
                  {user.address2}{" "}
                </p>
                <p className=" flex-grow  p-2 bg-gray-100 rounded-sm  text-sm ml-4 text-black font-medium">
                  {user.address3}
                </p>
              </div>
              <div className="mb-4 flex flex-col  gap-2">
                <p className=" text-gray-600">Contact Number</p>
                <p className=" flex-grow  p-2 bg-gray-100 rounded-sm  text-sm ml-4 text-green-600 font-medium">
                  {user.phone_number}
                </p>
              </div>
              <div className="mb-4 mt-2 flex w-full justify-end items-center">
                <a href="/user/dashboard/edit-my-information" className="btn-1">
                  Edit My Information
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border mt-6">
              <div className="text-2xl font-semibold mb-4 w-full text-center text-gray-700">
                {" "}
                Shipping Addresses
              </div>
              <hr />
              <div className={`flex flex-col gap-2 relative `}>
                <div className="text-red-500 text-sm italic h-2 mb-2">
                  {ShippingAddressError}
                </div>

                <Select
                  options={countries}
                  value={selectedCountry}
                  onChange={(selectedOption) =>
                    setaddress((prev) => ({
                      ...prev,
                      country: selectedOption,
                    }))
                  }
                />
                <input
                  className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                  type="text"
                  placeholder="Enter Shipping Name"
                  value={address.name}
                  onChange={(e) => handleInput(e, "name")}
                />

                <div className="flex grid-cols-2 gap-2">
                  <input
                    className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                    type="text"
                    placeholder="Address 1"
                    value={address.address1}
                    onChange={(e) => handleInput(e, "address1")}
                  />
                  <input
                    className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                    type="text"
                    placeholder="Address 2"
                    value={address.address2}
                    onChange={(e) => handleInput(e, "address2")}
                  />
                </div>
                <div className="flex grid-cols-2 gap-2">
                  <input
                    className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                    type="text"
                    placeholder="state"
                    value={address.state}
                    onChange={(e) => handleInput(e, "state")}
                  />

                  <input
                    className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                    type="text"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => handleInput(e, "city")}
                  />
                </div>

                <div className="flex grid-cols-2 gap-2">
                  <input
                    className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                    type="text"
                    placeholder="Postal Code"
                    value={address.postalCode}
                    onChange={(e) => handleInput(e, "postalCode")}
                  />

                  <input
                    className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                    type="text"
                    placeholder="555 555 555"
                    value={address.contact}
                    onChange={(e) => handleInput(e, "contact")}
                  />
                </div>
                <button
                  className="w-full bg-blue-500 py-3 px-2 flex justify-center items-center text-white  text-base font-semibold gap-4 rounded-sm shadow-sm hover:bg-blue-600 transition-all"
                  onClick={addNewShippingAddress}
                >
                  Add New Address
                </button>
                {isAddressSaving && (
                  <div className="w-full h-full absolute inset-0">
                    <SpinLoader />
                  </div>
                )}
              </div>
              <hr className="my-4" />
              <div className="flex flex-col gap-2">
                {user.shippingAddresses &&
                  user.shippingAddresses.map((add, i) => (
                    <Address add={add} key={i} getUser={getUser} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
