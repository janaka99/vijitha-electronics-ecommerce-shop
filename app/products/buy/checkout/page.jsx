"use client";
import ErrorPage from "@components/ErrorPage";
import PageLoader from "@components/PageLoader";
import ShoppingCartItem from "@components/ShoppingCartItem";
import SpinLoader from "@components/SpinLoader";
import { EthPaymentContext } from "@context/ethpaymentContext/EthPaymentContext";
import getStripe from "@lib/getStripe";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters, AiOutlineShopping } from "react-icons/ai";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import Select from "react-select";

const page = () => {
  const { data, status } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [ShippingAddressError, setShippingAddressError] = useState("");
  const [isHide, setIsHide] = useState(true);
  const router = useRouter();
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

  const [isCartLoading, setisCartLoading] = useState(true);
  const [isAddressLoading, setisAddressLoading] = useState(true);
  const [isPaymentProcessing, setisPaymentProcessing] = useState(false);
  const [isEthPaymentProcessing, setisEthPaymentProcessing] = useState(false);
  const [isAddressSaving, setisAddressSaving] = useState(false);

  const {
    connectWallet,
    currentAccount,
    makePayment,
    getBalance,
    getCustomerOrder,
    checkIfWalletIsConnected,
    getAllOrders,
  } = useContext(EthPaymentContext);

  const getCartItems = async () => {
    const res = await fetch("/api/cart/get", {
      method: "GET",
    });

    if (res.ok) {
      const resn = await res.json();
      console.log(resn);
      setCartItems(resn);
    } else {
      console.log(await res.json());
    }
  };

  const loadCartData = async () => {
    setisCartLoading(true);
    await getCartItems();
    setisCartLoading(false);
  };

  const getShippingAddresses = async () => {
    setisAddressLoading(true);
    const res = await fetch("/api/user/get-shipping-addresses", {
      method: "GET",
    });

    if (res.ok) {
      const resn = await res.json();
      console.log(resn);
      setShippingAddresses(resn);
      setisAddressLoading(false);
    } else {
      console.log(await res.json());
      setisAddressLoading(false);
    }
  };

  const handlePaymentWithStripe = async () => {
    const stripe = await getStripe();
    console.log(selectedAddress);
    if (
      selectedAddress === null ||
      selectedAddress === undefined ||
      selectedAddress === ""
    ) {
      toast.error("Please select a shipping address");
      return;
    }
    setisPaymentProcessing(true);
    const res = await fetch("/api/order/pay", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ address_id: selectedAddress }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      console.log(res);
      toast.error("Something went wrong, Try again later");
      setisPaymentProcessing(false);
    }
  };

  const handlePaymentWithEth = async () => {
    if (
      selectedAddress === null ||
      selectedAddress === undefined ||
      selectedAddress === ""
    ) {
      toast.error("Please select a shipping address");
      return;
    }
    try {
      await checkIfWalletIsConnected();
    } catch (error) {
      toast.error("Meta Mask Error. Please Connect your wallet");

      return;
    }
    setisEthPaymentProcessing(true);
    const res = await fetch("/api/order/eth-pay", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ address_id: selectedAddress }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      try {
        if (!currentAccount) {
          await connectWallet();
        }
        const rs = await makePayment(data.orderId, data.customerId, data.total);
        if (rs === true) {
          toast.success("Your order has been placed");
          router.push("/user/dashboard/my-orders");
          return;
        } else {
          toast.error("Payment failed");
          setisEthPaymentProcessing(false);
          return;
        }
      } catch (error) {
        toast.error("Payment failed");
        setisEthPaymentProcessing(false);
        return;
      }
    } else {
      const data = await res.json();
      console.log(data);
      toast.error("Something went wrong, Try again later");
      setisEthPaymentProcessing(false);
    }
  };

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
    console.log(address);
    const res = await fetch("/api/user/add-shipping-address", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(address),
    });

    if (res.ok) {
      const data = await res.json();
      getShippingAddresses();
      setisAddressSaving(false);
    } else {
      console.log(res);
      toast.error("Something went wrong, Try again later");
      setisAddressSaving(false);
    }
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
    loadCartData();
    getShippingAddresses();
  }, []);

  if (status === "loading") {
    return <PageLoader />;
  }
  if (status === "unauthenticated") {
    return <ErrorPage />;
  }

  return (
    <div>
      <div className="max-w-[1000px] flex-grow w-[95%] mx-auto py-12 flex flex-col justify-center gap-6">
        <div className="flex gap-3 items-center justify-center w-ffull text-center">
          <span>Your Cart</span>
          <span className="text-blue-500 font-semibold">
            {"("}
            {cartItems.length}
            {" Items)"}
          </span>
        </div>
        {isAddressLoading || isCartLoading ? (
          <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-12 p-4">
            <div className="flex flex-col w-full gap-6">
              <div className="w-full rounded-md bg-gray-100 h-[166px]"></div>
              <div className="w-full rounded-md bg-gray-100 h-[166px]"></div>
            </div>
            <div className="flex flex-col w-full gap-6">
              <div className="w-full rounded-md bg-gray-100 h-[166px]"></div>
              <div className="w-full rounded-md bg-gray-100 h-[166px]"></div>
            </div>
          </div>
        ) : cartItems.length <= 0 ? (
          <div className="flex w-full flex-col items-center gap-4">
            <AiOutlineShopping size={150} />
            <h3 className="font-bold">Your Shopping Bag Is Empty</h3>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full mx-auto gap-12 p-4">
              <div className="w-full max-w-[500px] p-4 mx-auto">
                <div className="w-full flex flex-col gap-3">
                  {cartItems.map((item, i) => (
                    <ShoppingCartItem
                      key={i}
                      item={item}
                      getCartItems={getCartItems}
                    />
                  ))}
                </div>
              </div>
              <div className="w-full p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <span>Select / Add Shipping Address</span>
                    <button
                      className="text-sm font-bold text-blue-500 underline"
                      onClick={() => setIsHide((prev) => !prev)}
                    >
                      {isHide ? "Add" : "Hide"}
                    </button>
                  </div>
                  {}
                  <div
                    className={`flex flex-col gap-2 relative ${
                      isHide && "h-0 overflow-hidden"
                    }`}
                  >
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
                      onChange={(e) => handleInput(e, "name")}
                    />

                    <div className="flex grid-cols-2 gap-2">
                      <input
                        className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                        type="text"
                        placeholder="Address 1"
                        onChange={(e) => handleInput(e, "address1")}
                      />
                      <input
                        className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                        type="text"
                        placeholder="Address 2"
                        onChange={(e) => handleInput(e, "address2")}
                      />
                    </div>
                    <div className="flex grid-cols-2 gap-2">
                      <input
                        className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                        type="text"
                        placeholder="state"
                        onChange={(e) => handleInput(e, "state")}
                      />

                      <input
                        className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                        type="text"
                        placeholder="City"
                        onChange={(e) => handleInput(e, "city")}
                      />
                    </div>

                    <div className="flex grid-cols-2 gap-2">
                      <input
                        className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                        type="text"
                        placeholder="Postal Code"
                        onChange={(e) => handleInput(e, "postalCode")}
                      />

                      <input
                        className="p-2  outline-blue-500 w-full rounded border border-gray-300 text-gray-600 text-sm"
                        type="text"
                        placeholder="555 555 555"
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
                  {shippingAddresses.length <= 0 ? (
                    <div className="py-2">
                      <h3 className="font-bold">
                        Your Dont have Any Shipping Addresses
                      </h3>
                    </div>
                  ) : (
                    <>
                      {shippingAddresses.map((address) => (
                        <div className="flex w-full shadow p-2 ">
                          <button className="w-10 flex justify-center items-center h-full">
                            <input
                              type="radio"
                              name="address"
                              id="address"
                              onClick={() => {
                                setSelectedAddress(address._id);
                              }}
                            />
                          </button>

                          <div className="flex flex-col flex-grow">
                            <div className="text-sm">{address.name}</div>
                            <div className="text-sm">
                              {address.address1} {","} {address.address2}
                            </div>
                            <div className="text-sm">
                              {address.city} {","} {address.state}
                            </div>
                            <div className="text-sm">
                              {address.country.label} {","} {address.postalCode}
                            </div>
                            <div className="text-sm">{address.contact}</div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {isPaymentProcessing || isEthPaymentProcessing ? (
                    <>
                      {isPaymentProcessing && (
                        <>
                          <button
                            disabled
                            className="w-full  bg-blue-300 py-3 px-2 flex justify-center items-center text-white  text-base font-semibold gap-4 rounded-sm shadow-sm "
                          >
                            Processing
                            <span className="animate-spin">
                              <AiOutlineLoading3Quarters size={25} />
                            </span>
                          </button>
                          <button
                            disabled={true}
                            onClick={handlePaymentWithEth}
                            className="w-full bg-blue-300 py-3 px-2 flex justify-center items-center text-white  text-base font-semibold gap-4 rounded-sm shadow-sm"
                          >
                            Pay with Ethereum
                            <BsFillCreditCard2FrontFill size={25} />
                          </button>
                        </>
                      )}
                      {isEthPaymentProcessing && (
                        <>
                          <button
                            disabled
                            className="w-full  bg-blue-300 py-3 px-2 flex justify-center items-center text-white  text-base font-semibold gap-4 rounded-sm shadow-sm "
                          >
                            Pay with Stripe
                            <BsFillCreditCard2FrontFill size={25} />
                          </button>
                          <button
                            disabled={true}
                            onClick={handlePaymentWithEth}
                            className="w-full bg-blue-500 py-3 px-2 flex justify-center items-center text-white  text-base font-semibold gap-4 rounded-sm shadow-sm"
                          >
                            Transaction Processing
                            <span className="animate-spin">
                              <AiOutlineLoading3Quarters size={25} />
                            </span>
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handlePaymentWithStripe}
                        className="w-full bg-blue-500 py-3 px-2 flex justify-center items-center text-white  text-base font-semibold gap-4 rounded-sm shadow-sm hover:bg-blue-600 transition-all cursor-pointer"
                      >
                        Pay with Stripe
                        <BsFillCreditCard2FrontFill size={25} />
                      </button>
                      <button
                        onClick={handlePaymentWithEth}
                        className="w-full bg-blue-500 py-3 px-2 flex justify-center items-center text-white  text-base font-semibold gap-4 rounded-sm shadow-sm hover:bg-blue-600 transition-all cursor-pointer"
                      >
                        Pay with Ethereum
                        <BsFillCreditCard2FrontFill size={25} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
