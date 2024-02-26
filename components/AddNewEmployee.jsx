"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddNewEmployee = ({ getUsers }) => {
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const setAllErrorsEmpty = () => {
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setIdError("");
    setAddress1Error("");
    setAddress2Error("");
    setPasswordError("");
  };

  const FormRef = useRef();
  const roleRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [idError, setIdError] = useState("");
  const [address1Error, setAddress1Error] = useState("");
  const [address2Error, setAddress2Error] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [id, setid] = useState("");
  const [address1, setaddress1] = useState("");
  const [address2, setaddress2] = useState("");
  const [address3, setaddress3] = useState("");
  const [password, setpassword] = useState("");

  const handleFormView = () => {
    FormRef.current.reset();
    setNameError("");
    setEmailError("");
    setPhoneNumberError("");
    setIdError("");
    setAddress1Error("");
    setAddress2Error("");
    setPasswordError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAllErrorsEmpty();

    let error = false;
    if (name == "") {
      error = true;
      setNameError("Name is required");
    }

    if (email == "") {
      error = true;
      setEmailError("Email is required");
    } else if (validateEmail(email) == false) {
      setEmailError("Email is not valid");
    }

    if (password == "") {
      error = true;

      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password should be at least 8 characters long");
    }

    if (id == "") {
      error = true;

      setIdError("Id is required");
    }

    if (phoneNumber == "") {
      error = true;

      setPhoneNumberError("Phone number is required");
    }

    if (address1 == "") {
      error = true;

      setAddress1Error("Address1 is required");
    }

    if (address2 == "") {
      error = true;

      setAddress2Error("Address2 is required");
    }

    if (error == false) {
      const newEmployee = {
        name: name,
        email: email,
        id: id,
        phoneNumber: phoneNumber,
        address1: address1,
        address2: address2,
        address3: address3,
        password: password,
        role: roleRef.current.value,
      };

      try {
        const res = await fetch("/api/user/new-employee", {
          method: "POST",
          body: JSON.stringify(newEmployee),
        });

        if (res.ok) {
          console.log(res);
          getUsers();
          handleFormView();
          setIsLoading(false);
          toast.success("Successfully created new employee");
        } else {
          const newres = await res.json();
          console.log(newres);
          setIsLoading(false);
          toast.error(newres.message);
        }
      } catch (error) {
        toast.error("Something went wrong try again later");
      }
    } else {
      toast.error("Something went wrong try again later");
    }
  };

  return (
    <div className="w-full p-4 flex flex-col">
      <div className="flex flex-col w-full">
        <form
          onSubmit={(e) => {
            handleFormSubmit(e);
          }}
          ref={FormRef}
        >
          <div>
            <div>
              <div className="gap-2 flex flex-col">
                <label className="text-sm text-black ml-3 ">Name</label>
                <input
                  type="text"
                  className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                  placeholder="John Doe"
                  required
                  onChange={(e) => {
                    console.log(e.target.value);
                    setname(e.target.value);
                  }}
                />
                <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
                  {nameError}
                </div>
              </div>
              <div className="gap-2 flex flex-col">
                <label className="text-sm text-black ml-3 ">Email</label>
                <input
                  className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                  type="email"
                  placeholder="john@gmail.com"
                  required
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
                <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
                  {emailError}
                </div>
              </div>
              <div className="gap-2 flex flex-col">
                <label className="text-sm text-black ml-3 ">Phone Number</label>
                <input
                  className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                  type="text"
                  placeholder="555 555 555"
                  required
                  onChange={(e) => {
                    setphoneNumber(e.target.value);
                  }}
                />
                <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
                  {phoneNumberError}
                </div>
              </div>
              <div className="gap-2 flex flex-col">
                <label className="text-sm text-black ml-3 ">ID Number</label>
                <input
                  className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                  type="text"
                  required
                  placeholder="23568797987"
                  onChange={(e) => {
                    setid(e.target.value);
                  }}
                />
                <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
                  {idError}
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-4">
              <div className="gap-2 flex flex-col">
                <label className="text-sm text-black ml-3 ">Password</label>
                <input
                  className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                  type="password"
                  required
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
                  {passwordError}
                </div>
              </div>
              <div className="gap-2 flex flex-col w-full">
                <label className="text-sm text-black ml-3 ">Role</label>
                <select
                  className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                  ref={roleRef}
                >
                  <option value="employee" selected>
                    Employee
                  </option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="gap-2 flex flex-col">
                <label className="text-sm text-black ml-3 ">Address</label>
                <div className="flex flex-col gap-4">
                  <input
                    className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                    type="text"
                    placeholder="Address 1"
                    required
                    onChange={(e) => {
                      setaddress1(e.target.value);
                    }}
                  />
                  <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
                    {address1Error}
                  </div>

                  <input
                    className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                    type="text"
                    placeholder="Address 2"
                    required
                    onChange={(e) => {
                      setaddress2(e.target.value);
                    }}
                  />
                  <div className="h-[5px] text-sm w-full mr-3 text-red-500 text-left ">
                    {address2Error}
                  </div>

                  <input
                    className="w-full outline-none px-3 py-4 bg-gray-200 rounded-md"
                    type="text"
                    placeholder="Address 3"
                    onChange={(e) => {
                      setaddress3(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            {isLoading ? (
              <p className="px-6 py-2 text-white bg-blue-500 rounded-sm w-fit mt-10 min-w-full text-center">
                Registering...
              </p>
            ) : (
              <button
                className="px-6 py-2 text-white bg-blue-500 rounded-sm w-fit mt-10 min-w-full"
                type="submit"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployee;
