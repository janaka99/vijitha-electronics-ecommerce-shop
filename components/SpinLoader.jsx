import React from "react";

//cheked

const SpinLoader = () => {
  return (
    <div className="w-full h-full   flex justify-center items-center backdrop-blur-[1px]">
      <div className="w-[25px] h-[25px] border-t-2 border-blue-500 rounded-[50%] animate-spin"></div>
    </div>
  );
};

export default SpinLoader;
