"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@components/Loader";
import SpinLoader from "@components/SpinLoader";
import ErrorPage from "@components/ErrorPage";
import toast from "react-hot-toast";
import { AiOutlineUpload } from "react-icons/ai";

const page = () => {
  const router = useRouter();
  let placeholderImage = "/profilePlaceholder.png";
  const { data: session, status } = useSession();

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageTemp, setProfileImageTemp] = useState(null);
  const [isImageuploading, setIsImageuploading] = useState(false);

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
    src: "",
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

  const handleImage = (e) => {
    setProfileImageTemp(null);
    setProfileImage(null);
    var reader = new FileReader();
    reader.onloadend = function () {
      setProfileImageTemp(reader.result);
    };
    setProfileImage(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (profileImage !== null) {
      setIsImageuploading(true);
      const data = new FormData();
      data.set("file", profileImage);
      const res = await fetch("/api/user/update/profile-image", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setProfileImage(null);
        setProfileImageTemp(null);
        getUser();
        setIsImageuploading(false);
        toast.success("Profile image successfully updated");
      } else {
        setIsImageuploading(false);
        toast.error("Profile image failed to update");
      }
      toast.error("Image is empty");
    }
  };

  const getUser = async () => {
    const res = await fetch("/api/user/get", {
      method: "GET",
    });
    const jres = await res.json();

    if (res.ok) {
      setUser((prev) => ({
        ...prev,
        email: jres.user.email,
        name: jres.user.name,
        phone_number: jres.user.phoneNumber,
        address1: jres.user.address1,
        address2: jres.user.address2,
        address3: jres.user.address3,
        src: jres.user.src,
      }));
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
          toast.success("Successfully updated the email");
        } else {
          const jres = await res.json();
          setloading(() => ({
            ...loading,
            isEmailLoading: false,
          }));
          toast.error("Failed to update the email");
        }
      } catch (error) {
        console.error(error);
        setloading(() => ({
          ...loading,
          isEmailLoading: false,
        }));
        toast.error("Failed to update the email");
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
          toast.success("Successfully updated the name");
        } else {
          const jres = await res.json();
          setloading(() => ({
            ...loading,
            isNameLoading: false,
          }));
          toast.error("Failed to update the name");
        }
      } catch (error) {
        setloading(() => ({
          ...loading,
          isNameLoading: false,
        }));
        toast.error("Failed to update the name");
      }
    } else {
      setloading(() => ({
        ...loading,
        isNameLoading: false,
      }));
      toast.error("Failed to update the name");
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

          getUser();
          setloading(() => ({
            ...loading,
            isContactLoading: false,
          }));
          toast.success("Suucessfully updated the Phone Number");
        } else {
          const jres = await res.json();
          setloading(() => ({
            ...loading,
            isContactLoading: false,
          }));
          toast.error("Failed to update the Phone Number");
        }
      } catch (error) {
        setloading(() => ({
          ...loading,
          isContactLoading: false,
        }));
        toast.error("Failed to update the Phone Number");
      }
    } else {
      setloading(() => ({
        ...loading,
        isContactLoading: false,
      }));
      toast.error("Failed to update the Phone Number");
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

          getUser();
          setloading(() => ({
            ...loading,
            isAddressLoading: false,
          }));
          toast.success("Successfully updated the address");
        } else {
          const jres = await res.json();
          setloading(() => ({
            ...loading,
            isAddressLoading: false,
          }));
          toast.error("Failed to update the address");
        }
      } catch (error) {
        setloading(() => ({
          ...loading,
          isAddressLoading: false,
        }));
        toast.error("Failed to update the address");
      }
    } else {
      setloading(() => ({
        ...loading,
        isAddressLoading: false,
      }));
      toast.error("Failed to update the address");
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

          getUser();
          setloading(() => ({
            ...loading,
            isPasswordLoading: false,
          }));
          toast.success("Failed to update the password, Please Login again");
        } else {
          const jres = await res.json();
          setloading(() => ({
            ...loading,
            isPasswordLoading: false,
          }));
          toast.error("Failed to update the password");
        }
      } catch (error) {
        setloading(() => ({
          ...loading,
          isPasswordLoading: false,
        }));
        toast.error("Failed to update the password");
      }
    } else {
      setloading(() => ({
        ...loading,
        isPasswordLoading: false,
      }));
      toast.error("Failed to update the password");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (status === "loading") {
    return (
      <div className="w-screen h-[calc(100vh-240px)]">
        <SpinLoader />
      </div>
    );
  }
  if (status === "unauthenticated") {
    return <ErrorPage />;
  }

  return (
    <div className="max-w-[700px] w-[95%] mx-auto my-16">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex flex-col gap-2 mb-12">
          <h1 className=" uppercase text-2xl font-semibold text-center">
            Update My Information
          </h1>
        </div>
        <div className="w-full flex gap-1 justify-between relative p-[2px]">
          <div className=""></div>
          <div className="w-[150px] flex flex-col gap-2">
            <div className="w-[150px] h-[150px] bg-gray-100 rounded-md overflow-hidden">
              <img
                src={
                  profileImageTemp
                    ? profileImageTemp
                    : user.src
                    ? user.src
                    : placeholderImage
                }
                alt=""
                className="w-full h-full object-center object-cover "
              />
            </div>
            <div className=" w-full ">
              <label
                htmlFor="profile-picture"
                className=" bg-gray-100 cursor-pointer w-full py-2 flex justify-center items-center border-gray-200 rounded-md "
              >
                <AiOutlineUpload size={30} />
              </label>
              <input
                id="profile-picture"
                type="file"
                className="hidden"
                onInput={handleImage}
              />
            </div>
            {isImageuploading ? (
              <button
                disabled={true}
                className=" py-2 text-white bg-[#1a57dbc4] rounded-sm max-w-[150px] w-full "
              >
                Updating...
              </button>
            ) : (
              <button
                onClick={handleImageUpload}
                className=" py-2 text-white bg-[#1A56DB] rounded-sm max-w-[150px] w-full "
              >
                Update Profile
              </button>
            )}
          </div>
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

          <button
            className="px-6 py-2 text-white bg-[#1A56DB] rounded-sm max-w-[200px] w-full self-end"
            type="submit"
          >
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
          <button
            className="px-6 py-2 text-white bg-[#1A56DB] rounded-sm max-w-[200px] w-full self-end"
            type="submit"
          >
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
          <button
            className="px-6 py-2 text-white bg-[#1A56DB] rounded-sm max-w-[200px] w-full self-end"
            type="submit"
          >
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
          <button
            className="px-6 py-2 text-white bg-[#1A56DB] rounded-sm max-w-[200px] w-full self-end"
            type="submit"
          >
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
            placeholder="New Password"
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
          <button
            className="px-6 py-2 text-white bg-[#1A56DB] rounded-sm max-w-[200px] w-full self-end"
            type="submit"
          >
            Update Password
          </button>
          {loading.isPasswordLoading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-[#ffffff03] backdrop-blur-[1px] flex justify-center items-center">
              <SpinLoader />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default page;
