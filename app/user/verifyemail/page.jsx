"use client";
import ErrorPage from "@components/ErrorPage";
import PageLoader from "@components/PageLoader";
import SpinLoader from "@components/SpinLoader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useStateManager } from "react-select";

const page = (props) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, seterror] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const { data, status } = useSession();

  const verifyUserEmail = async () => {
    setIsVerifying(true);
    try {
      let res = await fetch(
        `/api/user/verify?token_id=${props.searchParams.token}`,
        {
          method: "POST",
          body: JSON.stringify(token),
        }
      );
      if (res.ok) {
        toast.success("Email verification Success. PLease Login");
        router.push("/user/login");
        setIsVerifying(false);
      } else {
        toast.error("Email verification failed");
        setIsVerifying(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Email verification failed");
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      verifyUserEmail();
    }
  }, [status]);

  if (status === "loading") {
    return <PageLoader />;
  }
  if (status === "authenticated") {
    return <ErrorPage />;
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl">VErify Email</h1>
      {isVerifying ? (
        <button>Verifying</button>
      ) : (
        <button onClick={verifyUserEmail}>Retrynb</button>
      )}
    </div>
  );
};

export default page;
