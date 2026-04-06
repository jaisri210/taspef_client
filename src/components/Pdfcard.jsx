import React from "react";

const PdfCard = ({ image, title, date, link }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden w-[340px]">
      {/* Image Section */}
      <div className="h-[220px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500 text-sm mb-3">{date}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-all"
        >
          Read Magazine
        </a>
      </div>
    </div>
  );
};

export default PdfCard;
