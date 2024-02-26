"use client";
import AddNewEmployee from "@components/AddNewEmployee";
import ErrorPage from "@components/ErrorPage";
import PageLoader from "@components/PageLoader";
import PopUp from "@components/PopUp";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const page = () => {
  const { data: session, status } = useSession();

  const [users, setAllUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [loading, setIsLoading] = useState(true);
  const [seletedUser, setseletedUser] = useState([]);
  const [userView, setuserView] = useState(null);

  const [popUp, setPopUp] = useState({
    message: "",
    type: "",
    show: false,
  });

  const [isDeleting, setIsDeleting] = useState(false);

  //get all the users available
  const getUsers = async () => {
    setIsUsersLoading(true);
    try {
      const res = await fetch("/api/user/employees", {
        method: "GET",
      });
      const newRes = await res.json();
      console.log(newRes);
      if (res.ok) {
        console.log("session found ", session, status);
        setseletedUser(() =>
          newRes.filter((i) => i.email === session.user.email)
        );
        setAllUsers(() =>
          newRes.filter((i) => i.email !== session?.user.email)
        );
        const sell = newRes.filter((i) => i.email === session?.user.email);
        setuserView(sell[0]);
        console.log("user ", userView);
        console.log("users ", seletedUser);
        console.log("user1 ", users);
      } else {
        // settitleError(newRes.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsUsersLoading(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUsers();
    }
  }, [status]);

  const handleRemoveuser = async (id) => {
    setIsDeleting(true);
    const updatedEmployee = {
      userId: id,
    };

    try {
      const res = await fetch("/api/user/delete", {
        method: "POST",
        body: JSON.stringify(updatedEmployee),
      });

      if (res.ok) {
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    getUsers();
    setIsDeleting(false);
  };

  const handleActivateUser = async (id) => {
    setIsDeleting(true);
    const updatedEmployee = {
      userId: id,
    };

    try {
      const res = await fetch("/api/user/re-asign", {
        method: "POST",
        body: JSON.stringify(updatedEmployee),
      });

      if (res.ok) {
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
    getUsers();
    setIsDeleting(false);
  };
  console.log(session);
  if (status === "loading") {
    return <PageLoader />;
  }
  if (status === "unauthenticated") {
    return <ErrorPage />;
  }
  if (session.user.role === "employee" || session.user.role === "customer") {
    return <ErrorPage />;
  }

  return (
    <div className="max-w-[1440px] w-[95%] mx-auto my-12 flex flex-col gap-12">
      <h1 className=" uppercase text-2xl font-semibold text-center">
        Manage Employees
      </h1>
      <div className="w-full max-w-[768px] mx-auto flex flex-col gap-4">
        <div className="flex text-lg text-black pl-4  ">
          <div className="text-base font-semibold uppercase">
            Add New Employee
          </div>
        </div>
        <AddNewEmployee getUsers={getUsers} />
      </div>
      <div className="flex text-lg text-black  pl-4  ">
        <div className="text-base font-semibold uppercase">Employees</div>
      </div>
      <div className="text-lg text-black pl-4">
        Welcome : {session?.user.email}{" "}
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="w-full flex bg-slate-200 p-2">
          <div className="w-2/5">Email</div>
          <div className="w-1/5">Name</div>
          <div className="w-1/5">Verified</div>
          <div className="w-[10%]">Role</div>
          <div className="w-[10%]">Status</div>
          <div className="w-[10%] flex justify-end ">Action</div>
        </div>
        {users
          .filter((user) => user.email !== session.user.email)
          .map((user, i) => (
            <div key={i} className="w-full flex p-2">
              <div className="w-2/5 text-sm">{user.email}</div>
              <div className="w-1/5 text-sm">{user.name}</div>
              <div className="w-1/5 text-sm">
                {user.isVerified ? "Verified" : "Not Verified"}
              </div>
              <div className="w-[10%] text-sm">{user.role}</div>
              <div className="w-[10%] text-sm">
                {user.accountStatus == "working" ? "working" : "not working"}
              </div>
              {(session.user.role === "admin" ||
                session.user.role === "manager") && (
                <div className="w-[10%] flex justify-end gap-1">
                  {user.accountStatus === "working" ? (
                    <button
                      className="bg-red-400 py-[2px] px-2 rounded text-sm"
                      onClick={() => handleRemoveuser(user._id)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="bg-green-400 py-[2px] px-2 rounded text-sm"
                      onClick={() => handleActivateUser(user._id)}
                    >
                      ReAsign
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
      {popUp.show && <PopUp popUp={popUp} setPopUp={setPopUp} />}
    </div>
  );
};

export default page;
