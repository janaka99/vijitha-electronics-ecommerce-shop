import React from "react";

const ProductCard = ({ item }) => {
  const nameLength = (name) => {
    if (name.length <= 24) {
      return name;
    }
    return name.slice(0, 16) + "...";
  };
  return (
    <a
      href={`/shop/products/${item.name}?id=${item._id}`}
      className="w-full aspect-[5/6] bg-gray-100 shadow-lg relative p-2 cursor-pointer "
      target="_black"
      rel="noopener noreferrer"
    >
      <div className="w-full aspect-square p-2">
        <img
          src={`${item.src} contain object-center p-2`}
          className="w-full h-full bg-[#eeeeee]"
          alt=""
        />
      </div>
      <div className="w-full aspect-[5/1] flex justify-between items-center p-2">
        <div className="text-sm font-medium">{nameLength(item.name)}</div>
        <div className="text-base font-medium text-color-1">{item.price} $</div>
      </div>
      <div className=""></div>
    </a>
  );
};

export default ProductCard;
