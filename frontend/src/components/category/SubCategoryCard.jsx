
import React from "react";
import { useNavigate } from "react-router-dom";

const SubCategoryCard = ({ sub }) => {
const navigate = useNavigate();
  return (
    <section onClick={() => navigate(`/subcategory/${sub.slug}`)}>
      <div className="border-2 border-gray-300 shadow-sm hover:shadow-md transition rounded-2xl p-2 bg-white flex flex-col ">

        {/* IMAGE + TEXT */}
        <div className="flex gap-2 items-start">
          
          {/* LEFT – IMAGE */}
        <img
          src={sub.image}
          alt={sub.name}
          className="w-2/5 h-60 sm:w-1/3 object-contain cursor-pointer"
        />
          {/* RIGHT – TEXT */}
          <div className="flex-1">
            {/* TITLE */}
            <h2 className="text-base sm:text-xl font-bold uppercase mb-1">
              {sub.name}
            </h2>

            {/* PRICE */}
            {sub.priceRange && (
              <p className="text-sky-900 font-semibold text-sm sm:text-lg ">
                Price Range - ₹{sub.priceRange.min} – ₹{sub.priceRange.max}/-
              </p>
            )}
            <button className="flex-1 bg-[rgb(0,52,102)]  border text-white text-sky-900 px-1 rounded-lg text-sm">
            Get Latest Price
          </button>

          {/* FEATURES */}
          <div className="text-xs sm:text-sm text-gray-800 mb-2 space-y-1">
            {sub.features?.map((item, i) => (
              <p key={i}>• {item}</p>
            ))}
          </div>

          {/* USAGE */}
          {sub.usage?.length > 0 && (
            <p className="text-xs sm:text-sm text-gray-700">
              <b>Usage:</b> {sub.usage.join(", ")}
            </p>
          )}

          
        </div>
     
      </div>

      {/* BUTTONS */}
      <div className="mt-2 flex  sm:flex-row gap-3">
        
        {sub.callNumber && (
          <a
            href={`tel:${sub.callNumber}`}
            className="flex-1 flex items-center justify-center gap-2
            bg-[rgb(0,52,102)] text-white py-2
            rounded-lg text-sm md:text-base md:py-3
            hover:opacity-90 transition"
          >
            <img
              src="../assets/icons/callnow.png"
              alt="Call"
              className="w-4 h-5"
            />
            Call Now
          </a>
        )}

        {sub.whatsappNumber && (
          <a
            href={`https://wa.me/${sub.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2
            bg-green-600 text-white py-2
            rounded-lg text-sm md:text-base
            hover:bg-green-700 transition"
          >
            <img
              src="../assets/icons/whatsapp.png"
              alt="WhatsApp"
              className="w-5 h-5"
            />
            WhatsApp
          </a>
        )}

        {sub.brochureUrl && (
          <a
            href={sub.brochureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2
            bg-[rgb(0,52,102)] text-white py-2
            rounded-lg text-sm md:text-base
            hover:opacity-90 transition"
          >
            <img
              src="../assets/icons/dounloadbrochure.png"
              alt="Brochure"
              className="w-5 h-5"
            />
            Brochure
          </a>
        )}

      </div>

      </div>


    </section>
  );
};

export default SubCategoryCard;
