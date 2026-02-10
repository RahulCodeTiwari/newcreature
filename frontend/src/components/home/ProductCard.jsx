import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  showInquiry = true,
  showViewMore = true,
}) => {
  const navigate = useNavigate();

  if (!product) return null;

  const image =
    product.image ||
    product.thumbnail ||
    "/placeholder.png";

  const title =
    product.title ||
    product.name ||
    "View Details";

  //  Detail page link (same for image & view more)
  const detailLink = product.slug
    ? `/subcategory/${product.slug}`
    : "#";

  // WhatsApp link
  const whatsappLink = product.whatsappNumber
    ? `https://wa.me/91${product.whatsappNumber}`
    : "#";

  return (
    <div
      className="group border border-blue-200 rounded-2xl bg-white 
                 flex flex-col shadow-md hover:shadow-xl 
                 transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => navigate(detailLink)}
    >
      {/* Image */}
      <div
        className="relative flex items-center justify-center 
                   bg-gray-50 h-52 sm:h-60 md:h-64 lg:h-72 p-4"
      >
        <img
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain 
                     transition-transform duration-300 
                     group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 mt-auto">
        <h3 className="text-center font-semibold text-sm sm:text-base">
          {title}
        </h3>

        {/*  Inquiry → WhatsApp */}
        {showInquiry && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-2 
                       border-2 border-blue-700 text-blue-700 
                       rounded-lg py-2 text-sm font-semibold
                       hover:bg-blue-50 transition-colors"
          >
            <FaWhatsapp className="text-green-500 text-lg" />
            Send Inquiry
          </a>
        )}

        {/*  View More → same as image */}
        {showViewMore && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(detailLink);
            }}
            className="w-full flex items-center justify-center gap-2 
                       border-2 border-blue-700 text-blue-700 
                       rounded-lg py-2 text-sm font-semibold
                       hover:bg-blue-50 transition-colors"
          >
            <FiSend />
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
