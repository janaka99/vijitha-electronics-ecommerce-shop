import React, { useEffect } from "react";

const PopUp = ({ setPopUp, popUp }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPopUp({
        ...popUp,
        show: false,
      });
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div
      className={`z-[1111111111111111111111111111111111111] fixed top-[55px] w-fit px-3 py-1 mx-auto  left-0 right-0 flex gap-3 items-center ${
        popUp.type === "error"
          ? "bg-[#F8D7DA] border-[1px] text-[#721C24] border-[#F5C6CB] rounded-md transition-transform "
          : "bg-[#CCE5FF] border-[1px] text-[#004085] border-[#B8DAFF] rounded-md transition-transform "
      }`}
    >
      {popUp.message}
      <button
        onClick={() =>
          setPopUp({
            ...popUp,
            show: false,
          })
        }
        className={`${
          popUp.type === "error" ? "text-[#721C24]" : "text-[#004085]"
        }`}
      >
        x
      </button>
    </div>
  );
};

export default PopUp;
