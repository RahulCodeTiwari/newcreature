import React from "react";

const CategoryCards = ({ image, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center bg-sky-50 rounded-xl  cursor-pointer hover:shadow-md transition"
    >
      <img
        src={image}
        alt={title}
        className="h-26 w-auto md:h-34 object-contain"
      />
      <p className="text-sm font-semibold text-gray-800">{title}</p>
    </div>
  );
};

export default CategoryCards;
