import React from "react";
import SpinLoader from "./SpinLoader";

const PageLoader = () => {
  return (
    <div className="w-full flex-grow flex justify-center items-center">
      <SpinLoader />
    </div>
  );
};

export default PageLoader;
