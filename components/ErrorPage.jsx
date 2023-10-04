import React from "react";

const ErrorPage = () => {
  return (
    <div className="w-screen h-[calc(100vh-50px)] flex justify-center items-center flex-col gap-3">
      <span className="text-3xl text-center">Page Not Found</span>
      <span className="text-lg text-center">
        You might not have permissions to see this page.
      </span>
      <a
        className="px-4 py-2 text-base text-white bg-blue-500 hover:bg-blue-600 transition-all rounded-md"
        href="/"
      >
        HOME
      </a>
    </div>
  );
};

export default ErrorPage;
