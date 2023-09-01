import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
// import { PiStarThin } from "react-icons/pi";

const Star = ({ color }) => {
  return (
    <svg
      className={`w-4 h-4 ${color}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
};

const Review = () => {
  return (
    <div className="w-full p-4 flex flex-col shadow-lg border-[1px] gap-3 relative">
      <div className="flex justify-start items-center gap-3">
        <img
          className="w-5 h-5 object-cover rounded-full border-[1px] border-[#3232326d]"
          src="/quality.svg"
          alt=""
        />
        <div className="text-sm text-[#1F2937] font-bold">Janaka Chamith</div>
      </div>
      <div className="">
        <div className="flex items-center space-x-1">
          <Star color="text-[#1A56DB]" />
          <Star color="text-[#1A56DB]" />
          <Star color="text-[#1A56DB]" />
          <Star color="text-[#1A56DB]" />
          <Star color="text-gray-500" />
        </div>
      </div>
      <div className="text-sm text-[#1f2937be] ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni porro
        delectus dolore voluptatum neque dignissimos dolorum et pariatur dolores
        corrupti, doloremque itaque odit officiis sint eveniet sed quis a,
        corporis, voluptates necessitatibus. Labore quo est quia praesentium
        incidunt quasi! Laudantium, fuga dignissimos nostrum nesciunt commodi
        error molestias veniam aspernatur possimus.
      </div>
      <div className="text-sm text-[#1F2937] font-bold  flex w-fit self-end">
        2022.10.15
      </div>

      <div className="absolute right-2 top-2 flex gap-2 text-[#1A56DB]">
        <button className="text-[#1A56DB] cursor-pointer ">
          <BiEdit size={20} />
        </button>
        <button className="text-[#db1a1a] cursor-pointer">
          <MdDelete size={20} />
        </button>
      </div>
    </div>
  );
};

export default Review;
