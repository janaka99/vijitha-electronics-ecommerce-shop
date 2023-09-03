"use client";

import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import WholePageLoading from "@components/WholePageLoading";
import { resolve } from "styled-jsx/css";
import PopUp from "@components/PopUp";
import Loader from "@components/Loader";
// import Loader from "./Loader";

const page = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [popUp, setPopUp] = useState({
    message: "",
    type: "",
    show: false,
  });

  const [loading, setloading] = useState({
    isEmailLoading: false,
    isNameLoading: false,
    isContactLoading: false,
    isAddressLoading: false,
    isPasswordLoading: false,
  });

  const [user, setUser] = useState({
    email: "",
    name: "",
    phone_number: "",
    address1: "",
    address2: "",
    address3: "",
    password: "",
  });
  const [errorList, setErrorList] = useState({
    email: "",
    name: "",
    phone_number: "",
    address1: "",
    address2: "",
    address3: "",
    password: "",
  });

  const [seletedUser, setSelectedUser] = useState(null);

  const setAllErrorsEmpty = () => {
    setErrorList({
      email: "",
      name: "",
      phone_number: "",
      address1: "",
      address2: "",
      address3: "",
      password: "",
    });
  };

  const getUser = async () => {
    const res = await fetch("/api/user/get", {
      method: "GET",
    });
    const jres = await res.json();
    console.log(jres);
    if (res.ok) {
      setUser({
        ...user,
        email: jres.user.email,
        name: jres.user.name,
        phone_number: jres.user.phoneNumber,
        address1: jres.user.address1,
        address2: jres.user.address2,
        address3: jres.user.address3,
      });
    } else {
      setPopUp({
        message: jres.message,
        type: "error",
        show: true,
      });
    }
  };

  const updateEmail = async (e) => {
    e.preventDefault();
    setloading(() => ({
      ...loading,
      isEmailLoading: true,
    }));
    setAllErrorsEmpty();
    let error = false;
    if (user.email == "") {
      error = true;
      setErrorList((prev) => ({
        ...prev,
        email: "Email Cannot Be Empty",
      }));
    }
    if (error != true) {
      try {
        const res = await fetch("/api/user/update/email", {
          method: "POST",
          body: JSON.stringify({ email: user.email }),
        });

        if (res.ok) {
          getUser();
          setloading(() => ({
            ...loading,
            isEmailLoading: false,
          }));
          setPopUp({
            message: "Successfully updated the email",
            type: "sucess",
            show: true,
          });
        } else {
          const jres = await res.json();
          setloading(() => ({
            ...loading,
            isEmailLoading: false,
          }));
          setPopUp({
            message: jres.message,
            type: "error",
            show: true,
          });
        }
      } catch (error) {
        console.error(error);
        setloading(() => ({
          ...loading,
          isEmailLoading: false,
        }));
        setPopUp({
          message: "Please chek your form before submitting",
          type: "error",
          show: true,
        });
      }
    } else {
      setloading(() => ({
        ...loading,
        isEmailLoading: false,
      }));
    }
  };

  const updateName = async (e) => {
    e.preventDefault();
    setloading(() => ({
      ...loading,
      isNameLoading: true,
    }));
    setAllErrorsEmpty();
    let error = false;
    if (user.name == "") {
      setErrorList((prev) => ({
        ...prev,
        name: "Name Cannot Be Empty",
      }));
      error = true;
    }
    if (error != true) {
      try {
        const res = await fetch("/api/user/update/name", {
          method: "POST",
          body: JSON.stringify({ name: user.name }),
        });

        if (res.ok) {
          getUser();
          setloading(() => ({
            ...loading,
            isNameLoading: false,
          }));
          setPopUp({
            message: "Successfully updated the name",
            type: "sucess",
            show: true,
          });
        } else {
          const jres = await res.json();
          setloading(() => ({
            ...loading,
            isNameLoading: false,
          }));
          setPopUp({
            message: jres.message,
            type: "error",
            show: true,
          });
        }
      } catch (error) {
        setloading(() => ({
          ...loading,
          isNameLoading: false,
        }));
        setPopUp({
          message: "Please chek your form before submitting",
          type: "error",
          show: true,
        });
      }
    } else {
      setloading(() => ({
        ...loading,
        isNameLoading: false,
      }));
    }
  };

  const updateContact = async (e) => {
    e.preventDefault();
    setloading(() => ({
      ...loading,
      isContactLoading: true,
    }));
    setAllErrorsEmpty();
    let error = false;
    if (user.phone_number == "") {
      error = true;
      setErrorList((prev) => ({
        ...prev,
        phone_number: "Contact Cannot Be Empty",
      }));
    } else if (typeof Number(user.phone_number) == NaN) {
      error = true;
      setErrorList((prev) => ({
        ...prev,
        phone_number: "Contact Should Be Numbers",
      }));
    }
    if (error != true) {
      try {
        const res = await fetch("/api/user/update/contact", {
          method: "POST",
          body: JSON.stringify({ phone_number: user.phone_number }),
        });

        if (res.ok) {
          const jres = await res.json();
          console.log(jres);
          getUser();
          setloading(() => ({
            ...loading,
            isContactLoading: false,
          }));
          setPopUp({
            message: "Successfully updated the Contact Number",
            type: "sucess",
            show: true,
          });
        } else {
          const jres = await res.json();
          setloading(() => ({
            ...loading,
            isContactLoading: false,
          }));
          setPopUp({
            message: jres.message,
            type: "error",
            show: true,
          });
        }
      } catch (error) {
        setloading(() => ({
          ...loading,
          isContactLoading: false,
        }));
        setPopUp({
          message: "Please chek your form before submitting",
          type: "error",
          show: true,
        });
      }
    } else {
      setloading(() => ({
        ...loading,
        isContactLoading: false,
      }));
    }
  };

  const updateAddress = async (e) => {
    e.preventDefault();
    setloading(() => ({
      ...loading,
      isAddressLoading: true,
    }));
    setAllErrorsEmpty();
    let error = false;
    if (user.address1 == "") {
      error = true;
      setErrorList((prev) => ({
        ...prev,
        address1: "Address 1 Cannot Be Empty",
      }));
    }
    if (user.address2 == "") {
      error = true;
      setErrorList((prev) => ({
        ...prev,
        address2: "Address 2 Cannot Be Empty",
      }));
    }
    if (error != true) {
      try {
        const res = await fetch("/api/user/update/address", {
          method: "POST",
          body: JSON.stringify({
            address1: user.address1,
            address2: user.address2,
            address3: user.address3,
          }),
        });

        if (res.ok) {
          const jres = await res.json();
          console.log(jres);
          getUser();
          setloading(() => ({
            ...loading,
            isAddressLoading: false,
          }));
          setPopUp({
            message: "Successfully updated the Address",
            type: "sucess",
            show: true,
          });
        } else {
          const jres = await res.json();
          setloading(() => ({
            ...loading,
            isAddressLoading: false,
          }));
          setPopUp({
            message: jres.message,
            type: "error",
            show: true,
          });
        }
      } catch (error) {
        console.log(error);
        setloading(() => ({
          ...loading,
          isAddressLoading: false,
        }));
        setPopUp({
          message: "Please chek your form before submitting",
          type: "error",
          show: true,
        });
      }
    } else {
      setloading(() => ({
        ...loading,
        isAddressLoading: false,
      }));
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setloading(() => ({
      ...loading,
      isPasswordLoading: true,
    }));
    setAllErrorsEmpty();
    let error = false;

    if (user.password == "") {
      setErrorList((prev) => ({
        ...prev,
        password: "Password Cannot Be Empty",
      }));
      error = true;
    } else if (user.password.length <= 8) {
      setErrorList((prev) => ({
        ...prev,
        password: "Password should be at least 9 characters long",
      }));
      error = true;
    }
    if (error != true) {
      try {
        const res = await fetch("/api/user/update/password", {
          method: "POST",
          body: JSON.stringify({
            password: user.password,
          }),
        });

        if (res.ok) {
          const jres = await res.json();
          console.log(jres);
          getUser();
          setloading(() => ({
            ...loading,
            isPasswordLoading: false,
          }));
          setPopUp({
            message: "Successfully updated the Password",
            type: "sucess",
            show: true,
          });
        } else {
          const jres = await res.json();
          setloading(() => ({
            ...loading,
            isPasswordLoading: false,
          }));
          setPopUp({
            message: jres.message,
            type: "error",
            show: true,
          });
        }
      } catch (error) {
        console.log(error);
        setloading(() => ({
          ...loading,
          isPasswordLoading: false,
        }));
        setPopUp({
          message: "Please chek your form before submitting",
          type: "error",
          show: true,
        });
      }
    } else {
      setloading(() => ({
        ...loading,
        isPasswordLoading: false,
      }));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (status === "loading") {
    <WholePageLoading />;
  } else if (status === "unauthenticated") {
    router.push("/user/login");
  }

  return (
    <div className="max-w-[700px] w-[95%] mx-auto my-16">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2 mb-12">
          <h1 className=" uppercase text-2xl font-semibold text-center">
            Update My Information
          </h1>
        </div>
        <form
          onSubmit={updateEmail}
          className="w-full flex flex-col gap-1 relative p-[2px]"
        >
          <label className="text-sm text-black ml-3 ">Email</label>
          <input
            className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
            type="email"
            placeholder="Enter Your Email"
            defaultValue={user.email}
            onChange={(e) => {
              setUser({
                ...user,
                email: e.target.value,
              });
            }}
          />
          <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left">
            {errorList.email}
          </div>

          <button className="btn-1 self-end min-w-[200px] w-full" type="submit">
            Update Email
          </button>
          {loading.isEmailLoading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
              <Loader size={"50px"} border={"5px"} />
            </div>
          )}
        </form>
        <form
          onSubmit={updateName}
          className="w-full flex flex-col gap-2 p-[2px] relative"
        >
          <label className="text-sm text-black ml-3 ">Name</label>
          <input
            className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
            type="text"
            placeholder="Enter Your Name"
            defaultValue={user.name}
            onChange={(e) => {
              setUser({
                ...user,
                name: e.target.value,
              });
            }}
          />
          <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
            {errorList.name}
          </div>
          <button className="btn-1 self-end min-w-[200px] w-full" type="submit">
            Update Name
          </button>
          {loading.isNameLoading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
              <Loader size={"50px"} border={"5px"} />
            </div>
          )}
        </form>

        <form
          onSubmit={updateContact}
          className="w-full flex flex-col gap-2 p-[2px] relative"
        >
          <label className="text-sm text-black ml-3 ">Contact Number</label>
          <input
            className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
            type="text"
            placeholder="Contact Number"
            defaultValue={user.phone_number}
            onChange={(e) => {
              setUser({
                ...user,
                phone_number: e.target.value,
              });
            }}
          />
          <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
            {errorList.phone_number}
          </div>
          <button className="btn-1 self-end min-w-[200px] w-full" type="submit">
            Update Contact
          </button>
          {loading.isContactLoading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
              <Loader size={"50px"} border={"5px"} />
            </div>
          )}
        </form>
        <form
          onSubmit={updateAddress}
          className="w-full flex flex-col gap-2 p-[2px] relative"
        >
          <label className="text-sm text-black ml-3 ">Address</label>
          <div className="flex flex-col w-full gap-8 ">
            <div className="flex flex-col w-full ">
              <input
                className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                type="text"
                placeholder="Address 1"
                defaultValue={user.address1}
                onChange={(e) => {
                  setUser({
                    ...user,
                    address1: e.target.value,
                  });
                }}
              />
              <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
                {errorList.address1}
              </div>
            </div>
            <div className="flex flex-col w-full ">
              <input
                className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                type="text"
                placeholder="Address 2"
                defaultValue={user.address2}
                onChange={(e) => {
                  setUser({
                    ...user,
                    address2: e.target.value,
                  });
                }}
              />
              <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left">
                {errorList.address2}
              </div>
            </div>
            <div className="flex flex-col w-full ">
              <input
                className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                type="text"
                placeholder="Address 2"
                defaultValue={user.address3}
                onChange={(e) => {
                  setUser({
                    ...user,
                    address3: e.target.value,
                  });
                }}
              />
              <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left">
                {errorList.address3}
              </div>
            </div>
          </div>
          <button className="btn-1 self-end min-w-[200px] w-full" type="submit">
            Update Address
          </button>
          {loading.isAddressLoading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
              <Loader size={"50px"} border={"5px"} />
            </div>
          )}
        </form>
        <form
          onSubmit={updatePassword}
          className="w-full flex flex-col gap-2 p-[2px] relative"
        >
          <label className="text-sm text-black ml-3 ">Password</label>
          <input
            className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
            type="text"
            placeholder="Contact Number"
            onChange={(e) => {
              setUser({
                ...user,
                password: e.target.value,
              });
            }}
          />
          <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
            {errorList.password}
          </div>
          <button className="btn-1 self-end min-w-[200px] w-full" type="submit">
            Update Password
          </button>
          {loading.isPasswordLoading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
              <Loader size={"50px"} border={"5px"} />
            </div>
          )}
        </form>
      </div>
      {/* <AddNewEmp addNewEmpWindow={addNewEmpWindow}>
        <AddNewEmployee
          setAddNewEmpWindow={setAddNewEmpWindow}
          getUsers={getUsers}
        />
      </AddNewEmp> */}
      {loading && (
        // <LoadingDiv>
        //   <Loader size={"50px"} border={"5px"} />
        // </LoadingDiv>
        <></>
      )}
      {popUp.show && <PopUp popUp={popUp} setPopUp={setPopUp} />}
    </div>
  );
};

export default page;
